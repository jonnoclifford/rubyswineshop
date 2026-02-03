'use client';

/**
 * Enhanced Image Manager with Folders, Metadata, and Search
 *
 * Organizes images into folders, adds metadata (alt text, captions),
 * and provides search/filter functionality
 */

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Upload, Trash2, Copy, Image as ImageIcon, X, Check, Search, Folder, Edit, FolderOpen } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import imageCompression from 'browser-image-compression';
import type { ImageMetadata } from '@/types/content';

// ImageFile is an alias for ImageMetadata with potential for future extension
type ImageFile = ImageMetadata;

interface UploadProgress {
  filename: string;
  progress: number;
}

const DEFAULT_FOLDERS = [
  'Hero Banners',
  'Menu Items',
  'Events',
  'About',
  'Team',
  'Storefront',
  'Other'
];

export function EnhancedImageManager() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [filteredImages, setFilteredImages] = useState<ImageFile[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);
  const [previewFiles, setPreviewFiles] = useState<File[]>([]);
  const [uploadFolder, setUploadFolder] = useState(DEFAULT_FOLDERS[DEFAULT_FOLDERS.length - 1]);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [editingImage, setEditingImage] = useState<ImageFile | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
  const ACCEPTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];

  useEffect(() => {
    loadImages();
  }, []);

  useEffect(() => {
    filterImages();
  }, [images, selectedFolder, searchQuery]);

  // Auto-dismiss messages
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const loadImages = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/images');
      if (response.ok) {
        const data = await response.json();
        setImages(data.images || []);
      } else {
        showMessage('error', 'Failed to load images');
      }
    } catch (error) {
      console.error('Failed to load images:', error);
      showMessage('error', 'Failed to load images');
    } finally {
      setIsLoading(false);
    }
  };

  const filterImages = () => {
    let filtered = images;

    // Filter by folder
    if (selectedFolder !== 'all') {
      filtered = filtered.filter(img => img.folder === selectedFolder);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(img =>
        img.filename.toLowerCase().includes(query) ||
        img.alt?.toLowerCase().includes(query) ||
        img.caption?.toLowerCase().includes(query)
      );
    }

    setFilteredImages(filtered);
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
  };

  const sanitizeFilename = (filename: string): string => {
    const parts = filename.split('.');
    const extension = parts.pop() || '';
    const name = parts.join('.');

    const sanitized = name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    return `${sanitized}.${extension.toLowerCase()}`;
  };

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return `${file.name}: Invalid file type. Only JPG, PNG, WebP, GIF, and SVG are allowed.`;
    }
    if (file.size > MAX_FILE_SIZE) {
      return `${file.name}: File too large. Maximum size is 5MB.`;
    }
    return null;
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const validFiles: File[] = [];
    const errors: string[] = [];

    fileArray.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(error);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      showMessage('error', errors.join(' '));
    }

    if (validFiles.length > 0) {
      setPreviewFiles(prev => [...prev, ...validFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removePreviewFile = (index: number) => {
    setPreviewFiles(prev => prev.filter((_, i) => i !== index));
  };

  const optimizeImage = async (file: File): Promise<File> => {
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 2000,
        useWebWorker: true,
        fileType: 'image/webp',
      };

      const compressedFile = await imageCompression(file, options);
      const newName = file.name.replace(/\.[^.]+$/, '.webp');
      return new File([compressedFile], newName, { type: 'image/webp' });
    } catch (error) {
      console.error('Optimization failed, using original:', error);
      return file;
    }
  };

  const uploadFiles = async () => {
    if (previewFiles.length === 0) return;

    const uploadPromises = previewFiles.map(async (file) => {
      const sanitizedName = sanitizeFilename(file.name);
      let finalName = sanitizedName;

      setUploadProgress(prev => [...prev, { filename: sanitizedName, progress: 0 }]);

      try {
        setUploadProgress(prev =>
          prev.map(p => p.filename === sanitizedName ? { ...p, progress: 10 } : p)
        );

        const optimizedFile = await optimizeImage(file);
        finalName = sanitizeFilename(optimizedFile.name);

        setUploadProgress(prev =>
          prev.map(p => p.filename === sanitizedName ? { ...p, progress: 30, filename: finalName } : p)
        );

        const formData = new FormData();
        formData.append('file', optimizedFile, finalName);
        formData.append('folder', uploadFolder);

        const response = await fetch('/api/admin/images/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          setUploadProgress(prev =>
            prev.map(p => p.filename === finalName ? { ...p, progress: 100 } : p)
          );
          return { success: true, filename: finalName };
        } else {
          const error = await response.json();
          return { success: false, filename: finalName, error: error.error };
        }
      } catch (error) {
        return { success: false, filename: finalName, error: 'Upload failed' };
      }
    });

    const results = await Promise.all(uploadPromises);

    setTimeout(() => setUploadProgress([]), 1000);

    const successCount = results.filter(r => r.success).length;
    const failCount = results.length - successCount;

    if (successCount > 0) {
      showMessage('success', `Successfully uploaded ${successCount} image${successCount > 1 ? 's' : ''}`);
      setPreviewFiles([]);
      await loadImages();
    }

    if (failCount > 0) {
      const failedFiles = results.filter(r => !r.success).map(r => r.filename).join(', ');
      showMessage('error', `Failed to upload: ${failedFiles}`);
    }
  };

  const copyImagePath = (filename: string) => {
    const path = `/images/${filename}`;
    navigator.clipboard.writeText(path);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  const deleteImage = async (filename: string) => {
    try {
      const response = await fetch(`/api/admin/images?filename=${encodeURIComponent(filename)}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        showMessage('success', `Deleted ${filename}`);
        setDeleteConfirm(null);
        await loadImages();
      } else {
        const error = await response.json();
        showMessage('error', error.error || 'Failed to delete image');
      }
    } catch (error) {
      console.error('Failed to delete image:', error);
      showMessage('error', 'Failed to delete image');
    }
  };

  const saveImageMetadata = async () => {
    if (!editingImage) return;

    try {
      const response = await fetch('/api/admin/images/metadata', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: editingImage.filename,
          alt: editingImage.alt,
          caption: editingImage.caption,
          folder: editingImage.folder,
        }),
      });

      if (response.ok) {
        showMessage('success', 'Metadata updated');
        setEditingImage(null);
        await loadImages();
      } else {
        showMessage('error', 'Failed to update metadata');
      }
    } catch (error) {
      console.error('Failed to save metadata:', error);
      showMessage('error', 'Failed to update metadata');
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFolderCounts = () => {
    const counts: Record<string, number> = { all: images.length };
    images.forEach(img => {
      const folder = img.folder || 'Other';
      counts[folder] = (counts[folder] || 0) + 1;
    });
    return counts;
  };

  const folderCounts = getFolderCounts();

  return (
    <div className="space-y-6">
      {/* Message Toast */}
      {message && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-top ${
            message.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          {message.type === 'success' ? (
            <Check className="h-5 w-5 text-green-600" />
          ) : (
            <X className="h-5 w-5 text-red-600" />
          )}
          <p className="font-medium">{message.text}</p>
        </div>
      )}

      {/* Enlarged Image Modal */}
      {enlargedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setEnlargedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <button
              onClick={() => setEnlargedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            <img
              src={enlargedImage}
              alt="Enlarged view"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Edit Metadata Dialog */}
      <Dialog open={!!editingImage} onOpenChange={(open) => !open && setEditingImage(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Image Metadata</DialogTitle>
            <DialogDescription>
              Add alt text and caption to improve accessibility and organization
            </DialogDescription>
          </DialogHeader>
          {editingImage && (
            <div className="space-y-4">
              <div>
                <img
                  src={editingImage.path}
                  alt={editingImage.filename}
                  className="w-full rounded border"
                />
                <p className="text-sm text-gray-500 mt-2">{editingImage.filename}</p>
              </div>
              <div>
                <Label htmlFor="edit-folder">Folder</Label>
                <Select
                  value={editingImage.folder || 'Other'}
                  onValueChange={(value) => setEditingImage({ ...editingImage, folder: value })}
                >
                  <SelectTrigger id="edit-folder">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DEFAULT_FOLDERS.map(folder => (
                      <SelectItem key={folder} value={folder}>{folder}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-alt">Alt Text</Label>
                <Input
                  id="edit-alt"
                  value={editingImage.alt || ''}
                  onChange={(e) => setEditingImage({ ...editingImage, alt: e.target.value })}
                  placeholder="Describe the image for accessibility"
                />
              </div>
              <div>
                <Label htmlFor="edit-caption">Caption (optional)</Label>
                <Textarea
                  id="edit-caption"
                  value={editingImage.caption || ''}
                  onChange={(e) => setEditingImage({ ...editingImage, caption: e.target.value })}
                  placeholder="Add a caption or description"
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingImage(null)}>
              Cancel
            </Button>
            <Button onClick={saveImageMetadata}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar: Folders & Search */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Search images..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Folder className="h-4 w-4" />
                Folders
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <button
                onClick={() => setSelectedFolder('all')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded text-sm transition-colors ${
                  selectedFolder === 'all'
                    ? 'bg-terracotta text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  <FolderOpen className="h-4 w-4" />
                  All Images
                </span>
                <Badge variant="secondary">{folderCounts.all || 0}</Badge>
              </button>
              {DEFAULT_FOLDERS.map(folder => (
                <button
                  key={folder}
                  onClick={() => setSelectedFolder(folder)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded text-sm transition-colors ${
                    selectedFolder === folder
                      ? 'bg-terracotta text-white'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Folder className="h-4 w-4" />
                    {folder}
                  </span>
                  <Badge variant="secondary">{folderCounts[folder] || 0}</Badge>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-terracotta" />
                Upload Images
              </CardTitle>
              <CardDescription>
                Upload images to use in your content. Images are automatically optimized and converted to WebP.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Upload to Folder</Label>
                <Select value={uploadFolder} onValueChange={setUploadFolder}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DEFAULT_FOLDERS.map(folder => (
                      <SelectItem key={folder} value={folder}>{folder}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-terracotta bg-terracotta/5'
                    : 'border-gray-300 hover:border-terracotta hover:bg-gray-50'
                }`}
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium text-gray-700 mb-1">
                  Drop images here or click to browse
                </p>
                <p className="text-sm text-gray-500">
                  {ACCEPTED_EXTENSIONS.join(', ')} • Max 5MB per file
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept={ACCEPTED_EXTENSIONS.join(',')}
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                />
              </div>

              {previewFiles.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-gray-700">Files ready to upload:</h4>
                  <div className="space-y-2">
                    {previewFiles.map((file, index) => {
                      const sanitizedName = sanitizeFilename(file.name);
                      const uploadInfo = uploadProgress.find(p => p.filename === sanitizedName);

                      return (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center overflow-hidden flex-shrink-0">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {sanitizedName}
                            </p>
                            <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                            {uploadInfo && uploadInfo.progress > 0 && (
                              <div className="mt-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-terracotta transition-all duration-300"
                                  style={{ width: `${uploadInfo.progress}%` }}
                                />
                              </div>
                            )}
                          </div>
                          {!uploadInfo && (
                            <button
                              onClick={() => removePreviewFile(index)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <Button
                    onClick={uploadFiles}
                    disabled={uploadProgress.length > 0}
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload {previewFiles.length} {previewFiles.length === 1 ? 'Image' : 'Images'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Image Gallery */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-terracotta" />
                {selectedFolder === 'all' ? 'All Images' : selectedFolder}
                <Badge variant="secondary">{filteredImages.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-terracotta border-r-transparent"></div>
                  <p className="mt-4 text-gray-500">Loading images...</p>
                </div>
              ) : filteredImages.length === 0 ? (
                <div className="text-center py-12">
                  <ImageIcon className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium text-gray-700 mb-1">
                    {searchQuery ? 'No images found' : 'No images in this folder'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {searchQuery ? 'Try a different search term' : 'Upload your first image to get started'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredImages.map((image) => (
                    <div
                      key={image.filename}
                      className="group relative bg-gray-50 rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all"
                    >
                      <div
                        className="aspect-square bg-gray-100 cursor-pointer overflow-hidden"
                        onClick={() => setEnlargedImage(image.path)}
                      >
                        <img
                          src={image.path}
                          alt={image.alt || image.filename}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="p-3 space-y-2">
                        <p className="text-sm font-medium text-gray-900 truncate" title={image.filename}>
                          {image.filename}
                        </p>
                        {image.alt && (
                          <p className="text-xs text-gray-600 truncate" title={image.alt}>
                            {image.alt}
                          </p>
                        )}
                        <div className="flex items-center gap-2">
                          {image.folder && (
                            <Badge variant="secondary" className="text-xs">
                              {image.folder}
                            </Badge>
                          )}
                          <span className="text-xs text-gray-500">{formatFileSize(image.size)}</span>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyImagePath(image.filename)}
                            className="flex-1 text-xs"
                          >
                            {copiedPath === image.path ? (
                              <>
                                <Check className="h-3 w-3 mr-1" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3 mr-1" />
                                Copy
                              </>
                            )}
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingImage(image)}
                            className="text-xs px-2"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>

                          {deleteConfirm === image.filename ? (
                            <div className="flex gap-1">
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => deleteImage(image.filename)}
                                className="text-xs px-2"
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setDeleteConfirm(null)}
                                className="text-xs px-2"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setDeleteConfirm(image.filename)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 px-2"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

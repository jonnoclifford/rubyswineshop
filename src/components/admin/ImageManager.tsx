'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Trash2, Copy, Image as ImageIcon, X, Check } from 'lucide-react';
import imageCompression from 'browser-image-compression';

interface ImageFile {
  filename: string;
  size: number;
  path: string;
}

interface UploadProgress {
  filename: string;
  progress: number;
}

export function ImageManager() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);
  const [previewFiles, setPreviewFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
  const ACCEPTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];

  useEffect(() => {
    loadImages();
  }, []);

  // Auto-dismiss messages after 5 seconds
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
        maxSizeMB: 1, // Max 1MB
        maxWidthOrHeight: 2000, // Max dimension
        useWebWorker: true,
        fileType: 'image/webp', // Convert to WebP
      };

      const compressedFile = await imageCompression(file, options);

      // Rename to .webp extension
      const newName = file.name.replace(/\.[^.]+$/, '.webp');
      return new File([compressedFile], newName, { type: 'image/webp' });
    } catch (error) {
      console.error('Optimization failed, using original:', error);
      return file; // Fallback to original if optimization fails
    }
  };

  const uploadFiles = async () => {
    if (previewFiles.length === 0) return;

    const uploadPromises = previewFiles.map(async (file) => {
      const sanitizedName = sanitizeFilename(file.name);
      let finalName = sanitizedName; // Default to original name

      // Add to upload progress
      setUploadProgress(prev => [...prev, { filename: sanitizedName, progress: 0 }]);

      try {
        // Optimize image before upload
        setUploadProgress(prev =>
          prev.map(p => p.filename === sanitizedName ? { ...p, progress: 10 } : p)
        );

        const optimizedFile = await optimizeImage(file);
        finalName = sanitizeFilename(optimizedFile.name); // Re-sanitize after rename

        setUploadProgress(prev =>
          prev.map(p => p.filename === sanitizedName ? { ...p, progress: 30, filename: finalName } : p)
        );

        const formData = new FormData();
        formData.append('file', optimizedFile, finalName);

        const response = await fetch('/api/admin/images/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          // Update progress to 100%
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

    // Clear upload progress
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

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

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

      {/* Upload Section */}
      <Card className="shadow-md border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-terracotta" />
            Upload Images
          </CardTitle>
          <CardDescription>
            Upload images to use in your content. Images are automatically optimized (resized, compressed, converted to WebP) before upload. Max 5MB per file.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Drag & Drop Zone */}
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

          {/* Preview Files */}
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
      <Card className="shadow-md border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-terracotta" />
            Image Gallery
          </CardTitle>
          <CardDescription>
            All uploaded images. Click to enlarge, copy path to use in content, or delete.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-terracotta border-r-transparent"></div>
              <p className="mt-4 text-gray-500">Loading images...</p>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium text-gray-700 mb-1">No images yet</p>
              <p className="text-sm text-gray-500">Upload your first image to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <div
                  key={image.filename}
                  className="group relative bg-gray-50 rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all"
                >
                  {/* Image Preview */}
                  <div
                    className="aspect-square bg-gray-100 cursor-pointer overflow-hidden"
                    onClick={() => setEnlargedImage(image.path)}
                  >
                    <img
                      src={image.path}
                      alt={image.filename}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Image Info */}
                  <div className="p-3 space-y-2">
                    <p className="text-sm font-medium text-gray-900 truncate" title={image.filename}>
                      {image.filename}
                    </p>
                    <p className="text-xs text-gray-500">{formatFileSize(image.size)}</p>

                    {/* Action Buttons */}
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
                            Copy Path
                          </>
                        )}
                      </Button>

                      {deleteConfirm === image.filename ? (
                        <div className="flex gap-1">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteImage(image.filename)}
                            className="text-xs px-2"
                          >
                            Confirm
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDeleteConfirm(null)}
                            className="text-xs px-2"
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDeleteConfirm(image.filename)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
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
  );
}

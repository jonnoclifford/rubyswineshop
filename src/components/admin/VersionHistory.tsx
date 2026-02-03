'use client';

/**
 * Version History Component
 *
 * Display commit history for site-config.json with ability to restore previous versions
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { History, RotateCcw, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Commit {
  sha: string;
  message: string;
  author: string;
  date: string;
  htmlUrl: string;
  avatarUrl?: string;
}

export function VersionHistory() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReverting, setIsReverting] = useState(false);
  const [revertDialogOpen, setRevertDialogOpen] = useState(false);
  const [selectedCommit, setSelectedCommit] = useState<Commit | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/history?limit=20');
      if (!response.ok) {
        throw new Error('Failed to load history');
      }
      const data = await response.json();
      setCommits(data.commits);
    } catch (err) {
      console.error('Failed to load history:', err);
      setError('Failed to load version history');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRevertClick = (commit: Commit) => {
    setSelectedCommit(commit);
    setRevertDialogOpen(true);
  };

  const confirmRevert = async () => {
    if (!selectedCommit) return;

    setIsReverting(true);
    try {
      const response = await fetch('/api/admin/history/revert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sha: selectedCommit.sha }),
      });

      if (!response.ok) {
        throw new Error('Failed to revert');
      }

      // Close dialog and reload history
      setRevertDialogOpen(false);
      setSelectedCommit(null);

      // Reload the page to show the reverted config
      window.location.reload();
    } catch (err) {
      console.error('Failed to revert:', err);
      alert('Failed to restore this version. Please try again.');
    } finally {
      setIsReverting(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 " />
            <CardTitle>Version History</CardTitle>
          </div>
          <CardDescription>
            Loading recent changes...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-8 w-8 animate-spin /40" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 " />
            <CardTitle>Version History</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 p-4 border rounded-lg opacity-80">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm">{error}</p>
          </div>
          <Button onClick={loadHistory} variant="outline" className="mt-4">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="h-5 w-5 " />
              <div>
                <CardTitle>Version History</CardTitle>
                <CardDescription>
                  View and restore previous versions of your site content
                </CardDescription>
              </div>
            </div>
            <Button onClick={loadHistory} variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {commits.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No version history available yet
            </p>
          ) : (
            <div className="space-y-3">
              {commits.map((commit, index) => (
                <div
                  key={commit.sha}
                  className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border rounded-lg transition-colors ${
                    index === 0
                      ? 'opacity-100'
                      : 'opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {index === 0 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary text-white">
                          Current
                        </span>
                      )}
                      <p className="font-medium truncate">
                        {commit.message}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{commit.author}</span>
                      <span>•</span>
                      <span>{formatDistanceToNow(new Date(commit.date), { addSuffix: true })}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* View on GitHub */}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => window.open(commit.htmlUrl, '_blank')}
                      className="gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="hidden sm:inline">View</span>
                    </Button>

                    {/* Restore button (disabled for current version) */}
                    {index !== 0 && (
                      <Button
                        size="sm"
                        onClick={() => handleRevertClick(commit)}
                        className="gap-2 bg-terracotta hover:bg-terracotta/90"
                      >
                        <RotateCcw className="h-4 w-4" />
                        <span className="hidden sm:inline">Restore</span>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Revert Confirmation Dialog */}
      <AlertDialog open={revertDialogOpen} onOpenChange={setRevertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Restore Previous Version?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                You are about to restore your site to a previous version:
              </p>
              {selectedCommit && (
                <div className="p-3 rounded border mt-2 opacity-60">
                  <p className="font-medium">{selectedCommit.message}</p>
                  <p className="text-sm mt-1">
                    By {selectedCommit.author} •{' '}
                    {formatDistanceToNow(new Date(selectedCommit.date), { addSuffix: true })}
                  </p>
                </div>
              )}
              <p className="mt-3 text-sm">
                This will create a new commit with the content from this version.
                Your current changes will still be in the version history if you need to undo this.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isReverting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRevert}
              disabled={isReverting}
              className="bg-terracotta hover:bg-terracotta/90"
            >
              {isReverting ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Restoring...
                </>
              ) : (
                <>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Restore Version
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

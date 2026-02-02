/**
 * Example: Config Editor Component
 *
 * This file demonstrates how to use the GitHub config API in a React component.
 * This is NOT meant to be used directly - it's a reference implementation.
 *
 * Features demonstrated:
 * - Loading config from GitHub
 * - Editing config values
 * - Saving changes with auto-generated commit messages
 * - Viewing commit history
 * - Reverting to previous versions
 * - Error handling and loading states
 */

'use client';

import { useState, useEffect } from 'react';
import type { SiteConfig } from '@/types/content';
import {
  fetchConfig,
  saveConfig,
  fetchHistory,
  revertConfig,
  type CommitInfo,
} from '@/lib/config-client';

export default function ConfigEditorExample() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [history, setHistory] = useState<CommitInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load config and history on mount
  useEffect(() => {
    loadConfig();
    loadHistory();
  }, []);

  // Load current config from GitHub
  const loadConfig = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchConfig();
      setConfig(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load config');
    } finally {
      setLoading(false);
    }
  };

  // Load commit history
  const loadHistory = async () => {
    try {
      const commits = await fetchHistory(20);
      setHistory(commits);
    } catch (err) {
      console.error('Failed to load history:', err);
    }
  };

  // Save changes to GitHub
  const handleSave = async () => {
    if (!config) return;

    try {
      setSaving(true);
      setError(null);

      // Let the system auto-generate a commit message based on changes
      const result = await saveConfig(config);

      console.log('Config saved!', result);
      alert(`Successfully saved! Commit: ${result.message}`);

      // Reload history to show the new commit
      await loadHistory();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save config');
    } finally {
      setSaving(false);
    }
  };

  // Revert to a previous version
  const handleRevert = async (sha: string) => {
    if (!confirm('Are you sure you want to revert to this version?')) {
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const result = await revertConfig(sha);
      console.log('Reverted!', result);
      alert('Successfully reverted to previous version!');

      // Reload config and history
      await loadConfig();
      await loadHistory();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to revert');
    } finally {
      setSaving(false);
    }
  };

  // Example: Update business hours
  const updateHours = (day: string, hours: string) => {
    if (!config) return;

    setConfig({
      ...config,
      business: {
        ...config.business,
        hours: {
          ...config.business.hours,
          [day]: hours,
        },
      },
    });
  };

  // Example: Add a new wine to by-the-glass menu
  const addWineByGlass = () => {
    if (!config) return;

    const newWine = {
      name: 'New Wine',
      producer: 'Producer Name',
      region: 'Region',
      price: '$15',
      description: 'Description here',
    };

    setConfig({
      ...config,
      menu: {
        ...config.menu,
        byTheGlass: {
          ...config.menu.byTheGlass,
          items: [...config.menu.byTheGlass.items, newWine],
        },
      },
    });
  };

  if (loading) {
    return (
      <div className="p-8">
        <p>Loading configuration from GitHub...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-50 border border-red-200 rounded">
        <h2 className="text-red-800 font-bold mb-2">Error</h2>
        <p className="text-red-600">{error}</p>
        <button
          onClick={loadConfig}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!config) {
    return <div className="p-8">No configuration loaded.</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Site Configuration Editor</h1>
        <p className="text-gray-600">
          Edit your site configuration and commit changes to GitHub
        </p>
      </div>

      {/* Save Button */}
      <div className="mb-8 flex gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving to GitHub...' : 'Save Changes'}
        </button>
        <button
          onClick={loadConfig}
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          Reload
        </button>
      </div>

      {/* Example: Edit Business Hours */}
      <section className="mb-8 p-6 bg-white border rounded-lg">
        <h2 className="text-xl font-bold mb-4">Business Hours</h2>
        <div className="space-y-3">
          {Object.entries(config.business.hours).map(([day, hours]) => (
            <div key={day} className="flex gap-4 items-center">
              <label className="w-32 font-medium">{day}:</label>
              <input
                type="text"
                value={hours}
                onChange={(e) => updateHours(day, e.target.value)}
                className="flex-1 px-3 py-2 border rounded"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Example: Wine Menu */}
      <section className="mb-8 p-6 bg-white border rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Wine Menu - By the Glass</h2>
          <button
            onClick={addWineByGlass}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Wine
          </button>
        </div>
        <div className="space-y-4">
          {config.menu.byTheGlass.items.map((wine, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded">
              <div className="font-bold">{wine.name}</div>
              <div className="text-sm text-gray-600">
                {wine.producer} - {wine.region}
              </div>
              <div className="text-sm mt-1">{wine.description}</div>
              <div className="font-bold mt-2">{wine.price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Commit History */}
      <section className="mb-8 p-6 bg-white border rounded-lg">
        <h2 className="text-xl font-bold mb-4">Recent Changes</h2>
        <div className="space-y-3">
          {history.map((commit) => (
            <div
              key={commit.sha}
              className="flex justify-between items-start p-4 bg-gray-50 rounded hover:bg-gray-100"
            >
              <div className="flex-1">
                <div className="font-mono text-sm text-gray-500 mb-1">
                  {commit.shortSha || commit.sha.substring(0, 7)}
                </div>
                <div className="font-medium mb-1">{commit.message}</div>
                <div className="text-sm text-gray-600">
                  {commit.author.name} •{' '}
                  {new Date(commit.author.date).toLocaleString()}
                </div>
              </div>
              <div className="flex gap-2">
                <a
                  href={commit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                >
                  View
                </a>
                <button
                  onClick={() => handleRevert(commit.sha)}
                  disabled={saving}
                  className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 disabled:opacity-50"
                >
                  Revert
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* JSON Preview */}
      <section className="mb-8 p-6 bg-white border rounded-lg">
        <h2 className="text-xl font-bold mb-4">JSON Preview</h2>
        <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
          {JSON.stringify(config, null, 2)}
        </pre>
      </section>
    </div>
  );
}

import React, { useState } from 'react';
import type { Song, SongStatus } from '../types';

interface SongFormProps {
  onSubmit: (song: Omit<Song, 'id'>) => void;
  initialData?: Song;
}

export const SongForm: React.FC<SongFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    artist: initialData?.artist || '',
    key: initialData?.key || '',
    tempo: initialData?.tempo || 120,
    notes: initialData?.notes || '',
    lyrics: initialData?.lyrics || '',
    status: initialData?.status || 'In Progress' as SongStatus,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-purple-200 mb-1">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-purple-200 mb-1">Artist</label>
        <input
          type="text"
          value={formData.artist}
          onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
          className="w-full"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-1">Key</label>
          <input
            type="text"
            value={formData.key}
            onChange={(e) => setFormData({ ...formData, key: e.target.value })}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-1">Tempo (BPM)</label>
          <input
            type="number"
            value={formData.tempo}
            onChange={(e) => setFormData({ ...formData, tempo: Number(e.target.value) })}
            className="w-full"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-purple-200 mb-1">Status</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as SongStatus })}
          className="w-full"
        >
          <option value="In Progress">In Progress</option>
          <option value="Ready">Ready</option>
          <option value="Needs Work">Needs Work</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-purple-200 mb-1">Notes</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-purple-200 mb-1">Lyrics</label>
        <textarea
          value={formData.lyrics}
          onChange={(e) => setFormData({ ...formData, lyrics: e.target.value })}
          rows={6}
          className="w-full"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 px-4 rounded-lg gradient-bg gradient-bg-hover
                 text-white font-medium transition-colors hover-glow
                 focus:outline-none focus:ring-2 focus:ring-purple-500/50 
                 focus:ring-offset-2 focus:ring-offset-black"
      >
        {initialData ? 'Update Song' : 'Add Song'}
      </button>
    </form>
  );
};
import React from 'react';
import { GripVertical, Eye, Edit, Trash2 } from 'lucide-react';
import type { Song } from '../types';

interface SetListViewProps {
  songs: Song[];
  onViewLyrics: (song: Song) => void;
  onEditSong: (song: Song) => void;
  onDeleteSong: (id: string) => void;
}

export const SetListView: React.FC<SetListViewProps> = ({ 
  songs, 
  onViewLyrics, 
  onEditSong, 
  onDeleteSong 
}) => {
  return (
    <div className="glass-panel neon-border p-6">
      <h2 className="text-2xl font-bold mb-6 gradient-text">
        Current Set List
      </h2>
      <div className="space-y-3">
        {songs.map((song) => (
          <div
            key={song.id}
            className="flex items-center p-4 glass-panel rounded-lg hover:bg-white/5 transition group hover-glow"
          >
            <GripVertical className="h-5 w-5 text-purple-400/50 cursor-move" />
            <div className="flex-1 ml-3">
              <h3 className="font-medium text-lg">{song.title}</h3>
              <p className="text-sm text-gray-400">{song.artist}</p>
            </div>
            <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onViewLyrics(song)}
                className="p-2 hover:bg-purple-500/10 rounded-full transition-colors"
              >
                <Eye className="h-4 w-4 text-purple-300" />
              </button>
              <button
                onClick={() => onEditSong(song)}
                className="p-2 hover:bg-purple-500/10 rounded-full transition-colors"
              >
                <Edit className="h-4 w-4 text-purple-300" />
              </button>
              <button
                onClick={() => onDeleteSong(song.id)}
                className="p-2 hover:bg-red-500/10 rounded-full transition-colors"
              >
                <Trash2 className="h-4 w-4 text-red-300" />
              </button>
            </div>
          </div>
        ))}
        {songs.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No songs in the set list yet. Add your first song!
          </div>
        )}
      </div>
    </div>
  );
};
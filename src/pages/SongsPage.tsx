import React from 'react';
import { useAppState } from '../hooks/useAppState';

export const SongsPage: React.FC = () => {
  const { songs } = useAppState();

  return (
    <div className="glass-panel neon-border p-6">
      <h2 className="text-2xl font-bold mb-6 gradient-text">Song Library</h2>
      <div className="grid grid-cols-1 gap-6">
        {songs.map((song) => (
          <div
            key={song.id}
            className="glass-panel p-6 rounded-lg hover:bg-white/5 transition"
          >
            <h3 className="text-2xl font-bold mb-2">{song.title}</h3>
            <p className="text-lg text-gray-300 mb-4">by {song.artist}</p>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
              <div>
                <span className="font-medium">Key:</span> {song.key}
              </div>
              <div>
                <span className="font-medium">Tempo:</span> {song.tempo} BPM
              </div>
              <div>
                <span className="font-medium">Status:</span>{' '}
                <span className={`
                  ${song.status === 'Ready' ? 'text-green-400' : ''}
                  ${song.status === 'In Progress' ? 'text-yellow-400' : ''}
                  ${song.status === 'Needs Work' ? 'text-red-400' : ''}
                `}>
                  {song.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
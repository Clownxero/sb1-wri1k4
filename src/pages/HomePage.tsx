import React from 'react';
import { SetListView } from '../components/SetListView';
import { SongForm } from '../components/SongForm';
import { PracticeTimer } from '../components/PracticeTimer';
import { useAppState } from '../hooks/useAppState';

export const HomePage: React.FC = () => {
  const {
    songs,
    setSongs,
    selectedSong,
    setSelectedSong,
    showLyrics,
    setShowLyrics,
    handleSaveSong,
    handleSaveSession,
  } = useAppState();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-8">
        <SetListView
          songs={songs}
          onViewLyrics={(song) => {
            setSelectedSong(song);
            setShowLyrics(true);
          }}
          onEditSong={setSelectedSong}
          onDeleteSong={(id) => setSongs(songs.filter((s) => s.id !== id))}
        />
        <PracticeTimer onSaveSession={handleSaveSession} />
      </div>
      
      <div className="glass-panel neon-border p-6">
        <h2 className="text-2xl font-bold mb-6 gradient-text">
          {selectedSong ? 'Edit Song' : 'Add New Song'}
        </h2>
        <SongForm
          onSubmit={(data) => {
            if (selectedSong) {
              setSongs(
                songs.map((s) =>
                  s.id === selectedSong.id ? { ...data, id: s.id } : s
                )
              );
              setSelectedSong(null);
            } else {
              handleSaveSong(data);
            }
          }}
          initialData={selectedSong || undefined}
        />
      </div>

      {showLyrics && selectedSong && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="glass-panel neon-border p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-2 gradient-text">
              {selectedSong.title}
            </h3>
            <p className="text-purple-200 mb-4">by {selectedSong.artist}</p>
            <pre className="whitespace-pre-wrap font-mono text-sm text-gray-300 bg-black/30 p-4 rounded-lg">
              {selectedSong.lyrics}
            </pre>
            <button
              onClick={() => setShowLyrics(false)}
              className="mt-6 px-6 py-2 rounded-lg gradient-bg gradient-bg-hover
                       text-white transition-colors hover-glow"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
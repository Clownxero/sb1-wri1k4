import React, { useState } from 'react';
import { Plus, Trash2, Music } from 'lucide-react';
import { useAppState } from '../hooks/useAppState';
import type { SetList } from '../types';

export const SetListsPage: React.FC = () => {
  const { songs, setLists, addSetList, updateSetList, deleteSetList } = useAppState();
  const [newSetListName, setNewSetListName] = useState('');
  const [editingSetList, setEditingSetList] = useState<SetList | null>(null);

  const handleCreateSetList = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSetListName.trim()) {
      addSetList(newSetListName.trim());
      setNewSetListName('');
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleCreateSetList} className="glass-panel neon-border p-6">
        <h2 className="text-2xl font-bold mb-6 gradient-text">Create New Set List</h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={newSetListName}
            onChange={(e) => setNewSetListName(e.target.value)}
            placeholder="Enter set list name..."
            className="flex-1"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-lg gradient-bg gradient-bg-hover
                     text-white font-medium flex items-center hover-glow"
          >
            <Plus className="h-5 w-5 mr-2" /> Create
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {setLists.map((setList) => (
          <div key={setList.id} className="glass-panel neon-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold gradient-text">{setList.name}</h3>
              <button
                onClick={() => deleteSetList(setList.id)}
                className="p-2 hover:bg-red-500/10 rounded-full transition-colors"
              >
                <Trash2 className="h-4 w-4 text-red-300" />
              </button>
            </div>
            
            {editingSetList?.id === setList.id ? (
              <div className="space-y-4">
                {songs.map((song) => (
                  <label
                    key={song.id}
                    className="flex items-center space-x-3 p-2 hover:bg-white/5 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={setList.songs.includes(song.id)}
                      onChange={(e) => {
                        const newSongs = e.target.checked
                          ? [...setList.songs, song.id]
                          : setList.songs.filter(id => id !== song.id);
                        updateSetList({ ...setList, songs: newSongs });
                      }}
                      className="rounded border-purple-500/30 text-purple-500
                               focus:ring-purple-500/30 bg-black/40"
                    />
                    <span>{song.title}</span>
                  </label>
                ))}
                <button
                  onClick={() => setEditingSetList(null)}
                  className="w-full py-2 px-4 rounded-lg gradient-bg gradient-bg-hover
                           text-white font-medium hover-glow mt-4"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-2 mb-4">
                  {setList.songs.length === 0 ? (
                    <p className="text-gray-400 text-sm">No songs added yet</p>
                  ) : (
                    setList.songs.map((songId) => {
                      const song = songs.find(s => s.id === songId);
                      return song ? (
                        <div key={song.id} className="flex items-center space-x-2">
                          <Music className="h-4 w-4 text-purple-300" />
                          <span>{song.title}</span>
                        </div>
                      ) : null;
                    })
                  )}
                </div>
                <button
                  onClick={() => setEditingSetList(setList)}
                  className="w-full py-2 px-4 rounded-lg gradient-bg gradient-bg-hover
                           text-white font-medium hover-glow"
                >
                  Edit Songs
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
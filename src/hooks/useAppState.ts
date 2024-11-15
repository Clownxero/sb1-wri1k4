import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import type { Song, PracticeSession, SetList } from '../types';

export const useAppState = () => {
  const { currentUser } = useAuth();
  const [songs, setSongs] = useState<Song[]>([]);
  const [sessions, setSessions] = useState<PracticeSession[]>([]);
  const [setLists, setSetLists] = useState<SetList[]>([]);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [showLyrics, setShowLyrics] = useState(false);

  // Subscribe to user-specific songs
  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, 'songs'),
      where('userId', '==', currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const songList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Song[];
      setSongs(songList);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // Subscribe to user-specific practice sessions
  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, 'sessions'),
      where('userId', '==', currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const sessionList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as PracticeSession[];
      setSessions(sessionList);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // Subscribe to user-specific set lists
  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, 'setLists'),
      where('userId', '==', currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const setListData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SetList[];
      setSetLists(setListData);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handleSaveSong = async (songData: Omit<Song, 'id'>) => {
    if (!currentUser) return;

    try {
      await addDoc(collection(db, 'songs'), {
        ...songData,
        userId: currentUser.uid,
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error saving song:', error);
    }
  };

  const handleUpdateSong = async (songId: string, songData: Partial<Song>) => {
    if (!currentUser) return;

    try {
      const songRef = doc(db, 'songs', songId);
      await updateDoc(songRef, songData);
    } catch (error) {
      console.error('Error updating song:', error);
    }
  };

  const handleDeleteSong = async (songId: string) => {
    if (!currentUser) return;

    try {
      await deleteDoc(doc(db, 'songs', songId));
    } catch (error) {
      console.error('Error deleting song:', error);
    }
  };

  const handleSaveSession = async (duration: number, notes: string) => {
    if (!currentUser) return;

    try {
      await addDoc(collection(db, 'sessions'), {
        userId: currentUser.uid,
        startTime: new Date(Date.now() - duration * 1000).toISOString(),
        endTime: new Date().toISOString(),
        duration,
        notes,
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  const addSetList = async (name: string) => {
    if (!currentUser) return;

    try {
      await addDoc(collection(db, 'setLists'), {
        name,
        userId: currentUser.uid,
        songs: [],
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error creating set list:', error);
    }
  };

  const updateSetList = async (setListId: string, data: Partial<SetList>) => {
    if (!currentUser) return;

    try {
      const setListRef = doc(db, 'setLists', setListId);
      await updateDoc(setListRef, data);
    } catch (error) {
      console.error('Error updating set list:', error);
    }
  };

  const deleteSetList = async (setListId: string) => {
    if (!currentUser) return;

    try {
      await deleteDoc(doc(db, 'setLists', setListId));
    } catch (error) {
      console.error('Error deleting set list:', error);
    }
  };

  return {
    songs,
    sessions,
    setLists,
    selectedSong,
    setSelectedSong,
    showLyrics,
    setShowLyrics,
    handleSaveSong,
    handleUpdateSong,
    handleDeleteSong,
    handleSaveSession,
    addSetList,
    updateSetList,
    deleteSetList,
  };
};
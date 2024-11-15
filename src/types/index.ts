export type SongStatus = 'In Progress' | 'Ready' | 'Needs Work';

export interface Song {
  id: string;
  title: string;
  artist: string;
  key: string;
  tempo: number;
  notes: string;
  lyrics: string;
  status: SongStatus;
}

export interface PracticeSession {
  id: string;
  startTime: string;
  endTime: string;
  notes: string;
  duration: number;
}

export interface SetList {
  id: string;
  name: string;
  songs: string[]; // Array of song IDs
  createdAt: string;
}
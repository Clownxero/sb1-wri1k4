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
  duration: number;
  notes: string;
}
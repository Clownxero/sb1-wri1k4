import React, { useState, useEffect } from 'react';
import { Timer, Pause, Play, Save } from 'lucide-react';

interface PracticeTimerProps {
  onSaveSession: (duration: number, notes: string) => void;
}

export const PracticeTimer: React.FC<PracticeTimerProps> = ({ onSaveSession }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSave = () => {
    onSaveSession(seconds, notes);
    setSeconds(0);
    setNotes('');
    setIsRunning(false);
  };

  return (
    <div className="glass-panel neon-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gradient-text">
          <Timer className="h-7 w-7 mr-2 text-purple-300" />
          Practice Timer
        </h2>
        <div className="text-4xl font-mono text-purple-200">{formatTime(seconds)}</div>
      </div>
      <div className="space-y-4">
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-6 py-3 rounded-lg flex items-center font-medium transition-colors hover-glow ${
              isRunning
                ? 'bg-red-500/80 hover:bg-red-500/90'
                : 'bg-green-500/80 hover:bg-green-500/90'
            } text-white`}
          >
            {isRunning ? (
              <>
                <Pause className="h-5 w-5 mr-2" /> Pause
              </>
            ) : (
              <>
                <Play className="h-5 w-5 mr-2" /> Start
              </>
            )}
          </button>
          <button
            onClick={handleSave}
            disabled={seconds === 0}
            className="px-6 py-3 rounded-lg gradient-bg gradient-bg-hover
                     text-white font-medium flex items-center transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed hover-glow"
          >
            <Save className="h-5 w-5 mr-2" /> Save Session
          </button>
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Session notes..."
          className="input-rock w-full"
          rows={3}
        />
      </div>
    </div>
  );
};
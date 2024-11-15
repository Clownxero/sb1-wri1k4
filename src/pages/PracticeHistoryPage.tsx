import React from 'react';
import { useAppState } from '../hooks/useAppState';
import { formatDate, formatDuration } from '../utils/dateUtils';

export const PracticeHistoryPage: React.FC = () => {
  const { sessions } = useAppState();

  const groupedSessions = sessions.reduce((acc, session) => {
    const date = formatDate(new Date(session.startTime));
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(session);
    return acc;
  }, {} as Record<string, typeof sessions>);

  return (
    <div className="space-y-8">
      {Object.entries(groupedSessions)
        .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
        .map(([date, dateSessions]) => (
          <div key={date} className="glass-panel neon-border p-6">
            <h2 className="text-2xl font-bold mb-6 gradient-text">{date}</h2>
            <div className="space-y-4">
              {dateSessions.map((session) => (
                <div
                  key={session.id}
                  className="glass-panel p-4 rounded-lg hover:bg-white/5 transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-lg font-medium">
                        {new Date(session.startTime).toLocaleTimeString()} -{' '}
                        {new Date(session.endTime).toLocaleTimeString()}
                      </p>
                      <p className="text-sm text-purple-300">
                        Duration: {formatDuration(session.duration)}
                      </p>
                    </div>
                  </div>
                  {session.notes && (
                    <div className="mt-3 p-3 bg-black/30 rounded-lg">
                      <p className="text-gray-300 whitespace-pre-wrap">{session.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};
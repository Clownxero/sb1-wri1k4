import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, Timestamp, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import { Users, Mail } from 'lucide-react';

interface UserStats {
  totalUsers: number;
  usersByMonth: Record<string, number>;
}

export const AdminPage: React.FC = () => {
  const { isAdmin } = useAuth();
  const [userStats, setUserStats] = useState<UserStats>({ 
    totalUsers: 0, 
    usersByMonth: {} 
  });
  const [emailForm, setEmailForm] = useState({
    subject: '',
    message: '',
    sending: false
  });

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const usersRef = collection(db, 'users');
        const snapshot = await getDocs(usersRef);
        
        // Calculate total users
        const totalUsers = snapshot.size;

        // Calculate users by month
        const userDates = snapshot.docs.map(doc => new Date(doc.data().createdAt));
        const monthCounts: Record<string, number> = {};

        userDates.forEach(date => {
          const monthKey = date.toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
          });
          monthCounts[monthKey] = (monthCounts[monthKey] || 0) + 1;
        });

        setUserStats({
          totalUsers,
          usersByMonth: monthCounts
        });
      } catch (error) {
        console.error('Error fetching user stats:', error);
      }
    };

    if (isAdmin) {
      fetchUserStats();
    }
  }, [isAdmin]);

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailForm.subject || !emailForm.message) return;

    try {
      setEmailForm(prev => ({ ...prev, sending: true }));
      
      await addDoc(collection(db, 'mail'), {
        to: 'all-users',
        subject: emailForm.subject,
        message: emailForm.message,
        createdAt: Timestamp.now()
      });

      setEmailForm({
        subject: '',
        message: '',
        sending: false
      });
    } catch (error) {
      console.error('Error sending email:', error);
      setEmailForm(prev => ({ ...prev, sending: false }));
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-300">Access denied</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* User Stats Card */}
      <div className="glass-panel neon-border p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-full gradient-bg">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-sm text-gray-400">Total Users</h3>
            <p className="text-3xl font-bold gradient-text">{userStats.totalUsers}</p>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-4 gradient-text">Users by Month</h4>
          <div className="space-y-2">
            {Object.entries(userStats.usersByMonth).map(([month, count]) => (
              <div key={month} className="flex justify-between items-center p-2 glass-panel rounded">
                <span className="text-gray-300">{month}</span>
                <span className="font-medium text-purple-300">{count} users</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Email Form */}
      <div className="glass-panel neon-border p-6">
        <h2 className="text-2xl font-bold mb-6 gradient-text flex items-center">
          <Mail className="h-6 w-6 mr-2" />
          Email All Users
        </h2>
        <form onSubmit={handleSendEmail} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-1">
              Subject
            </label>
            <input
              type="text"
              value={emailForm.subject}
              onChange={(e) => setEmailForm(prev => ({ ...prev, subject: e.target.value }))}
              className="w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-200 mb-1">
              Message
            </label>
            <textarea
              value={emailForm.message}
              onChange={(e) => setEmailForm(prev => ({ ...prev, message: e.target.value }))}
              rows={6}
              className="w-full"
              required
            />
          </div>

          <button
            type="submit"
            disabled={emailForm.sending}
            className="w-full py-3 rounded-lg gradient-bg gradient-bg-hover
                     text-white font-medium transition-colors hover-glow
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {emailForm.sending ? 'Sending...' : 'Send Email'}
          </button>
        </form>
      </div>
    </div>
  );
};
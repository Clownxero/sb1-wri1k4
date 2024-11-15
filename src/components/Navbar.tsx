import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Music, ListMusic, Clock, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/signin');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  if (!currentUser) return null;

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold flex items-center gap-2">
            <Music className="h-6 w-6" />
            Band Practice Tracker
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/setlist" className="flex items-center gap-2 hover:text-purple-400 transition-colors">
              <ListMusic className="h-5 w-5" />
              Set Lists
            </Link>
            <Link to="/songs" className="flex items-center gap-2 hover:text-purple-400 transition-colors">
              <Music className="h-5 w-5" />
              Songs
            </Link>
            <Link to="/practice" className="flex items-center gap-2 hover:text-purple-400 transition-colors">
              <Clock className="h-5 w-5" />
              Practice
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 hover:text-red-400 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
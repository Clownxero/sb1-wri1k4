import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Music4, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, isAdmin, logout } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };
  
  return (
    <header className="glass-panel border-b border-purple-500/10">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="p-2 rounded-full gradient-bg">
              <Music4 className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold gradient-text">
              Band Practice Tracker
            </h1>
          </Link>
          <div className="flex items-center space-x-8">
            <nav className="hidden md:flex space-x-8">
              <Link
                to="/setlists"
                className={`text-lg transition-colors ${
                  isActive('/setlists')
                    ? 'text-purple-300'
                    : 'text-gray-300 hover:text-purple-300'
                }`}
              >
                Set Lists
              </Link>
              <Link
                to="/songs"
                className={`text-lg transition-colors ${
                  isActive('/songs')
                    ? 'text-purple-300'
                    : 'text-gray-300 hover:text-purple-300'
                }`}
              >
                Songs
              </Link>
              <Link
                to="/practice"
                className={`text-lg transition-colors ${
                  isActive('/practice')
                    ? 'text-purple-300'
                    : 'text-gray-300 hover:text-purple-300'
                }`}
              >
                Practice
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className={`text-lg transition-colors ${
                    isActive('/admin')
                      ? 'text-purple-300'
                      : 'text-gray-300 hover:text-purple-300'
                  }`}
                >
                  Admin
                </Link>
              )}
            </nav>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">{currentUser?.email}</span>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-white/5 rounded-full transition-colors"
                title="Logout"
              >
                <LogOut className="h-5 w-5 text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
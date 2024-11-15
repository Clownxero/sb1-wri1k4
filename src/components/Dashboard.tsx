import React from 'react';
import { Header } from './Header';
import { HomePage } from '../pages/HomePage';
import { SetListsPage } from '../pages/SetListsPage';
import { SongsPage } from '../pages/SongsPage';
import { PracticeHistoryPage } from '../pages/PracticeHistoryPage';
import { AdminPage } from '../pages/AdminPage';
import { Routes, Route } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/setlists" element={<SetListsPage />} />
          <Route path="/songs" element={<SongsPage />} />
          <Route path="/practice" element={<PracticeHistoryPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
    </div>
  );
};
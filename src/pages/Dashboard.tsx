import React from 'react';
import { Header } from '../components/Header';
import { HomePage } from './HomePage';
import { SetListsPage } from './SetListsPage';
import { SongsPage } from './SongsPage';
import { PracticeHistoryPage } from './PracticeHistoryPage';
import { AdminPage } from './AdminPage';
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
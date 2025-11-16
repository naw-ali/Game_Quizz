import React from 'react';
import './App.css';
import MainLayout from './layouts/MainLayout';
import { Routes, Route } from 'react-router-dom';
import { Landing } from './pages';
import { TryYourLuck } from './pages';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/try-your-luck" element={<TryYourLuck />} />
      </Routes>
    </MainLayout>
  );
}

export default App;

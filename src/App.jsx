import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import RepositoryPage from './components/RepositoryPage';
import FileBrowser from './components/FileBrowser';
import HistoryPage from './components/HistoryPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='AppContainer'>
      <div>
      <Navbar/>
      </div>
    <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/repositories/:username" element={<RepositoryPage />} />
    <Route path="/repositories/:username/:repoName" element={<FileBrowser />} />
    <Route path="/repositories/:username/:repoName/history" element={<HistoryPage />} />
  </Routes>
    </div>
  );
}

export default App;

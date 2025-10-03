import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { MusicProvider } from './context/MusicContext';
import Navbar from './components/Navbar';
import Player from './components/Player';
import LoadingSpinner from './components/LoadingSpinner';
import PageTransition from './components/PageTransition';
import Trending from './pages/Trending';


// Lazy load main pages
const Home = lazy(() => import('./pages/Home'));
const Browse = lazy(() => import('./pages/Browse'));
const Search = lazy(() => import('./pages/Search'));
const Playlists = lazy(() => import('./pages/Playlists'));

function App() {
  return (
    <Router>
      <MusicProvider>
        <div className="min-h-screen bg-black text-white flex flex-col">
          {/* Navbar */}
          <Navbar />

          {/* Main content with route animations */}
          <main className="flex-1 pb-24"> {/* padding-bottom to avoid overlap with player */}
            <Suspense fallback={<LoadingSpinner />}>
              <AnimatePresence mode="wait">
                <Routes>
                  {/* 🔥 Trending Page */}
                  <Route
                    path="/trending"
                    element={
                      <PageTransition>
                        <Trending />
                      </PageTransition>
                    }
                  />

                  {/* 🏠 Home Page */}
                  <Route
                    path="/"
                    element={
                      <PageTransition>
                        <Home />
                      </PageTransition>
                    }
                  />

                  {/* 🔎 Browse Page */}
                  <Route
                    path="/browse"
                    element={
                      <PageTransition>
                        <Browse />
                      </PageTransition>
                    }
                  />

                  {/* 🔍 Search Page */}
                  <Route
                    path="/search"
                    element={
                      <PageTransition>
                        <Search />
                      </PageTransition>
                    }
                  />

                  {/* 📁 Playlists Page */}
                  <Route
                    path="/playlists"
                    element={
                      <PageTransition>
                        <Playlists />
                      </PageTransition>
                    }
                  />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </main>

          {/* 🎶 Global Music Player */}
          <Player />
        </div>
      </MusicProvider>
    </Router>
  );
}

export default App;

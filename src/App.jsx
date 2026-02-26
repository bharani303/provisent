import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { useSmoothScroll } from './animations/useSmoothScroll';

// Lazy loading Pages for performance and code splitting
const Home = lazy(() => import('./pages/Home'));
const Programs = lazy(() => import('./pages/Programs'));
const Certificates = lazy(() => import('./pages/Certificates'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const EnrollNow = lazy(() => import('./pages/EnrollNow'));

// Premium Skeleton Page Loader
const PageLoader = () => (
  <div className="min-h-screen bg-background pt-32 px-6 flex flex-col w-full max-w-7xl mx-auto space-y-12">
    {/* Header Skeleton */}
    <div className="flex flex-col items-center justify-center space-y-6 w-full max-w-3xl mx-auto">
      <div className="w-32 h-8 rounded-full bg-cyan-500/10 animate-pulse"></div>
      <div className="w-3/4 h-16 md:h-24 rounded-2xl bg-foreground/5 animate-pulse"></div>
      <div className="w-1/2 h-6 rounded-lg bg-foreground/5 animate-pulse"></div>
    </div>

    {/* Grid Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-12">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="w-full h-[400px] rounded-[2rem] bg-card-bg border border-border flex flex-col p-6 animate-pulse">
          <div className="w-full h-48 rounded-2xl bg-foreground/5 mb-6"></div>
          <div className="w-3/4 h-8 rounded-lg bg-foreground/5 mb-4"></div>
          <div className="w-full h-4 rounded-md bg-foreground/5 mb-2"></div>
          <div className="w-5/6 h-4 rounded-md bg-foreground/5 mb-8"></div>
          <div className="mt-auto flex justify-between items-center">
            <div className="w-24 h-6 rounded-md bg-foreground/5"></div>
            <div className="w-12 h-12 rounded-full bg-foreground/5"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

function App() {
  useSmoothScroll(); // Initialize global smooth scrolling

  return (
    <Router>
      <div className="bg-background text-foreground min-h-screen selection:bg-cyan-500/30 font-sans transition-colors duration-500 ease-in-out">
        <Navbar />

        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/enroll" element={<EnrollNow />} />
          </Routes>
        </Suspense>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

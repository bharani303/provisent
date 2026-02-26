import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { useSmoothScroll } from './animations/useSmoothScroll';

// Pages
import Home from './pages/Home';
import Programs from './pages/Programs';
import Certificates from './pages/Certificates';
import About from './pages/About';
import Contact from './pages/Contact';
import EnrollNow from './pages/EnrollNow';

function App() {
  useSmoothScroll(); // Initialize global smooth scrolling

  return (
    <Router>
      <div className="bg-background text-foreground min-h-screen selection:bg-cyan-500/30 font-sans transition-colors duration-500 ease-in-out">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/enroll" element={<EnrollNow />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Hero } from './components/Hero';
import { Nav } from './components/Nav';
import { About } from './pages/About';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NetworkGraph from './components/NetworkGraphBG';

// Separate component for readability
const ReadingContent = () => <div>Reading Content</div>;

const App = () => {
  const [showMain, setShowMain] = useState(false);

  // Animation variants
  const variants = {
    hero: { open: { y: '0%' }, closed: { y: '-100%' } },
    nav: { open: { width: '15%', x: '0%' }, closed: { width: '0%', x: '-100%' } },
    main: { open: { width: '85%', x: '0%' }, closed: { width: '0%', x: '100%' } }
  };

  // Animation transition
  const transition = { duration: 0.5 };

  const handleScroll = (e: React.WheelEvent) => {
    e.preventDefault;
    // console.log(e.deltaY)
    if (e.deltaY > 10) {
      setShowMain(true);
    }
  };

  return (
    <div style={{ position: 'relative' }}>

      <NetworkGraph />
      <Router>
        <div className="App" onWheel={handleScroll} style={{ top: 0, left: 0, right: 0, bottom: 0 }}>
          <motion.div 
            className="hero-container"
            animate={showMain ? 'closed' : 'open'}
            variants={variants.hero}
            transition={transition}
            style={{ height: '100%' }}
          >
            <Hero showMain={showMain} handleShowMain={() => setShowMain(true)} />
          </motion.div>

          <motion.nav
            className="nav-section text-neutral-300"
            animate={showMain ? 'open' : 'closed'}
            variants={variants.nav}
            transition={transition}
          >
            {showMain && <Nav />}
          </motion.nav>
          
          <motion.main
            className="main-section text-neutral-200"
            animate={showMain ? 'open' : 'closed'}
            variants={variants.main}
            transition={transition}
          >
            {showMain && (
              <Routes>
                <Route index element={<About />} />
                <Route path="/reads" element={<ReadingContent />} />
              </Routes>
            )}
          </motion.main>
        </div>
      </Router>
    </div>
  );
};

export default App;

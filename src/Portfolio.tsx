import { useState, useEffect, useRef } from 'react';
import { Hero } from './components/Hero';
import { Nav } from './components/Nav';
import { About } from './pages/About';
import { Resume } from './pages/Resume';
import Misc from './pages/Misc';
import NetworkGraph from './components/NetworkGraphBG';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Portfolio: React.FC = () => {

  const [showMain, setShowMain] = useState<boolean>(false);
  const [startY, setStartY] = useState(0);
  const navRef = useRef<HTMLHeadingElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Determine whether the nav should be open
  const isNavOpen = showMain;

  
  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 10) {
      setShowMain(true);
    }
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // manually handle mobile touch scroll
  useEffect( () => {
    const handleTouchStart = (e: TouchEvent) => {
      setStartY(e.touches[0].clientY);
    };
  

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      if (currentY < startY - 10) {
        setShowMain(true);  // Scrolled down
      }
    };
    // Attach event listeners for touch events
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      // Clean up event listeners
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [startY])

  // needs to manually adjust when the menu should be set open 
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {  
        setIsMenuOpen(true);
      } else {
        setIsMenuOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    
    <div className="App">
      <div 
        className={`hero-container ${showMain ? 'closed' : 'open'}`}
        onWheel={handleScroll}
      >
        <Hero />
        <button id="scrollBtn" onClick={() => {
          setShowMain(true);
        }}>
          {/* <img src={DownChevron} alt='chevron-down' className='svg'/> */}
          <svg width="30px" height="30px" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.293 6.293a1 1 0 0 1 1.414 0L12 11.586l5.293-5.293a1 1 0 1 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6a1 1 0 0 1 0-1.414zm0 6a1 1 0 0 1 1.414 0L12 17.586l5.293-5.293a1 1 0 0 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6a1 1 0 0 1 0-1.414z" fill="#fff"/></svg>
        </button>
      </div>
      <NetworkGraph />
      <Router>
      <header className={`nav-section ${isNavOpen ? 'open' : 'closed'}`} ref={navRef}>
          { isNavOpen && <Nav isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />}
        </header>
        
        <main className={`main-section text-neutral-200 ${showMain ? 'open' : 'closed'}`}>
          {showMain && (
            <Routes>
              <Route index element={<About />} />
              <Route path='/resume' element={<Resume />} />
              <Route path='/misc' element={<Misc />} />
            </Routes>
          )}
        </main>

      </Router>
    </div>
  );
};

export default Portfolio;

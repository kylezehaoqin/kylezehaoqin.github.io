import { useState } from 'react';
import { Hero } from './components/Hero';
import { Nav } from './components/Nav';
import { About } from './pages/About';
import { Resume } from './pages/Resume';
import NetworkGraph from './components/NetworkGraphBG';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Portfolio: React.FC = () => {
  const [showMain, setShowMain] = useState<boolean>(false);
  
  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 10) {
      setShowMain(true);
    }
  };


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
          <header className={`nav-section ${showMain ? 'open' : 'closed'}`}>
            {showMain && <Nav />}
          </header>
          
          <main className={`main-section text-neutral-200 ${showMain ? 'open' : 'closed'}`}>
            {showMain && (
              <Routes>
                <Route index element={<About />} />
                <Route path='/resume' element={<Resume />} />
              </Routes>
            )}
          </main>

      </Router>
    </div>
  );
};

export default Portfolio;

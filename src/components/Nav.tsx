import { Profile } from './Profile';
import { NavItem } from './NavItem';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
interface MenuItem {
  href: string;
  name: string;
}

interface NavMenu {
  [key: string]: MenuItem;
}

interface NavProps {
  isMenuOpen: boolean;
  // isNavOpen: boolean;
  toggleMenu: () => void;
}

const navMenu: NavMenu = {
  "about": {
    "href": "/",
    "name": "About",
  },
  "resume" : {
    "href": "/resume",
    "name": "Resume / CV",
  },
  "misc" : {
    "href": "/misc",
    "name": "Misc",
  }
}

export const Nav: React.FC<NavProps> = ({ isMenuOpen, toggleMenu }) => {

  return (
    <>
      <div
        className={`text-neutral-200 hamburger-button ${isMenuOpen ? 'open' : ''}`} 
        onClick={toggleMenu}
      >
        <HamburgerMenuIcon />
      </div>
      <div className={ `menu ${isMenuOpen ? 'open' : 'closed'}`}>
          <Profile 
            name="Kyle Qin"
            title="Software Engineer"
            imageSrc="/hi-bitmoji.png"
          />
          <ul className='nav-list'>
          {
            Object.keys(navMenu).map((key) => (
              <NavItem 
                key={key}
                name={navMenu[key].name}
                href={navMenu[key].href}
                toggleMenu={toggleMenu}
              />
            ))
          }
          </ul>
        </div>


      {/* ====================================================================== */}

    </>
  )
}




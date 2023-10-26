import { Profile } from './Profile';
import { NavItem } from './NavItem';
interface MenuItem {
  href: string;
  name: string;
}

interface NavMenu {
  [key: string]: MenuItem;
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

export const Nav = () => {

  return (
    <>
      <Profile 
        name="Kyle Qin"
        title="Software Engineer"
        imageSrc="/hi-bitmoji.png"
      />
      {/* ====================================================================== */}

        <ul className='nav-list'>
        {
          Object.keys(navMenu).map((key) => (
            <NavItem 
              key={key}
              name={navMenu[key].name}
              href={navMenu[key].href}
            />
          ))
        }
        </ul>


      {/* ====================================================================== */}

    </>
  )
}




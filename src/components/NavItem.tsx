
import { Link, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
// import { useEffect, useRef } from "react";

interface NavItemProps {
  name: string,
  href: string,
}

export function NavItem({ href, name }: NavItemProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === href;
  const navItemClass = classNames('nav-item', { active: isActive });
  const linkClass = classNames({ 'a-active': isActive });


  return (
    <li
      className={navItemClass}
      onClick={(event: React.MouseEvent<HTMLLIElement>) => {
        // Prevent the event from propagating to the Link component
        event.stopPropagation();
        // Check if the target is the <li> element and not the <a> element
        if (event.target === event.currentTarget) {
          // Programmatically navigate to the desired URL
          navigate(href);
        }
      }}
    >
      <Link
        to={href}
        className={linkClass}
        onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
          // Prevent the event from propagating to the li component
          event.stopPropagation();
        }}
      >
        {name}
      </Link>
    </li>
  );
}
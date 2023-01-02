import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Props {
  links: { to: string; text: string }[];
}

const Nav = ({ links }: Props) => {
  const location = useLocation();

  return (
    <nav className="flex gap-8">
      {links.map((link) => (
        <NavElement key={link.to} to={link.to} text={link.text} isActive={location.pathname === link.to} />
      ))}
    </nav>
  );
};

export default Nav;

const NavElement = ({ isActive, to, text }: { isActive: boolean; to: string; text: string }) => {
  return (
    <Link to={to} className="relative flex items-center gap-2">
      {isActive && <div className="bg-primary-300 absolute -left-3.5 h-1.5 w-1.5 rounded-full" />}
      <p className="text-sm font-bold text-gray-100">{text}</p>
    </Link>
  );
};

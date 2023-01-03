import React from 'react';
import { useLocation } from 'react-router-dom';

type Props = {
  children: (value: { elementClicked: () => void; activeLink: string }) => React.ReactNode;
  elementClicked: () => void;
  className: string;
};

const NavWrapper = ({ className, children, elementClicked, ...props }: Props) => {
  const { pathname: activeLink } = useLocation();

  return (
    <nav className={className} {...props}>
      {children({ elementClicked, activeLink })}
    </nav>
  );
};

export default NavWrapper;

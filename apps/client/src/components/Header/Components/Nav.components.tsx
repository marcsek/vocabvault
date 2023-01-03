import Link from '@ui/Link';
import { useLocation } from 'react-router-dom';

interface Props {
  links: { to: string; text: string }[];
  className?: string;
  linkClicked?: () => void;
}

const Nav = ({ links, className, linkClicked }: Props) => {
  const location = useLocation();

  return (
    <nav className={className}>
      {links.map((link) => (
        <Link key={link.to} to={link.to} active={location.pathname === link.to} onClick={linkClicked}>
          {link.text}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;

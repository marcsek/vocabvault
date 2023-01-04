import Link from '@ui/Link';
import { useUser } from '../../../providers/UserContext.provider';
import NavWrapper from './NavWrapper';

interface Props {
  onClose?: () => void;
}

const MainLinks = ({ onClose = () => null }: Props) => {
  const { user } = useUser();

  return (
    <NavWrapper className="flex flex-col gap-8 lg:flex-row" elementClicked={onClose}>
      {({ activeLink, elementClicked }) =>
        user ? (
          <>
            <Link to="/" active={activeLink === '/'} onClick={elementClicked}>
              Dasboard
            </Link>
            <Link to="/create-datasource" active={activeLink === '/create-datasource'} onClick={elementClicked}>
              Word Sources
            </Link>
          </>
        ) : (
          <>
            <Link to="/" active={activeLink === '/'} onClick={elementClicked}>
              Home
            </Link>
            <Link to="/auth/login" active={activeLink === '/auth/login'} onClick={elementClicked}>
              Learn More
            </Link>
          </>
        )
      }
    </NavWrapper>
  );
};

export default MainLinks;

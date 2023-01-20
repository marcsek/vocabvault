import Button from '@ui/Button';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { IoMdCompass } from 'react-icons/io';
import { IoStarSharp } from 'react-icons/io5';
import { useMediaQuery } from 'usehooks-ts';
import NavWrapper from './NavWrapper';
import { useUser } from '../../../providers/UserContext.provider';

interface Props {
  onClose?: () => void;
}

const MainButtons = ({ onClose = () => null }: Props) => {
  const user = useUser();
  const isWindowMobile = useMediaQuery('(max-width: 1024px)');

  return (
    <NavWrapper className="flex w-full flex-col gap-8 lg:w-fit lg:flex-row" elementClicked={onClose}>
      {({ elementClicked }) => (
        <>
          <Button
            size={isWindowMobile ? 'medium' : 'small'}
            to={user ? '#' : '/auth/login'}
            className="w-full"
            intent="outlined"
            Icon={user ? <IoStarSharp /> : <FiLogIn />}
            onClick={elementClicked}
            as={Link}
          >
            {user ? 'Begin session' : 'Log In'}
          </Button>
          {!user && (
            <Button
              as={Link}
              size={isWindowMobile ? 'medium' : 'small'}
              Icon={<IoMdCompass />}
              onClick={elementClicked}
              to="/auth/register"
            >
              Register
            </Button>
          )}
        </>
      )}
    </NavWrapper>
  );
};

export default MainButtons;

import Link from '@ui/Link';
import ProfilePicture from '../../../../assets/ProfilePicture.png';
import { useLogout } from '../../../../queries/user';
import NavWrapper from '../NavWrapper';

interface Props {
  onClose: () => void;
  withLogout?: boolean;
}

const UserNav = ({ onClose, withLogout = false }: Props) => {
  const logout = useLogout();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-2">
        <img className="h-8 w-8" src={ProfilePicture}></img>
        <span className="font-semibold">Marek Tate</span>
      </div>
      <NavWrapper className="flex flex-col gap-8" elementClicked={onClose}>
        {({ activeLink, elementClicked }) => (
          <>
            <Link to="/session-history" active={activeLink === '/session-history'} onClick={elementClicked}>
              History
            </Link>
            <Link to="/settings" active={activeLink === '/settings'} onClick={elementClicked}>
              Settings
            </Link>
            {withLogout && (
              <Link to="#" onClick={() => logout.mutate()} active={activeLink === '/auth/login'}>
                Logout
              </Link>
            )}
          </>
        )}
      </NavWrapper>
    </div>
  );
};

export default UserNav;

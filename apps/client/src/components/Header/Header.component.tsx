import { Button } from '@ui/Button';
import Logo from '../../assets/VocabVaultLogo.svg';
import Nav from './Nav.components';
import { IoMdCompass } from 'react-icons/io';
import { FiLogIn } from 'react-icons/fi';
import useHasScrolled from './hooks/useHasScrolled';
import useWindowBreakpoint from '../../hooks/useWindowBreakpoint';

const Header = () => {
  const hasScrolled = useHasScrolled();
  const currentBreakpoint = useWindowBreakpoint();

  return (
    <header
      className={`px-17 fixed flex h-16 w-screen items-center justify-between ${
        hasScrolled && 'bg-gray-800/50 shadow-md backdrop-blur-md'
      }`}
    >
      <img src={Logo}></img>
      <div className="flex items-center gap-10">
        <Nav
          links={[
            { to: '/', text: 'Home' },
            { to: '/auth/login', text: 'Learn More' },
          ]}
        />
        <div className="h-[18px] w-[1px] bg-gray-500"></div>
        <div className="flex gap-8">
          <Button intent="outlined" Icon={<FiLogIn />}>
            Log In
          </Button>
          <Button Icon={<IoMdCompass />}>Register</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

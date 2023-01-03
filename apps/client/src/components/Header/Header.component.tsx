import { useState } from 'react';
import { Button } from '@ui/Button';
import Logo from '../../assets/VocabVaultLogo.svg';
import Nav from './Nav.components';
import { IoMdCompass } from 'react-icons/io';
import { FiLogIn } from 'react-icons/fi';
import useHasScrolled from './hooks/useHasScrolled';
import { useMediaQuery } from 'usehooks-ts';
import SidePanel from './SidePanel/SidePanel.component';
import Hamburger from './SidePanel/Hamburger';
import Divider from '@ui/Divider';
import { IoStarSharp } from 'react-icons/io5';
import ProfilePopOver from './ProfilePopOver/ProfilePopOver.component';

const Header = () => {
  const hasScrolled = useHasScrolled();
  const isWindowMobile = useMediaQuery('(max-width: 1024px)');
  const [sidePanelOpen, setSidePanelOpen] = useState(true);
  const user = false;

  return (
    <header
      className={`px-8.5 sm:px-17 fixed flex h-16 w-screen items-center justify-between ${
        hasScrolled && 'bg-gray-800/50 shadow-md backdrop-blur-md'
      }`}
    >
      <img src={Logo}></img>
      <div className="static flex items-center gap-10">
        {isWindowMobile ? (
          <>
            <Button intent="asWrapper" size="asWraper" className="!rounded-2xl p-1">
              <Hamburger handleClick={() => setSidePanelOpen((prev) => !prev)} />
              <SidePanel isOpen={sidePanelOpen} onClose={() => setSidePanelOpen(false)}></SidePanel>
            </Button>
          </>
        ) : (
          <>
            <Nav
              className="flex gap-8"
              links={
                user
                  ? [
                      { to: '/', text: 'Dashboard' },
                      { to: '/auth/login', text: 'Word Sources' },
                    ]
                  : [
                      { to: '/', text: 'Home' },
                      { to: '/auth/login', text: 'Learn More' },
                    ]
              }
            />
            <Divider className="h-5 w-[1px]" />
            <div className="flex gap-8">
              <Button intent="outlined" Icon={user ? <IoStarSharp /> : <FiLogIn />}>
                {user ? 'Begin session' : 'Log In'}
              </Button>
              {user ? <ProfilePopOver /> : <Button Icon={<IoMdCompass />}>Register</Button>}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

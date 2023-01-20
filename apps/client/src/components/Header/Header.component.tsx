import { useState } from 'react';
import Button from '@ui/Button';
import useHasScrolled from './hooks/useHasScrolled';
import { useMediaQuery } from 'usehooks-ts';
import SidePanel from './Components/SidePanel/SidePanel.component';
import Hamburger from './Components/SidePanel/Hamburger';
import Divider from '@ui/Divider';
import ProfilePopOver from './Components/ProfilePopOver/ProfilePopOver.component';

import MainLinks from './Components/MainLinks.component';
import MainButtons from './Components/MainButtons.component';
import { useUser } from '../../providers/UserContext.provider';
import Logo from './Components/Logo';

const Header = () => {
  const hasScrolled = useHasScrolled();
  const isWindowMobile = useMediaQuery('(max-width: 1024px)');
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const user = useUser();

  return (
    <header className={`fixed z-30 flex w-full justify-center ${hasScrolled && 'bg-gray-800/50 shadow-md backdrop-blur-md'}`}>
      <div className="px-8.5 max-w-8xl md:px-17 flex h-16 w-screen items-center justify-between">
        <Logo />
        <div className="static flex items-center gap-10">
          {isWindowMobile ? (
            <Button intent="asWrapper" size="asWraper" className="!rounded-2xl p-1">
              <Hamburger handleClick={() => setSidePanelOpen((prev) => !prev)} />
              <SidePanel isOpen={sidePanelOpen} onClose={() => setSidePanelOpen(false)}></SidePanel>
            </Button>
          ) : (
            <>
              <MainLinks />
              <Divider className="h-5 w-[1px]" />
              <div className="flex items-center gap-8">
                <MainButtons />
                {user && <ProfilePopOver />}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

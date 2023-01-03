import Link from '@ui/Link';
import React from 'react';
import ProfilePicture from '../../../../assets/PoriflePicture.png';
import NavWrapper from '../NavWrapper';

interface Props {
  onClose: () => void;
}

const UserNav = ({ onClose }: Props) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-2">
        <img className="h-8 w-8" src={ProfilePicture}></img>
        <span className="font-semibold">Marek Tate</span>
      </div>
      <NavWrapper className="flex flex-col gap-8" elementClicked={onClose}>
        {({ activeLink, elementClicked }) => (
          <>
            <Link to="/" active={activeLink === '/'} onClick={elementClicked}>
              Dasboard
            </Link>
            <Link to="/auth/login" active={activeLink === '/auth/login'} onClick={elementClicked}>
              Word Sources
            </Link>
          </>
        )}
      </NavWrapper>
    </div>
  );
};

export default UserNav;

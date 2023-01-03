import Link from '@ui/Link';
import React from 'react';
import LogoAsset from '../../../assets/VocabVaultLogo.svg';

const Logo = () => {
  return (
    <Link to="/">
      <img className="h-8 w-32" src={LogoAsset}></img>
    </Link>
  );
};

export default Logo;

import Link, { TUiLinkProps } from '@ui/Link';
import { lazy } from 'react';
const VocabVaultJsxLogo = lazy(() => import('../../../assets/VocabVaultJsxLogo'));

const Logo = (props: Omit<TUiLinkProps, 'to'>) => {
  return (
    <Link to="/" ariaLabel="Vocab Vault logo" {...props}>
      <VocabVaultJsxLogo />
      {/* <img className={`h-8 w-32`} src={LogoAsset}></img> */}
    </Link>
  );
};

export default Logo;

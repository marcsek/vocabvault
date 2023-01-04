import Link, { TUiLinkProps } from '@ui/Link';
import LogoAsset from '../../../assets/VocabVaultLogo.svg';

const Logo = (props: Omit<TUiLinkProps, 'to'>) => {
  return (
    <Link to="/" {...props}>
      <img className={`h-8 w-32`} src={LogoAsset}></img>
    </Link>
  );
};

export default Logo;

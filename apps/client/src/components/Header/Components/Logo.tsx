import Link, { TUiLinkProps } from '@ui/Link';
import VocabVaultJsxLogo from '../../../assets/VocabVaultJsxLogo';

const Logo = (props: Omit<TUiLinkProps, 'to'>) => {
  return (
    <Link to="/" {...props}>
      <VocabVaultJsxLogo />
      {/* <img className={`h-8 w-32`} src={LogoAsset}></img> */}
    </Link>
  );
};

export default Logo;

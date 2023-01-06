import BackgroundImage from '@ui/utils/BackgroundImage';
import Divider from '@ui/Divider';
import { Outlet } from 'react-router-dom';
import Logo from '../../components/Header/Components/Logo';
import AuthProviderPopup from './components/AuthProviderPupup';
import useProtectAuth from './hooks/useProtectAuth';

const AuthPage = () => {
  useProtectAuth();

  return (
    <>
      <div className="md:self-center">
        <div className="relative top-12 z-10 m-auto max-w-[24rem] md:top-0">
          <Outlet />
          <div className="relative mt-5 flex-col gap-5">
            <div className="flex items-center justify-center gap-4">
              <Divider className="h-[1px] w-1/3"></Divider>
              <span className="text-xs font-semibold text-gray-400">OR</span>
              <Divider className="h-[1px] w-1/3"></Divider>
            </div>
            <div className="mt-5 flex gap-3">
              <AuthProviderPopup providerName="Github" />
              <AuthProviderPopup providerName="Google" />
            </div>
          </div>
        </div>
        <BackgroundImage />
      </div>
      <Logo className="!absolute top-5 left-1/2 w-fit -translate-x-1/2 justify-center !p-0" />
    </>
  );
};

export default AuthPage;

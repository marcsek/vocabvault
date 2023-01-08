import { Outlet } from 'react-router-dom';
import Header from '../Header/Header.component';
import Toastify from './Toastify/Toastify.component';

interface Props {
  hasHeader?: boolean;
}

const Layout = ({ hasHeader = false }: Props) => {
  return (
    <div className="flex min-h-screen justify-center rounded bg-gray-800 text-gray-50">
      {hasHeader && <Header />}
      <div className="[&>*]:max-w-8xl [&>*]:px-8.5 [&>*]:md:px-17 flex w-full justify-center [&>*]:box-border [&>*]:w-full [&>*]:pb-20 [&>*]:pt-[5.5rem] md:[&>*]:pb-12 md:[&>*]:pt-24 lg:[&>*]:pt-28">
        <Outlet />
      </div>
      <Toastify />
    </div>
  );
};

export default Layout;

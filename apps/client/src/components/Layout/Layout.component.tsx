import { Outlet } from 'react-router-dom';
import Header from '../Header/Header.component';

interface Props {
  hasHeader?: boolean;
}

const Layout = ({ hasHeader = false }: Props) => {
  return (
    <div className="flex min-h-screen justify-center rounded bg-gray-800 text-gray-50">
      {hasHeader && <Header />}
      <div className="[&>*]:max-w-8xl [&>*]:px-8.5 [&>*]:md:px-17 flex w-full justify-center [&>*]:w-full [&>*]:pt-16">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex justify-center rounded py-28 text-3xl font-bold">
      <Outlet />
    </div>
  );
};

export default Layout;

import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header.component';

const Layout = () => {
  return (
    <div className="min-h-screen rounded bg-gray-800 text-gray-50">
      <Header />
      <div className="pt-16">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

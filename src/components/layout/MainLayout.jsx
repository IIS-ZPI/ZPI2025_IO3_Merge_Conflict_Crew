import React from 'react';
import Navbar from './Navbar';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <main className="container mx-auto px-4 lg:px-8 pb-[80px]">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;

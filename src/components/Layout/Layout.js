import React from 'react';
import Header from '../Header/Header';

import './Layout.css';
const Layout = ({ children }) => {
  return (
    <div>
      <Header></Header>
      <main className="main">
        <div className="container">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
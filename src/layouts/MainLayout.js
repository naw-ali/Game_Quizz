import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function MainLayout({children}){
  return (
    <div className="main-layout">
      <Header />
      <div className="page-content">{children}</div>
      <Footer />
    </div>
  );
}

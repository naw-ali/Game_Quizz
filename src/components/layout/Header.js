import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header(){
  const location = useLocation();

  return (
    <header className="site-header casino-header">
      <div className="container">
        <Link to="/" className="brand-link">
          <h2 className="brand casino-brand">🎰 Game Survey</h2>
        </Link>
      </div>
    </header>
  );
}

import React from 'react';
import './landing.css';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

export default function Landing(){
  return (
    <main className="landing-root compact">
      <section className="hero compact">
        <div className="hero-inner">
          <h1>Play. Spin. Win.</h1>
          <p className="subtitle">Take a chance — hit <strong>0</strong> to win the jackpot.</p>
          <div className="cta">
            <Link to="/try-your-luck"><Button className="primary large">Try Your Luck</Button></Link>
          </div>
        </div>
      </section>
    </main>
  );
}

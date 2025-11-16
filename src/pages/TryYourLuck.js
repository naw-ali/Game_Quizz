import React from 'react';
import LuckyWheel from '../components/ui/LuckyWheel';
import './try-your-luck.css';

export default function TryYourLuck(){
  return (
    <main className="luck-root">
      {/* Decorative corner elements */}
      <div className="corner-accent top-left"></div>
      <div className="corner-accent top-right"></div>
      <div className="corner-accent bottom-left"></div>
      <div className="corner-accent bottom-right"></div>

      {/* Animated background particles */}
      <div className="particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <section className="luck-hero">
        <div className="container">
          <div className="hero-badges">
            <span className="badge">🎰</span>
            <span className="badge">💎</span>
            <span className="badge">⭐</span>
          </div>
          <h1>LUCKY WHEEL CASINO</h1>
          <p className="subtitle">Spin to Win • Hit 0 for the Jackpot • Vegas Experience</p>
        </div>
      </section>

      <section className="luck-area">
        <div className="container">
          <LuckyWheel />
        </div>
      </section>

      {/* Footer decorations */}
      <div className="footer-strip">
        <span className="strip-text">★ BIG WINS ★ PREMIUM EXPERIENCE ★ PURE LUCK ★</span>
      </div>
    </main>
  );
}


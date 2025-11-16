import React, { useState, useRef, useEffect } from 'react';
import './luckyWheel.css';

const SEGMENTS = [0, 1, 2, 3];
const SEGMENT_DEGREE = 360 / SEGMENTS.length; // 90 degrees per segment

export default function LuckyWheel(){
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);
  const wheelRef = useRef(null);
  const rotationRef = useRef(-45); // Start with segment 0 at the pointer

  useEffect(() => {
    // Initialize wheel to show segment 0 at the pointer
    if (wheelRef.current) {
      wheelRef.current.style.setProperty('--rotation', '-45deg');
    }
  }, []);

  function spin(){
    if (spinning) return;
    setResult(null);
    setSpinning(true);

    // Pick a random segment (0, 1, 2, or 3)
    const randomSegment = Math.floor(Math.random() * SEGMENTS.length);
    const finalValue = SEGMENTS[randomSegment];

    // Calculate full spins plus rotation to land on this segment
    const spins = Math.floor(Math.random() * 3) + 5; // 5-7 full rotations
    
    // Segment position: segment i is at angle i*90, centered at i*90 + 45
    const segmentCenter = randomSegment * SEGMENT_DEGREE + (SEGMENT_DEGREE / 2);
    
    // Add random offset within the segment (±45 degrees)
    const randomOffset = (Math.random() - 0.5) * SEGMENT_DEGREE;
    const targetAngleOnWheel = segmentCenter + randomOffset;

    // Pointer is at top (angle 0 in our frame). Wheel rotates so targetAngleOnWheel ends up at top.
    // If wheel rotates by R, a point originally at angle A moves to A + R
    // We want: targetAngleOnWheel + R ≡ 0 (mod 360) => R ≡ -targetAngleOnWheel
    const rotationNeeded = -targetAngleOnWheel;

    // Total: current + full spins + delta to target
    const currentRotation = rotationRef.current;
    const totalRotation = currentRotation + (spins * 360) + rotationNeeded;

    if (wheelRef.current) {
      wheelRef.current.style.setProperty('--rotation', `${totalRotation}deg`);
    }
    rotationRef.current = totalRotation;

    // Debug info
    setDebugInfo({
      randomSegment,
      finalValue,
      segmentCenter: segmentCenter.toFixed(2),
      randomOffset: randomOffset.toFixed(2),
      targetAngleOnWheel: targetAngleOnWheel.toFixed(2),
      rotationNeeded: rotationNeeded.toFixed(2),
      currentRotation: currentRotation.toFixed(2),
      totalRotation: totalRotation.toFixed(2),
      spins
    });

    // After spin animation, show result
    const delay = 4600; // ms: matches CSS transition
    setTimeout(async () => {
      setSpinning(false);
      setResult(finalValue);

      // Confetti on jackpot
      if (finalValue === 0) {
        try {
          const confettiMod = await import('canvas-confetti');
          const confetti = confettiMod.default || confettiMod;
          confetti({ particleCount: 160, spread: 170, origin: { y: 0.35 } });
        } catch (e) {
          // canvas-confetti not installed
        }
      }
    }, delay);
  }

  return (
    <div className="wheel-wrap">
      <div className={`wheel ${spinning ? 'spinning' : ''}`} ref={wheelRef}>
        <div className="wheel-inner-ring" aria-hidden="true"></div>
        <div className="wheel-hub" aria-hidden="true"></div>
        
        {/* Render segments in order: segment 0 at 0°, segment 1 at 90°, segment 2 at 180°, segment 3 at 270° */}
        {SEGMENTS.map((value, idx) => {
          // segment start angle (0, 90, 180, 270)
          const startAngle = idx * SEGMENT_DEGREE;
          return (
            <div
              key={`seg-${value}`}
              className="wheel-segment"
              style={{ transform: `rotate(${startAngle}deg)` }}
            />
          );
        })}

        {/* Render labels as absolute children of the wheel so their positions don't get rotated by segment containers */}
        {SEGMENTS.map((value, idx) => {
          const startAngle = idx * SEGMENT_DEGREE;
          const centerAngle = startAngle + (SEGMENT_DEGREE / 2);
          const wheelSize = 420;
          const cx = wheelSize / 2;
          const cy = wheelSize / 2;
          const radius = 150; // tuned distance from center to place labels (px)
          const rad = (centerAngle) * (Math.PI / 180);
          const x = cx + radius * Math.sin(rad);
          const y = cy - radius * Math.cos(rad);

          return (
            <span
              key={`label-${value}`}
              className="seg-label"
              style={{ left: `${x}px`, top: `${y}px` }}
            >
              {value}
            </span>
          );
        })}
      </div>

      <div className="pointer">
        <div className="pointer-arrow"></div>
        <div className="pointer-value">{spinning ? '...' : (result !== null ? result : '')}</div>
      </div>

      <div className="controls">
        <button className="primary" onClick={spin} disabled={spinning}>Spin</button>
      </div>

      {result !== null && (
        <div className="result">
          {result === 0 ? (
            <div className="jackpot">Jackpot! You landed on 0 🎉</div>
          ) : (
            <div className="try">You got: {result}. Try again!</div>
          )}
        </div>
      )}

      {debugInfo && (
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: 'rgba(0,0,0,0.7)',
          color: '#ffd64d',
          borderRadius: '8px',
          fontSize: '0.85rem',
          fontFamily: 'monospace',
          textAlign: 'left',
          maxWidth: '400px',
          margin: '2rem auto'
        }}>
          <div><strong>DEBUG INFO:</strong></div>
          <div>Random Segment: {debugInfo.randomSegment}</div>
          <div>Final Value: {debugInfo.finalValue}</div>
          <div>Segment Center: {debugInfo.segmentCenter}°</div>
          <div>Random Offset: {debugInfo.randomOffset}°</div>
          <div>Target Angle: {debugInfo.targetAngleOnWheel}°</div>
          <div>Rotation Needed: {debugInfo.rotationNeeded}°</div>
          <div>Current Rotation: {debugInfo.currentRotation}°</div>
          <div>Total Rotation: {debugInfo.totalRotation}°</div>
          <div>Full Spins: {debugInfo.spins}</div>
          <div>Total Mod 360: {(parseFloat(debugInfo.totalRotation) % 360).toFixed(2)}°</div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import VoltageGauge from './dashboard/VoltageGauge';
import { analyzeGrid } from './logic/SignatureAnalysis';

function App() {
  const [current, setCurrent] = useState(20);
  const voltage = 230; 
  const data = analyzeGrid(voltage, current);

  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
      
      {data.isSheddingRequired && (
        <div style={{ position: 'fixed', top: 20, right: 20, backgroundColor: '#ff4d4d', padding: '20px', borderRadius: '10px', border: '2px solid white', zIndex: 100 }}>
          <strong>⚠️ SHEDDING ACTIVE:</strong> Canteen & Hall loads cut.
        </div>
      )}

      <h1 style={{ letterSpacing: '2px' }}>VOLTGUARD <span style={{ color: '#00ff88' }}>AI</span></h1>
      <p style={{ color: '#666' }}>Digital Twin: Aravali College of Engineering</p>

      <div style={{ display: 'flex', gap: '60px', marginTop: '60px', justifyContent: 'center' }}>
        <VoltageGauge value={voltage} label="GRID VOLTAGE" min={180} max={260} unit="V" />
        <VoltageGauge value={current} label="CURRENT DRAW" min={0} max={100} unit="A" />
      </div>

      <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <div style={{ backgroundColor: '#111', padding: '30px', borderRadius: '15px', width: '300px', borderLeft: `10px solid ${data.statusColor}` }}>
          <h3>Grid Health: {data.health}%</h3>
          <p><strong>Load:</strong> {data.power} kW</p>
          <p><strong>Signature:</strong> {data.signatureType}</p>
          <p style={{ color: '#888', fontSize: '14px' }}>{data.loadDescription}</p>
        </div>
      </div>

      <div style={{ marginTop: '80px', textAlign: 'center', borderTop: '1px solid #222', paddingTop: '20px' }}>
        <label>Simulate Potentiometer (Current): </label>
        <input type="range" min="0" max="100" value={current} onChange={(e) => setCurrent(parseInt(e.target.value))} />
        <span style={{ marginLeft: '10px', color: '#00ff88' }}>{current}A</span>
      </div>
    </div>
  );
}

export default App;

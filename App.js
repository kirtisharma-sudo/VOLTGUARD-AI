import React, { useState, useEffect } from 'react';
import VoltageGauge from './dashboard/VoltageGauge';
import SheddingAlert from './dashboard/SheddingAlert';
import { analyzeGrid } from './logic/SignatureAnalysis';

function App() {
  // 1. State Management
  // In a final setup, 'current' would be mapped from your Potentiometer via Serial/WebSockets
  const [voltage, setVoltage] = useState(230); 
  const [current, setCurrent] = useState(15); 
  const [isAutoTest, setIsAutoTest] = useState(false);

  // 2. Run the VoltGuard Logic Engine
  const gridData = analyzeGrid(voltage, current);

  // 3. Optional: Auto-Simulation for the Pitch
  // This makes the dials move slightly so the dashboard looks "alive" during the talk
  useEffect(() => {
    let interval;
    if (isAutoTest) {
      interval = setInterval(() => {
        const jitter = Math.floor(Math.random() * 3) - 1;
        setCurrent(prev => Math.max(5, Math.min(95, prev + jitter)));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAutoTest]);

  return (
    <div style={styles.dashboard}>
      {/* --- TOP ALERT LAYER --- */}
      <SheddingAlert 
        active={gridData.isSheddingRequired} 
        prioritySector="Canteen & Outer Campus Lighting" 
      />

      {/* --- HEADER --- */}
      <header style={styles.header}>
        <div style={styles.logoArea}>
          <h1 style={styles.title}>VOLTGUARD <span style={styles.accent}>AI</span></h1>
          <p style={styles.subtitle}>Digital Twin: Aravali College of Engineering & Management</p>
        </div>
        <div style={styles.statusBadge(gridData.statusColor)}>
          SYSTEM: {gridData.isSheddingRequired ? "GUARD ACTIVE" : "STABLE"}
        </div>
      </header>

      {/* --- MAIN TELEMETRY SECTION --- */}
      <main style={styles.main}>
        <div style={styles.gaugeGrid}>
          <VoltageGauge 
            value={voltage} 
            label="Grid Voltage" 
            min={180} max={260} unit="V" 
          />
          <VoltageGauge 
            value={current} 
            label="Total Line Current" 
            min={0} max={100} unit="A" 
          />
        </div>

        {/* --- ANALYSIS PANEL --- */}
        <div style={styles.analysisPanel}>
          <div style={styles.card(gridData.statusColor)}>
            <h3>Real-Time Analysis</h3>
            <div style={styles.dataRow}>
              <span>Estimated Load:</span>
              <strong>{gridData.power} kW</strong>
            </div>
            <div style={styles.dataRow}>
              <span>Grid Health:</span>
              <strong style={{color: gridData.statusColor}}>{gridData.health}%</strong>
            </div>
            <div style={styles.dataRow}>
              <span>Signature:</span>
              <strong>{gridData.signatureType}</strong>
            </div>
            <hr style={styles.hr} />
            <p style={styles.description}>{gridData.loadDescription}</p>
          </div>

          {/* --- SECTOR PRIORITY LIST --- */}
          <div style={styles.sectorCard}>
            <h3>Campus Priority Matrix</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>🏛️ Admin & Computer Labs <span style={styles.highP}>CRITICAL</span></li>
              <li style={styles.listItem}>🧪 Science & Mech Labs <span style={styles.highP}>CRITICAL</span></li>
              <li style={styles.listItem}>🏠 Student Hostels <span style={styles.medP}>ESSENTIAL</span></li>
              <li style={styles.listItem(gridData.isSheddingRequired)}>⛲ Canteen & Fountains <span style={styles.lowP}>SHEDDABLE</span></li>
            </ul>
          </div>
        </div>
      </main>

      {/* --- CONTROL FOOTER (For the Demo) --- */}
      <footer style={styles.footer}>
        <div style={styles.controlGroup}>
          <label>Manual Grid Stress Test (Potentiometer Simulation): </label>
          <input 
            type="range" min="0" max="100" value={current} 
            onChange={(e) => setCurrent(parseInt(e.target.value))}
            style={styles.slider}
          />
          <span style={styles.sliderVal}>{current} A</span>
        </div>
        <button 
          onClick={() => setIsAutoTest(!isAutoTest)}
          style={styles.btn(isAutoTest)}
        >
          {isAutoTest ? "STOP LIVE FEED" : "START LIVE FEED"}
        </button>
      </footer>
    </div>
  );
}

// --- STYLING (Dark Industrial Theme) ---
const styles = {
  dashboard: { backgroundColor: '#0f0f0f', color: '#e0e0e0', minHeight: '100vh', padding: '20px', fontFamily: 'Inter, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333', paddingBottom: '20px' },
  title: { margin: 0, fontSize: '28px', letterSpacing: '2px' },
  accent: { color: '#00ff88' },
  subtitle: { margin: 0, color: '#888', fontSize: '14px' },
  statusBadge: (color) => ({ backgroundColor: color, color: '#000', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold', fontSize: '12px' }),
  main: { marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '30px' },
  gaugeGrid: { display: 'flex', justifyContent: 'center', gap: '80px', flexWrap: 'wrap' },
  analysisPanel: { display: 'flex', gap: '20px', justifyContent: 'center' },
  card: (color) => ({ backgroundColor: '#1a1a1a', padding: '25px', borderRadius: '15px', borderLeft: `8px solid ${color}`, width: '350px' }),
  sectorCard: { backgroundColor: '#1a1a1a', padding: '25px', borderRadius: '15px', width: '350px' },
  dataRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px' },
  description: { fontStyle: 'italic', color: '#aaa', fontSize: '13px' },
  hr: { borderColor: '#333', margin: '15px 0' },
  list: { listStyle: 'none', padding: 0 },
  listItem: (isShed) => ({ padding: '10px 0', borderBottom: '1px solid #222', fontSize: '14px', opacity: isShed ? 0.3 : 1, textDecoration: isShed ? 'line-through' : 'none' }),
  highP: { color: '#00ff88', float: 'right', fontSize: '10px', fontWeight: 'bold' },
  medP: { color: '#ffcc00', float: 'right', fontSize: '10px', fontWeight: 'bold' },
  lowP: { color: '#ff4d4d', float: 'right', fontSize: '10px', fontWeight: 'bold' },
  footer: { marginTop: '50px', borderTop: '1px solid #333', paddingTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  slider: { width: '300px', cursor: 'pointer', margin: '0 15px' },
  sliderVal: { fontWeight: 'bold', color: '#00ff88' },
  btn: (active) => ({ backgroundColor: active ? '#ff4d4d' : '#00ff88', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' })
};

export default App;

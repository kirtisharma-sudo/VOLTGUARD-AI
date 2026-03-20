import React from 'react';

const SheddingAlert = ({ active, prioritySector }) => {
  if (!active) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.alertBox}>
        <div style={styles.icon}>⚠️</div>
        <div style={styles.content}>
          <h2 style={styles.title}>AUTONOMOUS GUARD ACTIVE</h2>
          <p style={styles.text}>
            Grid Health Critical. Surgical load shedding initiated to protect 
            <strong> Aravali Main Transformer</strong>.
          </p>
          <div style={styles.sectorBadge}>
            SHEDDING: {prioritySector || "Non-Essential Buffers"}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed', top: '20px', right: '20px', zIndex: 1000,
    animation: 'slideIn 0.5s ease-out'
  },
  alertBox: {
    backgroundColor: 'rgba(255, 77, 77, 0.95)', color: '#fff',
    padding: '20px', borderRadius: '12px', display: 'flex', alignItems: 'center',
    boxShadow: '0 8px 32px rgba(0,0,0,0.5)', border: '2px solid #ff4d4d'
  },
  icon: { fontSize: '40px', marginRight: '20px' },
  title: { margin: '0 0 5px 0', fontSize: '18px', letterSpacing: '1px' },
  text: { margin: 0, fontSize: '14px', opacity: 0.9 },
  sectorBadge: {
    marginTop: '10px', display: 'inline-block', backgroundColor: '#fff',
    color: '#ff4d4d', padding: '4px 10px', borderRadius: '4px',
    fontWeight: 'bold', fontSize: '12px'
  }
};

export default SheddingAlert;

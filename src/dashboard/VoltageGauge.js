import React from 'react';

const VoltageGauge = ({ value, label, min = 0, max = 240, unit = "V" }) => {
  // Calculate the rotation of the needle (from -90deg to 90deg)
  const percentage = (value - min) / (max - min);
  const rotation = (percentage * 180) - 90;

  // Change color based on "Grid Health"
  const getColor = () => {
    if (value > max * 0.9) return "#ff4d4d"; // Red for Overload
    if (value < min + 20) return "#ffcc00"; // Yellow for Low
    return "#00ff88"; // Green for Healthy
  };

  return (
    <div style={styles.container}>
      <div style={styles.gaugeOuter}>
        {/* The Semi-Circle Arch */}
        <div style={{ ...styles.arch, borderBottomColor: getColor() }}></div>
        
        {/* The Needle */}
        <div style={{ 
          ...styles.needle, 
          transform: `translateX(-50%) rotate(${rotation}deg)`,
          backgroundColor: getColor() 
        }}></div>
        
        {/* The Center Point */}
        <div style={styles.centerPoint}></div>
      </div>
      
      <div style={styles.labelContainer}>
        <span style={styles.valueText}>{value}{unit}</span>
        <span style={styles.labelText}>{label}</span>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px' },
  gaugeOuter: { position: 'relative', width: '150px', height: '75px', overflow: 'hidden' },
  arch: {
    width: '150px', height: '150px', border: '15px solid #333',
    borderRadius: '50%', borderBottomColor: '#00ff88', boxSizing: 'border-box'
  },
  needle: {
    position: 'absolute', bottom: '0', left: '50%', width: '4px', height: '60px',
    borderRadius: '2px', transformOrigin: 'bottom center', transition: 'transform 0.5s ease-out'
  },
  centerPoint: {
    position: 'absolute', bottom: '-5px', left: '50%', transform: 'translateX(-50%)',
    width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#fff', zIndex: 2
  },
  labelContainer: { textAlign: 'center', marginTop: '10px' },
  valueText: { fontSize: '24px', fontWeight: 'bold', color: '#fff', display: 'block' },
  labelText: { fontSize: '14px', color: '#aaa', textTransform: 'uppercase' }
};

export default VoltageGauge;

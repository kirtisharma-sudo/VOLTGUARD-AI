import VoltageGauge from './VoltageGauge';

function App() {
  // These values would come from your Potentiometer logic
  const currentVoltage = 230; 
  const currentAmps = 45;

  return (
    <div style={{ backgroundColor: '#121212', height: '100vh', padding: '40px' }}>
      <h1 style={{ color: '#fff' }}>Aravali College Digital Twin</h1>
      
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <VoltageGauge value={currentVoltage} label="Phase Voltage" max={250} unit="V" />
        <VoltageGauge value={currentAmps} label="Line Current" max={100} unit="A" />
      </div>
    </div>
  );
}

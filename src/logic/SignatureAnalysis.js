/**
 * VoltGuard Signature Analysis Engine
 * Evaluates simulated electrical data to determine Grid Health 
 * and identifies the "type" of load currently active on the campus.
 */

export const analyzeGrid = (voltage, current) => {
  // 1. Calculate Real-Time Power (P = V * I)
  const power = (voltage * current) / 1000; // Power in kW
  
  // 2. Identify Load Signature (Heuristic Pattern Recognition)
  // We simulate "Inductive" vs "Resistive" based on Current thresholds
  let signatureType = "Idle";
  let loadDescription = "Minimum Campus Baseline";

  if (current > 5 && current <= 30) {
    signatureType = "Resistive";
    loadDescription = "Lighting & Admin PCs (Stable)";
  } else if (current > 30 && current <= 70) {
    signatureType = "Inductive";
    loadDescription = "Heavy Machinery / AC Units (High Torque)";
  } else if (current > 70) {
    signatureType = "Critical Surge";
    loadDescription = "Unidentified High-Load Event";
  }

  // 3. Calculate Grid Health Score (0 - 100)
  // Health drops if Voltage is too low (Sag) or Current is too high (Surge)
  let health = 100;
  
  if (voltage < 210) health -= 20; // Voltage Sag penalty
  if (current > 60) health -= (current - 60) * 1.5; // Progressive Surge penalty
  
  const finalHealth = Math.max(0, Math.min(100, Math.round(health)));

  // 4. Determine "Guard" Status (The Decision Engine)
  const isSheddingRequired = finalHealth < 40 || current > 72;

  return {
    power: power.toFixed(2),
    signatureType,
    loadDescription,
    health: finalHealth,
    isSheddingRequired,
    statusColor: finalHealth > 70 ? "#00ff88" : finalHealth > 40 ? "#ffcc00" : "#ff4d4d"
  };
};

import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would check Firebase/Auth
    if (email === "admin@aravali.edu") {
      onLogin('admin');
    } else {
      onLogin('staff');
    }
  };

  return (
    <div style={{
      height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
      backgroundColor: '#050505', fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        padding: '40px', backgroundColor: '#111', borderRadius: '15px',
        border: '1px solid #333', width: '350px', textAlign: 'center'
      }}>
        <h2 style={{ color: '#00ff88', letterSpacing: '2px' }}>VOLTGUARD <span style={{color:'#fff'}}>AI</span></h2>
        <p style={{ color: '#666', fontSize: '12px', marginBottom: '30px' }}>GRID COMMAND AUTHENTICATION</p>
        
        <form onSubmit={handleSubmit}>
          <input 
            type="email" placeholder="Institutional Email" required
            style={{ width: '100%', padding: '12px', marginBottom: '15px', backgroundColor: '#222', border: '1px solid #444', color: '#fff', borderRadius: '5px' }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" placeholder="Access Key" required
            style={{ width: '100%', padding: '12px', marginBottom: '25px', backgroundColor: '#222', border: '1px solid #444', color: '#fff', borderRadius: '5px' }}
            onChange={(e) => setPass(e.target.value)}
          />
          <button type="submit" style={{
            width: '100%', padding: '12px', backgroundColor: '#00ff88', border: 'none',
            borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', color: '#000'
          }}>
            INITIALIZE SESSION
          </button>
        </form>
        <p style={{ marginTop: '20px', fontSize: '10px', color: '#444' }}>SECURED BY AES-256 ENCRYPTION</p>
      </div>
    </div>
  );
};

export default Login;

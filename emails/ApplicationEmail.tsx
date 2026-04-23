import * as React from 'react';

interface ApplicationEmailProps {
  name: string;
}

/**
 * High-end, minimalist email template for application confirmation.
 * Designed with inline styles for maximum compatibility.
 */
export const ApplicationEmail: React.FC<ApplicationEmailProps> = ({ name }) => (
  <div style={{
    fontFamily: 'Helvetica, Arial, sans-serif',
    backgroundColor: '#ffffff',
    padding: '60px 40px',
    color: '#000000',
    maxWidth: '600px',
    margin: '0 auto',
    border: '1px solid #f0f0f0'
  }}>
    <div style={{ marginBottom: '40px' }}>
      <span style={{ fontSize: '10px', letterSpacing: '0.5em', color: '#F3D7A7', fontWeight: 'bold', textTransform: 'uppercase' }}>
        Blade Media
      </span>
    </div>
    
    <h1 style={{ fontSize: '32px', fontWeight: '900', letterSpacing: '-0.04em', lineHeight: '1', marginBottom: '24px', textTransform: 'uppercase' }}>
      Transmission <br /> Secured.
    </h1>
    
    <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#444', marginBottom: '32px' }}>
      Hello {name}, <br /><br />
      Your application to join the Blade Media ecosystem has been successfully encrypted and logged. 
      We are currently analyzing your profile to ensure alignment with our high-velocity growth systems.
    </p>
    
    <div style={{ padding: '32px', backgroundColor: '#fafafa', border: '1px solid #eeeeee', marginBottom: '32px' }}>
      <h2 style={{ fontSize: '12px', fontWeight: 'bold', color: '#000', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
        Protocol Status
      </h2>
      <ul style={{ paddingLeft: '16px', margin: '0', color: '#666', fontSize: '14px', lineHeight: '1.8' }}>
        <li>Phase 1: Initial Vetting (In Progress)</li>
        <li>Phase 2: Narrative Audit</li>
        <li>Phase 3: Strategic Call (If Qualified)</li>
      </ul>
    </div>
    
    <p style={{ fontSize: '14px', color: '#888', marginBottom: '0' }}>
      Growth, Engineered.
    </p>
    <p style={{ fontSize: '12px', color: '#aaa', marginTop: '8px' }}>
      © 2026 Blade Media. All rights reserved.
    </p>
  </div>
);

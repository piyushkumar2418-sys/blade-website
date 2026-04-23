import * as React from 'react';

interface ApplicationEmailProps {
  name: string;
}

/**
 * Blade Media "Obsidian Archive" Email Template
 * Elite, architectural, and minimal dark-mode design.
 */
export const ApplicationEmail: React.FC<ApplicationEmailProps> = ({ name }) => (
  <div style={{
    fontFamily: '"Times New Roman", Times, serif',
    backgroundColor: '#000000',
    padding: '80px 40px',
    color: '#ffffff',
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'left'
  }}>
    {/* Institutional Header */}
    <div style={{ marginBottom: '60px', borderBottom: '1px solid rgba(243, 215, 167, 0.2)', paddingBottom: '20px' }}>
      <span style={{ 
        fontSize: '11px', 
        letterSpacing: '0.6em', 
        color: '#F3D7A7', 
        fontWeight: 'bold', 
        textTransform: 'uppercase',
        display: 'block',
        marginBottom: '4px'
      }}>
        Blade Media
      </span>
      <span style={{ 
        fontSize: '9px', 
        letterSpacing: '0.3em', 
        color: 'rgba(255, 255, 255, 0.3)', 
        textTransform: 'uppercase'
      }}>
        Institutional Entry // May 2026 Batch
      </span>
    </div>
    
    {/* Primary Headline */}
    <div style={{ marginBottom: '40px' }}>
      <span style={{ 
        fontSize: '10px', 
        letterSpacing: '0.4em', 
        color: 'rgba(255, 255, 255, 0.4)', 
        textTransform: 'uppercase',
        display: 'block',
        marginBottom: '12px'
      }}>
        Phase 01 Complete
      </span>
      <h1 style={{ 
        fontSize: '48px', 
        fontWeight: 'normal', 
        letterSpacing: '-0.05em', 
        lineHeight: '0.9', 
        margin: '0',
        textTransform: 'uppercase',
        color: '#ffffff'
      }}>
        Admission <br /> Received.
      </h1>
    </div>
    
    {/* Body Copy */}
    <div style={{ marginBottom: '60px' }}>
      <p style={{ 
        fontSize: '15px', 
        lineHeight: '1.8', 
        color: 'rgba(255, 255, 255, 0.7)', 
        fontWeight: '300',
        maxWidth: '450px'
      }}>
        {name}, <br /><br />
        Your admission portfolio has been received by our internal architects. We are currently evaluating your intent, commitment density, and alignment with the Inner Circle curriculum.
      </p>
      <p style={{ 
        fontSize: '15px', 
        lineHeight: '1.8', 
        color: 'rgba(255, 255, 255, 0.7)', 
        fontWeight: '300',
        marginTop: '20px'
      }}>
        Expect a formal response regarding your status within the next 48 hours.
      </p>
    </div>
    
    {/* Protocol Status Box */}
    <div style={{ 
      padding: '40px', 
      border: '1px solid rgba(243, 215, 167, 0.15)', 
      backgroundColor: 'rgba(255, 255, 255, 0.02)',
      marginBottom: '60px'
    }}>
      <h2 style={{ 
        fontSize: '10px', 
        fontWeight: 'bold', 
        color: '#F3D7A7', 
        textTransform: 'uppercase', 
        letterSpacing: '0.4em', 
        marginBottom: '24px',
        borderBottom: '1px solid rgba(243, 215, 167, 0.1)',
        paddingBottom: '12px'
      }}>
        Vetting Protocol
      </h2>
      <div>
        <div style={{ marginBottom: '16px' }}>
          <span style={{ fontSize: '11px', color: '#ffffff', display: 'block' }}>01. PORTFOLIO AUDIT</span>
          <span style={{ fontSize: '10px', color: '#F3D7A7', textTransform: 'uppercase' }}>[ IN PROGRESS ]</span>
        </div>
        <div style={{ marginBottom: '16px', opacity: '0.3' }}>
          <span style={{ fontSize: '11px', color: '#ffffff', display: 'block' }}>02. COMMITMENT DENSITY CHECK</span>
          <span style={{ fontSize: '10px', color: '#ffffff', textTransform: 'uppercase' }}>[ PENDING ]</span>
        </div>
        <div style={{ opacity: '0.3' }}>
          <span style={{ fontSize: '11px', color: '#ffffff', display: 'block' }}>03. FINAL ADMISSION STATUS</span>
          <span style={{ fontSize: '10px', color: '#ffffff', textTransform: 'uppercase' }}>[ PENDING ]</span>
        </div>
      </div>
    </div>
    
    {/* Footer */}
    <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '30px' }}>
      <p style={{ 
        fontSize: '12px', 
        color: 'rgba(255, 255, 255, 0.3)', 
        letterSpacing: '0.3em', 
        textTransform: 'uppercase',
        margin: '0'
      }}>
        Growth, Engineered.
      </p>
      <p style={{ 
        fontSize: '10px', 
        color: 'rgba(255, 255, 255, 0.15)', 
        marginTop: '12px',
        letterSpacing: '0.1em'
      }}>
        Blade Media Institutional Archive // Encryption Level 4
      </p>
    </div>
  </div>
);

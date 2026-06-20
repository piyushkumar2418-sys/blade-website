import * as React from 'react';

interface WaitlistEmailProps {
  name: string;
  waitlistKey: string;
}

export const WaitlistEmail: React.FC<WaitlistEmailProps> = ({ name, waitlistKey }) => (
  <div style={{
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: '#030303',
    padding: '80px 40px',
    color: '#ffffff',
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'left',
    border: '1px solid rgba(243, 215, 167, 0.1)',
    borderRadius: '16px'
  }}>
    {/* Header logo */}
    <div style={{ marginBottom: '60px' }}>
      <img 
        src="https://blademedia.in/inner-circle-logo.png" 
        alt="Blade Inner Circle" 
        style={{ width: '80px', height: 'auto', marginBottom: '20px' }} 
      />
      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '20px' }}>
        <span style={{ 
          fontSize: '10px', 
          letterSpacing: '0.4em', 
          color: '#F3D7A7', 
          fontWeight: 'bold', 
          textTransform: 'uppercase'
        }}>
          Cohort 02 — August 2026 Waitlist
        </span>
      </div>
    </div>
    
    {/* Body */}
    <div style={{ marginBottom: '60px' }}>
      <h1 style={{ 
        fontSize: '32px', 
        fontWeight: 'bold', 
        letterSpacing: '-0.02em', 
        lineHeight: '1.2', 
        margin: '0 0 24px 0',
        color: '#ffffff'
      }}>
        Waitlist Key: Verified.
      </h1>
      <p style={{ 
        fontSize: '15px', 
        lineHeight: '1.6', 
        color: 'rgba(255, 255, 255, 0.7)', 
        margin: '0 0 20px 0'
      }}>
        Hi {name},
      </p>
      <p style={{ 
        fontSize: '15px', 
        lineHeight: '1.6', 
        color: 'rgba(255, 255, 255, 0.7)', 
        margin: '0 0 24px 0'
      }}>
        We have successfully logged your request for early access to the Blade Inner Circle August 2026 intake.
      </p>
      
      {/* Priority key container */}
      <div style={{
        backgroundColor: '#0a0a0a',
        border: '1px solid rgba(243, 215, 167, 0.15)',
        borderRadius: '12px',
        padding: '24px',
        margin: '32px 0',
        textAlign: 'center'
      }}>
        <span style={{
          fontSize: '9px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '0.3em',
          color: 'rgba(255, 255, 255, 0.3)',
          display: 'block',
          marginBottom: '8px'
        }}>
          Your Priority Access Code
        </span>
        <span style={{
          fontSize: '22px',
          fontFamily: 'monospace',
          fontWeight: 'bold',
          letterSpacing: '0.15em',
          color: '#F3D7A7',
          textTransform: 'uppercase'
        }}>
          {waitlistKey}
        </span>
      </div>
      
      <p style={{ 
        fontSize: '15px', 
        lineHeight: '1.6', 
        color: 'rgba(255, 255, 255, 0.7)', 
        margin: '0 0 20px 0'
      }}>
        When the application period opens in July, waitlisted applicants will receive exclusive 24-hour early access to complete their admission portfolios before public release.
      </p>
      <p style={{ 
        fontSize: '15px', 
        lineHeight: '1.6', 
        color: 'rgba(255, 255, 255, 0.7)'
      }}>
        If you have any questions or would like to share additional work in the meantime, feel free to reply directly to this briefing.
      </p>
    </div>
    
    {/* Footer */}
    <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '30px' }}>
      <p style={{ 
        fontSize: '13px', 
        color: '#F3D7A7', 
        fontWeight: 'bold',
        margin: '0'
      }}>
        Blade Media.
      </p>
      <p style={{ 
        fontSize: '11px', 
        color: 'rgba(255, 255, 255, 0.3)', 
        marginTop: '8px',
        letterSpacing: '0.05em'
      }}>
        Stop Consuming. Start Operating.
      </p>
    </div>
  </div>
);

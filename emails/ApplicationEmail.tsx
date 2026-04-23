import * as React from 'react';

interface ApplicationEmailProps {
  name: string;
}

/**
 * Blade Media "Inner Circle" Human-Centric Template
 * Clean, personal, and premium.
 */
export const ApplicationEmail: React.FC<ApplicationEmailProps> = ({ name }) => (
  <div style={{
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: '#000000',
    padding: '80px 40px',
    color: '#ffffff',
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'left'
  }}>
    {/* Minimalist Logo Header */}
    <div style={{ marginBottom: '60px' }}>
      <img 
        src="https://blademedia.in/inner-circle-logo.png" 
        alt="Blade Inner Circle" 
        style={{ width: '80px', height: 'auto', marginBottom: '20px' }} 
      />
      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '20px' }}>
        <span style={{ 
          fontSize: '11px', 
          letterSpacing: '0.4em', 
          color: '#F3D7A7', 
          fontWeight: 'bold', 
          textTransform: 'uppercase'
        }}>
          Cohort 01
        </span>
      </div>
    </div>
    
    {/* Human Message */}
    <div style={{ marginBottom: '60px' }}>
      <h1 style={{ 
        fontSize: '32px', 
        fontWeight: 'bold', 
        letterSpacing: '-0.02em', 
        lineHeight: '1.2', 
        margin: '0 0 24px 0',
        color: '#ffffff'
      }}>
        We've received your application.
      </h1>
      <p style={{ 
        fontSize: '16px', 
        lineHeight: '1.6', 
        color: 'rgba(255, 255, 255, 0.8)', 
        fontWeight: '400',
        margin: '0 0 20px 0'
      }}>
        Hi {name},
      </p>
      <p style={{ 
        fontSize: '16px', 
        lineHeight: '1.6', 
        color: 'rgba(255, 255, 255, 0.8)', 
        fontWeight: '400',
        margin: '0 0 20px 0'
      }}>
        Thank you for sharing your portfolio with us. Our team is currently reviewing your work and intent to ensure a perfect fit for the upcoming cohort. 
      </p>
      <p style={{ 
        fontSize: '16px', 
        lineHeight: '1.6', 
        color: 'rgba(255, 255, 255, 0.8)', 
        fontWeight: '400'
      }}>
        We value the effort you've put into this submission. You can expect a personal response from us within the next 48 hours.
      </p>
    </div>
    
    {/* Simple Status Track */}
    <div style={{ 
      padding: '30px', 
      border: '1px solid rgba(255, 255, 255, 0.1)', 
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      marginBottom: '60px',
      borderRadius: '12px'
    }}>
      <div style={{ marginBottom: '20px' }}>
        <span style={{ fontSize: '12px', color: '#ffffff', display: 'block', fontWeight: 'bold' }}>Application Review</span>
        <span style={{ fontSize: '10px', color: '#F3D7A7', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Currently in progress</span>
      </div>
      <div style={{ opacity: '0.3' }}>
        <span style={{ fontSize: '12px', color: '#ffffff', display: 'block', fontWeight: 'bold' }}>Final Selection</span>
        <span style={{ fontSize: '10px', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Awaiting review</span>
      </div>
    </div>
    
    {/* Clean Footer */}
    <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '30px' }}>
      <p style={{ 
        fontSize: '14px', 
        color: '#F3D7A7', 
        fontWeight: 'bold',
        margin: '0'
      }}>
        Blade Media.
      </p>
      <p style={{ 
        fontSize: '12px', 
        color: 'rgba(255, 255, 255, 0.4)', 
        marginTop: '8px'
      }}>
        Helping elite builders scale.
      </p>
    </div>
  </div>
);

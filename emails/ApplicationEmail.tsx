import * as React from 'react';

interface ApplicationEmailProps {
  name: string;
}

/**
 * Blade Media "Inner Circle" Journey Template
 * Architectural progress tracking and human-centric copy.
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
          Cohort 01 — May 2026
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
        We've received your portfolio.
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
        Thank you for sharing your work with us. Every application for Cohort 01 is reviewed personally by our team to ensure we’re building the right environment for everyone involved.
      </p>
      <p style={{ 
        fontSize: '16px', 
        lineHeight: '1.6', 
        color: 'rgba(255, 255, 255, 0.8)', 
        fontWeight: '400'
      }}>
        We've officially started your admission journey. You can expect to hear from us regarding the next steps within the next 48 hours.
      </p>
    </div>
    
    {/* Admission Protocol Journey */}
    <div style={{ marginBottom: '80px', padding: '0 10px' }}>
      <p style={{ 
        fontSize: '10px', 
        fontWeight: 'bold', 
        textTransform: 'uppercase', 
        letterSpacing: '0.4em', 
        color: 'rgba(255, 255, 255, 0.3)',
        marginBottom: '40px',
        textAlign: 'center'
      }}>
        Admission Journey
      </p>
      
      <div style={{ position: 'relative', textAlign: 'center' }}>
        {/* Connecting Line */}
        <div style={{ 
          position: 'absolute', 
          top: '16px', 
          left: '12.5%', 
          right: '12.5%', 
          height: '1px', 
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          zIndex: 0
        }}></div>

        <table style={{ width: '100%', borderCollapse: 'collapse', position: 'relative', zIndex: 1 }}>
          <tr>
            {/* Step 1 */}
            <td style={{ width: '25%', textAlign: 'center', verticalAlign: 'top' }}>
              <div style={{ margin: '0 auto 15px auto', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#F3D7A7', color: '#000', lineHeight: '32px', fontSize: '14px', fontWeight: 'bold' }}>✓</div>
              <div style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', color: '#ffffff', marginBottom: '4px', letterSpacing: '0.1em' }}>Received</div>
              <div style={{ fontSize: '8px', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.3)', letterSpacing: '0.05em' }}>Portfolio</div>
            </td>
            {/* Step 2 */}
            <td style={{ width: '25%', textAlign: 'center', verticalAlign: 'top' }}>
              <div style={{ margin: '0 auto 15px auto', width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #F3D7A7', backgroundColor: '#000', color: '#F3D7A7', lineHeight: '30px', fontSize: '14px', fontWeight: 'bold' }}>2</div>
              <div style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', color: '#F3D7A7', marginBottom: '4px', letterSpacing: '0.1em' }}>Review</div>
              <div style={{ fontSize: '8px', textTransform: 'uppercase', color: 'rgba(243, 215, 167, 0.4)', letterSpacing: '0.05em' }}>Intent Audit</div>
            </td>
            {/* Step 3 */}
            <td style={{ width: '25%', textAlign: 'center', verticalAlign: 'top', opacity: '0.2' }}>
              <div style={{ margin: '0 auto 15px auto', width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #ffffff', color: '#ffffff', lineHeight: '30px', fontSize: '14px', fontWeight: 'bold' }}>3</div>
              <div style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', color: '#ffffff', marginBottom: '4px', letterSpacing: '0.1em' }}>Interview</div>
              <div style={{ fontSize: '8px', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.3)', letterSpacing: '0.05em' }}>Evaluation</div>
            </td>
            {/* Step 4 */}
            <td style={{ width: '25%', textAlign: 'center', verticalAlign: 'top', opacity: '0.2' }}>
              <div style={{ margin: '0 auto 15px auto', width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #ffffff', color: '#ffffff', lineHeight: '30px', fontSize: '14px', fontWeight: 'bold' }}>4</div>
              <div style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', color: '#ffffff', marginBottom: '4px', letterSpacing: '0.1em' }}>Verdict</div>
              <div style={{ fontSize: '8px', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.3)', letterSpacing: '0.05em' }}>Selection</div>
            </td>
          </tr>
        </table>
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

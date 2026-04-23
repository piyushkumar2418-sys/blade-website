const { Resend } = require('resend');
const React = require('react');
const { render } = require('@react-email/render');

// The Key
const resend = new Resend('re_bmWB1Eis_9q7np6UzMPaVJtfi9XgAtBk8');

// We'll use a simple HTML version for the manual send to avoid React rendering issues in a standalone script
const html = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #000000; padding: 80px 40px; color: #ffffff; max-width: 600px; margin: 0 auto; text-align: left;">
    <div style="margin-bottom: 60px;">
      <img src="https://blademedia.in/inner-circle-logo.png" alt="Blade Inner Circle" style="width: 80px; height: auto; margin-bottom: 20px;" />
      <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 20px;">
        <span style="font-size: 11px; letter-spacing: 0.4em; color: '#F3D7A7'; font-weight: bold; text-transform: uppercase;">
          Cohort 01 — May 2026
        </span>
      </div>
    </div>
    <div style="margin-bottom: 60px;">
      <h1 style="font-size: 32px; font-weight: bold; letter-spacing: -0.02em; line-height: 1.2; margin: 0 0 24px 0; color: #ffffff;">
        We've received your portfolio.
      </h1>
      <p style="font-size: 16px; line-height: 1.6; color: rgba(255, 255, 255, 0.8); font-weight: 400; margin: 0 0 20px 0;">
        Hi Srasti Soni,
      </p>
      <p style="font-size: 16px; line-height: 1.6; color: rgba(255, 255, 255, 0.8); font-weight: 400; margin: 0 0 20px 0;">
        Thank you for sharing your work with us. Every application for Cohort 01 is reviewed personally by our team to ensure we’re building the right environment for everyone involved.
      </p>
      <p style="font-size: 16px; line-height: 1.6; color: rgba(255, 255, 255, 0.8); font-weight: 400;">
        We've officially started your admission journey. You can expect to hear from us regarding the next steps within the next 48 hours.
      </p>
    </div>
    <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 30px;">
      <p style="font-size: 14px; color: #F3D7A7; font-weight: bold; margin: 0;">Blade Media.</p>
      <p style="font-size: 12px; color: rgba(255, 255, 255, 0.4); margin-top: 8px;">Helping elite builders scale.</p>
    </div>
</div>
`;

async function send() {
    console.log('Sending manual email...');
    try {
        const { data, error } = await resend.emails.send({
            from: 'Blade Media <noreply@blademedia.in>',
            to: ['srastisoni138@gmail.com'],
            subject: 'Cohort 01 — Admission Received',
            html: html,
        });

        if (error) {
            return console.error(error);
        }

        console.log('Successfully sent! ID:', data.id);
    } catch (e) {
        console.error(e);
    }
}

send();

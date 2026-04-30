import { Resend } from 'resend';
import React from 'react';
import { ApplicationEmail } from '@/emails/ApplicationEmail';

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  react: React.ReactElement;
  text: string;
}

/**
 * Standard email dispatcher.
 */
export async function sendEmail({ to, subject, react, text }: SendEmailOptions) {
  const resendKey = process.env.BLADE_RESEND_KEY;
  
  if (!resendKey) {
    console.warn('Resend skipped: Missing BLADE_RESEND_KEY');
    return { success: true, mock: true };
  }

  const resend = new Resend(resendKey);

  try {
    const { data, error } = await resend.emails.send({
      from: 'Blade Media <noreply@blademedia.in>',
      to: Array.isArray(to) ? to : [to],
      subject,
      react,
      text,
    });

    if (error) {
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}

/**
 * Specifically sends the Admission Journey email.
 */
export async function sendApplicationEmail(to: string, name: string) {
  return sendEmail({
    to,
    subject: 'We\'ve received your portfolio.',
    react: React.createElement(ApplicationEmail, { name }),
    text: `Hi ${name}, thank you for sharing your work with us. Every application for Cohort 01 is reviewed personally by our team. You can expect a response within 48 hours.`,
  });
}

/**
 * Sends the official Admission Confirmed email with the secure payment link.
 */
export async function sendAdmissionConfirmedEmail(to: string, name: string) {
  const BATCH_COHORT_NAME = "Cohort 01 (May 2026)";
  
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f7f3eb; color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f7f3eb; padding: 60px 20px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border: 1px solid rgba(0,0,0,0.1); border-radius: 12px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 50px 40px 30px 40px; text-align: left; border-bottom: 1px solid rgba(0,0,0,0.05);">
              <img src="https://blademedia.in/blade-logo.png" alt="Blade Inner Circle" style="width: 48px; height: auto; margin-bottom: 24px;" />
              <p style="margin: 0; font-size: 10px; font-weight: 800; letter-spacing: 0.3em; text-transform: uppercase; color: #9b7328;">
                Cohort 01 — May 2026
              </p>
              <h1 style="margin: 16px 0 0 0; font-size: 32px; font-weight: 800; letter-spacing: -0.04em; text-transform: uppercase; color: #000000; line-height: 1.1;">
                Admission<br/>Confirmed.
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px; text-align: left;">
              <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                Dear ${name},
              </p>
              
              <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                After reviewing your application, we are pleased to offer you a seat in <strong>${BATCH_COHORT_NAME}</strong> of the Blade Inner Circle.
              </p>
              
              <p style="margin: 0 0 32px 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                This cohort is restricted to practitioners committed to execution over theory. We have attached the official curriculum for your review.
              </p>
              
              <div style="background-color: #faf8f2; border: 1px solid rgba(217,180,101,0.3); border-radius: 8px; padding: 24px; margin: 32px 0;">
                <h3 style="margin: 0 0 16px 0; font-size: 11px; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; color: #000000;">Important Details</h3>
                
                <p style="margin: 0 0 12px 0; font-size: 14px; line-height: 1.5; color: #4a4a4a;">
                  <strong style="color: #000000;">Orientation Date:</strong> May 12th, 2026<br/>
                  <span style="font-size: 13px; color: #777;">(The meeting link will be shared a few days prior)</span>
                </p>
                <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #4a4a4a;">
                  <strong style="color: #000000;">Official Community:</strong><br/>
                  <span style="font-size: 13px; color: #777;">You will receive the link to the official WhatsApp community upon seat confirmation.</span>
                </p>
              </div>

              <!-- Action Buttons -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 40px;">
                <tr>
                  <td align="left" style="padding-bottom: 16px;">
                    <a href="https://blademedia.in/apply/payment" style="display: inline-block; width: 100%; max-width: 280px; padding: 18px 0; background-color: #000000; color: #ffffff; text-decoration: none; font-weight: 800; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; border-radius: 4px; text-align: center;">
                      Confirm Your Seat
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="left">
                    <a href="https://blademedia.in/curriculum.pdf" download="Blade_Inner_Circle_Curriculum.pdf" style="display: inline-block; width: 100%; max-width: 280px; padding: 18px 0; background-color: transparent; color: #000000; text-decoration: none; font-weight: 800; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; border-radius: 4px; border: 1px solid rgba(0,0,0,0.1); text-align: center;">
                      Download Curriculum PDF
                    </a>
                  </td>
                </tr>
              </table>
              
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #faf8f2; text-align: left; border-top: 1px solid rgba(0,0,0,0.05);">
              <p style="margin: 0 0 10px 0; font-size: 12px; color: #777777; line-height: 1.6;">
                Seats are strictly limited. Your placement is not secured until the institutional fee is processed. If you require assistance, simply reply to this email.
              </p>
              <p style="margin: 20px 0 0 0; font-size: 10px; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; color: #000000;">
                Blade Media.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const resendKey = process.env.BLADE_RESEND_KEY;
  if (!resendKey) {
    console.warn('Resend skipped: Missing BLADE_RESEND_KEY');
    return { success: true, mock: true };
  }
  
  const resend = new Resend(resendKey);
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'Blade Inner Circle <admissions@blademedia.in>',
      to: [to],
      subject: "You're In! Welcome to Blade Inner Circle Cohort 01",
      html: htmlContent,
    });

    if (error) return { success: false, error };
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}

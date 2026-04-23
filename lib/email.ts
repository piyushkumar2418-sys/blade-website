import { Resend } from 'resend';
import React from 'react';

const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY) 
  : null;

interface SendEmailProps {
  to: string | string[];
  subject: string;
  react: React.ReactElement;
  text?: string;
}

/**
 * Sends a professional email using Resend.
 * Falls back to Mock Mode if no API key is provided.
 */
export async function sendEmail({ to, subject, react, text }: SendEmailProps) {
  if (!resend) {
    console.log('\x1b[35m%s\x1b[0m', '--- [MOCK EMAIL SYSTEM] ---');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('Status: Verification code or API key missing. Email logged to console.');
    console.log('---------------------------');
    return { success: true, mock: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Blade Media <onboarding@resend.dev>', // Default for unverified domains
      to,
      subject,
      react,
      text: text || 'Transmission from Blade Media.',
    });

    if (error) {
      console.error('Resend Error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email Dispatch Failure:', error);
    return { success: false, error };
  }
}

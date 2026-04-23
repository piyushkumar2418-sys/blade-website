import { Resend } from 'resend';
import React from 'react';

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
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log('SYSTEM: RESEND_API_KEY is missing. Operating in MOCK MODE.');
    return { success: true, mock: true, id: 'MOCK_MODE_ACTIVE' };
  }

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: 'Blade Media <team@blademedia.in>', // Your new professional address
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

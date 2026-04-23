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

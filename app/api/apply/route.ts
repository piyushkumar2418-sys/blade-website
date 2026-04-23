import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { sendEmail } from '@/lib/email';
import { ApplicationEmail } from '@/emails/ApplicationEmail';
import React from 'react';

/**
 * Handles professional application processing.
 * Saves to Firestore and triggers an automated confirmation email.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, instagram, ...otherData } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    // 1. Log the lead to Firestore
    const docRef = await addDoc(collection(db, 'applications'), {
      name,
      email,
      instagram: instagram || 'not provided',
      ...otherData,
      status: 'new',
      source: 'web_form',
      createdAt: serverTimestamp(),
    });

    // 2. Dispatch Confirmation Email (Non-blocking)
    // We don't await this so the user gets an instant success response
    sendEmail({
      to: email,
      subject: 'TRANSMISSION SECURED: Application Received',
      react: React.createElement(ApplicationEmail, { name }),
      text: `Hello ${name}, your application to Blade Media has been received and is under review.`,
    }).catch(err => console.error('Delayed Email Error:', err));

    return NextResponse.json({ 
      success: true, 
      id: docRef.id 
    });
  } catch (error) {
    console.error('Critical Application Error:', error);
    return NextResponse.json({ error: 'System processing failure.' }, { status: 500 });
  }
}

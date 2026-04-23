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

    let docId = '';
    try {
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
      docId = docRef.id;
    } catch (dbError: any) {
      console.error('Database Write Failure:', dbError);
      return NextResponse.json({ error: `Database failure: ${dbError.message}` }, { status: 500 });
    }

    // 2. Dispatch Confirmation Email (Non-blocking and protected)
    try {
      sendEmail({
        to: email,
        subject: 'TRANSMISSION SECURED: Application Received',
        react: React.createElement(ApplicationEmail, { name }),
        text: `Hello ${name}, your application to Blade Media has been received and is under review.`,
      }).catch(err => console.error('Background Email Error:', err));
    } catch (emailError) {
      console.error('Email Setup Error:', emailError);
      // We don't return error here because the database write succeeded
    }

    return NextResponse.json({ 
      success: true, 
      id: docId 
    });
  } catch (error: any) {
    console.error('Critical API Failure:', error);
    return NextResponse.json({ error: `Critical failure: ${error.message}` }, { status: 500 });
  }
}

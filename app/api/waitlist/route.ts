import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import * as admin from 'firebase-admin';
import { sendWaitlistEmail } from '@/lib/email';

/**
 * Handles waitlist registration submissions.
 * Validates data, logs to Firestore 'waitlist' collection, and sends a confirmation email.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, instagram, goal } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    // Generate a unique waitlist access key (e.g., BIC-AUG26-XXXX)
    const randomSuffix = Math.floor(1000 + Math.random() * 9000); // 4-digit number
    const waitlistKey = `BIC-AUG26-${randomSuffix}`;

    let docId = '';
    try {
      if (!adminDb) {
        throw new Error('Database admin instance not available.');
      }

      // 1. Log the lead to Firestore in the 'waitlist' collection
      const docRef = await adminDb.collection('waitlist').add({
        name,
        email,
        phone: phone || 'not provided',
        instagram: instagram || 'not provided',
        goal: goal || 'not provided',
        waitlistKey,
        status: 'verified',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      docId = docRef.id;
    } catch (dbError: any) {
      console.error('Database Write Failure (Waitlist):', dbError);
      return NextResponse.json({ error: `Database failure: ${dbError.message}` }, { status: 500 });
    }

    // 2. Dispatch waitlist verification email via Resend
    const emailResult = await sendWaitlistEmail(email, name, waitlistKey);

    if (!emailResult.success) {
      console.error('Email Dispatch Failure (Waitlist):', emailResult.error);
      // We still return success: true because the DB write succeeded,
      // but we indicate that the email failed.
      return NextResponse.json({ 
        success: true, 
        id: docId,
        waitlistKey,
        emailError: `Email failed to send: ${(emailResult.error as any)?.message || 'Unknown Resend Error'}`
      });
    }

    return NextResponse.json({ 
      success: true, 
      id: docId,
      waitlistKey
    });
  } catch (error: any) {
    console.error('Critical Waitlist API Failure:', error);
    return NextResponse.json({ error: `Critical failure: ${error.message}` }, { status: 500 });
  }
}

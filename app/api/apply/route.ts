import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import * as admin from 'firebase-admin';
import { sendApplicationEmail } from '@/lib/email';

/**
 * GET: Fetches applications for the authenticated user.
 */
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const token = authHeader.split('Bearer ')[1];
    
    if (!adminDb) {
      return NextResponse.json({ error: 'Database not initialized' }, { status: 500 });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;

    const snap = await adminDb.collection('applications')
      .where('uid', '==', uid)
      .get();
      
    const applications = snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ success: true, applications });
  } catch (error: any) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * POST: Handles professional application processing.
 * Saves to Firestore, triggers confirmation email, and pushes to Notion CRM.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, instagram, ...otherData } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    let docId = '';
    try {
      if (!adminDb) {
        throw new Error('Database admin instance not available.');
      }

      // 1. Log the lead to Firestore
      const docRef = await adminDb.collection('applications').add({
        name,
        email,
        phone: phone || 'not provided',
        instagram: instagram || 'not provided',
        ...otherData,
        status: 'new',
        source: 'web_form',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      docId = docRef.id;
    } catch (dbError: any) {
      console.error('Database Write Failure:', dbError);
      return NextResponse.json({ error: `Database failure: ${dbError.message}` }, { status: 500 });
    }

    // 2. Dispatch Human-Centric Confirmation Email
    const emailResult = await sendApplicationEmail(email, name);

    if (!emailResult.success) {
      console.error('Email Dispatch Failure:', emailResult.error);
    }

    // 3. Optional Google Sheet Webhook Integration
    const sheetWebhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (sheetWebhookUrl) {
      try {
        await fetch(sheetWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            applicationId: docId,
            name,
            email,
            phone: phone || 'not provided',
            instagram: instagram || 'not provided',
            portfolioLink: otherData.portfolioLink || '',
            primaryFocus: otherData.primaryFocus || '',
            whyReady: otherData.whyReady || '',
            cohort: otherData.cohort || 'Cohort 02',
          }),
        });
      } catch (webhookError) {
        console.error('Google Sheet Webhook logging failed:', webhookError);
      }
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

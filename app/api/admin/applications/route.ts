import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import * as admin from 'firebase-admin';
import { sendAdmissionConfirmedEmail } from '@/lib/email';

const ADMIN_EMAILS = [
  'piyushkumar2418@gmail.com',
  'sharma125prashant@gmail.com'
];

/**
 * Helper to securely verify admin status via Firebase ID token
 */
async function verifyAdmin(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;

  const token = authHeader.split('Bearer ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    if (decodedToken.email && ADMIN_EMAILS.includes(decodedToken.email)) {
      return decodedToken;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const adminUser = await verifyAdmin(req);
  if (!adminUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!adminDb) return NextResponse.json({ error: 'Database not initialized' }, { status: 500 });

  try {
    const snapshot = await adminDb.collection('applications').orderBy('createdAt', 'desc').get();
    const applications = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate()?.toISOString() || new Date().toISOString()
    }));

    return NextResponse.json({ applications });
  } catch (error: any) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const adminUser = await verifyAdmin(req);
  if (!adminUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!adminDb) return NextResponse.json({ error: 'Database not initialized' }, { status: 500 });

  try {
    const body = await req.json();
    const { id, action, email, name } = body;

    if (!id || !action || !email || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const docRef = adminDb.collection('applications').doc(id);
    
    if (action === 'accept') {
      // 1. Update Database
      await docRef.update({ status: 'confirmed' });
      
      // 2. Send Premium Email
      const emailResult = await sendAdmissionConfirmedEmail(email, name);
      if (!emailResult.success) {
        console.error('Email failed to send but database updated:', emailResult.error);
        return NextResponse.json({ success: true, warning: 'Email failed to send' });
      }

      return NextResponse.json({ success: true, status: 'confirmed' });
    } 
    
    if (action === 'reject') {
      await docRef.update({ status: 'rejected' });
      return NextResponse.json({ success: true, status: 'rejected' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error: any) {
    console.error('Error updating application:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

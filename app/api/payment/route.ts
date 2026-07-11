import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(req: NextRequest) {
  if (!adminDb) {
    return NextResponse.json({ error: 'Database not initialized' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { email, phone, name, transactionId } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Find the application by email
    const applicationsRef = adminDb.collection('applications');
    const snapshot = await applicationsRef.where('email', '==', email.toLowerCase().trim()).limit(1).get();

    if (snapshot.empty) {
      return NextResponse.json({ error: 'Application not found for this email. Please use the email you applied with.' }, { status: 404 });
    }

    const doc = snapshot.docs[0];
    
    // 1. Update application status
    await doc.ref.update({
      status: 'booked',
      paymentConfirmedAt: new Date().toISOString(),
      paymentPhone: phone || '',
      paymentName: name || '',
      transactionId: transactionId || ''
    });

    // 2. Save payment proof submission entry
    await adminDb.collection('submissions').add({
      name: name || '',
      email: email.toLowerCase().trim(),
      phone: phone || '',
      transactionId: transactionId || '',
      createdAt: new Date().toISOString(),
      status: 'pending'
    });

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Error updating payment status:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

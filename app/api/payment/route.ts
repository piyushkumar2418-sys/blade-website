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

    const cleanEmail = email.toLowerCase().trim();

    // 1. Find or create the application by email
    const applicationsRef = adminDb.collection('applications');
    const snapshot = await applicationsRef.where('email', '==', cleanEmail).limit(1).get();

    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      await doc.ref.update({
        status: 'booked',
        cohort: 'Cohort 02',
        paymentConfirmedAt: new Date().toISOString(),
        paymentPhone: phone || '',
        paymentName: name || '',
        transactionId: transactionId || '',
        amountPaid: '6499'
      });
    } else {
      const directDocRef = applicationsRef.doc(cleanEmail);
      const directDoc = await directDocRef.get();
      if (directDoc.exists) {
        await directDocRef.update({
          status: 'booked',
          cohort: 'Cohort 02',
          paymentConfirmedAt: new Date().toISOString(),
          paymentPhone: phone || '',
          paymentName: name || '',
          transactionId: transactionId || '',
          amountPaid: '6499'
        });
      } else {
        // Fallback: create application entry so payment verification is never lost
        await directDocRef.set({
          name: name || '',
          email: cleanEmail,
          phone: phone || '',
          status: 'booked',
          cohort: 'Cohort 02',
          paymentConfirmedAt: new Date().toISOString(),
          paymentPhone: phone || '',
          paymentName: name || '',
          transactionId: transactionId || '',
          amountPaid: '6499',
          createdAt: new Date().toISOString(),
          source: 'direct_payment'
        });
      }
    }

    // 2. Save payment proof submission entry
    await adminDb.collection('submissions').add({
      name: name || '',
      email: cleanEmail,
      phone: phone || '',
      transactionId: transactionId || '',
      amount: '6499',
      cohort: 'Cohort 02',
      createdAt: new Date().toISOString(),
      status: 'pending'
    });

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Error updating payment status:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

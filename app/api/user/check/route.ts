import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(req: NextRequest) {
  try {
    const { email, phone } = await req.json();
    if (!adminDb) {
      return NextResponse.json({ error: 'Database not initialized' }, { status: 500 });
    }

    if (email) {
      const emailSnap = await adminDb.collection('users').where('email', '==', email).limit(1).get();
      if (!emailSnap.empty) {
        return NextResponse.json({ exists: true, message: 'Email already exists.' });
      }
    }

    if (phone) {
      const phoneSnap = await adminDb.collection('users').where('phone', '==', phone).limit(1).get();
      if (!phoneSnap.empty) {
        return NextResponse.json({ exists: true, message: 'Phone number already exists.' });
      }
    }

    return NextResponse.json({ exists: false });
  } catch (error: any) {
    console.error('Error checking user identity:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

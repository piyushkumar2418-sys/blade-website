import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { ip, userAgent, path, referrer, country, region, city } = body;

    // Log the visit to Firestore using Client SDK (now allowed by rules)
    await addDoc(collection(db, 'visitors'), {
      ip: ip || 'unknown',
      userAgent: userAgent || 'unknown',
      path: path || '/',
      referrer: referrer || 'direct',
      geo: {
        country: country || 'unknown',
        region: region || 'unknown',
        city: city || 'unknown',
      },
      timestamp: serverTimestamp(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking visitor (Client):', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

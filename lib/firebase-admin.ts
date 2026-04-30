import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { join } from 'path';
import { readFileSync, existsSync } from 'fs';

if (!admin.apps.length) {
  try {
    let credential;

    const serviceAccountPath = join(process.cwd(), 'service-account.json');
    
    // 1. Try local service-account.json file (Development / Local Script)
    if (existsSync(serviceAccountPath)) {
      const serviceAccountRaw = readFileSync(serviceAccountPath, 'utf8');
      credential = admin.credential.cert(JSON.parse(serviceAccountRaw));
    } 
    // 2. Try Environment Variable (Vercel Production)
    else if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      credential = admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY));
    } 
    // 3. Fallback
    else {
      console.warn("⚠️ No service account found. Firestore admin features may fail.");
    }

    if (credential) {
      admin.initializeApp({ credential });
    } else {
      admin.initializeApp();
    }
    
  } catch (error) {
    console.error('❌ Firebase admin initialization error:', error);
  }
}

export const adminDb = admin.apps.length ? getFirestore(admin.app(), "bladeinnercircle") : null;

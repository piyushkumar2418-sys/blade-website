import * as dotenv from 'dotenv';
import { join } from 'path';
import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

// Load environment variables
dotenv.config({ path: join(process.cwd(), '.env.local') });

// Initialize Firebase Admin
const serviceAccountPath = join(process.cwd(), 'service-account.json');
try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(require(serviceAccountPath))
    });
  }
} catch (error) {
  console.error("❌ Failed to initialize Firebase Admin.");
  process.exit(1);
}

const db = getFirestore(admin.app(), "bladeinnercircle");

const verifiedEmails = [
  "yashika.work27@gmail.com",
  "rishikumarjha048@gmail.com"
];

async function verifyPayments() {
  const applicationsRef = db.collection('applications');

  for (const email of verifiedEmails) {
    try {
      const snapshot = await applicationsRef.where('email', '==', email.toLowerCase().trim()).limit(1).get();
      
      if (snapshot.empty) {
        console.log(`⚠️ No application found for ${email}`);
        continue;
      }

      const doc = snapshot.docs[0];
      await doc.ref.update({
        status: 'enrolled',
        enrolledAt: new Date().toISOString()
      });

      console.log(`✅ Successfully marked ${doc.data().name} (${email}) as ENROLLED.`);
    } catch (error) {
      console.error(`❌ Failed to update ${email}:`, error);
    }
  }

  console.log("🎉 All verified payments processed.");
}

verifyPayments();

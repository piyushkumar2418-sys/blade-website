import * as dotenv from 'dotenv';
import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';
import { join } from 'path';

// Load environment variables
dotenv.config({ path: join(process.cwd(), '.env.local') });

// Initialize Firebase Admin
const serviceAccountPath = join(process.cwd(), 'service-account.json');
try {
  const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} catch (error) {
  console.error("❌ Failed to initialize Firebase Admin. Make sure service-account.json is in the project root.");
}

const db = getFirestore(admin.app(), "bladeinnercircle");

async function listEnrolled() {
  console.log(`🔍 Querying Firestore for all ENROLLED candidates...`);
  const snapshot = await db.collection("applications").where("status", "==", "enrolled").get();
  
  if (snapshot.empty) {
    console.log("⚠️ No enrolled candidates found.");
    return;
  }

  const students: { name: string, email: string }[] = [];
  snapshot.docs.forEach(doc => {
    const data = doc.data();
    if (data.email && data.name) {
      students.push({ name: data.name, email: data.email });
    }
  });

  console.log(`\nFound ${students.length} Enrolled Candidates:\n`);
  students.forEach((s, i) => console.log(`${i + 1}. ${s.name} - ${s.email}`));
}

listEnrolled();

import { Resend } from 'resend';
import * as dotenv from 'dotenv';
import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';
import { join } from 'path';

// Load environment variables from .env.local
dotenv.config({ path: join(process.cwd(), '.env.local') });

// Initialize Firebase Admin with the downloaded service account
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

const resend = new Resend(process.env.BLADE_RESEND_KEY);

const MEETING_DETAILS = {
  date: "Thursday, 14 May · 8:30 – 9:30pm",
  link: "https://meet.google.com/vak-ihtj-xwj",
  title: "Social Media Marketing & Skill Selection"
};

async function sendSessionEmails() {
  if (!process.env.BLADE_RESEND_KEY) {
    console.error("❌ BLADE_RESEND_KEY is missing in .env.local");
    return;
  }

  let targetStudents: { name: string, email: string }[] = [];

  console.log(`🔍 Querying Firestore for all ENROLLED candidates...`);
  const snapshot = await db.collection("applications").where("status", "==", "enrolled").get();
  
  if (snapshot.empty) {
    console.log("⚠️ No enrolled candidates found.");
    return;
  }

  snapshot.docs.forEach(doc => {
    const data = doc.data();
    if (data.email && data.name) {
      targetStudents.push({ name: data.name, email: data.email });
    }
  });

  console.log(`Starting email broadcast to ${targetStudents.length} candidates...`);

  for (const student of targetStudents) {
    try {
      const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f7f3eb; color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f7f3eb; padding: 60px 20px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border: 1px solid rgba(0,0,0,0.1); border-radius: 12px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 50px 40px 30px 40px; text-align: left; border-bottom: 1px solid rgba(0,0,0,0.05);">
              <img src="https://blademedia.in/blade-logo.png" alt="Blade Inner Circle" style="width: 48px; height: auto; margin-bottom: 24px;" />
              <p style="margin: 0; font-size: 10px; font-weight: 800; letter-spacing: 0.3em; text-transform: uppercase; color: #9b7328;">
                Cohort 01 — May 2026
              </p>
              <h1 style="margin: 16px 0 0 0; font-size: 32px; font-weight: 800; letter-spacing: -0.04em; text-transform: uppercase; color: #000000; line-height: 1.1;">
                Session 02<br/>Live Class.
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px; text-align: left;">
              <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                Hey ${student.name.split(' ')[0]},
              </p>
              
              <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                Tonight we dive into Session 02 of the Blade Inner Circle.
              </p>
              
              <p style="margin: 0 0 32px 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                <strong>Topic: ${MEETING_DETAILS.title}</strong><br><br>
                We will be breaking down the exact frameworks needed to leverage social platforms and select the high-leverage skills required to dominate your niche. Come prepared to take notes.
              </p>
              
              <div style="background-color: #faf8f2; border: 1px solid rgba(217,180,101,0.3); border-radius: 8px; padding: 24px; margin: 32px 0;">
                <h3 style="margin: 0 0 16px 0; font-size: 11px; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; color: #000000;">Meeting Details</h3>
                
                <p style="margin: 0 0 12px 0; font-size: 14px; line-height: 1.5; color: #4a4a4a;">
                  <strong style="color: #000000;">Date & Time:</strong><br/>
                  ${MEETING_DETAILS.date} (IST)
                </p>
                <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #4a4a4a;">
                  <strong style="color: #000000;">Video Call Link:</strong><br/>
                  <a href="${MEETING_DETAILS.link}" style="color: #0052cc; text-decoration: none;">${MEETING_DETAILS.link}</a>
                </p>
              </div>

              <!-- Action Buttons -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 40px;">
                <tr>
                  <td align="left">
                    <a href="${MEETING_DETAILS.link}" style="display: inline-block; width: 100%; max-width: 280px; padding: 18px 0; background-color: #000000; color: #ffffff; text-decoration: none; font-weight: 800; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; border-radius: 4px; text-align: center;">
                      Join Google Meet
                    </a>
                  </td>
                </tr>
              </table>
              
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #faf8f2; text-align: left; border-top: 1px solid rgba(0,0,0,0.05);">
              <p style="margin: 0 0 10px 0; font-size: 12px; color: #777777; line-height: 1.6;">
                Attendance is strictly mandatory. Please join the meeting 5 minutes early to ensure we start on time.
              </p>
              <p style="margin: 20px 0 0 0; font-size: 10px; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; color: #000000;">
                Blade Media.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `;

      const data = await resend.emails.send({
        from: 'Blade Inner Circle <admissions@blademedia.in>',
        to: [student.email],
        subject: "Session 02: Social Media Marketing & Skill Selection | BIC",
        html: htmlContent,
      });

      console.log(`✅ Sent to ${student.name} (${student.email}) - ID: ${data.data?.id}`);
      
      // Delay to avoid hitting rate limits
      await new Promise(resolve => setTimeout(resolve, 500)); 
    } catch (error) {
      console.error(`❌ Failed to process ${student.email}:`, error);
    }
  }

  console.log('🎉 Broadcast complete!');
}

sendSessionEmails();

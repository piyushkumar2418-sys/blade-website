import { Resend } from 'resend';
import * as dotenv from 'dotenv';
import { join } from 'path';
import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

// Load environment variables from .env.local
dotenv.config({ path: join(process.cwd(), '.env.local') });

// Initialize Firebase Admin with the downloaded service account
const serviceAccountPath = join(process.cwd(), 'service-account.json');
try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(require(serviceAccountPath))
    });
  }
} catch (error) {
  console.error("❌ Failed to initialize Firebase Admin. Make sure service-account.json is in the project root.");
}

const db = getFirestore(admin.app(), "bladeinnercircle");
const resend = new Resend(process.env.BLADE_RESEND_KEY);

const BATCH_COHORT_NAME = "Cohort 01 (May 2026)";

async function sendReminderEmails() {
  if (!process.env.BLADE_RESEND_KEY) {
    console.error("❌ BLADE_RESEND_KEY is missing in .env.local");
    return;
  }

  try {
    // Dynamically fetch all candidates who are 'confirmed' but NOT 'enrolled' or 'booked'
    const snapshot = await db.collection('applications').where('status', '==', 'confirmed').get();
    
    if (snapshot.empty) {
      console.log("✅ No pending payments found. All confirmed candidates have either booked or enrolled.");
      return;
    }

    const pendingCandidates = snapshot.docs.map(doc => ({
      name: doc.data().name,
      email: doc.data().email
    }));

    console.log(`Starting URGENT reminder broadcast to ${pendingCandidates.length} candidates...`);

    for (const student of pendingCandidates) {
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
              <p style="margin: 0; font-size: 10px; font-weight: 800; letter-spacing: 0.3em; text-transform: uppercase; color: #d32f2f;">
                Urgent Action Required
              </p>
              <h1 style="margin: 16px 0 0 0; font-size: 32px; font-weight: 800; letter-spacing: -0.04em; text-transform: uppercase; color: #000000; line-height: 1.1;">
                Seat Expiration<br/>Warning.
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px; text-align: left;">
              <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                Dear ${student.name},
              </p>
              
              <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                This is an urgent reminder regarding your acceptance into <strong>${BATCH_COHORT_NAME}</strong> of the Blade Inner Circle.
              </p>
              
              <p style="margin: 0 0 32px 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                We have not yet received your institutional fee confirmation. <strong>Your seat will be released to the next waitlisted candidate in 24 hours</strong> if payment is not secured immediately.
              </p>
              
              <!-- Action Buttons -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 40px;">
                <tr>
                  <td align="left" style="padding-bottom: 16px;">
                    <a href="https://blademedia.in/apply/payment" style="display: inline-block; width: 100%; max-width: 280px; padding: 18px 0; background-color: #000000; color: #ffffff; text-decoration: none; font-weight: 800; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; border-radius: 4px; text-align: center;">
                      Complete Payment Now
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
                If you have already made the payment but forgot to fill the confirmation form, please click the button above to submit your proof immediately.
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
          subject: "URGENT: Secure your seat for Cohort 01 before expiration",
          html: htmlContent,
        });

        console.log(`✅ Urgent Reminder sent to ${student.name} (${student.email}) - ID: ${data.data?.id}`);
        
        // Delay to avoid hitting rate limits
        await new Promise(resolve => setTimeout(resolve, 500)); 
      } catch (error) {
        console.error(`❌ Failed to process ${student.email}:`, error);
      }
    }

    console.log('🎉 Urgent Reminder broadcast complete!');
  } catch (error) {
    console.error("❌ Database query failed:", error);
  }
}

sendReminderEmails();

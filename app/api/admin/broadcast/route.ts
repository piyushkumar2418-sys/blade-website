import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import * as admin from 'firebase-admin';
import { Resend } from 'resend';

const resend = new Resend(process.env.BLADE_RESEND_KEY);

const ADMIN_EMAILS = [
  'piyushkumar2418@gmail.com'
];

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

export async function POST(req: NextRequest) {
  const adminUser = await verifyAdmin(req);
  if (!adminUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!adminDb) return NextResponse.json({ error: 'Database not initialized' }, { status: 500 });

  if (!process.env.BLADE_RESEND_KEY) {
    return NextResponse.json({ error: 'Resend API key missing' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { subject, h1Title, htmlBody, audience, testEmail, attachments = [] } = body;

    if (!subject || !htmlBody || !h1Title || !audience) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let targetStudents: { name: string, email: string }[] = [];

    if (audience === 'test') {
      if (!testEmail) return NextResponse.json({ error: 'Test email required' }, { status: 400 });
      targetStudents.push({ name: 'Admin', email: testEmail });
    } else if (audience === 'enrolled') {
      const snapshot = await adminDb.collection("applications").where("status", "==", "enrolled").get();
      if (snapshot.empty) {
        return NextResponse.json({ error: 'No enrolled candidates found' }, { status: 404 });
      }
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.email && data.name) {
          targetStudents.push({ name: data.name, email: data.email });
        }
      });
    } else {
      return NextResponse.json({ error: 'Invalid audience' }, { status: 400 });
    }

    const results = [];
    
    // Inject the raw body into the premium template
    for (const student of targetStudents) {
      const personalizedHtml = `
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
                ${h1Title}
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px; text-align: left;">
              <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                Hey ${student.name.split(' ')[0]},
              </p>
              
              <div style="font-size: 16px; line-height: 1.6; color: #4a4a4a; white-space: pre-wrap;">
${htmlBody}
              </div>
              
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #faf8f2; text-align: left; border-top: 1px solid rgba(0,0,0,0.05);">
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

      try {
        const payload: any = {
          from: 'Blade Inner Circle <admissions@blademedia.in>',
          to: [student.email],
          subject: subject,
          html: personalizedHtml,
        };

        if (attachments && attachments.length > 0) {
          payload.attachments = attachments.map((att: any) => ({
            filename: att.filename,
            content: att.content.split(',')[1] // Strip "data:image/png;base64," prefix if present
          }));
        }

        const data = await resend.emails.send(payload);
        results.push({ email: student.email, success: true, id: data.data?.id });
      } catch (e: any) {
        results.push({ email: student.email, success: false, error: e.message });
      }
      
      // Delay to avoid hitting rate limits
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    return NextResponse.json({ success: true, results, total: targetStudents.length });

  } catch (error: any) {
    console.error('Error sending broadcast:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

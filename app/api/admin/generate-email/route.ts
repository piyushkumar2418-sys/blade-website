import { NextRequest, NextResponse } from 'next/server';
import '@/lib/firebase-admin';
import * as admin from 'firebase-admin';
import { GoogleGenAI } from '@google/genai';
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

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: 'GEMINI_API_KEY is missing from environment variables' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const systemInstruction = `
You are the Communications Director for 'Blade Inner Circle' (an elite, high-ticket cohort program teaching agency building and client acquisition).
Write a highly direct, minimal, and authoritative email addressed to the enrolled students based on the user's prompt.

TONE AND STYLE PROTOCOL:
- The tone must be that of an elite, premium educational institute. It should be highly professional, sophisticated, and authoritative.
- Be direct and high-stakes, but DO NOT sound like a military briefing or use overly aggressive language.
- Use refined, institutional phrasing (e.g., "operational cadence", "strictly mandatory", "where the real work begins") but avoid excessive corporate buzzwords or forced jargon.
- Absolutely NO fluff, NO exclamation marks, NO emojis, and NO friendly filler (like "Hope you are doing well" or "I am excited to announce").

You must return your response strictly as a JSON object with three keys:
1. "subject": A punchy, authoritative subject line.
2. "h1Title": A bold headline for the email. Use a <br/> tag to split it into two lines for visual impact. Example: "Session 03:<br/>Editing & Niches." or "Urgent:<br/>Schedule Update."
3. "body": The email body formatted strictly in HTML.

CRITICAL HTML STYLING RULES FOR THE BODY:
- Do NOT start with "Dear students" or "Hi [Name]". Start directly with the first paragraph.
- Do NOT include a sign-off.
- Standard Paragraphs: <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">Your text here</p>
- Bold text: <strong style="color: #000000;">Bold Text</strong>

IF THE PROMPT ASKS TO SEND MEETING DETAILS OR A LINK, YOU MUST INCLUDE THIS PROTOCOL BOX:
<div style="background-color: #faf8f2; border: 1px solid rgba(217,180,101,0.3); border-radius: 8px; padding: 24px; margin: 32px 0;">
  <h3 style="margin: 0 0 16px 0; font-size: 11px; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; color: #000000;">Meeting Protocol</h3>
  <p style="margin: 0 0 12px 0; font-size: 14px; line-height: 1.5; color: #4a4a4a;">
    <strong style="color: #000000;">Date & Time:</strong><br/>
    [Extract or infer from prompt]
  </p>
  <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #4a4a4a;">
    <strong style="color: #000000;">Secure Link:</strong><br/>
    <a href="[Link from prompt]" style="color: #0052cc; text-decoration: none;">[Link from prompt]</a>
  </p>
</div>

IF THE PROMPT HAS A CLEAR PRIMARY ACTION (LIKE JOINING A MEETING OR VIEWING A FILE), INCLUDE THIS BUTTON AT THE BOTTOM:
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 40px;">
  <tr>
    <td align="left">
      <a href="[Link]" style="display: inline-block; width: 100%; max-width: 280px; padding: 18px 0; background-color: #000000; color: #ffffff; text-decoration: none; font-weight: 800; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; border-radius: 4px; text-align: center;">
        [Button Text, e.g. Join Session 03]
      </a>
    </td>
  </tr>
</table>
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        responseMimeType: "application/json",
      }
    });

    const rawJson = response.text || '{}';
    const parsedData = JSON.parse(rawJson);

    return NextResponse.json({ 
      success: true, 
      subject: parsedData.subject || 'Blade Inner Circle — Update',
      h1Title: parsedData.h1Title || 'Institutional<br/>Broadcast.',
      generatedBody: parsedData.body || '' 
    });

  } catch (error: any) {
    console.error('Error generating email:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

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
Write a professional, high-end, and slightly authoritative email addressed to the enrolled students based on the user's prompt.
You must return your response strictly as a JSON object with two keys:
1. "subject": A punchy, authoritative subject line for the email.
2. "body": The email body formatted strictly in HTML (using <p>, <br/>, <strong>).

Do NOT start the body with "Dear students" or "Hi [Name]", because the email template already has "Hey [Name]," at the top. Just start with the actual message.
Do NOT include a sign-off like "Best," or "Blade Media," at the bottom, the template handles this too.
Make the tone sound exclusive, direct, and operational.
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
      generatedBody: parsedData.body || '' 
    });

  } catch (error: any) {
    console.error('Error generating email:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

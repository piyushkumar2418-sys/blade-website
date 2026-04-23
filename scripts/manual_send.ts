import { sendApplicationEmail } from '../lib/email';
import * as dotenv from 'dotenv';

// Load env vars
dotenv.config();

// Manual override for the key if needed
if (!process.env.BLADE_RESEND_KEY) {
  process.env.BLADE_RESEND_KEY = 're_bmWB1Eis_9q7np6UzMPaVJtfi9XgAtBk8';
}

async function run() {
  console.log('--- MANUAL EMAIL DISPATCH ---');
  console.log('Target: Srasti Soni <srastisoni138@gmail.com>');
  
  try {
    const result = await sendApplicationEmail('srastisoni138@gmail.com', 'Srasti Soni');
    
    if (result.success) {
      console.log('SUCCESS: Email dispatched via Resend.');
      console.log('ID:', result.data?.id);
    } else {
      console.error('FAILURE:', result.error);
    }
  } catch (error) {
    console.error('CRITICAL ERROR:', error);
  }
}

run();

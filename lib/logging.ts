import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Logs critical system errors to Firestore for monitoring.
 */
export async function logSystemError(error: any, context: string = 'unknown') {
  try {
    // Only log in production to avoid cluttering logs during development
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Dev Log Only]:', error, context);
      return;
    }

    await addDoc(collection(db, 'system_logs'), {
      message: error.message || String(error),
      stack: error.stack || 'No stack trace available',
      context,
      url: typeof window !== 'undefined' ? window.location.href : 'server-side',
      timestamp: serverTimestamp(),
    });
  } catch (e) {
    // Fallback to console if Firestore logging fails
    console.error('Failed to log error to Firestore:', e);
  }
}

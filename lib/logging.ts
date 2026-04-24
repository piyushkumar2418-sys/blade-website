import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Logs critical system errors to Firestore for monitoring.
 */
export async function logSystemError(error: unknown, context: string = 'unknown') {
  try {
    const err = error instanceof Error ? error : new Error(String(error));
    
    // Only log in production to avoid cluttering logs during development
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Dev Log Only]:', err, context);
      return;
    }

    await addDoc(collection(db, 'system_logs'), {
      message: err.message,
      stack: err.stack || 'No stack trace available',
      context,
      url: typeof window !== 'undefined' ? window.location.href : 'server-side',
      timestamp: serverTimestamp(),
    });
  } catch (e) {
    // Fallback to console if Firestore logging fails
    console.error('Failed to log error to Firestore:', e);
  }
}

import crypto from 'crypto';
export const hashEmail = (e: string) =>
  crypto.createHash('sha256').update(e.toLowerCase().trim()).digest('hex');

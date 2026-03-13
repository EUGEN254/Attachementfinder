// middleware/idempotency.js
import crypto from 'crypto';
import logger from '../utils/logger.js';

// Simple in-memory store ( Redis in production when theirs is multiple request )
const idempotencyStore = new Map();

// Clean up old entries every hour
setInterval(() => {
  const oneHourAgo = Date.now() - 60 * 60 * 1000;
  for (const [key, timestamp] of idempotencyStore.entries()) {
    if (timestamp < oneHourAgo) {
      idempotencyStore.delete(key);
    }
  }
}, 60 * 60 * 1000);

export const idempotencyMiddleware = (req, res, next) => {
  // Client sends this header
  const idempotencyKey = req.headers['idempotency-key'];
  
  if (!idempotencyKey) {
    return next();
  }

  // Check if we've seen this key before
  if (idempotencyStore.has(idempotencyKey)) {
    logger.warn(`Duplicate request detected with idempotency key: ${idempotencyKey}`);
    return res.status(409).json({
      success: false,
      message: 'Duplicate request detected. This request has already been processed.',
    });
  }

  // Store the key
  idempotencyStore.set(idempotencyKey, Date.now());
  
  // Add to response so client knows we support idempotency
  res.setHeader('Idempotency-Key-Accepted', idempotencyKey);
  
  next();
};
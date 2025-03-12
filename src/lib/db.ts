import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/financial-advisor-portal';

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

// Global is used here to maintain a cached connection across hot reloads
// in development. This prevents connections growing exponentially
// during API Route usage.
let cached: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } = { conn: null, promise: null };

// In development, we want to use a global variable to preserve the value
// across module reloads caused by HMR (Hot Module Replacement).
if (process.env.NODE_ENV === 'development') {
  if (!(global as any)._mongooseCache) {
    (global as any)._mongooseCache = { conn: null, promise: null };
  }
  cached = (global as any)._mongooseCache;
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect; 
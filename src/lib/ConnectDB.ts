import mongoose from 'mongoose';
import dns from 'node:dns';

dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function ConnectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined');
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
      family: 4,
    }).then((mongoose) => mongoose.connection);
  }

  try {
    cached.conn = await cached.promise;
    console.log('MongoDB Connected');
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.log('from connect db', error);
    throw error;
  }
}
import mongoose from 'mongoose';
import dns from 'node:dns';

dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

let cashed = global.mongoose;

const url = process.env.MONGODB_URI!;

if (url === undefined) {
  throw new Error('MONGODB_URI is not defined');
}

if (!cashed) {
  cashed = global.mongoose = { conn: null, promise: null };
}

export async function ConnectDB() {
  if (cashed.conn) return cashed.conn;
}
if (!cashed.promise) {
  const opt = {
    bufferCommands: true,
    maxPoolSize: 10,
  };
  cashed.promise = mongoose.connect(url, opt).then(() => mongoose.connection);
}
try {
  cashed.conn = await cashed.promise;
  console.log('Mongodb Connected');
} catch (error) {
  cashed.promise = null;
  console.log('from connect db', error);
}

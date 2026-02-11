import mongoose from "mongoose";

let cashed = global.mongoose;

const url = process.env.MONGODB_URI!;

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
} catch (error) {
  cashed.promise = null;
  console.log("from connect db", error);
}

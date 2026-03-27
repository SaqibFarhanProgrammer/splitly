import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    name: 'saqib',
    passwod: 'hello',
  };
  return NextResponse.json({ message: 'hello from api', data });
}

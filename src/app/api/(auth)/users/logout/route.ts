import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json({ message: 'Logged out successfully' });

  response.cookies.delete('splitly-token');
  return response;
}

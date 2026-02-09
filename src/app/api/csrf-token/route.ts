import { NextResponse } from 'next/server';

export async function GET() {
  // In a real implementation, generate a proper CSRF token
  // This is a simplified version for demonstration
  const token = Math.random().toString(36).substring(2, 15);
  return NextResponse.json({ token });
}
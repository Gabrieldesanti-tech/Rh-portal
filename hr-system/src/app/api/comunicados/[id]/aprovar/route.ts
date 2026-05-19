import { NextResponse } from 'next/server';
import { db } from '@/lib/db-client';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const list = await db.announcements.findMany(a => a.id === id);
    const ann = list[0];
    if (!ann) {
      return NextResponse.json({ error: 'Comunicado não encontrado' }, { status: 404 });
    }

    const updatedAnn = await db.announcements.update(id, {
      status: 'enviado',
      sentAt: new Date().toISOString(),
      recipientCount: 15 // Mock count
    });

    return NextResponse.json(updatedAnn);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { db } from '@/lib/db-client';
import { announcementInputSchema } from '@/lib/schemas';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || '';

    const list = await db.announcements.findMany(a => {
      return !status || a.status === status;
    });

    return NextResponse.json(list);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = announcementInputSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ 
        error: 'Erro de validação', 
        details: result.error.flatten().fieldErrors 
      }, { status: 400 });
    }

    const payload = {
      ...result.data,
      targetType: 'todos' as const,
      targetIds: [],
      scheduledDate: null,
      approvedBy: null,
      createdBy: 'e8', // default mock HR manager id
      sentAt: null,
    };

    const newAnn = await db.announcements.create(payload);
    return NextResponse.json(newAnn, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

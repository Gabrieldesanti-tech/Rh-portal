import { NextResponse } from 'next/server';
import { db } from '@/lib/db-client';
import { vacationInputSchema } from '@/lib/schemas';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || '';

    const list = await db.vacations.findMany(v => {
      return !status || v.status === status;
    });

    return NextResponse.json(list);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = vacationInputSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ 
        error: 'Erro de validação', 
        details: result.error.flatten().fieldErrors 
      }, { status: 400 });
    }

    const payload = {
      ...result.data,
      acquisitionStart: new Date().toISOString().split('T')[0],
      acquisitionEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      daysUsed: 0,
      approvedBy: null,
    };

    const newVac = await db.vacations.create(payload);
    return NextResponse.json(newVac, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

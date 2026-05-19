import { NextResponse } from 'next/server';
import { db } from '@/lib/db-client';
import { employeeInputSchema } from '@/lib/schemas';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase() || '';
    const deptId = searchParams.get('departmentId') || '';
    const status = searchParams.get('status') || '';

    const list = await db.employees.findMany(e => {
      const matchQuery = !query || e.fullName.toLowerCase().includes(query) || e.email.toLowerCase().includes(query);
      const matchDept = !deptId || e.departmentId === deptId;
      const matchStatus = !status || e.status === status;
      return matchQuery && matchDept && matchStatus;
    });

    return NextResponse.json(list);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = employeeInputSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ 
        error: 'Validação inválida', 
        details: result.error.flatten().fieldErrors 
      }, { status: 400 });
    }

    const newEmp = await db.employees.create(result.data);
    return NextResponse.json(newEmp, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { db } from '@/lib/db-client';
import { employeeInputSchema } from '@/lib/schemas';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const emp = await db.employees.findFirst(e => e.id === id);
    if (!emp) {
      return NextResponse.json({ error: 'Funcionário não encontrado' }, { status: 404 });
    }
    return NextResponse.json(emp);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const result = employeeInputSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ 
        error: 'Erro de validação', 
        details: result.error.flatten().fieldErrors 
      }, { status: 400 });
    }

    const updatedEmp = await db.employees.update(id, result.data);
    return NextResponse.json(updatedEmp);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const permanent = searchParams.get('permanent') === 'true';

    if (permanent) {
      // Physical deletion: remove permanently from the database
      await db.employees.delete(id);
      return NextResponse.json({ success: true, deletedId: id });
    }

    // Logical deletion: offboard employee and set status to 'desligado' and salary to 0
    const updatedEmp = await db.employees.update(id, { status: 'desligado', salary: 0 });
    return NextResponse.json({ success: true, employee: updatedEmp });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  const dataPath = path.join(__dirname, 'seed-data.json');
  const fileContent = fs.readFileSync(dataPath, 'utf8');
  const data = JSON.parse(fileContent);

  console.log('===================================================');
  console.log('Iniciando Sincronização do Banco de Dados (Seed)...');
  console.log('===================================================');

  // Clear tables in dependency order
  await prisma.vacation.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.position.deleteMany();
  await prisma.department.deleteMany();

  console.log('✔ Banco de dados limpo com sucesso.');

  // 1. Seed Departments
  for (const dept of data.departments) {
    await prisma.department.create({
      data: {
        id: dept.id,
        name: dept.name,
        description: dept.description,
      }
    });
  }
  console.log('✔ Departamentos sincronizados.');

  // 2. Seed Positions
  for (const pos of data.positions) {
    await prisma.position.create({
      data: {
        id: pos.id,
        name: pos.name,
        departmentId: pos.departmentId,
      }
    });
  }
  console.log('✔ Cargos sincronizados.');

  // Supabase Auth Admin configuration
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  let supabaseAdmin: any = null;

  if (supabaseUrl && supabaseServiceKey) {
    supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
    console.log('ℹ Conexão Admin do Supabase Auth estabelecida.');
  }

  // 3. Seed Employees & Create Auth Accounts
  for (const emp of data.employees) {
    const initials = emp.fullName
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    await prisma.employee.create({
      data: {
        id: emp.id,
        fullName: emp.fullName,
        cpf: emp.cpf,
        rg: emp.rg,
        email: emp.email,
        personalEmail: emp.personalEmail,
        phone: emp.phone,
        birthDate: emp.birthDate ? new Date(emp.birthDate) : null,
        address: emp.address,
        maritalStatus: emp.maritalStatus,
        avatarInitials: initials,
        departmentId: emp.departmentId,
        positionId: emp.positionId,
        admissionDate: new Date(emp.admissionDate),
        contractType: emp.contractType,
        status: emp.status,
        salary: emp.salary,
        benefits: emp.benefits,
      }
    });

    if (supabaseAdmin) {
      try {
        const { error: userError } = await supabaseAdmin.auth.admin.createUser({
          email: emp.email,
          password: 'senha123',
          email_confirm: true,
          user_metadata: { name: emp.fullName }
        });

        if (userError) {
          if (userError.message.includes('already exists') || userError.message.includes('email_exists')) {
            console.log(`ℹ Conta de autenticação para ${emp.email} já existente no Supabase.`);
          } else {
            console.warn(`⚠ Erro ao registrar conta no Supabase Auth para ${emp.email}: ${userError.message}`);
          }
        } else {
          console.log(`✔ Conta de autenticação gerada com sucesso para: ${emp.email}`);
        }
      } catch (err: any) {
        console.warn(`⚠ Falha ao conectar ao Auth para ${emp.email}: ${err.message}`);
      }
    }
  }
  console.log('✔ Colaboradores e credenciais sincronizadas.');

  // 4. Seed Vacations
  for (const vac of data.vacations) {
    await prisma.vacation.create({
      data: {
        id: vac.id,
        employeeId: vac.employeeId,
        status: vac.status,
        daysRemaining: vac.daysRemaining,
        concessionStart: new Date(vac.concessionStart),
        concessionEnd: new Date(vac.concessionEnd),
        requestedStart: vac.requestedStart ? new Date(vac.requestedStart) : null,
        requestedEnd: vac.requestedEnd ? new Date(vac.requestedEnd) : null,
        totalDays: vac.totalDays,
      }
    });
  }
  console.log('✔ Controle de férias sincronizado.');

  // 5. Seed Announcements
  for (const ann of data.announcements) {
    await prisma.announcement.create({
      data: {
        id: ann.id,
        title: ann.title,
        body: ann.body,
        type: ann.type,
        status: ann.status,
        recipientCount: ann.recipientCount,
        scheduledDate: ann.scheduledDate ? new Date(ann.scheduledDate) : null,
        sentAt: ann.sentAt ? new Date(ann.sentAt) : null,
      }
    });
  }
  console.log('✔ Comunicados sincronizados.');

  console.log('===================================================');
  console.log('Sincronização Finalizada com Sucesso Absoluto!');
  console.log('Todos os colaboradores fictícios podem efetuar login');
  console.log('usando a senha padrão: senha123');
  console.log('===================================================');
}

main()
  .catch((e) => {
    console.error('❌ Falha na execução do Seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

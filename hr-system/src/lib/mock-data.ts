import type {
  Department,
  Employee,
  Position,
  Vacation,
  Announcement,
  DashboardStats,
} from '@/types/hr';

// ─── Departments ──────────────────────────────────────────────────────────────
export const departments: Department[] = [
  { id: 'd1', name: 'Tecnologia', description: 'Desenvolvimento e infraestrutura', managerId: 'e2', createdAt: '2022-01-10' },
  { id: 'd2', name: 'Financeiro', description: 'Controle financeiro e contabilidade', managerId: 'e5', createdAt: '2022-01-10' },
  { id: 'd3', name: 'Recursos Humanos', description: 'Gestão de pessoas', managerId: 'e8', createdAt: '2022-01-10' },
  { id: 'd4', name: 'Comercial', description: 'Vendas e relacionamento com clientes', managerId: 'e11', createdAt: '2022-01-10' },
  { id: 'd5', name: 'Marketing', description: 'Comunicação e branding', managerId: 'e14', createdAt: '2022-01-10' },
  { id: 'd6', name: 'Jurídico', description: 'Assessoria legal', managerId: 'e17', createdAt: '2022-03-01' },
];

// ─── Positions ────────────────────────────────────────────────────────────────
export const positions: Position[] = [
  { id: 'p1', name: 'Desenvolvedor Júnior', departmentId: 'd1' },
  { id: 'p2', name: 'Desenvolvedor Sênior', departmentId: 'd1' },
  { id: 'p3', name: 'Tech Lead', departmentId: 'd1' },
  { id: 'p4', name: 'Analista Financeiro', departmentId: 'd2' },
  { id: 'p5', name: 'Coordenador Financeiro', departmentId: 'd2' },
  { id: 'p6', name: 'Analista de RH', departmentId: 'd3' },
  { id: 'p7', name: 'Coordenador de RH', departmentId: 'd3' },
  { id: 'p8', name: 'Executivo de Vendas', departmentId: 'd4' },
  { id: 'p9', name: 'Gerente Comercial', departmentId: 'd4' },
  { id: 'p10', name: 'Designer', departmentId: 'd5' },
  { id: 'p11', name: 'Analista de Marketing', departmentId: 'd5' },
  { id: 'p12', name: 'Advogado', departmentId: 'd6' },
];

// ─── Employees ────────────────────────────────────────────────────────────────
export const employees: Employee[] = [
  { id: 'e1', company: 'Igreja Mananciais', fullName: 'Ana Carolina Silva', cpf: '123.456.789-00', rg: '12.345.678-9', email: 'ana.silva@empresa.com', personalEmail: 'ana.silva@gmail.com', phone: '(11) 99999-0001', birthDate: '1990-03-15', address: 'Rua das Flores, 123 - São Paulo, SP', maritalStatus: 'Casada', positionId: 'p1', departmentId: 'd1', managerId: 'e2', admissionDate: '2022-03-01', contractType: 'CLT', status: 'ativo', salary: 5800, benefits: ['Vale Refeição', 'Plano de Saúde'], notes: '', avatarInitials: 'AC', createdAt: '2022-03-01', updatedAt: '2024-01-10' },
  { id: 'e2', company: 'Igreja Mananciais', fullName: 'Bruno Henrique Costa', cpf: '234.567.890-11', rg: '23.456.789-0', email: 'bruno.costa@empresa.com', personalEmail: 'brunoh@gmail.com', phone: '(11) 99999-0002', birthDate: '1985-07-22', address: 'Av. Paulista, 1000 - São Paulo, SP', maritalStatus: 'Casado', positionId: 'p3', departmentId: 'd1', managerId: null, admissionDate: '2021-01-15', contractType: 'CLT', status: 'ativo', salary: 14500, benefits: ['Vale Refeição', 'Plano de Saúde', 'Gympass'], notes: 'Tech Lead sênior', avatarInitials: 'BH', createdAt: '2021-01-15', updatedAt: '2024-01-10' },
  { id: 'e3', company: 'Phizchat', fullName: 'Carla Mendes Rocha', cpf: '345.678.901-22', rg: '34.567.890-1', email: 'carla.rocha@empresa.com', personalEmail: 'carla.rocha@hotmail.com', phone: '(11) 99999-0003', birthDate: '1993-11-08', address: 'Rua Augusta, 500 - São Paulo, SP', maritalStatus: 'Solteira', positionId: 'p2', departmentId: 'd1', managerId: 'e2', admissionDate: '2022-06-01', contractType: 'CLT', status: 'ferias', salary: 9200, benefits: ['Vale Refeição', 'Plano de Saúde'], notes: '', avatarInitials: 'CM', createdAt: '2022-06-01', updatedAt: '2024-03-01' },
  { id: 'e4', company: 'Phizchat', fullName: 'Diego Alves Pereira', cpf: '456.789.012-33', rg: '45.678.901-2', email: 'diego.pereira@empresa.com', personalEmail: 'diegop@gmail.com', phone: '(11) 99999-0004', birthDate: '1991-05-30', address: 'Rua Consolação, 200 - São Paulo, SP', maritalStatus: 'Solteiro', positionId: 'p2', departmentId: 'd1', managerId: 'e2', admissionDate: '2023-02-01', contractType: 'CLT', status: 'ativo', salary: 8800, benefits: ['Vale Refeição', 'Plano de Saúde'], notes: '', avatarInitials: 'DA', createdAt: '2023-02-01', updatedAt: '2024-01-10' },
  { id: 'e5', company: 'Igreja Mananciais', fullName: 'Eduarda Martins Lima', cpf: '567.890.123-44', rg: '56.789.012-3', email: 'eduarda.lima@empresa.com', personalEmail: 'dudalima@gmail.com', phone: '(11) 99999-0005', birthDate: '1988-09-12', address: 'Rua Oscar Freire, 333 - São Paulo, SP', maritalStatus: 'Casada', positionId: 'p5', departmentId: 'd2', managerId: null, admissionDate: '2021-03-10', contractType: 'CLT', status: 'ativo', salary: 12000, benefits: ['Vale Refeição', 'Plano de Saúde', 'Previdência Privada'], notes: 'Coordenadora financeira', avatarInitials: 'EL', createdAt: '2021-03-10', updatedAt: '2024-01-10' },
  { id: 'e6', company: 'Igreja Mananciais', fullName: 'Fábio Carvalho Santos', cpf: '678.901.234-55', rg: '67.890.123-4', email: 'fabio.santos@empresa.com', personalEmail: 'fabiocsantos@gmail.com', phone: '(11) 99999-0006', birthDate: '1994-01-25', address: 'Al. Santos, 700 - São Paulo, SP', maritalStatus: 'Solteiro', positionId: 'p4', departmentId: 'd2', managerId: 'e5', admissionDate: '2023-04-01', contractType: 'CLT', status: 'afastado', salary: 6500, benefits: ['Vale Refeição', 'Plano de Saúde'], notes: 'Afastamento médico', avatarInitials: 'FC', createdAt: '2023-04-01', updatedAt: '2024-02-15' },
  { id: 'e7', company: 'Igreja Mananciais', fullName: 'Gabriela Nunes Ferreira', cpf: '789.012.345-66', rg: '78.901.234-5', email: 'gabriela.ferreira@empresa.com', personalEmail: 'gabi.ferreira@gmail.com', phone: '(11) 99999-0007', birthDate: '1996-04-18', address: 'Rua da Consolação, 1200 - São Paulo, SP', maritalStatus: 'Solteira', positionId: 'p4', departmentId: 'd2', managerId: 'e5', admissionDate: '2023-07-01', contractType: 'CLT', status: 'ativo', salary: 6200, benefits: ['Vale Refeição', 'Plano de Saúde'], notes: '', avatarInitials: 'GN', createdAt: '2023-07-01', updatedAt: '2024-01-10' },
  { id: 'e8', company: 'Igreja Mananciais', fullName: 'Helena Souza Baptista', cpf: '890.123.456-77', rg: '89.012.345-6', email: 'helena.baptista@empresa.com', personalEmail: 'helenasb@gmail.com', phone: '(11) 99999-0008', birthDate: '1987-12-03', address: 'Rua Bela Cintra, 400 - São Paulo, SP', maritalStatus: 'Casada', positionId: 'p7', departmentId: 'd3', managerId: null, admissionDate: '2020-08-01', contractType: 'CLT', status: 'ativo', salary: 11000, benefits: ['Vale Refeição', 'Plano de Saúde', 'Gympass'], notes: 'Coordenadora de RH', avatarInitials: 'HB', createdAt: '2020-08-01', updatedAt: '2024-01-10' },
  { id: 'e9', company: 'Igreja Mananciais', fullName: 'Igor Teixeira Moraes', cpf: '901.234.567-88', rg: '90.123.456-7', email: 'igor.moraes@empresa.com', personalEmail: 'igortm@gmail.com', phone: '(11) 99999-0009', birthDate: '1992-08-14', address: 'Rua Pamplona, 100 - São Paulo, SP', maritalStatus: 'Solteiro', positionId: 'p6', departmentId: 'd3', managerId: 'e8', admissionDate: '2022-11-01', contractType: 'CLT', status: 'ativo', salary: 5500, benefits: ['Vale Refeição', 'Plano de Saúde'], notes: '', avatarInitials: 'IT', createdAt: '2022-11-01', updatedAt: '2024-01-10' },
  { id: 'e10', company: 'Phizchat', fullName: 'Juliana Castro Pinto', cpf: '012.345.678-99', rg: '01.234.567-8', email: 'juliana.pinto@empresa.com', personalEmail: 'juca.pinto@gmail.com', phone: '(11) 99999-0010', birthDate: '1995-06-20', address: 'Rua Haddock Lobo, 300 - São Paulo, SP', maritalStatus: 'Solteira', positionId: 'p6', departmentId: 'd3', managerId: 'e8', admissionDate: '2024-01-02', contractType: 'CLT', status: 'admissao', salary: 4800, benefits: ['Vale Refeição', 'Plano de Saúde'], notes: 'Em período de experiência', avatarInitials: 'JC', createdAt: '2024-01-02', updatedAt: '2024-01-02' },
  { id: 'e11', company: 'Phizchat', fullName: 'Kaique Rodrigues Dias', cpf: '111.222.333-00', rg: '11.222.333-0', email: 'kaique.dias@empresa.com', personalEmail: 'kaiquerd@gmail.com', phone: '(11) 99999-0011', birthDate: '1983-02-09', address: 'Av. Brigadeiro Faria Lima, 2000 - São Paulo, SP', maritalStatus: 'Casado', positionId: 'p9', departmentId: 'd4', managerId: null, admissionDate: '2019-05-01', contractType: 'CLT', status: 'ativo', salary: 15000, benefits: ['Vale Refeição', 'Plano de Saúde', 'Comissão', 'Previdência Privada'], notes: 'Gerente Comercial', avatarInitials: 'KR', createdAt: '2019-05-01', updatedAt: '2024-01-10' },
  { id: 'e12', company: 'Phizchat', fullName: 'Larissa Matos Vieira', cpf: '222.333.444-11', rg: '22.333.444-1', email: 'larissa.vieira@empresa.com', personalEmail: 'larivieira@gmail.com', phone: '(11) 99999-0012', birthDate: '1997-10-05', address: 'Rua Itapeva, 150 - São Paulo, SP', maritalStatus: 'Solteira', positionId: 'p8', departmentId: 'd4', managerId: 'e11', admissionDate: '2023-08-01', contractType: 'CLT', status: 'ativo', salary: 5000, benefits: ['Vale Refeição', 'Plano de Saúde', 'Comissão'], notes: '', avatarInitials: 'LM', createdAt: '2023-08-01', updatedAt: '2024-01-10' },
  { id: 'e13', company: 'Phizchat', fullName: 'Marcelo Cunha Araújo', cpf: '333.444.555-22', rg: '33.444.555-2', email: 'marcelo.araujo@empresa.com', personalEmail: 'marcelocaraujo@gmail.com', phone: '(11) 99999-0013', birthDate: '1989-12-28', address: 'Rua Joaquim Floriano, 100 - São Paulo, SP', maritalStatus: 'Casado', positionId: 'p8', departmentId: 'd4', managerId: 'e11', admissionDate: '2022-01-10', contractType: 'CLT', status: 'desligado', salary: 0, benefits: [], notes: 'Desligado em 02/2024', avatarInitials: 'MC', createdAt: '2022-01-10', updatedAt: '2024-02-28' },
  { id: 'e14', company: 'Phizchat', fullName: 'Natália Barbosa Gomes', cpf: '444.555.666-33', rg: '44.555.666-3', email: 'natalia.gomes@empresa.com', personalEmail: 'natabgomes@gmail.com', phone: '(11) 99999-0014', birthDate: '1991-07-11', address: 'Rua dos Pinheiros, 800 - São Paulo, SP', maritalStatus: 'Casada', positionId: 'p11', departmentId: 'd5', managerId: null, admissionDate: '2021-06-01', contractType: 'CLT', status: 'ativo', salary: 9500, benefits: ['Vale Refeição', 'Plano de Saúde'], notes: 'Coordenadora de Marketing', avatarInitials: 'NG', createdAt: '2021-06-01', updatedAt: '2024-01-10' },
  { id: 'e15', company: 'Phizchat', fullName: 'Otávio Lima Ramos', cpf: '555.666.777-44', rg: '55.666.777-4', email: 'otavio.ramos@empresa.com', personalEmail: 'otaviolramos@gmail.com', phone: '(11) 99999-0015', birthDate: '1998-05-19', address: 'Rua Teodoro Sampaio, 200 - São Paulo, SP', maritalStatus: 'Solteiro', positionId: 'p10', departmentId: 'd5', managerId: 'e14', admissionDate: '2023-10-01', contractType: 'Estágio', status: 'ativo', salary: 2200, benefits: ['Vale Refeição'], notes: 'Estagiário de design', avatarInitials: 'OL', createdAt: '2023-10-01', updatedAt: '2024-01-10' }
];

// ─── Vacations ────────────────────────────────────────────────────────────────
export const vacations: Vacation[] = [
  { id: 'v1', employeeId: 'e1', acquisitionStart: '2022-03-01', acquisitionEnd: '2023-03-01', concessionStart: '2023-03-02', concessionEnd: '2024-03-01', requestedStart: '2023-07-10', requestedEnd: '2023-07-30', totalDays: 30, daysUsed: 20, daysRemaining: 10, status: 'concluida', approvedBy: 'e8', createdAt: '2023-06-20' },
  { id: 'v2', employeeId: 'e3', acquisitionStart: '2022-06-01', acquisitionEnd: '2023-06-01', concessionStart: '2023-06-02', concessionEnd: '2024-06-01', requestedStart: '2024-03-01', requestedEnd: '2024-03-30', totalDays: 30, daysUsed: 0, daysRemaining: 30, status: 'em_andamento', approvedBy: 'e8', createdAt: '2024-02-10' },
  { id: 'v3', employeeId: 'e2', acquisitionStart: '2023-01-15', acquisitionEnd: '2024-01-15', concessionStart: '2024-01-16', concessionEnd: '2025-01-15', requestedStart: null, requestedEnd: null, totalDays: 30, daysUsed: 0, daysRemaining: 30, status: 'disponivel', approvedBy: null, createdAt: '2024-01-16' },
  { id: 'v4', employeeId: 'e4', acquisitionStart: '2023-02-01', acquisitionEnd: '2024-02-01', concessionStart: '2024-02-02', concessionEnd: '2025-02-01', requestedStart: '2024-04-10', requestedEnd: '2024-05-09', totalDays: 30, daysUsed: 0, daysRemaining: 30, status: 'aprovada', approvedBy: 'e8', createdAt: '2024-03-15' },
  { id: 'v5', employeeId: 'e7', acquisitionStart: '2023-07-01', acquisitionEnd: '2024-07-01', concessionStart: '2024-07-02', concessionEnd: '2025-07-01', requestedStart: null, requestedEnd: null, totalDays: 30, daysUsed: 0, daysRemaining: 30, status: 'aguardando_periodo', approvedBy: null, createdAt: '2023-07-01' },
];

// ─── Announcements ────────────────────────────────────────────────────────────
export const announcements: Announcement[] = [
  { id: 'a1', title: 'Feliz Dia das Mães!', body: 'Queremos celebrar todas as mães da nossa equipe neste dia especial. Obrigado por tudo que vocês fazem!', type: 'comemorativo', status: 'enviado', targetType: 'todos', targetIds: [], scheduledDate: '2024-05-12', approvedBy: 'e8', createdBy: 'e9', sentAt: '2024-05-12T09:00:00', createdAt: '2024-05-08', recipientCount: 15 },
  { id: 'a2', title: 'Ponto Facultativo — Corpus Christi', body: 'Informamos que na próxima quinta-feira, dia 30/05, teremos ponto facultativo em razão do feriado de Corpus Christi.', type: 'manual', status: 'aprovado', targetType: 'todos', targetIds: [], scheduledDate: '2024-05-28', approvedBy: 'e8', createdBy: 'e9', sentAt: null, createdAt: '2024-05-20', recipientCount: 14 },
  { id: 'a3', title: 'Reunião Geral — Resultados Q1', body: 'Convidamos todos para a reunião geral de resultados do primeiro trimestre. Data: 15/04 às 10h na sala de reuniões principal.', type: 'manual', status: 'enviado', targetType: 'todos', targetIds: [], scheduledDate: null, approvedBy: 'e8', createdBy: 'e8', sentAt: '2024-04-12T16:00:00', createdAt: '2024-04-10', recipientCount: 15 },
  { id: 'a4', title: 'Férias Coletivas — Julho 2024', body: 'Comunicamos que a empresa terá férias coletivas no período de 15 a 31 de julho de 2024. Mais detalhes serão enviados em breve.', type: 'manual', status: 'pendente', targetType: 'todos', targetIds: [], scheduledDate: null, approvedBy: null, createdBy: 'e9', sentAt: null, createdAt: '2024-05-22', recipientCount: 0 },
  { id: 'a5', title: 'Aniversário — Bruno Costa', body: 'Hoje é aniversário do nosso Tech Lead Bruno! Vamos parabenizá-lo!', type: 'comemorativo', status: 'agendado', targetType: 'todos', targetIds: [], scheduledDate: '2024-07-22', approvedBy: 'e8', createdBy: 'e9', sentAt: null, createdAt: '2024-05-01', recipientCount: 14 },
];

// ─── Dashboard stats ──────────────────────────────────────────────────────────
export const dashboardStats: DashboardStats = {
  totalEmployees: employees.length,
  activeEmployees: employees.filter(e => e.status === 'ativo').length,
  onLeave: employees.filter(e => e.status === 'afastado').length,
  onVacation: employees.filter(e => e.status === 'ferias').length,
  dismissed: employees.filter(e => e.status === 'desligado').length,
  inAdmission: employees.filter(e => e.status === 'admissao').length,
  monthlyPayroll: employees
    .filter(e => e.status !== 'desligado')
    .reduce((sum, e) => sum + e.salary, 0),
  vacationsNext30Days: 3,
  pendingAnnouncements: announcements.filter(a => a.status === 'pendente').length,
  upcomingBirthdays: employees.filter(e =>
    ['e2', 'e10', 'e14'].includes(e.id)
  ),
  recentAnnouncements: announcements.slice(0, 4),
  byDepartment: departments.map(d => ({
    department: d.name,
    count: employees.filter(e => e.departmentId === d.id && e.status !== 'desligado').length,
  })),
};

// ─── Helper lookups ───────────────────────────────────────────────────────────
export const getDepartmentById = (id: string) =>
  departments.find(d => d.id === id);

export const getPositionById = (id: string) =>
  positions.find(p => p.id === id);

export const getEmployeeById = (id: string) =>
  employees.find(e => e.id === id);

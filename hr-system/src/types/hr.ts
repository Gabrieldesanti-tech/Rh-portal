// ─── Employee ──────────────────────────────────────────────────────────────────
export type EmployeeStatus =
  | 'ativo'
  | 'afastado'
  | 'ferias'
  | 'desligado'
  | 'admissao';

export type ContractType = 'CLT' | 'PJ' | 'Estágio' | 'Temporário';

export interface Department {
  id: string;
  name: string;
  description: string | null;
  managerId: string | null;
  createdAt: string;
}

export interface Position {
  id: string;
  name: string;
  departmentId: string;
}

export interface Employee {
  id: string;
  company: string; // 'Igreja Mananciais' | 'Phizchat'
  fullName: string;
  cpf: string;
  rg: string;
  email: string;
  personalEmail: string;
  phone: string;
  birthDate: string;
  address: string;
  maritalStatus: string;
  positionId: string;
  departmentId: string;
  managerId: string | null;
  admissionDate: string;
  contractType: ContractType;
  status: EmployeeStatus;
  salary: number;
  benefits: string[];
  notes: string;
  avatarInitials: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Vacation ─────────────────────────────────────────────────────────────────
export type VacationStatus =
  | 'aguardando_periodo'
  | 'disponivel'
  | 'solicitada'
  | 'aprovada'
  | 'reprovada'
  | 'em_andamento'
  | 'concluida'
  | 'vencida';

export interface Vacation {
  id: string;
  employeeId: string;
  acquisitionStart: string;
  acquisitionEnd: string;
  concessionStart: string;
  concessionEnd: string;
  requestedStart: string | null;
  requestedEnd: string | null;
  totalDays: number;
  daysUsed: number;
  daysRemaining: number;
  status: VacationStatus;
  approvedBy: string | null;
  createdAt: string;
}

// ─── Announcement ─────────────────────────────────────────────────────────────
export type AnnouncementStatus =
  | 'rascunho'
  | 'pendente'
  | 'aprovado'
  | 'agendado'
  | 'enviado'
  | 'cancelado'
  | 'reprovado';

export type AnnouncementTargetType = 'todos' | 'departamento' | 'cargo' | 'individual';

export interface Announcement {
  id: string;
  title: string;
  body: string;
  type: 'manual' | 'automatico' | 'comemorativo';
  status: AnnouncementStatus;
  targetType: AnnouncementTargetType;
  targetIds: string[];
  scheduledDate: string | null;
  approvedBy: string | null;
  createdBy: string;
  sentAt: string | null;
  createdAt: string;
  recipientCount: number;
}

// ─── Dashboard stats ──────────────────────────────────────────────────────────
export interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  onLeave: number;
  onVacation: number;
  dismissed: number;
  inAdmission: number;
  monthlyPayroll: number;
  vacationsNext30Days: number;
  pendingAnnouncements: number;
  upcomingBirthdays: Employee[];
  recentAnnouncements: Announcement[];
  byDepartment: { department: string; count: number }[];
}

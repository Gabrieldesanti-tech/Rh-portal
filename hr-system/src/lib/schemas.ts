import { z } from 'zod';

export const employeeInputSchema = z.object({
  company: z.string().min(1, "Empresa é obrigatória"),
  fullName: z.string().min(3, "O nome deve conter pelo menos 3 caracteres"),
  cpf: z.string().default(''),
  rg: z.string().default(''),
  email: z.string().email("E-mail corporativo inválido"),
  personalEmail: z.string().default(''),
  phone: z.string().default(''),
  birthDate: z.string().default(''),
  address: z.string().default(''),
  maritalStatus: z.string().default(''),
  departmentId: z.string().min(1, "Departamento é obrigatório"),
  positionId: z.string().min(1, "Cargo é obrigatório"),
  managerId: z.string().nullable().default(null),
  admissionDate: z.string().min(1, "Data de admissão é obrigatória"),
  contractType: z.enum(['CLT', 'PJ', 'Estágio', 'Temporário']),
  status: z.enum(['ativo', 'afastado', 'ferias', 'desligado', 'admissao']),
  salary: z.coerce.number().min(0, "O salário deve ser um número positivo"),
  benefits: z.array(z.string()).default([]),
  notes: z.string().default(''),
});

export const announcementInputSchema = z.object({
  title: z.string().min(3, "O título deve conter pelo menos 3 caracteres"),
  body: z.string().min(5, "A mensagem deve conter pelo menos 5 caracteres"),
  type: z.enum(['manual', 'automatico', 'comemorativo']).default('manual'),
  status: z.enum(['rascunho', 'pendente', 'aprovado', 'agendado', 'enviado', 'cancelado', 'reprovado']).default('pendente'),
  recipientCount: z.coerce.number().default(0),
});

export const vacationInputSchema = z.object({
  employeeId: z.string().min(1, "Funcionário é obrigatório"),
  status: z.enum(['aguardando_periodo', 'disponivel', 'solicitada', 'aprovada', 'reprovada', 'em_andamento', 'concluida', 'vencida']).default('disponivel'),
  daysRemaining: z.coerce.number().default(30),
  concessionStart: z.string(),
  concessionEnd: z.string(),
  requestedStart: z.string().nullable().default(null),
  requestedEnd: z.string().nullable().default(null),
  totalDays: z.coerce.number().default(30),
});

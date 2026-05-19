import { PrismaClient } from '@prisma/client';
import type { Employee, Department, Position, Vacation, Announcement } from '@/types/hr';

// Initialize Prisma client with Next.js hot-reloading safe pattern
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prismaInstance = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaInstance;

// Type serialization & deserialization helpers for Prisma (DateTime to ISO String)
function serializeEmployee(emp: any): Employee {
  return {
    ...emp,
    birthDate: emp.birthDate ? new Date(emp.birthDate).toISOString() : '',
    admissionDate: emp.admissionDate ? new Date(emp.admissionDate).toISOString() : '',
    createdAt: emp.createdAt ? new Date(emp.createdAt).toISOString() : '',
    updatedAt: emp.updatedAt ? new Date(emp.updatedAt).toISOString() : '',
  };
}

function deserializeEmployee(emp: any): any {
  const { id, createdAt, updatedAt, avatarInitials, ...rest } = emp;
  return {
    ...rest,
    birthDate: emp.birthDate ? new Date(emp.birthDate) : null,
    admissionDate: emp.admissionDate ? new Date(emp.admissionDate) : new Date(),
  };
}

function serializeVacation(vac: any): Vacation {
  return {
    ...vac,
    concessionStart: vac.concessionStart ? new Date(vac.concessionStart).toISOString() : '',
    concessionEnd: vac.concessionEnd ? new Date(vac.concessionEnd).toISOString() : '',
    requestedStart: vac.requestedStart ? new Date(vac.requestedStart).toISOString() : null,
    requestedEnd: vac.requestedEnd ? new Date(vac.requestedEnd).toISOString() : null,
    createdAt: vac.createdAt ? new Date(vac.createdAt).toISOString() : '',
  };
}

function deserializeVacation(vac: any): any {
  const { id, createdAt, updatedAt, ...rest } = vac;
  return {
    ...rest,
    concessionStart: vac.concessionStart ? new Date(vac.concessionStart) : new Date(),
    concessionEnd: vac.concessionEnd ? new Date(vac.concessionEnd) : new Date(),
    requestedStart: vac.requestedStart ? new Date(vac.requestedStart) : null,
    requestedEnd: vac.requestedEnd ? new Date(vac.requestedEnd) : null,
  };
}

function serializeAnnouncement(ann: any): Announcement {
  return {
    ...ann,
    scheduledDate: ann.scheduledDate ? new Date(ann.scheduledDate).toISOString() : null,
    sentAt: ann.sentAt ? new Date(ann.sentAt).toISOString() : null,
    createdAt: ann.createdAt ? new Date(ann.createdAt).toISOString() : '',
  };
}

function deserializeAnnouncement(ann: any): any {
  const { id, createdAt, updatedAt, ...rest } = ann;
  return {
    ...rest,
    scheduledDate: ann.scheduledDate ? new Date(ann.scheduledDate) : null,
    sentAt: ann.sentAt ? new Date(ann.sentAt) : null,
  };
}

export const db = {
  employees: {
    findMany: async (filter?: (e: Employee) => boolean): Promise<Employee[]> => {
      const list = await prismaInstance.employee.findMany({ orderBy: { createdAt: 'desc' } });
      const serialized = list.map(serializeEmployee);
      return filter ? serialized.filter(filter) : serialized;
    },
    findFirst: async (filter: (e: Employee) => boolean): Promise<Employee | null> => {
      const list = await prismaInstance.employee.findMany();
      const serialized = list.map(serializeEmployee);
      return serialized.find(filter) || null;
    },
    create: async (payload: Omit<Employee, 'id' | 'createdAt' | 'updatedAt' | 'avatarInitials'>): Promise<Employee> => {
      const initials = payload.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
      const data = deserializeEmployee({ ...payload, avatarInitials: initials });
      const created = await prismaInstance.employee.create({ data: { ...data, avatarInitials: initials } });
      return serializeEmployee(created);
    },
    update: async (id: string, payload: Partial<Employee>): Promise<Employee> => {
      const data = deserializeEmployee(payload);
      const updated = await prismaInstance.employee.update({ where: { id }, data });
      return serializeEmployee(updated);
    },
    delete: async (id: string): Promise<void> => {
      await prismaInstance.employee.delete({ where: { id } });
    }
  },
  departments: {
    findMany: async (): Promise<Department[]> => {
      const list = await prismaInstance.department.findMany({ orderBy: { name: 'asc' } });
      return list.map((d: any) => ({ ...d, createdAt: d.createdAt.toISOString() }));
    }
  },
  positions: {
    findMany: async (): Promise<Position[]> => {
      return await prismaInstance.position.findMany({ orderBy: { name: 'asc' } });
    }
  },
  vacations: {
    findMany: async (filter?: (v: Vacation) => boolean): Promise<Vacation[]> => {
      const list = await prismaInstance.vacation.findMany({ orderBy: { createdAt: 'desc' } });
      const serialized = list.map(serializeVacation);
      return filter ? serialized.filter(filter) : serialized;
    },
    create: async (payload: Omit<Vacation, 'id' | 'createdAt'>): Promise<Vacation> => {
      const data = deserializeVacation(payload);
      const created = await prismaInstance.vacation.create({ data });
      return serializeVacation(created);
    },
    update: async (id: string, payload: Partial<Vacation>): Promise<Vacation> => {
      const data = deserializeVacation(payload);
      const updated = await prismaInstance.vacation.update({ where: { id }, data });
      return serializeVacation(updated);
    }
  },
  announcements: {
    findMany: async (filter?: (a: Announcement) => boolean): Promise<Announcement[]> => {
      const list = await prismaInstance.announcement.findMany({ orderBy: { createdAt: 'desc' } });
      const serialized = list.map(serializeAnnouncement);
      return filter ? serialized.filter(filter) : serialized;
    },
    create: async (payload: Omit<Announcement, 'id' | 'createdAt'>): Promise<Announcement> => {
      const data = deserializeAnnouncement(payload);
      const created = await prismaInstance.announcement.create({ data });
      return serializeAnnouncement(created);
    },
    update: async (id: string, payload: Partial<Announcement>): Promise<Announcement> => {
      const data = deserializeAnnouncement(payload);
      const updated = await prismaInstance.announcement.update({ where: { id }, data });
      return serializeAnnouncement(updated);
    }
  }
};

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db-client';
import { format, addDays, isAfter, isBefore } from 'date-fns';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyParam = searchParams.get('company');

    let allEmployees = await db.employees.findMany();
    const allDepartments = await db.departments.findMany();
    const allVacations = await db.vacations.findMany();
    const allAnnouncements = await db.announcements.findMany();

    // Calculate payrolls by company (always return this for comparison)
    const payrollByCompany = [
      {
        company: 'Igreja Mananciais',
        payroll: allEmployees
          .filter(e => e.company === 'Igreja Mananciais' && e.status !== 'desligado')
          .reduce((sum, e) => sum + (e.salary || 0), 0),
        employeeCount: allEmployees
          .filter(e => e.company === 'Igreja Mananciais' && e.status !== 'desligado').length
      },
      {
        company: 'Phizchat',
        payroll: allEmployees
          .filter(e => e.company === 'Phizchat' && e.status !== 'desligado')
          .reduce((sum, e) => sum + (e.salary || 0), 0),
        employeeCount: allEmployees
          .filter(e => e.company === 'Phizchat' && e.status !== 'desligado').length
      }
    ];

    // Filter employees by company if specified
    if (companyParam && companyParam !== 'Todas') {
      allEmployees = allEmployees.filter(e => e.company === companyParam);
    }

    const employeeIds = new Set(allEmployees.map(e => e.id));
    const filteredVacations = allVacations.filter(v => employeeIds.has(v.employeeId));

    // 1. Employee metrics
    const totalEmployees = allEmployees.filter(e => e.status !== 'desligado').length;
    const activeEmployees = allEmployees.filter(e => e.status === 'ativo').length;
    const onLeave = allEmployees.filter(e => e.status === 'afastado').length;
    const onVacation = allEmployees.filter(e => e.status === 'ferias').length;
    const dismissed = allEmployees.filter(e => e.status === 'desligado').length;

    // 2. Monthly payroll (sum of salaries for non-dismissed employees)
    const monthlyPayroll = allEmployees
      .filter(e => e.status !== 'desligado')
      .reduce((sum, e) => sum + (e.salary || 0), 0);

    // 3. Pending announcements count
    const pendingAnnouncements = allAnnouncements.filter(a => a.status === 'pendente').length;

    // 4. Vacations in next 30 days
    const now = new Date();
    const next30 = addDays(now, 30);
    const vacationsNext30Days = filteredVacations.filter(v => {
      if (!v.requestedStart) return false;
      const start = new Date(v.requestedStart);
      return isAfter(start, now) && isBefore(start, next30);
    }).length;

    // 5. Distribution by department
    const byDepartment = allDepartments.map(dept => {
      const count = allEmployees.filter(e => e.departmentId === dept.id && e.status !== 'desligado').length;
      return {
        department: dept.name,
        count,
      };
    }).sort((a, b) => b.count - a.count);

    // 6. Upcoming birthdays (next 30 days)
    const upcomingBirthdays = allEmployees
      .filter(e => e.status !== 'desligado' && e.birthDate)
      .filter(e => {
        const birth = new Date(e.birthDate);
        const birthMonth = birth.getMonth();
        const birthDay = birth.getDate();
        
        // Check if birthdate falls in the next 30 days
        const birthThisYear = new Date(now.getFullYear(), birthMonth, birthDay);
        const birthNextYear = new Date(now.getFullYear() + 1, birthMonth, birthDay);
        
        const isThisYear = isAfter(birthThisYear, now) && isBefore(birthThisYear, next30);
        const isNextYear = isAfter(birthNextYear, now) && isBefore(birthNextYear, next30);
        
        return isThisYear || isNextYear;
      })
      .map(e => ({
        id: e.id,
        fullName: e.fullName,
        avatarInitials: e.avatarInitials,
        birthDate: e.birthDate,
        departmentId: e.departmentId,
      }))
      .slice(0, 5);

    // 7. Recent announcements
    const recentAnnouncements = allAnnouncements
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 4);

    return NextResponse.json({
      totalEmployees,
      activeEmployees,
      monthlyPayroll,
      pendingAnnouncements,
      onLeave,
      onVacation,
      vacationsNext30Days,
      dismissed,
      byDepartment,
      upcomingBirthdays,
      recentAnnouncements,
      payrollByCompany,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

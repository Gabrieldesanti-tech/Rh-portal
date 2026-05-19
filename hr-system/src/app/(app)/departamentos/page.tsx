'use client';

import { departments, employees, positions } from '@/lib/mock-data';
import { Users, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function DepartamentosPage() {
  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <div className="mb-8 animate-fade-up">
        <h1 className="text-3xl font-black tracking-tight">
          Departamentos <span className="text-[#e8ff2a]">({departments.length})</span>
        </h1>
        <p className="text-sm text-[#555] mt-1">Estrutura organizacional da empresa</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
        {departments.map((dept, i) => {
          const deptEmployees = employees.filter(e => e.departmentId === dept.id && e.status !== 'desligado');
          const deptPositions = positions.filter(p => p.departmentId === dept.id);
          const manager = employees.find(e => e.id === dept.managerId);

          return (
            <div key={dept.id} className="hr-card p-6 group animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-base font-black text-[#f0f0f0] group-hover:text-[#e8ff2a] transition-colors">
                    {dept.name}
                  </h2>
                  <p className="text-xs text-[#555] mt-0.5">{dept.description}</p>
                </div>
                <div className="w-8 h-8 bg-[#1a1a1a] flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-black text-[#e8ff2a]">{deptEmployees.length}</span>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-[#555]">Colaboradores</span>
                  <span className="font-mono text-[#888]">{deptEmployees.length}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#555]">Cargos</span>
                  <span className="font-mono text-[#888]">{deptPositions.length}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#555]">Gestor</span>
                  <span className="text-[#888]">{manager?.fullName?.split(' ')[0] ?? '—'}</span>
                </div>
              </div>
              <div className="w-full bg-[#1a1a1a] h-[2px] mb-4">
                <div className="h-[2px] bg-[#e8ff2a]" style={{ width: `${Math.min((deptEmployees.length / 5) * 100, 100)}%` }} />
              </div>
              <Link href={`/funcionarios?dept=${dept.id}`} className="flex items-center gap-1.5 text-xs text-[#555] hover:text-[#e8ff2a] transition-colors">
                <Users size={11} /> Ver funcionários <ChevronRight size={11} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

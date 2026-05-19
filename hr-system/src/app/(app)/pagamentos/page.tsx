import { employees, getDepartmentById } from '@/lib/mock-data';
import { DollarSign, TrendingUp, Shield } from 'lucide-react';

function formatCurrency(val: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
}

export default function PagamentosPage() {
  const active = employees.filter(e => e.status !== 'desligado');
  const totalPayroll = active.reduce((s, e) => s + e.salary, 0);
  const avgSalary = totalPayroll / active.length;

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <div className="mb-8 animate-fade-up">
        <h1 className="text-3xl font-black tracking-tight">
          Pagamentos <span className="text-[#e8ff2a]">& Salários</span>
        </h1>
        <p className="text-sm text-[#555] mt-1">Controle de remuneração dos colaboradores</p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: 'Folha Mensal Total', value: formatCurrency(totalPayroll), icon: DollarSign, accent: true },
          { label: 'Média Salarial', value: formatCurrency(avgSalary), icon: TrendingUp },
          { label: 'Colaboradores Ativos', value: active.length.toString(), icon: Shield },
        ].map(card => {
          const Icon = card.icon;
          return (
            <div key={card.label} className={`hr-card p-5 animate-fade-up ${card.accent ? 'hr-card-accent' : ''}`}>
              <div className="flex justify-between mb-3">
                <span className="text-[10px] text-[#555] uppercase tracking-widest">{card.label}</span>
                <Icon size={14} className={card.accent ? 'text-[#e8ff2a]' : 'text-[#444]'} />
              </div>
              <p className="stat-number">{card.value}</p>
            </div>
          );
        })}
      </div>

      <div className="hr-card overflow-hidden">
        <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr] px-5 py-3 border-b border-[#1f1f1f]">
          {['Funcionário', 'Departamento', 'Contrato', 'Salário'].map(h => (
            <span key={h} className="text-[10px] text-[#555] uppercase tracking-widest font-semibold">{h}</span>
          ))}
        </div>
        {active.map((emp, i) => {
          const dept = getDepartmentById(emp.departmentId);
          return (
            <div key={emp.id} className="grid grid-cols-[2fr_1.5fr_1fr_1fr] items-center px-5 py-3.5 border-b border-[#111] hover:bg-[#0d0d0d] transition-colors" style={{ animationDelay: `${i * 20}ms` }}>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-[#1a1a1a] border border-[#2f2f2f] flex items-center justify-center">
                  <span className="text-[9px] font-bold text-[#666]">{emp.avatarInitials}</span>
                </div>
                <span className="text-sm text-[#f0f0f0] font-medium">{emp.fullName}</span>
              </div>
              <span className="text-xs text-[#888]">{dept?.name}</span>
              <span className="text-xs text-[#888]">{emp.contractType}</span>
              <span className="text-sm font-mono font-bold text-[#e8ff2a]">{formatCurrency(emp.salary)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

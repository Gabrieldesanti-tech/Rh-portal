'use client';

import { useState, useMemo, useEffect } from 'react';
import { employees as initialEmployees, departments, positions, getDepartmentById, getPositionById } from '@/lib/mock-data';
import type { Employee, EmployeeStatus } from '@/types/hr';
import {
  Search, Plus, Filter, ChevronDown, MoreHorizontal,
  User, Mail, Phone, Building2, Briefcase, CalendarDays,
  X, Edit, Trash2, Eye,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import EmployeeForm from '@/components/hr/EmployeeForm';

const STATUS_LABELS: Record<EmployeeStatus, string> = {
  ativo: 'Ativo',
  afastado: 'Afastado',
  ferias: 'Férias',
  desligado: 'Desligado',
  admissao: 'Em Admissão',
};

const STATUS_CLASS: Record<EmployeeStatus, string> = {
  ativo: 'badge-ativo',
  afastado: 'badge-afastado',
  ferias: 'badge-ferias',
  desligado: 'badge-desligado',
  admissao: 'badge-admissao',
};

function StatusBadge({ status }: { status: EmployeeStatus }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-[2px] ${STATUS_CLASS[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}

function formatCurrency(val: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
}

interface EmployeeDetailProps {
  employee: Employee;
  onClose: () => void;
}

function EmployeeDetail({ employee, onClose }: EmployeeDetailProps) {
  const dept = getDepartmentById(employee.departmentId);
  const pos = getPositionById(employee.positionId);
  const manager = initialEmployees.find(e => e.id === employee.managerId);

  return (
    <DialogContent className="bg-[#111] border-[#1f1f1f] text-[#f0f0f0] max-w-2xl rounded-[2px] p-0 overflow-hidden">
      {/* Header */}
      <div className="relative p-6 border-b border-[#1f1f1f]">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-[#e8ff2a] flex items-center justify-center flex-shrink-0">
            <span className="text-[#0a0a0a] font-black text-lg">{employee.avatarInitials}</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-black tracking-tight">{employee.fullName}</h2>
            <p className="text-sm text-[#888] mt-0.5">{pos?.name} — {dept?.name}</p>
            <div className="mt-2">
              <StatusBadge status={employee.status} />
            </div>
          </div>
          <button onClick={onClose} className="text-[#555] hover:text-[#f0f0f0] transition-colors">
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 grid grid-cols-2 gap-6">
        {/* Dados Pessoais */}
        <div>
          <h3 className="text-[10px] text-[#555] uppercase tracking-widest mb-3 font-semibold">Dados Pessoais</h3>
          <div className="space-y-2.5">
            <InfoRow icon={Mail} label="E-mail corporativo" value={employee.email} />
            <InfoRow icon={Phone} label="Telefone" value={employee.phone} />
            <InfoRow icon={CalendarDays} label="Nascimento"
              value={format(new Date(employee.birthDate), 'dd/MM/yyyy')} />
            <InfoRow icon={User} label="CPF" value={employee.cpf} />
          </div>
        </div>

        {/* Dados Profissionais */}
        <div>
          <h3 className="text-[10px] text-[#555] uppercase tracking-widest mb-3 font-semibold">Dados Profissionais</h3>
          <div className="space-y-2.5">
            <InfoRow icon={Building2} label="Departamento" value={dept?.name ?? '—'} />
            <InfoRow icon={Briefcase} label="Cargo" value={pos?.name ?? '—'} />
            <InfoRow icon={CalendarDays} label="Admissão"
              value={format(new Date(employee.admissionDate), 'dd/MM/yyyy')} />
            <InfoRow icon={User} label="Gestor" value={manager?.fullName ?? 'Não definido'} />
          </div>
        </div>

        {/* Financeiro — coluna completa */}
        <div className="col-span-2 pt-4 border-t border-[#1f1f1f]">
          <h3 className="text-[10px] text-[#555] uppercase tracking-widest mb-3 font-semibold">Financeiro</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] p-4">
              <p className="text-[10px] text-[#555] mb-1">Salário Base</p>
              <p className="text-lg font-black text-[#e8ff2a]">{formatCurrency(employee.salary)}</p>
            </div>
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] p-4">
              <p className="text-[10px] text-[#555] mb-1">Contrato</p>
              <p className="text-sm font-semibold">{employee.contractType}</p>
            </div>
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] p-4">
              <p className="text-[10px] text-[#555] mb-1">Benefícios</p>
              <p className="text-xs text-[#888] leading-relaxed">{employee.benefits.join(', ') || '—'}</p>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon size={13} className="text-[#444] mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-[10px] text-[#555]">{label}</p>
        <p className="text-xs text-[#f0f0f0] font-medium">{value}</p>
      </div>
    </div>
  );
}

export default function FuncionariosPage() {
  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<EmployeeStatus | 'todos'>('todos');
  const [deptFilter, setDeptFilter] = useState<string>('todos');
  const [selected, setSelected] = useState<Employee | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const fetchEmployees = async () => {
    try {
      const res = await fetch('/api/funcionarios');
      if (res.ok) {
        const data = await res.json();
        setAllEmployees(data);
      }
    } catch (err) {
      console.error('Error fetching employees:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSave = async (emp: Employee) => {
    try {
      const { id, avatarInitials, createdAt, updatedAt, ...rest } = emp;
      const res = await fetch('/api/funcionarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rest),
      });
      if (res.ok) {
        const createdEmp = await res.json();
        setAllEmployees(prev => [createdEmp, ...prev]);
        setToast(`✓ ${createdEmp.fullName} cadastrado com sucesso!`);
        setTimeout(() => setToast(null), 4000);
      } else {
        const errData = await res.json();
        console.error('Validation error details:', errData.details);
        alert(`Erro de validação: ${JSON.stringify(errData.details || errData.error)}`);
      }
    } catch (err) {
      console.error('Error saving employee:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/funcionarios/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        const data = await res.json();
        setAllEmployees(prev => prev.map(e => e.id === id ? data.employee : e));
        setToast(`✓ Colaborador desligado com sucesso!`);
        setTimeout(() => setToast(null), 4000);
      }
    } catch (err) {
      console.error('Error offboarding employee:', err);
    }
  };

  const handleDeletePermanent = async (id: string, name: string) => {
    if (!confirm(`Tem certeza que deseja excluir permanentemente o funcionário ${name}? Esta ação removerá o registro definitivo do banco de dados.`)) {
      return;
    }
    try {
      const res = await fetch(`/api/funcionarios/${id}?permanent=true`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setAllEmployees(prev => prev.filter(e => e.id !== id));
        setToast(`✓ Colaborador ${name} removido permanentemente!`);
        setTimeout(() => setToast(null), 4000);
      }
    } catch (err) {
      console.error('Error permanently deleting employee:', err);
    }
  };

  const filtered = useMemo(() => {
    return allEmployees.filter(e => {
      const matchSearch =
        e.fullName.toLowerCase().includes(search.toLowerCase()) ||
        e.email.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'todos' || e.status === statusFilter;
      const matchDept = deptFilter === 'todos' || e.departmentId === deptFilter;
      return matchSearch && matchStatus && matchDept;
    });
  }, [allEmployees, search, statusFilter, deptFilter]);

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-[100] bg-[#e8ff2a] text-[#0a0a0a] text-sm font-bold px-5 py-3 animate-fade-up shadow-lg">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-end justify-between mb-8 animate-fade-up">
        <div>
          <h1 className="text-3xl font-black tracking-tight">
            Funcionários <span className="text-[#e8ff2a]">({allEmployees.length})</span>
          </h1>
          <p className="text-sm text-[#555] mt-1">Cadastro e gestão de colaboradores</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-[#e8ff2a] text-[#0a0a0a] px-4 py-2.5 text-sm font-bold hover:bg-[#d4eb1f] transition-colors">
          <Plus size={16} />
          Novo Funcionário
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-5 animate-fade-up">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444]" />
          <input
            type="text"
            placeholder="Buscar por nome ou e-mail..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-[#111] border border-[#1f1f1f] text-sm text-[#f0f0f0] placeholder-[#444] pl-9 pr-4 py-2.5 outline-none focus:border-[#e8ff2a] transition-colors"
          />
        </div>

        {/* Status filter */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 bg-[#111] border border-[#1f1f1f] text-sm text-[#888] px-3 py-2.5 hover:border-[#2f2f2f] transition-colors outline-none">
            <Filter size={13} />
            {statusFilter === 'todos' ? 'Status' : STATUS_LABELS[statusFilter]}
            <ChevronDown size={12} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#111] border-[#1f1f1f] text-[#f0f0f0] rounded-[2px]">
            <DropdownMenuItem onClick={() => setStatusFilter('todos')} className="text-xs cursor-pointer hover:bg-[#1a1a1a]">
              Todos
            </DropdownMenuItem>
            {(Object.keys(STATUS_LABELS) as EmployeeStatus[]).map(s => (
              <DropdownMenuItem key={s} onClick={() => setStatusFilter(s)} className="text-xs cursor-pointer hover:bg-[#1a1a1a]">
                {STATUS_LABELS[s]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Dept filter */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 bg-[#111] border border-[#1f1f1f] text-sm text-[#888] px-3 py-2.5 hover:border-[#2f2f2f] transition-colors outline-none">
            <Building2 size={13} />
            {deptFilter === 'todos' ? 'Departamento' : departments.find(d => d.id === deptFilter)?.name}
            <ChevronDown size={12} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#111] border-[#1f1f1f] text-[#f0f0f0] rounded-[2px]">
            <DropdownMenuItem onClick={() => setDeptFilter('todos')} className="text-xs cursor-pointer hover:bg-[#1a1a1a]">
              Todos
            </DropdownMenuItem>
            {departments.map(d => (
              <DropdownMenuItem key={d.id} onClick={() => setDeptFilter(d.id)} className="text-xs cursor-pointer hover:bg-[#1a1a1a]">
                {d.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Clear */}
        {(statusFilter !== 'todos' || deptFilter !== 'todos' || search) && (
          <button
            onClick={() => { setStatusFilter('todos'); setDeptFilter('todos'); setSearch(''); }}
            className="flex items-center gap-1.5 text-xs text-[#555] hover:text-[#f0f0f0] transition-colors"
          >
            <X size={12} /> Limpar filtros
          </button>
        )}

        <span className="ml-auto text-xs text-[#555]">{filtered.length} resultado{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Table */}
      <div className="hr-card overflow-hidden animate-fade-up">
        {/* Table header */}
        <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_40px] items-center px-5 py-3 border-b border-[#1f1f1f]">
          <span className="text-[10px] text-[#555] uppercase tracking-widest font-semibold">Nome</span>
          <span className="text-[10px] text-[#555] uppercase tracking-widest font-semibold">Departamento / Cargo</span>
          <span className="text-[10px] text-[#555] uppercase tracking-widest font-semibold">Status</span>
          <span className="text-[10px] text-[#555] uppercase tracking-widest font-semibold">Admissão</span>
          <span className="text-[10px] text-[#555] uppercase tracking-widest font-semibold">Salário</span>
          <span />
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-[#555]">Nenhum funcionário encontrado.</p>
          </div>
        ) : (
          filtered.map((emp, i) => {
            const dept = getDepartmentById(emp.departmentId);
            const pos = getPositionById(emp.positionId);
            return (
              <div
                key={emp.id}
                className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_40px] items-center px-5 py-3.5 border-b border-[#111] hover:bg-[#0d0d0d] transition-colors group"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                {/* Name + avatar */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#1a1a1a] border border-[#2f2f2f] flex items-center justify-center flex-shrink-0 group-hover:border-[#e8ff2a]/20 transition-colors">
                    <span className="text-[10px] font-bold text-[#666]">{emp.avatarInitials}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#f0f0f0]">{emp.fullName}</p>
                    <p className="text-[10px] text-[#555]">{emp.email}</p>
                  </div>
                </div>

                {/* Dept/Position */}
                <div>
                  <p className="text-xs text-[#f0f0f0]">{dept?.name}</p>
                  <p className="text-[10px] text-[#555]">{pos?.name}</p>
                </div>

                {/* Status */}
                <StatusBadge status={emp.status} />

                {/* Admission */}
                <span className="text-xs text-[#888] font-mono">
                  {format(new Date(emp.admissionDate), 'dd/MM/yyyy')}
                </span>

                {/* Salary */}
                <span className="text-xs font-mono text-[#888]">
                  {emp.status === 'desligado' ? '—' : formatCurrency(emp.salary)}
                </span>

                {/* Actions */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-8 h-8 flex items-center justify-center text-[#444] hover:text-[#f0f0f0] opacity-0 group-hover:opacity-100 transition-all outline-none">
                    <MoreHorizontal size={15} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-[#111] border-[#1f1f1f] text-[#f0f0f0] rounded-[2px]">
                    <DropdownMenuItem
                      onClick={() => setSelected(emp)}
                      className="text-xs cursor-pointer hover:bg-[#1a1a1a] flex items-center gap-2"
                    >
                      <Eye size={12} /> Ver detalhes
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs cursor-pointer hover:bg-[#1a1a1a] flex items-center gap-2">
                      <Edit size={12} /> Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(emp.id)}
                      className="text-xs cursor-pointer text-[#ff7b4c] hover:bg-[#1a1a1a] flex items-center gap-2"
                    >
                      <Trash2 size={12} /> Desligar (Inativar)
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeletePermanent(emp.id, emp.fullName)}
                      className="text-xs cursor-pointer text-[#ff4c4c] hover:bg-[#1a1a1a] flex items-center gap-2"
                    >
                      <Trash2 size={12} className="text-red-500" /> Excluir permanentemente
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            );
          })
        )}
      </div>

      {/* Employee Detail Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        {selected && <EmployeeDetail employee={selected} onClose={() => setSelected(null)} />}
      </Dialog>

      {/* Employee Form Modal */}
      {showForm && (
        <EmployeeForm onClose={() => setShowForm(false)} onSave={handleSave} />
      )}
    </div>
  );
}

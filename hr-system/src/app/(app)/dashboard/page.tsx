'use client';

import { useState, useEffect } from 'react';
import {
  Users, TrendingUp, Umbrella, AlertTriangle,
  UserCheck, UserX, Mail, ChevronRight,
  Building2, DollarSign, Calendar,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';

const statusLabel: Record<string, string> = {
  rascunho: 'Rascunho',
  pendente: 'Pendente',
  aprovado: 'Aprovado',
  agendado: 'Agendado',
  enviado: 'Enviado',
  cancelado: 'Cancelado',
  reprovado: 'Reprovado',
};

const statusColors: Record<string, string> = {
  pendente: 'badge-afastado',
  aprovado: 'badge-ferias',
  enviado: 'badge-ativo',
  agendado: 'badge-admissao',
};

function formatCurrency(val: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
}

interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ElementType;
  accent?: boolean;
  sub?: string;
  href?: string;
  loading?: boolean;
}

function StatCard({ label, value, icon: Icon, accent, sub, href, loading }: StatCardProps) {
  const inner = (
    <div className={`hr-card p-5 flex flex-col gap-3 group cursor-pointer animate-fade-up ${accent ? 'hr-card-accent' : ''}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[#666] uppercase tracking-widest">{label}</span>
        <Icon size={15} className={`${accent ? 'text-[#e8ff2a]' : 'text-[#444]'} group-hover:text-[#e8ff2a] transition-colors`} />
      </div>
      <div>
        {loading ? (
          <div className="h-8 w-24 bg-[#1a1a1a] rounded animate-pulse" />
        ) : (
          <span className="stat-number">{value}</span>
        )}
        {sub && <p className="text-xs text-[#555] mt-1">{sub}</p>}
      </div>
    </div>
  );

  if (href && !loading) return <Link href={href}>{inner}</Link>;
  return inner;
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: {value: number}[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a1a] border border-[#2f2f2f] px-3 py-2 text-xs">
        <p className="text-[#888] mb-1">{label}</p>
        <p className="text-[#e8ff2a] font-bold">{payload[0].value} pessoas</p>
      </div>
    );
  }
  return null;
};

// Static departments mapping to avoid fetching in loop
const mockDepartments = [
  { id: 'd1', name: 'Tecnologia' },
  { id: 'd2', name: 'Recursos Humanos' },
  { id: 'd3', name: 'Financeiro' },
  { id: 'd4', name: 'Operações' },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState<string>('Todas');
  const today = format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR });

  useEffect(() => {
    async function loadStats() {
      setLoading(true);
      try {
        const res = await fetch(`/api/dashboard?company=${selectedCompany}`);
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error('Failed to load dashboard statistics:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, [selectedCompany]);

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 animate-fade-up">
        <div>
          <p className="text-xs text-[#555] uppercase tracking-widest mb-1 capitalize">{today}</p>
          <h1 className="text-3xl font-black tracking-tight text-[#f0f0f0]">
            Dashboard <span className="text-[#e8ff2a]">RH</span>
          </h1>
          <p className="text-sm text-[#555] mt-1">Visão geral e distribuição por empresa</p>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-[#555] font-semibold uppercase tracking-wider">Empresa:</label>
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="bg-[#0d0d0d] border border-[#1f1f1f] text-xs font-semibold text-[#f0f0f0] px-3 py-2 rounded-[2px] hover:border-[#3f3f3f] transition-all outline-none cursor-pointer"
          >
            <option value="Todas">Todas as Empresas</option>
            <option value="Igreja Mananciais">Igreja Mananciais</option>
            <option value="Phizchat">Phizchat</option>
          </select>
        </div>
      </div>

      {/* Payroll by Company Premium Comparison Widget */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 stagger-children animate-fade-up">
        <div className="bg-gradient-to-r from-[#0f0f05] to-[#080808] border border-[#e8ff2a]/10 p-5 rounded-[2px] flex items-center justify-between group hover:border-[#e8ff2a]/30 transition-all cursor-pointer">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#666] font-semibold">Folha Mensal — Igreja Mananciais</p>
            <h3 className="text-xl font-black text-[#f0f0f0] mt-1">
              {loading ? (
                <div className="h-6 w-28 bg-[#1a1a1a] rounded animate-pulse mt-1" />
              ) : (
                formatCurrency(stats?.payrollByCompany?.find((p: any) => p.company === 'Igreja Mananciais')?.payroll || 0)
              )}
            </h3>
            {loading ? null : (
              <p className="text-xs text-[#888] mt-1">
                {stats?.payrollByCompany?.find((p: any) => p.company === 'Igreja Mananciais')?.employeeCount || 0} funcionários ativos
              </p>
            )}
          </div>
          <Building2 size={24} className="text-[#e8ff2a]/20 group-hover:text-[#e8ff2a] transition-all" />
        </div>

        <div className="bg-gradient-to-r from-[#050f0f] to-[#080808] border border-[#2affff]/10 p-5 rounded-[2px] flex items-center justify-between group hover:border-[#2affff]/30 transition-all cursor-pointer">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#666] font-semibold">Folha Mensal — Phizchat</p>
            <h3 className="text-xl font-black text-[#f0f0f0] mt-1">
              {loading ? (
                <div className="h-6 w-28 bg-[#1a1a1a] rounded animate-pulse mt-1" />
              ) : (
                formatCurrency(stats?.payrollByCompany?.find((p: any) => p.company === 'Phizchat')?.payroll || 0)
              )}
            </h3>
            {loading ? null : (
              <p className="text-xs text-[#888] mt-1">
                {stats?.payrollByCompany?.find((p: any) => p.company === 'Phizchat')?.employeeCount || 0} funcionários ativos
              </p>
            )}
          </div>
          <TrendingUp size={24} className="text-[#2affff]/20 group-hover:text-[#2affff] transition-all" />
        </div>
      </div>

      {/* Primary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 stagger-children">
        <StatCard
          label="Total Colaboradores"
          value={stats?.totalEmployees || 0}
          icon={Users}
          accent
          href="/funcionarios"
          loading={loading}
        />
        <StatCard
          label="Colaboradores Ativos"
          value={stats?.activeEmployees || 0}
          icon={UserCheck}
          href="/funcionarios?status=ativo"
          loading={loading}
        />
        <StatCard
          label="Folha Mensal Est."
          value={formatCurrency(stats?.monthlyPayroll || 0)}
          icon={DollarSign}
          href="/pagamentos"
          loading={loading}
        />
        <StatCard
          label="Comunicados Pendentes"
          value={stats?.pendingAnnouncements || 0}
          icon={Mail}
          href="/comunicados"
          loading={loading}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 stagger-children">
        <StatCard label="Afastados" value={stats?.onLeave || 0} icon={AlertTriangle} sub="Afastamento ativo" loading={loading} />
        <StatCard label="Em Férias" value={stats?.onVacation || 0} icon={Umbrella} sub="Férias em andamento" loading={loading} />
        <StatCard label="Férias / 30 dias" value={stats?.vacationsNext30Days || 0} icon={Calendar} sub="Próximos vencimentos" loading={loading} />
        <StatCard label="Desligados" value={stats?.dismissed || 0} icon={UserX} sub="Histórico total" loading={loading} />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Chart — 2/3 */}
        <div className="lg:col-span-2 hr-card p-6 animate-fade-up">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-sm font-semibold text-[#f0f0f0] uppercase tracking-widest">Colaboradores por Setor</h2>
              <p className="text-xs text-[#555] mt-0.5">Ativos por departamento</p>
            </div>
            <Building2 size={16} className="text-[#444]" />
          </div>
          {loading ? (
            <div className="h-[220px] w-full bg-[#1a1a1a] rounded animate-pulse" />
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={stats?.byDepartment || []} barSize={28} margin={{ left: -20 }}>
                <XAxis
                  dataKey="department"
                  tick={{ fill: '#555', fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#444', fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(232,255,42,0.04)' }} />
                <Bar dataKey="count" radius={[0, 0, 0, 0]}>
                  {(stats?.byDepartment || []).map((entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? '#e8ff2a' : '#1f1f1f'}
                      stroke={index === 0 ? '#e8ff2a' : '#2f2f2f'}
                      strokeWidth={1}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Aniversários — 1/3 */}
        <div className="hr-card p-6 animate-fade-up">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-[#f0f0f0] uppercase tracking-widest">Aniversários</h2>
            <span className="text-xs text-[#555]">Próximos 30 dias</span>
          </div>
          <div className="flex flex-col gap-3">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-14 bg-[#1a1a1a] rounded animate-pulse" />
              ))
            ) : stats?.upcomingBirthdays?.length === 0 ? (
              <p className="text-xs text-[#555] py-4 text-center">Nenhum aniversário nos próximos 30 dias.</p>
            ) : (
              (stats?.upcomingBirthdays || []).map((emp: any) => {
                const dept = mockDepartments.find(d => d.id === emp.departmentId);
                return (
                  <div key={emp.id} className="flex items-center gap-3 p-3 bg-[#0d0d0d] border border-[#1f1f1f] hover:border-[#e8ff2a]/20 transition-colors">
                    <div className="w-8 h-8 bg-[#1a1a1a] border border-[#2f2f2f] flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-[#888]">{emp.avatarInitials}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#f0f0f0] truncate">{emp.fullName}</p>
                      <p className="text-[10px] text-[#555] truncate">{dept?.name || 'Geral'}</p>
                    </div>
                    <span className="text-[10px] text-[#e8ff2a] font-mono flex-shrink-0">
                      {emp.birthDate ? format(new Date(emp.birthDate), 'dd/MM') : '—'}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Comunicados Recentes — full width */}
        <div className="lg:col-span-3 hr-card p-6 animate-fade-up">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-[#f0f0f0] uppercase tracking-widest">Últimos Comunicados</h2>
            <Link href="/comunicados" className="flex items-center gap-1 text-xs text-[#555] hover:text-[#e8ff2a] transition-colors">
              Ver todos <ChevronRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {loading ? (
              Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="h-20 bg-[#1a1a1a] rounded animate-pulse" />
              ))
            ) : stats?.recentAnnouncements?.length === 0 ? (
              <p className="text-xs text-[#555] py-4 text-center col-span-2">Nenhum comunicado enviado ou agendado.</p>
            ) : (
              (stats?.recentAnnouncements || []).map((ann: any) => (
                <div key={ann.id} className="flex items-start gap-4 p-4 bg-[#0d0d0d] border border-[#1f1f1f] hover:border-[#2f2f2f] transition-colors group">
                  <div className="w-1 h-full min-h-[40px] bg-[#1f1f1f] group-hover:bg-[#e8ff2a] transition-colors flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-[2px] ${statusColors[ann.status] ?? 'badge-admissao'}`}>
                        {statusLabel[ann.status]}
                      </span>
                      <span className="text-[10px] text-[#444] font-mono">
                        {ann.sentAt
                          ? format(new Date(ann.sentAt), 'dd/MM/yy')
                          : ann.scheduledDate
                          ? format(new Date(ann.scheduledDate), 'dd/MM/yy')
                          : '—'}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-[#f0f0f0] truncate">{ann.title}</p>
                    <p className="text-xs text-[#555] mt-0.5 line-clamp-1">{ann.body}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

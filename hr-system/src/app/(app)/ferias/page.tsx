'use client';

import { vacations, employees, getDepartmentById } from '@/lib/mock-data';
import type { VacationStatus } from '@/types/hr';
import { Umbrella, CalendarDays, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const STATUS_LABELS: Record<VacationStatus, string> = {
  aguardando_periodo: 'Aguardando Período',
  disponivel: 'Disponível',
  solicitada: 'Solicitada',
  aprovada: 'Aprovada',
  reprovada: 'Reprovada',
  em_andamento: 'Em Andamento',
  concluida: 'Concluída',
  vencida: 'Vencida',
};

const STATUS_CLASS: Record<VacationStatus, string> = {
  aguardando_periodo: 'badge-admissao',
  disponivel: 'badge-ferias',
  solicitada: 'badge-afastado',
  aprovada: 'badge-ativo',
  reprovada: 'badge-desligado',
  em_andamento: 'badge-ativo',
  concluida: 'badge-admissao',
  vencida: 'badge-desligado',
};

const summaryCards = [
  { label: 'Em Andamento', value: vacations.filter(v => v.status === 'em_andamento').length, icon: Umbrella, color: '#2aff88' },
  { label: 'Aprovadas', value: vacations.filter(v => v.status === 'aprovada').length, icon: CheckCircle, color: '#e8ff2a' },
  { label: 'Disponíveis', value: vacations.filter(v => v.status === 'disponivel').length, icon: CalendarDays, color: '#ffaa2a' },
  { label: 'Vencidas', value: vacations.filter(v => v.status === 'vencida').length, icon: AlertTriangle, color: '#ff4c4c' },
];

export default function FeriasPage() {
  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-8 animate-fade-up">
        <h1 className="text-3xl font-black tracking-tight">
          Férias <span className="text-[#e8ff2a]">({vacations.length})</span>
        </h1>
        <p className="text-sm text-[#555] mt-1">Controle e acompanhamento de férias dos colaboradores</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-3 mb-8 stagger-children">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="hr-card p-5 animate-fade-up">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] text-[#555] uppercase tracking-widest">{card.label}</p>
                <Icon size={14} style={{ color: card.color }} />
              </div>
              <p className="text-4xl font-black" style={{ color: card.color }}>{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Vacations list */}
      <div className="hr-card overflow-hidden animate-fade-up">
        {/* Header */}
        <div className="grid grid-cols-[2fr_1fr_1.5fr_1fr_1fr_80px] items-center px-5 py-3 border-b border-[#1f1f1f]">
          <span className="text-[10px] text-[#555] uppercase tracking-widest font-semibold">Funcionário</span>
          <span className="text-[10px] text-[#555] uppercase tracking-widest font-semibold">Status</span>
          <span className="text-[10px] text-[#555] uppercase tracking-widest font-semibold">Período</span>
          <span className="text-[10px] text-[#555] uppercase tracking-widest font-semibold">Dias Disp.</span>
          <span className="text-[10px] text-[#555] uppercase tracking-widest font-semibold">Venc. Concess.</span>
          <span />
        </div>

        {vacations.map((vac, i) => {
          const emp = employees.find(e => e.id === vac.employeeId);
          const dept = emp ? getDepartmentById(emp.departmentId) : null;
          const daysUntilExpiry = differenceInDays(new Date(vac.concessionEnd), new Date());
          const isExpiringSoon = daysUntilExpiry > 0 && daysUntilExpiry <= 60;

          return (
            <div
              key={vac.id}
              className="grid grid-cols-[2fr_1fr_1.5fr_1fr_1fr_80px] items-center px-5 py-4 border-b border-[#111] hover:bg-[#0d0d0d] transition-colors group"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {/* Employee */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#1a1a1a] border border-[#2f2f2f] flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold text-[#666]">{emp?.avatarInitials}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#f0f0f0]">{emp?.fullName}</p>
                  <p className="text-[10px] text-[#555]">{dept?.name}</p>
                </div>
              </div>

              {/* Status */}
              <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-[2px] w-fit ${STATUS_CLASS[vac.status]}`}>
                {STATUS_LABELS[vac.status]}
              </span>

              {/* Period */}
              <div>
                {vac.requestedStart ? (
                  <>
                    <p className="text-xs font-mono text-[#f0f0f0]">
                      {format(new Date(vac.requestedStart), 'dd/MM/yy')} → {format(new Date(vac.requestedEnd!), 'dd/MM/yy')}
                    </p>
                    <p className="text-[10px] text-[#555]">{vac.totalDays} dias solicitados</p>
                  </>
                ) : (
                  <p className="text-xs text-[#444]">Não solicitado</p>
                )}
              </div>

              {/* Days remaining */}
              <div>
                <p className="text-sm font-bold text-[#f0f0f0]">{vac.daysRemaining}</p>
                <p className="text-[10px] text-[#555]">dias restantes</p>
              </div>

              {/* Concession end */}
              <div>
                <p className={`text-xs font-mono ${isExpiringSoon ? 'text-[#ffaa2a]' : 'text-[#888]'}`}>
                  {format(new Date(vac.concessionEnd), 'dd/MM/yyyy')}
                </p>
                {isExpiringSoon && (
                  <p className="text-[10px] text-[#ffaa2a] flex items-center gap-0.5">
                    <AlertTriangle size={9} /> {daysUntilExpiry}d restantes
                  </p>
                )}
              </div>

              {/* Action */}
              {vac.status === 'disponivel' && (
                <button className="text-[10px] font-bold bg-[#e8ff2a] text-[#0a0a0a] px-2 py-1.5 hover:bg-[#d4eb1f] transition-colors">
                  Solicitar
                </button>
              )}
              {vac.status === 'solicitada' && (
                <button className="text-[10px] font-bold bg-[rgba(232,255,42,0.08)] text-[#e8ff2a] border border-[#e8ff2a]/20 px-2 py-1.5 hover:bg-[rgba(232,255,42,0.15)] transition-colors">
                  Aprovar
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

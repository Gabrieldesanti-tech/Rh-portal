'use client';

import { useState, useEffect } from 'react';
import type { AnnouncementStatus, Announcement } from '@/types/hr';
import { Mail, Plus, CheckCircle, Clock, Send, X, ChevronDown, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const STATUS_LABELS: Record<AnnouncementStatus, string> = {
  rascunho: 'Rascunho',
  pendente: 'Pendente',
  aprovado: 'Aprovado',
  agendado: 'Agendado',
  enviado: 'Enviado',
  cancelado: 'Cancelado',
  reprovado: 'Reprovado',
};

const STATUS_CLASS: Record<AnnouncementStatus, string> = {
  rascunho: 'badge-desligado',
  pendente: 'badge-afastado',
  aprovado: 'badge-ferias',
  agendado: 'badge-admissao',
  enviado: 'badge-ativo',
  cancelado: 'badge-desligado',
  reprovado: 'badge-desligado',
};

const TYPE_ICONS = {
  manual: Mail,
  automatico: Clock,
  comemorativo: CheckCircle,
};

export default function ComunicadosPage() {
  const [list, setList] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<AnnouncementStatus | 'todos'>('todos');
  const [showNew, setShowNew] = useState(false);
  
  // New announcement form state
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [newRecipientType, setNewRecipientType] = useState('todos');
  const [toast, setToast] = useState<string | null>(null);

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch('/api/comunicados');
      if (res.ok) {
        const data = await res.json();
        setList(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      const res = await fetch(`/api/comunicados/${id}/aprovar`, {
        method: 'POST',
      });
      if (res.ok) {
        const updatedAnn = await res.json();
        setList(prev => prev.map(a => a.id === id ? updatedAnn : a));
        setToast(`✓ Comunicado "${updatedAnn.title}" aprovado e enviado com sucesso!`);
        setTimeout(() => setToast(null), 4000);
      }
    } catch (err) {
      console.error('Error approving announcement:', err);
    }
  };

  const handleCreate = async (asDraft: boolean) => {
    if (!newTitle.trim() || !newBody.trim()) return;
    
    try {
      const payload = {
        title: newTitle,
        body: newBody,
        type: 'manual',
        status: asDraft ? 'rascunho' : 'pendente',
        recipientCount: newRecipientType === 'todos' ? 15 : 5,
      };

      const res = await fetch('/api/comunicados', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const createdAnn = await res.json();
        setList(prev => [createdAnn, ...prev]);
        setShowNew(false);
        setNewTitle('');
        setNewBody('');
        setToast(asDraft ? `✓ Rascunho salvo!` : `✓ Comunicado enviado para aprovação!`);
        setTimeout(() => setToast(null), 4000);
      }
    } catch (err) {
      console.error('Error creating announcement:', err);
    }
  };

  const filtered = list.filter(a =>
    statusFilter === 'todos' || a.status === statusFilter
  );

  const summaryCards = [
    { label: 'Total', value: list.length, color: '#f0f0f0' },
    { label: 'Pendentes', value: list.filter(a => a.status === 'pendente').length, color: '#ffaa2a' },
    { label: 'Aprovados', value: list.filter(a => a.status === 'aprovado').length, color: '#e8ff2a' },
    { label: 'Enviados', value: list.filter(a => a.status === 'enviado').length, color: '#2aff88' },
  ];

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
            Comunicados <span className="text-[#e8ff2a]">({list.length})</span>
          </h1>
          <p className="text-sm text-[#555] mt-1">Criação, aprovação e envio de comunicados internos</p>
        </div>
        <button
          onClick={() => setShowNew(true)}
          className="flex items-center gap-2 bg-[#e8ff2a] text-[#0a0a0a] px-4 py-2.5 text-sm font-bold hover:bg-[#d4eb1f] transition-colors"
        >
          <Plus size={16} />
          Novo Comunicado
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-3 mb-8 stagger-children">
        {summaryCards.map((card) => (
          <div key={card.label} className="hr-card p-5 animate-fade-up">
            <p className="text-[10px] text-[#555] uppercase tracking-widest mb-2">{card.label}</p>
            <p className="text-4xl font-black" style={{ color: card.color }}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3 mb-5 animate-fade-up">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 bg-[#111] border border-[#1f1f1f] text-sm text-[#888] px-3 py-2.5 hover:border-[#2f2f2f] transition-colors outline-none">
            <Filter size={13} />
            {statusFilter === 'todos' ? 'Todos os status' : STATUS_LABELS[statusFilter]}
            <ChevronDown size={12} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#111] border-[#1f1f1f] text-[#f0f0f0] rounded-[2px]">
            <DropdownMenuItem onClick={() => setStatusFilter('todos')} className="text-xs cursor-pointer hover:bg-[#1a1a1a]">Todos</DropdownMenuItem>
            {(Object.keys(STATUS_LABELS) as AnnouncementStatus[]).map(s => (
              <DropdownMenuItem key={s} onClick={() => setStatusFilter(s)} className="text-xs cursor-pointer hover:bg-[#1a1a1a]">
                {STATUS_LABELS[s]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <span className="text-xs text-[#555]">{filtered.length} comunicados</span>
      </div>

      {/* Announcements list */}
      <div className="flex flex-col gap-3 animate-fade-up">
        {filtered.map((ann, i) => {
          const Icon = TYPE_ICONS[ann.type];
          return (
            <div
              key={ann.id}
              className="hr-card p-5 flex items-start gap-5 group hover:border-[#2f2f2f] transition-all"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {/* Icon */}
              <div className="w-10 h-10 bg-[#0d0d0d] border border-[#1f1f1f] flex items-center justify-center flex-shrink-0 group-hover:border-[#e8ff2a]/20 transition-colors">
                <Icon size={16} className="text-[#555]" />
              </div>

              {/* Body */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-[2px] ${STATUS_CLASS[ann.status]}`}>
                    {STATUS_LABELS[ann.status]}
                  </span>
                  <span className="text-[10px] text-[#444] uppercase tracking-widest">
                    {ann.type === 'comemorativo' ? 'Comemorativo' : ann.type === 'automatico' ? 'Automático' : 'Manual'}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#f0f0f0] mb-1">{ann.title}</h3>
                <p className="text-xs text-[#666] line-clamp-2">{ann.body}</p>
              </div>

              {/* Meta */}
              <div className="text-right flex-shrink-0">
                <p className="text-[10px] text-[#444] mb-1">
                  {ann.sentAt
                    ? `Enviado ${format(new Date(ann.sentAt), "dd MMM 'às' HH:mm", { locale: ptBR })}`
                    : ann.scheduledDate
                    ? `Agendado ${format(new Date(ann.scheduledDate), 'dd/MM/yyyy')}`
                    : format(new Date(ann.createdAt), 'dd/MM/yyyy')}
                </p>
                {ann.recipientCount > 0 && (
                  <p className="text-[10px] text-[#555]">
                    <Send size={9} className="inline mr-1" />
                    {ann.recipientCount} destinatários
                  </p>
                )}
                {/* Approve button for pending */}
                {ann.status === 'pendente' && (
                  <button onClick={() => handleApprove(ann.id)} className="mt-2 flex items-center gap-1.5 text-[10px] font-bold bg-[#e8ff2a] text-[#0a0a0a] px-3 py-1.5 hover:bg-[#d4eb1f] transition-colors">
                    <CheckCircle size={10} /> Aprovar
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* New Announcement Panel */}
      {showNew && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#111] border border-[#1f1f1f] w-full max-w-lg p-6 rounded-[2px]">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-black">Novo Comunicado</h2>
              <button onClick={() => setShowNew(false)} className="text-[#555] hover:text-[#f0f0f0] transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-[#555] uppercase tracking-widest block mb-1.5">Título</label>
                <input
                  type="text"
                  placeholder="Ex: Reunião geral — Q2 2024"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full bg-[#0d0d0d] border border-[#1f1f1f] text-sm text-[#f0f0f0] placeholder-[#333] px-3 py-2.5 outline-none focus:border-[#e8ff2a] transition-colors"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#555] uppercase tracking-widest block mb-1.5">Mensagem</label>
                <textarea
                  rows={5}
                  placeholder="Escreva o corpo do comunicado..."
                  value={newBody}
                  onChange={e => setNewBody(e.target.value)}
                  className="w-full bg-[#0d0d0d] border border-[#1f1f1f] text-sm text-[#f0f0f0] placeholder-[#333] px-3 py-2.5 outline-none focus:border-[#e8ff2a] transition-colors resize-none"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#555] uppercase tracking-widest block mb-1.5">Destinatários</label>
                <select
                  value={newRecipientType}
                  onChange={e => setNewRecipientType(e.target.value)}
                  className="w-full bg-[#0d0d0d] border border-[#1f1f1f] text-sm text-[#888] px-3 py-2.5 outline-none focus:border-[#e8ff2a] transition-colors"
                >
                  <option value="todos">Todos os funcionários</option>
                  <option value="departamento">Por departamento</option>
                  <option value="cargo">Por cargo</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => handleCreate(true)}
                  className="flex-1 bg-[#1a1a1a] border border-[#2f2f2f] text-sm text-[#888] py-2.5 hover:text-[#f0f0f0] transition-colors"
                >
                  Salvar Rascunho
                </button>
                <button
                  onClick={() => handleCreate(false)}
                  className="flex-1 bg-[#e8ff2a] text-[#0a0a0a] text-sm font-bold py-2.5 hover:bg-[#d4eb1f] transition-colors"
                >
                  Enviar para Aprovação
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

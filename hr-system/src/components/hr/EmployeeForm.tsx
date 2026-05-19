'use client';

import { useState } from 'react';
import { departments, positions, employees } from '@/lib/mock-data';
import type { Employee, EmployeeStatus, ContractType } from '@/types/hr';
import { X, User, Mail, Phone, MapPin, Briefcase, DollarSign, FileText, ChevronDown } from 'lucide-react';

interface EmployeeFormProps {
  onClose: () => void;
  onSave: (employee: Employee) => void;
}

const CONTRACT_TYPES: ContractType[] = ['CLT', 'PJ', 'Estágio', 'Temporário'];
const MARITAL_STATUS = ['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)', 'União Estável'];
const BENEFITS_OPTIONS = ['Vale Refeição', 'Vale Alimentação', 'Plano de Saúde', 'Plano Odontológico', 'Gympass', 'Previdência Privada', 'Comissão', 'PLR'];

interface FormData {
  company: string;
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
  managerId: string;
  admissionDate: string;
  contractType: ContractType;
  status: EmployeeStatus;
  salary: string;
  benefits: string[];
  notes: string;
}

const initialForm: FormData = {
  company: 'Igreja Mananciais',
  fullName: '', cpf: '', rg: '', email: '', personalEmail: '',
  phone: '', birthDate: '', address: '', maritalStatus: '',
  positionId: '', departmentId: '', managerId: '',
  admissionDate: new Date().toISOString().split('T')[0],
  contractType: 'CLT', status: 'admissao',
  salary: '', benefits: [], notes: '',
};

type TabId = 'pessoal' | 'profissional' | 'financeiro';

const tabs: { id: TabId; label: string }[] = [
  { id: 'pessoal', label: 'Dados Pessoais' },
  { id: 'profissional', label: 'Dados Profissionais' },
  { id: 'financeiro', label: 'Remuneração' },
];

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[10px] text-[#555] uppercase tracking-widest block mb-1.5 font-semibold">
        {label}{required && <span className="text-[#e8ff2a] ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = "w-full bg-[#0d0d0d] border border-[#1f1f1f] text-sm text-[#f0f0f0] placeholder-[#333] px-3 py-2.5 outline-none focus:border-[#e8ff2a] transition-colors rounded-none appearance-none";

export default function EmployeeForm({ onClose, onSave }: EmployeeFormProps) {
  const [tab, setTab] = useState<TabId>('pessoal');
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const set = (key: keyof FormData, value: string | string[]) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const toggleBenefit = (b: string) => {
    set('benefits', form.benefits.includes(b)
      ? form.benefits.filter(x => x !== b)
      : [...form.benefits, b]);
  };

  const filteredPositions = form.departmentId
    ? positions.filter(p => p.departmentId === form.departmentId)
    : positions;

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.fullName.trim()) e.fullName = 'Nome obrigatório';
    if (!form.email.trim()) e.email = 'E-mail obrigatório';
    if (!form.departmentId) e.departmentId = 'Departamento obrigatório';
    if (!form.positionId) e.positionId = 'Cargo obrigatório';
    if (!form.admissionDate) e.admissionDate = 'Data de admissão obrigatória';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) { setTab('pessoal'); return; }
    const initials = form.fullName.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
    const newEmployee: Employee = {
      id: `e${Date.now()}`,
      company: form.company,
      fullName: form.fullName, cpf: form.cpf, rg: form.rg,
      email: form.email, personalEmail: form.personalEmail,
      phone: form.phone, birthDate: form.birthDate, address: form.address,
      maritalStatus: form.maritalStatus, positionId: form.positionId,
      departmentId: form.departmentId, managerId: form.managerId || null,
      admissionDate: form.admissionDate, contractType: form.contractType,
      status: form.status, salary: parseFloat(form.salary) || 0,
      benefits: form.benefits, notes: form.notes,
      avatarInitials: initials, createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onSave(newEmployee);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-[#111] border border-[#1f1f1f] w-full max-w-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1f1f1f] flex-shrink-0">
          <div>
            <h2 className="text-base font-black text-[#f0f0f0]">Novo Funcionário</h2>
            <p className="text-[10px] text-[#555] mt-0.5">Preencha os dados do novo colaborador</p>
          </div>
          <button onClick={onClose} className="text-[#555] hover:text-[#f0f0f0] transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#1f1f1f] flex-shrink-0">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-3 text-xs font-semibold transition-colors relative ${
                tab === t.id
                  ? 'text-[#e8ff2a]'
                  : 'text-[#555] hover:text-[#888]'
              }`}
            >
              {t.label}
              {tab === t.id && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#e8ff2a]" />}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">

          {/* ── DADOS PESSOAIS ── */}
          {tab === 'pessoal' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Field label="Nome Completo" required>
                  <input value={form.fullName} onChange={e => set('fullName', e.target.value)}
                    placeholder="Ex: Ana Carolina Silva" className={inputCls} />
                  {errors.fullName && <p className="text-[10px] text-[#ff4c4c] mt-1">{errors.fullName}</p>}
                </Field>
              </div>
              <Field label="CPF">
                <input value={form.cpf} onChange={e => set('cpf', e.target.value)}
                  placeholder="000.000.000-00" className={inputCls} />
              </Field>
              <Field label="RG">
                <input value={form.rg} onChange={e => set('rg', e.target.value)}
                  placeholder="00.000.000-0" className={inputCls} />
              </Field>
              <Field label="E-mail Corporativo" required>
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                  placeholder="nome@empresa.com" className={inputCls} />
                {errors.email && <p className="text-[10px] text-[#ff4c4c] mt-1">{errors.email}</p>}
              </Field>
              <Field label="E-mail Pessoal">
                <input type="email" value={form.personalEmail} onChange={e => set('personalEmail', e.target.value)}
                  placeholder="nome@gmail.com" className={inputCls} />
              </Field>
              <Field label="Telefone">
                <input value={form.phone} onChange={e => set('phone', e.target.value)}
                  placeholder="(11) 99999-0000" className={inputCls} />
              </Field>
              <Field label="Data de Nascimento">
                <input type="date" value={form.birthDate} onChange={e => set('birthDate', e.target.value)}
                  className={inputCls} />
              </Field>
              <Field label="Estado Civil">
                <select value={form.maritalStatus} onChange={e => set('maritalStatus', e.target.value)}
                  className={inputCls}>
                  <option value="">Selecione...</option>
                  {MARITAL_STATUS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </Field>
              <div className="col-span-2">
                <Field label="Endereço">
                  <input value={form.address} onChange={e => set('address', e.target.value)}
                    placeholder="Rua, número — Cidade, Estado" className={inputCls} />
                </Field>
              </div>
            </div>
          )}

          {/* ── DADOS PROFISSIONAIS ── */}
          {tab === 'profissional' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Field label="Empresa" required>
                  <select value={form.company} onChange={e => set('company', e.target.value)}
                    className={inputCls}>
                    <option value="Igreja Mananciais">Igreja Mananciais</option>
                    <option value="Phizchat">Phizchat</option>
                  </select>
                </Field>
              </div>
              <Field label="Departamento" required>
                <select value={form.departmentId} onChange={e => { set('departmentId', e.target.value); set('positionId', ''); }}
                  className={inputCls}>
                  <option value="">Selecione...</option>
                  {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
                {errors.departmentId && <p className="text-[10px] text-[#ff4c4c] mt-1">{errors.departmentId}</p>}
              </Field>
              <Field label="Cargo" required>
                <select value={form.positionId} onChange={e => set('positionId', e.target.value)}
                  className={inputCls} disabled={!form.departmentId}>
                  <option value="">Selecione...</option>
                  {filteredPositions.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                {errors.positionId && <p className="text-[10px] text-[#ff4c4c] mt-1">{errors.positionId}</p>}
              </Field>
              <Field label="Gestor Responsável">
                <select value={form.managerId} onChange={e => set('managerId', e.target.value)}
                  className={inputCls}>
                  <option value="">Nenhum / Não definido</option>
                  {employees.map(e => <option key={e.id} value={e.id}>{e.fullName}</option>)}
                </select>
              </Field>
              <Field label="Data de Admissão" required>
                <input type="date" value={form.admissionDate} onChange={e => set('admissionDate', e.target.value)}
                  className={inputCls} />
                {errors.admissionDate && <p className="text-[10px] text-[#ff4c4c] mt-1">{errors.admissionDate}</p>}
              </Field>
              <Field label="Tipo de Contrato">
                <select value={form.contractType} onChange={e => set('contractType', e.target.value as ContractType)}
                  className={inputCls}>
                  {CONTRACT_TYPES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Status Inicial">
                <select value={form.status} onChange={e => set('status', e.target.value as EmployeeStatus)}
                  className={inputCls}>
                  <option value="admissao">Em Admissão</option>
                  <option value="ativo">Ativo</option>
                </select>
              </Field>
              <div className="col-span-2">
                <Field label="Observações Internas">
                  <textarea value={form.notes} onChange={e => set('notes', e.target.value)}
                    rows={3} placeholder="Informações adicionais sobre o colaborador..."
                    className={`${inputCls} resize-none`} />
                </Field>
              </div>
            </div>
          )}

          {/* ── FINANCEIRO ── */}
          {tab === 'financeiro' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Field label="Salário / Remuneração Base (R$)">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#555]">R$</span>
                    <input type="number" value={form.salary} onChange={e => set('salary', e.target.value)}
                      placeholder="0,00" className={`${inputCls} pl-8`} />
                  </div>
                </Field>
              </div>
              <div className="col-span-2">
                <Field label="Benefícios">
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {BENEFITS_OPTIONS.map(b => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => toggleBenefit(b)}
                        className={`text-left text-xs px-3 py-2.5 border transition-colors ${
                          form.benefits.includes(b)
                            ? 'border-[#e8ff2a] bg-[rgba(232,255,42,0.08)] text-[#e8ff2a]'
                            : 'border-[#1f1f1f] bg-[#0d0d0d] text-[#555] hover:border-[#2f2f2f] hover:text-[#888]'
                        }`}
                      >
                        {form.benefits.includes(b) ? '✓ ' : '+ '}{b}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>
              {form.benefits.length > 0 && (
                <div className="col-span-2 bg-[#0d0d0d] border border-[#1f1f1f] p-3">
                  <p className="text-[10px] text-[#555] mb-1">Selecionados:</p>
                  <p className="text-xs text-[#888]">{form.benefits.join(' · ')}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#1f1f1f] flex-shrink-0">
          <div className="flex gap-2">
            {tabs.map((t, i) => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`w-1.5 h-1.5 transition-all ${tab === t.id ? 'bg-[#e8ff2a] w-4' : 'bg-[#333]'}`} />
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={onClose}
              className="px-4 py-2.5 text-sm text-[#555] bg-[#1a1a1a] border border-[#2f2f2f] hover:text-[#f0f0f0] transition-colors">
              Cancelar
            </button>
            {tab !== 'financeiro' ? (
              <button
                onClick={() => setTab(tab === 'pessoal' ? 'profissional' : 'financeiro')}
                className="px-4 py-2.5 text-sm font-bold bg-[#1f1f1f] border border-[#2f2f2f] text-[#f0f0f0] hover:border-[#e8ff2a]/30 transition-colors">
                Próximo →
              </button>
            ) : (
              <button onClick={handleSave}
                className="px-5 py-2.5 text-sm font-bold bg-[#e8ff2a] text-[#0a0a0a] hover:bg-[#d4eb1f] transition-colors">
                Cadastrar Funcionário
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

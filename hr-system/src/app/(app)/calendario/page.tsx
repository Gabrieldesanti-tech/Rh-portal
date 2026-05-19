'use client';

import { useState, useEffect } from 'react';
import type { Employee, Vacation } from '@/types/hr';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay, addMonths, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarDays, ChevronLeft, ChevronRight, Cake, Umbrella, Info } from 'lucide-react';

interface EventItem {
  type: 'aniversario' | 'ferias' | 'feriado';
  title: string;
  subtitle?: string;
  color: string;
}

export default function CalendarioPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 18)); // Maio de 2026
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [empRes, vacRes] = await Promise.all([
          fetch('/api/funcionarios'),
          fetch('/api/ferias'),
        ]);
        if (empRes.ok && vacRes.ok) {
          const empData = await empRes.json();
          const vacData = await vacRes.json();
          setEmployees(empData);
          setVacations(vacData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get the start day of the week (0 = Sunday, 6 = Saturday)
  const startDayOfWeek = getDay(monthStart);

  // Generate blank spaces for the days before the start of the month
  const blankDays = Array(startDayOfWeek).fill(null);

  const prevMonth = () => setCurrentDate(prev => subMonths(prev, 1));
  const nextMonth = () => setCurrentDate(prev => addMonths(prev, 1));

  // Get events for a specific day
  const getDayEvents = (day: Date): EventItem[] => {
    const list: EventItem[] = [];

    // 1. Birthdays
    employees.forEach(emp => {
      if (emp.birthDate) {
        const bDate = new Date(emp.birthDate);
        if (bDate.getMonth() === day.getMonth() && bDate.getDate() === day.getDate()) {
          list.push({
            type: 'aniversario',
            title: `🎂 Niver: ${emp.fullName.split(' ')[0]}`,
            subtitle: `${emp.fullName} (${2026 - bDate.getFullYear()} anos)`,
            color: '#ffaa2a',
          });
        }
      }
    });

    // 2. Vacations
    vacations.forEach(vac => {
      if (vac.requestedStart && vac.requestedEnd) {
        const start = new Date(vac.requestedStart);
        const end = new Date(vac.requestedEnd);
        const emp = employees.find(e => e.id === vac.employeeId);
        
        if (day >= start && day <= end && emp) {
          list.push({
            type: 'ferias',
            title: `🌴 Férias: ${emp.fullName.split(' ')[0]}`,
            subtitle: `${emp.fullName} (${vac.totalDays} dias)`,
            color: '#e8ff2a',
          });
        }
      }
    });

    // 3. Mock national holidays
    if (day.getMonth() === 4 && day.getDate() === 1) {
      list.push({ type: 'feriado', title: '🚩 Dia do Trabalho', color: '#ff4c4c' });
    }

    return list;
  };

  const allMonthEvents = daysInMonth.flatMap(d => getDayEvents(d).map(e => ({ ...e, date: d })));

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 animate-fade-up">
        <div>
          <h1 className="text-3xl font-black tracking-tight">
            Calendário <span className="text-[#e8ff2a]">Corporativo</span>
          </h1>
          <p className="text-sm text-[#555] mt-1">Escalas de férias, aniversários e feriados internos</p>
        </div>
        <div className="flex items-center gap-2 bg-[#111] border border-[#1f1f1f] p-1">
          <button onClick={prevMonth} className="p-2 hover:bg-[#1a1a1a] text-[#555] hover:text-[#f0f0f0] transition-colors">
            <ChevronLeft size={16} />
          </button>
          <span className="text-xs font-black uppercase tracking-widest px-4 text-[#f0f0f0]">
            {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
          </span>
          <button onClick={nextMonth} className="p-2 hover:bg-[#1a1a1a] text-[#555] hover:text-[#f0f0f0] transition-colors">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Grid Layout (asymmetric 75/25) */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start animate-fade-up">
        {/* Calendar Grid */}
        <div className="hr-card overflow-hidden">
          {/* Days of week */}
          <div className="grid grid-cols-7 border-b border-[#1f1f1f] bg-[#0d0d0d] text-center">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
              <span key={day} className="text-[10px] text-[#555] uppercase tracking-widest py-3 font-bold border-r border-[#1f1f1f] last:border-0">
                {day}
              </span>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 bg-[#111] grid-rows-5 min-h-[500px]">
            {/* Blank cells */}
            {blankDays.map((_, i) => (
              <div key={`blank-${i}`} className="border-r border-b border-[#1f1f1f] bg-[#0d0d0d]/30" />
            ))}

            {/* Actual Month Days */}
            {daysInMonth.map((day) => {
              const dayEvents = getDayEvents(day);
              const isToday = isSameDay(day, new Date(2026, 4, 18)); // Mock today's date

              return (
                <div
                  key={day.toString()}
                  className={`border-r border-b border-[#1f1f1f] p-2 flex flex-col justify-between hover:bg-[#161616] transition-colors min-h-[100px] group ${
                    isToday ? 'border-t-2 border-t-[#e8ff2a]' : ''
                  }`}
                >
                  {/* Day number */}
                  <div className="flex items-center justify-between">
                    {isToday ? (
                      <span className="bg-[#e8ff2a] text-[#0a0a0a] text-[9px] font-black px-1.5 py-0.5 uppercase tracking-wide">
                        Hoje
                      </span>
                    ) : <span />}
                    <span className={`text-xs font-mono font-bold ${
                      isToday ? 'text-[#e8ff2a]' : 'text-[#444] group-hover:text-[#f0f0f0]'
                    }`}>
                      {format(day, 'd')}
                    </span>
                  </div>

                  {/* Day Events Stack */}
                  <div className="space-y-1 mt-2">
                    {dayEvents.map((evt, idx) => (
                      <div
                        key={idx}
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded-[2px] truncate cursor-help"
                        style={{
                          backgroundColor: `${evt.color}15`,
                          color: evt.color,
                          borderLeft: `2px solid ${evt.color}`,
                        }}
                        title={`${evt.title}${evt.subtitle ? ` — ${evt.subtitle}` : ''}`}
                      >
                        {evt.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar Event List */}
        <div className="hr-card p-5">
          <h2 className="text-[10px] text-[#555] uppercase tracking-widest font-black mb-4">
            Destaques de {format(currentDate, 'MMMM', { locale: ptBR })}
          </h2>

          {allMonthEvents.length === 0 ? (
            <p className="text-xs text-[#555] py-4 text-center">Nenhum evento neste mês.</p>
          ) : (
            <div className="space-y-4">
              {allMonthEvents.map((evt, i) => {
                const Icon = evt.type === 'aniversario' ? Cake : evt.type === 'ferias' ? Umbrella : Info;
                return (
                  <div key={i} className="flex gap-3 items-start border-b border-[#111] pb-3 last:border-0 last:pb-0">
                    <div className="w-8 h-8 bg-[#0d0d0d] border border-[#1f1f1f] flex items-center justify-center flex-shrink-0">
                      <Icon size={13} style={{ color: evt.color }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-mono" style={{ color: evt.color }}>
                          {format(evt.date, 'dd/MM/yyyy')}
                        </p>
                        <span className="text-[8px] uppercase tracking-wider text-[#444]">{evt.type}</span>
                      </div>
                      <p className="text-xs font-bold text-[#f0f0f0] truncate">{evt.title.replace(/^(🎂|🌴|🚩)\s*/, '')}</p>
                      {evt.subtitle && <p className="text-[10px] text-[#555] truncate">{evt.subtitle}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Building2,
  DollarSign,
  Umbrella,
  Mail,
  Calendar,
  Settings,
  LogOut,
  ChevronRight,
  Bell,
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/funcionarios', label: 'Funcionários', icon: Users },
  { href: '/departamentos', label: 'Departamentos', icon: Building2 },
  { href: '/pagamentos', label: 'Pagamentos', icon: DollarSign },
  { href: '/ferias', label: 'Férias', icon: Umbrella },
  { href: '/comunicados', label: 'Comunicados', icon: Mail },
  { href: '/calendario', label: 'Calendário', icon: Calendar },
];

const bottomItems = [
  { href: '/configuracoes', label: 'Configurações', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-16 flex flex-col border-r border-[#1f1f1f] bg-[#0d0d0d] z-50">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-[#1f1f1f]">
        <div className="w-8 h-8 bg-[#e8ff2a] flex items-center justify-center">
          <span className="text-[#0a0a0a] font-black text-sm leading-none">RH</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col items-center gap-1 py-4 px-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/');
          return (
            <Tooltip key={href}>
              <TooltipTrigger>
                <Link
                  href={href}
                  className={cn(
                    'relative w-10 h-10 flex items-center justify-center transition-all duration-150',
                    isActive
                      ? 'bg-[rgba(232,255,42,0.08)] text-[#e8ff2a]'
                      : 'text-[#555] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]'
                  )}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-5 bg-[#e8ff2a]" />
                  )}
                  <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-[#1a1a1a] text-[#f0f0f0] border-[#2f2f2f] text-xs">
                {label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="flex flex-col items-center gap-1 py-4 px-2 border-t border-[#1f1f1f]">
        {/* Notifications */}
        <Tooltip>
          <TooltipTrigger>
            <div role="button" className="relative w-10 h-10 flex items-center justify-center text-[#555] hover:text-[#f0f0f0] hover:bg-[#1a1a1a] transition-all duration-150 cursor-pointer">
              <Bell size={18} strokeWidth={1.5} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#e8ff2a] rounded-full" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-[#1a1a1a] text-[#f0f0f0] border-[#2f2f2f] text-xs">
            Notificações
          </TooltipContent>
        </Tooltip>

        {bottomItems.map(({ href, label, icon: Icon }) => (
          <Tooltip key={href}>
            <TooltipTrigger>
              <Link
                href={href}
                className="w-10 h-10 flex items-center justify-center text-[#555] hover:text-[#f0f0f0] hover:bg-[#1a1a1a] transition-all duration-150"
              >
                <Icon size={18} strokeWidth={1.5} />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-[#1a1a1a] text-[#f0f0f0] border-[#2f2f2f] text-xs">
              {label}
            </TooltipContent>
          </Tooltip>
        ))}

        {/* Avatar */}
        <Tooltip>
          <TooltipTrigger>
            <div className="w-10 h-10 flex items-center justify-center cursor-pointer">
              <div className="w-7 h-7 bg-[#e8ff2a] flex items-center justify-center">
                <span className="text-[#0a0a0a] font-bold text-xs">AD</span>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-[#1a1a1a] text-[#f0f0f0] border-[#2f2f2f] text-xs">
            Admin
          </TooltipContent>
        </Tooltip>
      </div>
    </aside>
  );
}

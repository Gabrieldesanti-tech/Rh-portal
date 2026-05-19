'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Lock, Mail, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Try real Supabase Auth
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!authError) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/dashboard');
          router.refresh();
        }, 1000);
        return;
      }

      setError(authError.message === 'Invalid login credentials' 
        ? 'Credenciais inválidas. Verifique seu e-mail e senha.' 
        : authError.message
      );
      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao realizar o login.');
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#050505] overflow-hidden px-4 select-none">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,255,42,0.02)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[rgba(232,255,42,0.01)] rounded-full blur-[120px] pointer-events-none" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Login Card */}
      <div className="w-full max-w-[420px] bg-[rgba(18,18,18,0.45)] border border-[rgba(255,255,255,0.04)] backdrop-blur-xl p-8 rounded-[4px] relative z-10 animate-fade-in shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        
        {/* Sleek Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[rgba(232,255,42,0.04)] border border-[rgba(232,255,42,0.15)] mb-4">
            <span className="text-xl font-black text-[#e8ff2a] tracking-tighter">AG</span>
          </div>
          <h2 className="text-xl font-black text-[#f0f0f0] tracking-tight uppercase">
            Portal <span className="text-[#e8ff2a]">RH</span>
          </h2>
          <p className="text-xs text-[#555] mt-1.5 uppercase tracking-widest">
            Antigravity HR Platform
          </p>
        </div>

        {/* Message Panels */}
        {error && (
          <div className="mb-6 p-4 bg-[rgba(239,68,68,0.05)] border border-[rgba(239,68,68,0.15)] flex items-start gap-3 rounded-[2px] animate-shake">
            <ShieldAlert className="text-red-500 flex-shrink-0 mt-0.5" size={16} />
            <p className="text-xs text-[#d3d3d3] leading-relaxed">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-[rgba(232,255,42,0.05)] border border-[rgba(232,255,42,0.2)] flex items-start gap-3 rounded-[2px]">
            <CheckCircle2 className="text-[#e8ff2a] flex-shrink-0 mt-0.5" size={16} />
            <p className="text-xs text-[#e8ff2a] leading-relaxed font-semibold">
              Autenticado com sucesso! Redirecionando...
            </p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-semibold text-[#555] uppercase tracking-wider">
              E-mail Corporativo
            </label>
            <div className="relative group">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#444] group-focus-within:text-[#e8ff2a] transition-colors" size={14} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemplo@empresa.com"
                className="w-full bg-[#0d0d0d] border border-[#1f1f1f] focus:border-[#e8ff2a] outline-none text-xs text-[#f0f0f0] pl-10 pr-4 py-3 transition-colors rounded-[2px]"
                disabled={loading || success}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-semibold text-[#555] uppercase tracking-wider">
              Senha
            </label>
            <div className="relative group">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#444] group-focus-within:text-[#e8ff2a] transition-colors" size={14} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0d0d0d] border border-[#1f1f1f] focus:border-[#e8ff2a] outline-none text-xs text-[#f0f0f0] pl-10 pr-4 py-3 transition-colors rounded-[2px]"
                disabled={loading || success}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || success}
            className="w-full mt-2 bg-[#e8ff2a] hover:bg-[#d4ec24] text-black font-black text-xs uppercase tracking-widest py-3.5 transition-all active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none rounded-[2px]"
          >
            {loading ? 'Processando Autenticação...' : 'Entrar no Sistema'}
          </button>
        </form>
      </div>

      {/* Fine Print Footer */}
      <p className="absolute bottom-6 text-[9px] text-[#444] uppercase tracking-widest z-10 text-center">
        Segurança integrada • Antigravity 2026
      </p>
    </div>
  );
}

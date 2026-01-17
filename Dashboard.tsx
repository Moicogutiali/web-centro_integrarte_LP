import React, { useEffect, useState, useMemo } from 'react';
import { supabase } from '../lib/supabase';

interface RealCase {
  id: string;
  full_name: string;
  ci: string;
  phone: string;
  email: string;
  subject: string;
  description: string;
  status: string;
  created_at: string;
}

interface CourseRegistration {
  id: string;
  course_id: string;
  full_name: string;
  ci: string;
  phone: string;
  created_at: string;
  courses: {
    title: string;
  };
}

interface StatItem {
  label: string;
  val: number;
  icon: string;
  color: string;
}

const Dashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cases, setCases] = useState<RealCase[]>([]);
  const [registrations, setRegistrations] = useState<CourseRegistration[]>([]);
  const [activeTab, setActiveTab] = useState<'cases' | 'courses'>('cases');
  const [loading, setLoading] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [dbStatus, setDbStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const [selectedCase, setSelectedCase] = useState<RealCase | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Verificar sesión activa
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) setIsAuthenticated(true);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === 'cases') fetchCases();
      else fetchRegistrations();
    }
  }, [isAuthenticated, activeTab]);

  const fetchCases = async () => {
    try {
      setLoading(true);
      setDbStatus('checking');
      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCases((data as RealCase[]) || []);
      setDbStatus('online');
    } catch (err: any) {
      console.error("Fetch error:", err);
      setDbStatus('offline');
    } finally {
      setLoading(false);
    }
  };

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      setDbStatus('checking');
      const { data, error } = await supabase
        .from('course_registrations')
        .select(`
          *,
          courses (
            title
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRegistrations((data as any[]) || []);
      setDbStatus('online');
    } catch (err: any) {
      console.error("Fetch registrations error:", err);
      setDbStatus('offline');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (err: any) {
      alert("Acceso denegado: " + (err.message || "Credenciales incorrectas"));
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setIsUpdating(true);
    try {
      const { error } = await supabase.from('cases').update({ status: newStatus }).eq('id', id);
      if (error) throw error;

      setCases((prev: RealCase[]) => prev.map((item: RealCase) => item.id === id ? { ...item, status: newStatus } : item));

      if (selectedCase?.id === id) {
        setSelectedCase(selectedCase ? { ...selectedCase, status: newStatus } : null);
      }
    } catch (err: any) {
      alert("Error de actualización: " + (err?.message || 'Error desconocido'));
    } finally {
      setIsUpdating(false);
    }
  };

  const casesPendingCount = useMemo(() => {
    return cases.filter((item: RealCase): boolean => item.status !== 'Resuelto').length;
  }, [cases]);

  const casesResolvedCount = useMemo(() => {
    return cases.filter((item: RealCase): boolean => item.status === 'Resuelto').length;
  }, [cases]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '60px 60px' }}></div>
        </div>
        <div className="max-w-md w-full bg-white/5 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/10 shadow-2xl space-y-8 animate-fade-in relative z-10 text-center">
          <div className="space-y-4">
            <div className="size-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto text-gold border border-gold/30">
              <span className="material-symbols-outlined text-4xl">lock_person</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Portal Institucional</h1>
            <p className="text-slate-400 text-sm">Contenido restringido para personal autorizado de INTEGRARSE.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-black uppercase text-gold tracking-widest ml-1">Correo Corporativo</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 bg-white/10 border-white/10 rounded-2xl text-white px-6 focus:ring-gold focus:border-gold placeholder:text-slate-600 transition-all"
                placeholder="admin@integrarse.bo"
                required
              />
            </div>
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-black uppercase text-gold tracking-widest ml-1">Clave de Acceso</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 bg-white/10 border-white/10 rounded-2xl text-white px-6 focus:ring-gold focus:border-gold placeholder:text-slate-600 transition-all"
                placeholder="••••••••••••"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full h-14 bg-gold text-secondary font-black rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest text-xs disabled:opacity-50"
            >
              {isLoggingIn ? 'Verificando...' : 'Desbloquear Datos'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const stats: StatItem[] = [
    { label: 'Casos en Trámite', val: casesPendingCount, icon: 'pending_actions', color: 'text-primary' },
    { label: 'Total Expedientes', val: cases.length, icon: 'folder_zip', color: 'text-slate-600' },
    { label: 'Inscritos a Cursos', val: registrations.length, icon: 'school', color: 'text-gold' }
  ];

  return (
    <div className="flex min-h-screen bg-background-light">
      <div className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-12 pb-24">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-black text-secondary tracking-tight">Dashboard Administrativo</h1>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${dbStatus === 'online' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                  }`}>
                  <span className={`size-2 rounded-full ${dbStatus === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                  {dbStatus === 'online' ? 'Servidor Conectado' : 'Error DB'}
                </div>
              </div>
              <p className="text-slate-400 text-sm font-medium">Bandeja de entrada y control institucional.</p>
            </div>
            <div className="flex gap-4">
              <button onClick={handleLogout} className="px-6 py-3 border border-slate-200 text-slate-500 font-bold rounded-2xl hover:bg-white transition-all">
                <span className="material-symbols-outlined text-sm align-middle mr-1">logout</span> Salir
              </button>
              <button onClick={activeTab === 'cases' ? fetchCases : fetchRegistrations} className="bg-primary text-white font-black px-8 py-3 rounded-2xl shadow-lg shadow-primary/20 flex items-center gap-2 hover:scale-105 transition-all">
                <span className="material-symbols-outlined text-sm">sync</span> Sincronizar
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((s: StatItem, i: number) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-8">
                <div className={`size-16 rounded-3xl bg-slate-50 flex items-center justify-center ${s.color}`}>
                  <span className="material-symbols-outlined text-4xl">{s.icon}</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">{s.label}</p>
                  <p className="text-5xl font-black text-secondary tracking-tighter">{s.val}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tab Switcher */}
          <div className="flex gap-2 p-1 bg-slate-100/50 w-fit rounded-2xl border border-slate-100">
            <button
              onClick={() => setActiveTab('cases')}
              className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'cases' ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
            >
              Expedientes
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'courses' ? 'bg-white text-gold shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
            >
              Inscripciones
            </button>
          </div>

          <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              {activeTab === 'cases' ? (
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Solicitante</th>
                      <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Materia / Asunto</th>
                      <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Estado Actual</th>
                      <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {cases.length === 0 && !loading && (
                      <tr><td colSpan={4} className="p-20 text-center text-slate-300 italic">No hay solicitudes registradas aún.</td></tr>
                    )}
                    {cases.map((record: RealCase) => (
                      <tr key={record.id} className="hover:bg-slate-50/40 transition-colors">
                        <td className="px-10 py-8">
                          <p className="font-bold text-secondary text-lg">{record.full_name}</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase">{new Date(record.created_at).toLocaleDateString('es-BO', { day: 'numeric', month: 'long' })}</p>
                        </td>
                        <td className="px-10 py-8">
                          <span className="px-3 py-1 bg-blue-50 text-primary rounded-lg text-xs font-bold">{record.subject}</span>
                        </td>
                        <td className="px-10 py-8 text-center">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${record.status === 'Resuelto' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}>
                            {record.status}
                          </span>
                        </td>
                        <td className="px-10 py-8 text-right">
                          <button onClick={() => setSelectedCase(record)} className="bg-secondary text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-md">
                            Gestionar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Alumno / Inscrito</th>
                      <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Curso Solicitado</th>
                      <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Celular</th>
                      <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Contacto</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {registrations.length === 0 && !loading && (
                      <tr><td colSpan={4} className="p-20 text-center text-slate-300 italic">No hay inscritos aún.</td></tr>
                    )}
                    {registrations.map((reg: CourseRegistration) => (
                      <tr key={reg.id} className="hover:bg-slate-50/40 transition-colors">
                        <td className="px-10 py-8">
                          <p className="font-bold text-secondary text-lg">{reg.full_name}</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase whitespace-nowrap">CI: {reg.ci} • {new Date(reg.created_at).toLocaleDateString('es-BO')}</p>
                        </td>
                        <td className="px-10 py-8">
                          <span className="px-3 py-1 bg-gold/10 text-gold-700 rounded-lg text-xs font-bold">{reg.courses?.title || 'Curso eliminado'}</span>
                        </td>
                        <td className="px-10 py-8 text-center">
                          <p className="text-secondary font-bold">{reg.phone}</p>
                        </td>
                        <td className="px-10 py-8 text-right">
                          <a
                            href={`https://wa.me/${reg.phone.replace(/\D/g, '')}`}
                            target="_blank"
                            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-md"
                          >
                            WhatsApp
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedCase && (
        <div className="fixed inset-0 z-[100] flex items-center justify-end bg-secondary/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl h-full bg-white shadow-2xl flex flex-col animate-slide-in-right">
            <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-primary uppercase tracking-widest">Información de Expediente</p>
                <h3 className="text-2xl font-black text-secondary">Control de Trámite</h3>
              </div>
              <button onClick={() => setSelectedCase(null)} className="size-12 rounded-full hover:bg-slate-200 flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-10 space-y-10">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Cédula de Identidad</p>
                  <p className="text-lg font-bold text-secondary">{selectedCase.ci}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Teléfono de Contacto</p>
                  <p className="text-lg font-bold text-secondary">{selectedCase.phone}</p>
                </div>
              </div>

              <div className="p-8 bg-blue-50/50 rounded-[2.5rem] border border-blue-100/30 space-y-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">history_edu</span> Resumen de Hechos
                </p>
                <p className="text-slate-600 text-sm leading-relaxed italic border-l-4 border-slate-200 pl-4">
                  "{selectedCase.description}"
                </p>
              </div>

              <div className="space-y-6">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Actualizar Estado del Proceso</p>
                <div className="grid grid-cols-2 gap-3">
                  {['En Revisión', 'Programada', 'En Proceso', 'Resuelto'].map((opt: string) => (
                    <button
                      key={opt}
                      onClick={() => handleUpdateStatus(selectedCase.id, opt)}
                      disabled={isUpdating}
                      className={`px-4 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${selectedCase.status === opt
                        ? 'bg-primary text-white border-primary shadow-lg'
                        : 'bg-slate-50 text-slate-400 border-slate-100 hover:border-primary/30'
                        }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-10 border-t border-slate-100 bg-slate-50/50 flex gap-4">
              <a
                href={`https://wa.me/${selectedCase.phone.replace(/\D/g, '')}`}
                target="_blank"
                className="flex-1 py-5 bg-[#25D366] text-white font-black rounded-2xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02] transition-transform"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="size-6" alt="WA" />
                Iniciar Diálogo
              </a>
              <button onClick={() => setSelectedCase(null)} className="px-8 py-5 bg-secondary text-white font-black rounded-2xl text-xs uppercase tracking-widest">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
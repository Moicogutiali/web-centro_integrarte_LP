
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { CaseStatus } from '../types';

interface RealCase {
  id: string;
  full_name: string;
  subject: string;
  status: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const [cases, setCases] = useState<RealCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ active: 0, resolved: 0 });

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCases(data || []);
      
      const active = data?.filter(c => c.status !== 'Resuelto').length || 0;
      const resolved = data?.filter(c => c.status === 'Resuelto').length || 0;
      setStats({ active, resolved });
    } catch (err) {
      console.error("Error fetching cases:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En Revisión': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Programada': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Resuelto': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="flex min-h-screen bg-background-light">
      <div className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-10 pb-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-3xl font-black text-secondary tracking-tight">Gestión de Procesos Real</h1>
              <p className="text-slate-500">Datos actualizados desde la base de datos central de INTEGRARSE.</p>
            </div>
            <button onClick={fetchCases} className="bg-white hover:bg-slate-50 text-slate-600 font-bold px-6 py-3 rounded-xl border border-slate-200 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined">refresh</span>
              Actualizar
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6">
              <div className="size-14 rounded-2xl bg-blue-50 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-3xl">folder_open</span>
              </div>
              <div>
                <p className="text-xs uppercase font-black text-slate-400 tracking-widest">Trámites Activos</p>
                <p className="text-4xl font-black text-primary">{stats.active}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6">
              <div className="size-14 rounded-2xl bg-green-50 flex items-center justify-center text-green-600">
                <span className="material-symbols-outlined text-3xl">verified</span>
              </div>
              <div>
                <p className="text-xs uppercase font-black text-slate-400 tracking-widest">Total Resueltos</p>
                <p className="text-4xl font-black text-green-600">{stats.resolved}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-20 text-center text-slate-400 font-bold">Cargando base de datos...</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Solicitante</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Asunto</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Estado</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {cases.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-8 py-20 text-center text-slate-400">No hay casos registrados aún.</td>
                      </tr>
                    ) : (
                      cases.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-5 font-bold text-secondary text-sm">{c.full_name}</td>
                          <td className="px-8 py-5 text-sm font-semibold text-slate-700">{c.subject}</td>
                          <td className="px-8 py-5">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(c.status)}`}>
                               {c.status}
                            </span>
                          </td>
                          <td className="px-8 py-5 text-sm text-slate-400">{new Date(c.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

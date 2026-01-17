import React, { useState } from 'react';

interface Specialist {
  name: string;
  role: string;
  specialty: string;
  img: string;
}

const Professionals: React.FC = () => {
  const [filter, setFilter] = useState('Todos');

  const specialists: Specialist[] = [
    { name: 'Dr. Ricardo Vaca', role: 'Árbitro Senior', specialty: 'Comercial', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200' },
    { name: 'Dra. Beatriz Luna', role: 'Conciliadora', specialty: 'Familiar', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200' },
    { name: 'Dr. Marco Antonio Soliz', role: 'Especialista', specialty: 'Civil', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200' },
    { name: 'Dra. Claudia Terán', role: 'Árbitro', specialty: 'Comercial', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200' },
    { name: 'Abg. Sergio Mendez', role: 'Conciliador', specialty: 'Laboral', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200' },
    { name: 'Dra. Patricia Ortiz', role: 'Especialista', specialty: 'Familiar', img: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200&h=200' },
    // Generación dinámica con tipos explícitos
    ...Array(54).fill(0).map((_, i: number): Specialist => ({
      name: `Especialista Jurídico ${i + 7}`,
      role: i % 2 === 0 ? 'Árbitro' : 'Conciliador',
      specialty: ['Civil', 'Comercial', 'Familiar', 'Laboral'][i % 4],
      img: `https://i.pravatar.cc/200?u=integrarse${i}`
    }))
  ];

  const filtered = filter === 'Todos' ? specialists : specialists.filter((s: Specialist) => s.specialty === filter);

  return (
    <div className="bg-background-light py-16 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-black text-secondary tracking-tight">Nuestro Panel de Expertos</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Contamos con más de 60 profesionales altamente especializados en diversas áreas del derecho, acreditados para brindar soluciones efectivas.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3">
          {['Todos', 'Civil', 'Comercial', 'Familiar', 'Laboral'].map((f: string) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full font-bold transition-all border ${filter === f ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white text-slate-500 border-slate-200 hover:border-primary'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filtered.map((s: Specialist, i: number) => (
            <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all group text-center">
              <div className="relative size-24 mx-auto mb-4">
                <img src={s.img} alt={s.name} className="size-full rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div className="absolute -bottom-2 -right-2 size-8 bg-gold rounded-lg flex items-center justify-center text-white border-2 border-white shadow-md">
                   <span className="material-symbols-outlined text-[18px]">verified</span>
                </div>
              </div>
              <h3 className="font-bold text-secondary text-sm leading-tight mb-1 group-hover:text-primary">{s.name}</h3>
              <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">{s.role}</p>
              <div className="mt-3 pt-3 border-t border-slate-50">
                <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">{s.specialty}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Professionals;
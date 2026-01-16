
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 z-10 animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-secondary text-gold px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-lg border border-gold/30">
                <span className="material-symbols-outlined text-sm">verified</span>
                Autorizado por el Gobierno de Bolivia
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-secondary leading-[1.1] tracking-tighter">
                Justicia <span className="text-primary italic">Simple</span>, Rápida y Efectiva.
              </h1>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-xl">
                En <strong>INTEGRARSE</strong> brindamos acceso a soluciones legales con validez plena. Conciliación y Arbitraje para ciudadanos y empresas con visión de paz social.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/solicitud" 
                  className="px-10 py-5 bg-primary hover:bg-blue-600 text-white font-black rounded-2xl shadow-2xl shadow-primary/30 transition-all flex items-center gap-3 group"
                >
                  Iniciar Trámite Ahora
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
                <a 
                  href="https://wa.me/59177293847" 
                  target="_blank"
                  className="px-8 py-5 border-2 border-slate-200 text-slate-700 font-black rounded-2xl hover:bg-slate-50 transition-all flex items-center gap-3"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="size-5" alt="WA" />
                  Consultas Directas
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-20 -right-20 size-[500px] bg-primary/5 rounded-full blur-3xl -z-10"></div>
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white group">
                <img 
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Justicia Bolivia" 
                  className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent flex items-end p-10">
                  <div className="text-white">
                    <p className="text-gold font-black text-sm uppercase tracking-widest mb-2">Compromiso Ético</p>
                    <p className="text-2xl font-bold leading-tight">Garantizamos imparcialidad y reserva absoluta en cada caso.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background-light">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-secondary">Nuestras Áreas de Servicio</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Mecanismos modernos de resolución de conflictos diseñados para ahorrar tiempo y recursos.</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Conciliación', icon: 'diversity_3', desc: 'Acuerdos voluntarios con calidad de sentencia judicial firme.' },
            { title: 'Arbitraje', icon: 'gavel', desc: 'Resolución de controversias por expertos técnicos especializados.' },
            { title: 'Capacitación', icon: 'school', desc: 'Formación continua para abogados y operadores de justicia.' }
          ].map((s, i) => (
            <div key={i} className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">{s.icon}</span>
              </div>
              <h3 className="text-2xl font-black text-secondary mb-4">{s.title}</h3>
              <p className="text-slate-500 leading-relaxed mb-8">{s.desc}</p>
              <Link to="/servicios" className="text-primary font-bold inline-flex items-center gap-2 hover:gap-4 transition-all">
                Saber más <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-secondary py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <span className="material-symbols-outlined text-[300px] text-white">balance</span>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
              {[
                { n: '100%', label: 'Legalidad' },
                { n: '+500', label: 'Empresas' },
                { n: '24h', label: 'Respuesta' },
                { n: '80%', label: 'Menos Costo' }
              ].map((stat, i) => (
                <div key={i} className="space-y-2">
                  <div className="text-5xl font-black text-gold italic">{stat.n}</div>
                  <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">{stat.label}</div>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

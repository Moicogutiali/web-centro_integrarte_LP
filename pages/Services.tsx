
import React from 'react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const mainServices = [
    {
      title: 'Conciliación Extrajudicial',
      icon: 'handshake',
      desc: 'Un proceso voluntario donde un tercero imparcial ayuda a las partes a encontrar una solución de mutuo beneficio, con plena validez de sentencia judicial.',
      points: ['Civil y Comercial', 'Familiar y Vecinal', 'Económico y Rápido'],
      img: 'https://picsum.photos/id/20/800/600',
      color: 'bg-blue-500'
    },
    {
      title: 'Arbitraje Institucional',
      icon: 'gavel',
      desc: 'Mecanismo privado y especializado para la resolución de controversias donde árbitros expertos emiten un laudo definitivo y obligatorio.',
      points: ['Contratos Complejos', 'Árbitros Técnicos', 'Sentencia Inapelable'],
      img: 'https://picsum.photos/id/175/800/600',
      color: 'bg-gold'
    }
  ];

  return (
    <div className="bg-background-light py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl font-black text-secondary tracking-tight">Servicios de Resolución</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Ofrecemos mecanismos modernos para la solución de conflictos, enfocados en la preservación de las relaciones y el ahorro de recursos.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          {mainServices.map((s, i) => (
            <div 
              key={i} 
              className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 group transition-all`}
            >
              <div className="lg:w-1/2 relative h-[300px] lg:h-auto overflow-hidden">
                <img 
                  src={s.img} 
                  alt={s.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-secondary/20"></div>
              </div>
              <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-4 rounded-2xl ${s.color} text-white shadow-lg`}>
                    <span className="material-symbols-outlined text-3xl">{s.icon}</span>
                  </div>
                  <h2 className="text-3xl font-black text-secondary">{s.title}</h2>
                </div>
                <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                  {s.desc}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {s.points.map((p, pi) => (
                    <div key={pi} className="flex items-center gap-2 text-slate-700 font-semibold">
                      <span className="material-symbols-outlined text-primary">check_circle</span>
                      {p}
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/solicitud" 
                    className="px-8 py-3 bg-secondary text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg"
                  >
                    Iniciar Trámite
                  </Link>
                  <button className="px-8 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors">
                    Ver Tarifario
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section Placeholder */}
        <div className="mt-32 max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-10 shadow-xl border border-slate-100">
             <h3 className="text-2xl font-bold text-secondary mb-8 flex items-center gap-3">
               <span className="material-symbols-outlined text-primary">help</span>
               Preguntas Frecuentes
             </h3>
             <div className="space-y-6">
               {[
                 { q: "¿Qué validez tiene el acta de conciliación?", a: "Tiene calidad de Cosa Juzgada, equivalente a una sentencia judicial firme." },
                 { q: "¿Cuánto tiempo dura el proceso?", a: "La conciliación suele resolverse en una sola audiencia de pocas horas." },
                 { q: "¿Es obligatorio asistir con abogado?", a: "No es obligatorio, pero siempre es recomendable contar con asesoría." }
               ].map((faq, i) => (
                 <div key={i} className="pb-6 border-b border-slate-50 last:border-0">
                    <p className="font-bold text-secondary text-lg mb-2">{faq.q}</p>
                    <p className="text-slate-500 leading-relaxed">{faq.a}</p>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;

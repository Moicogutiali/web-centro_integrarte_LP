
import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
  const socialIcons: string[] = ['facebook', 'linkedin', 'instagram', 'youtube'];
  const services: string[] = ['Conciliación Familiar', 'Arbitraje de Inversión', 'Capacitación a Empresas', 'Asesoría Pro-Bono'];
  const bottomLinks: string[] = ['Términos de Uso', 'Protección de Datos', 'Mapa del Sitio'];

  return (
    <footer className="bg-secondary text-white pt-20 pb-10 border-t-4 border-gold relative overflow-hidden">
      {/* Elemento decorativo floral en marca de agua */}
      <div className="absolute -bottom-20 -right-20 opacity-5 pointer-events-none">
        <Logo showText={false} className="h-96" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          {/* Brand */}
          <div className="flex flex-col gap-8">
            <Logo textColor="text-white" />
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              El Centro de Conciliación y Arbitraje <strong>INTEGRARSE</strong> es una institución boliviana líder en la promoción de la cultura de paz y justicia efectiva.
            </p>
            <div className="flex gap-4">
              {socialIcons.map((icon: string) => (
                <a key={icon} href="#" className="size-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all border border-white/10">
                  <span className="material-symbols-outlined text-xl italic">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Sede */}
          <div className="flex flex-col gap-6">
            <h4 className="text-sm font-black text-gold uppercase tracking-[0.2em]">Sede Principal</h4>
            <div className="space-y-4 text-slate-300 text-sm">
              <div className="flex items-start gap-4">
                <div className="size-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                </div>
                <span>Av. 20 de Octubre No. 2568<br/>Edificio Torres Belén, Piso 5<br/>La Paz, Bolivia</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="size-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary text-xl">call</span>
                </div>
                <span>+591 2 244 5566</span>
              </div>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div className="flex flex-col gap-6">
            <h4 className="text-sm font-black text-gold uppercase tracking-[0.2em]">Servicios</h4>
            <nav className="flex flex-col gap-3 text-slate-400 text-sm font-bold">
              {services.map((s: string) => (
                <a key={s} href="#" className="hover:text-white transition-colors flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-primary"></div> {s}
                </a>
              ))}
            </nav>
          </div>

          {/* Accreditation Label */}
          <div className="flex flex-col gap-6">
            <h4 className="text-sm font-black text-gold uppercase tracking-[0.2em]">Acreditación</h4>
            <div className="p-6 rounded-[2rem] bg-slate-800/50 border border-slate-700 space-y-4 shadow-inner">
               <div className="flex items-center gap-3">
                 <span className="material-symbols-outlined text-gold text-2xl">verified_user</span>
                 <p className="text-[10px] font-black uppercase tracking-widest text-white leading-tight">Centro Autorizado por el Gobierno</p>
               </div>
               <p className="text-[11px] leading-relaxed text-slate-400">Operamos bajo la Resolución Ministerial No. 124/2023 emitida por el Ministerio de Justicia y Transparencia Institucional del Estado Plurinacional de Bolivia.</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
          <p>© 2024 INTEGRARSE. Todos los derechos reservados.</p>
          <div className="flex gap-8">
            {bottomLinks.map((link: string) => (
              <a key={link} href="#" className="hover:text-white transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

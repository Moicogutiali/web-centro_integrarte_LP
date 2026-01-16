
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Confirmation: React.FC = () => {
  const location = useLocation();
  const waLink = location.state?.waLink;

  return (
    <div className="bg-background-light min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-[2.5rem] shadow-2xl p-10 md:p-16 text-center space-y-8 border border-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gold"></div>

        <div className="flex flex-col items-center space-y-6">
          <div className="size-24 bg-green-50 rounded-full flex items-center justify-center text-green-600 animate-pulse">
            <span className="material-symbols-outlined text-6xl fill-1">check_circle</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-secondary">¡Registro Exitoso!</h1>
            <p className="text-slate-500">Su trámite ha sido ingresado al sistema de INTEGRARSE.</p>
          </div>
        </div>

        <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
           <div className="space-y-1">
             <span className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em]">Paso Final Obligatorio</span>
             <p className="text-sm font-medium text-slate-700">Para agilizar la revisión, envíe ahora el resumen a nuestro equipo por WhatsApp.</p>
           </div>
           <a 
             href={waLink || "#"} 
             target="_blank" 
             rel="noopener noreferrer"
             className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-white font-black rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
           >
             <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA" className="size-6" />
             ENVIAR POR WHATSAPP
           </a>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
          <Link to="/dashboard" className="w-full py-3 bg-secondary text-white font-bold rounded-xl hover:bg-slate-800 transition-all">
            Ver mis Trámites
          </Link>
          <Link to="/" className="text-slate-400 text-sm font-bold hover:text-primary transition-colors">
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;

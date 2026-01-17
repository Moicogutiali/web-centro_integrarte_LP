
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const SolicitudForm: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    ci: '',
    celular: '',
    email: '',
    asunto: 'Asistencia Familiar',
    descripcion: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateWhatsAppLink = () => {
    const phone = "59177293847";
    const text = `*SOLICITUD DE CONCILIACIÓN - INTEGRARSE*%0A%0A` +
                 `*Nombre:* ${formData.nombre}%0A` +
                 `*CI:* ${formData.ci}%0A` +
                 `*Asunto:* ${formData.asunto}%0A` +
                 `*Descripción:* ${formData.descripcion}%0A%0A` +
                 `_Solicito formalmente el inicio de trámite de conciliación._`;
    return `https://wa.me/${phone}?text=${text}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('cases').insert([{
        full_name: formData.nombre,
        ci: formData.ci,
        phone: formData.celular,
        email: formData.email,
        subject: formData.asunto,
        description: formData.descripcion
      }]);

      if (error) throw error;

      const waLink = generateWhatsAppLink();
      navigate('/confirmacion', { state: { waLink, formData } });
    } catch (err) {
      console.error("Error saving case:", err);
      alert("Hubo un error al registrar su solicitud. Por favor intente más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background-light py-12 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4 border border-gold/20">
            <span className="material-symbols-outlined text-sm">gavel</span>
            Trámite Oficial Bolivia
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-secondary tracking-tight">Solicitud de Conciliación</h1>
          <p className="text-slate-500 max-w-xl mx-auto">
            Acceso a justicia rápida y directa. Complete su declaración para agendar su audiencia.
          </p>
        </div>

        {/* Stepper */}
        <div className="flex justify-center items-center gap-4 py-8">
          {[1, 2, 3].map((s: number) => (
            <React.Fragment key={s}>
              <div className={`size-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= s ? 'bg-primary text-white shadow-lg' : 'bg-white text-slate-300 border border-slate-200'}`}>
                {step > s ? <span className="material-symbols-outlined">check</span> : s}
              </div>
              {s < 3 && <div className={`h-1 w-12 rounded-full ${step > s ? 'bg-primary' : 'bg-slate-200'}`}></div>}
            </React.Fragment>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
          <div className="bg-blue-50 p-4 border-l-4 border-primary flex gap-3">
            <span className="material-symbols-outlined text-primary">info</span>
            <p className="text-sm text-blue-900 font-medium">Sus datos están protegidos por la Ley de Conciliación y Arbitraje.</p>
          </div>

          <div className="p-8 md:p-12 space-y-12">
            {step === 1 && (
              <div className="space-y-8 animate-fade-in">
                <h2 className="text-2xl font-bold text-secondary flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">person</span>
                  1. Identificación del Solicitante
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Nombre Completo *</label>
                    <input 
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      type="text" 
                      className="w-full h-12 rounded-xl border-slate-200 focus:ring-primary focus:border-primary" 
                      placeholder="Ej. Juan Pérez" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">CI / Documento *</label>
                    <input 
                      name="ci"
                      value={formData.ci}
                      onChange={handleInputChange}
                      type="text" 
                      className="w-full h-12 rounded-xl border-slate-200 focus:ring-primary focus:border-primary" 
                      placeholder="Ej. 1234567 LP" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Celular WhatsApp *</label>
                    <input 
                      name="celular"
                      value={formData.celular}
                      onChange={handleInputChange}
                      type="tel" 
                      className="w-full h-12 rounded-xl border-slate-200 focus:ring-primary focus:border-primary" 
                      placeholder="Ej. 77000000" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Correo (Opcional)</label>
                    <input 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      type="email" 
                      className="w-full h-12 rounded-xl border-slate-200 focus:ring-primary focus:border-primary" 
                      placeholder="ejemplo@correo.com" 
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-fade-in">
                <h2 className="text-2xl font-bold text-secondary flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">balance</span>
                  2. Naturaleza del Conflicto
                </h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Asunto a Conciliar *</label>
                    <select 
                      name="asunto"
                      value={formData.asunto}
                      onChange={handleInputChange}
                      className="w-full h-12 rounded-xl border-slate-200 focus:ring-primary focus:border-primary"
                    >
                      <option>Asistencia Familiar</option>
                      <option>Cobro de Deudas</option>
                      <option>Incumplimiento de Contrato</option>
                      <option>Propiedad y Terrenos</option>
                      <option>Otros</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Relación de los Hechos *</label>
                    <textarea 
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleInputChange}
                      rows={5} 
                      className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary" 
                      placeholder="Describa brevemente el problema para que nuestro conciliador pueda entender el caso..."
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-fade-in">
                <h2 className="text-2xl font-bold text-secondary flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">verified</span>
                  3. Verificación y Envío
                </h2>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
                  <p className="text-sm text-slate-600">Al presionar "Enviar", su solicitud se registrará en nuestro sistema y se generará un enlace para enviarlo por WhatsApp para una atención inmediata.</p>
                  <div className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1 rounded text-primary" required id="terms" />
                    <label htmlFor="terms" className="text-xs text-slate-500 leading-relaxed">
                      Declaro que la información proporcionada es verdadera y acepto ser notificado mediante el número de celular proporcionado.
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-between gap-4">
            <button 
              type="button"
              disabled={step === 1 || isSubmitting}
              onClick={() => setStep(step - 1)}
              className="px-8 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 disabled:opacity-30 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              Atrás
            </button>
            {step < 3 ? (
              <button 
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-10 py-3 bg-primary text-white font-bold rounded-xl hover:bg-blue-600 shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
              >
                Siguiente
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            ) : (
              <button 
                type="submit"
                disabled={isSubmitting}
                className="px-12 py-3 bg-gold text-white font-black rounded-xl hover:bg-yellow-600 shadow-xl shadow-gold/20 transition-all flex items-center gap-2 uppercase tracking-widest disabled:opacity-50"
              >
                {isSubmitting ? 'Registrando...' : 'Registrar Solicitud'}
                <span className="material-symbols-outlined text-lg">send</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SolicitudForm;

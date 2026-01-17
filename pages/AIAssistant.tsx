import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { supabase } from '../lib/supabase';
import Logo from '../components/Logo';

interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
}

const AIAssistant: React.FC = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'bot', text: 'Bienvenido a INTEGRARSE. Soy su consultor virtual especializado en la Ley 708 de Bolivia. ¿Sobre qué materia legal desea informarse hoy?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('integrarse_user_v2');
    if (saved) {
      setUserData(JSON.parse(saved));
      setIsRegistered(true);
    }
  }, []);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (userData.name && userData.email) {
      localStorage.setItem('integrarse_user_v2', JSON.stringify(userData));
      setIsRegistered(true);
    }
  };

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Error: La clave de API no está disponible en este entorno.' }]);
      return;
    }

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: "Eres un consultor jurídico experto del Centro de Conciliación INTEGRARSE en Bolivia. Tu conocimiento se basa estrictamente en la Ley 708 de Conciliación y Arbitraje. Debes ser profesional, empático y proporcionar información clara sobre cómo resolver conflictos legalmente. Si la consulta es compleja, sugiere agendar una cita o realizar el trámite en la plataforma."
        }
      });

      const botResponse = response.text || 'Lo siento, no he podido procesar tu solicitud en este momento. Por favor, intenta de nuevo.';

      // Registrar consulta para mejora del servicio (opcional/silencioso)
      try {
        await supabase.from('ai_consultations').insert([{
          user_name: userData.name,
          user_email: userData.email,
          query: userMsg,
          response: botResponse
        }]);
      } catch (dbErr) {
        console.debug("Auditoría de IA no disponible localmente.");
      }

      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (err) {
      console.error("AI Assistant Error:", err);
      setMessages(prev => [...prev, { role: 'bot', text: 'He tenido un problema al conectar con mis neuronas legales. Por favor, revisa tu conexión.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isRegistered) {
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl p-12 border border-slate-100 space-y-10 text-center animate-fade-in">
          <div className="flex justify-center scale-125 mb-4">
            <Logo className="h-16" showText={false} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-secondary tracking-tight">Consultor Jurídico IA</h2>
            <p className="text-slate-500 text-sm leading-relaxed">Acceda a orientación especializada bajo normativa boliviana de forma inmediata.</p>
          </div>
          <form className="space-y-5" onSubmit={handleRegister}>
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Nombre Completo</label>
              <input
                type="text"
                placeholder="Ej. Juan Perez"
                className="w-full h-14 rounded-2xl border-slate-200 focus:ring-primary focus:border-primary text-sm px-6 shadow-sm"
                required
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Correo Electrónico</label>
              <input
                type="email"
                placeholder="correo@ejemplo.com"
                className="w-full h-14 rounded-2xl border-slate-200 focus:ring-primary focus:border-primary text-sm px-6 shadow-sm"
                required
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
            </div>
            <button type="submit" className="w-full h-16 bg-secondary text-white font-black rounded-2xl shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs">
              Iniciar Asistencia <span className="material-symbols-outlined">bolt</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-64px)] bg-white flex flex-col relative overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-4">
          <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
            <span className="material-symbols-outlined text-2xl">neurology</span>
          </div>
          <div className="space-y-0.5">
            <p className="text-sm font-black text-secondary leading-none">Asesor Virtual INTEGRARSE</p>
            <div className="flex items-center gap-1.5">
              <span className="size-2 bg-green-500 rounded-full animate-pulse"></span>
              <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">Ley 708 Bolivia</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => { localStorage.removeItem('integrarse_user_v2'); setIsRegistered(false); }}
          className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
        >
          Cerrar Sesión
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-12 space-y-10 bg-slate-50/30">
        <div className="max-w-4xl mx-auto space-y-8">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
              <div className={`max-w-[85%] p-6 rounded-3xl shadow-sm leading-relaxed ${m.role === 'user'
                  ? 'bg-secondary text-white font-medium rounded-tr-none'
                  : 'bg-white text-slate-700 font-medium border border-slate-100 rounded-tl-none'
                }`}>
                {m.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-pulse">
              <div className="bg-white border border-slate-100 p-6 rounded-3xl rounded-tl-none flex items-center gap-3">
                <span className="material-symbols-outlined animate-spin text-primary">cyclone</span>
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Consultando normativa...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>

      <div className="p-6 md:p-12 border-t border-slate-100 bg-white shadow-2xl z-10">
        <form onSubmit={handleChat} className="max-w-4xl mx-auto relative group">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escriba su consulta legal aquí..."
            className="w-full h-16 pl-8 pr-24 rounded-3xl border-slate-200 shadow-inner focus:ring-secondary focus:border-secondary text-slate-700 bg-slate-50 group-hover:bg-white transition-all outline-none"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-3 top-3 h-10 px-6 bg-secondary text-white rounded-2xl flex items-center justify-center hover:bg-slate-800 shadow-xl transition-all disabled:opacity-50"
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIAssistant;
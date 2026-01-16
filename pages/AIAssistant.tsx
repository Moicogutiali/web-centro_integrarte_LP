
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { supabase } from '../lib/supabase';
import Logo from '../components/Logo';

const AIAssistant: React.FC = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: 'Hola, soy el Asistente IA de INTEGRARSE. ¿En qué puedo orientarte hoy sobre conciliación o arbitraje?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages]);

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: "Eres el asistente legal inteligente de 'INTEGRARSE', un centro de conciliación y arbitraje en Bolivia. Respondes de forma profesional, clara y orientadora. Siempre sugieres al final que para una validez legal plena deben iniciar un trámite formal en el centro."
        }
      });
      
      const botResponse = response.text || 'Lo siento, tuve un problema procesando tu consulta.';
      
      // Guardar consulta en Supabase para registro de la web
      await supabase.from('ai_consultations').insert([{
        user_name: userData.name,
        user_email: userData.email,
        query: userMsg,
        response: botResponse
      }]);

      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Error de conexión. Por favor intenta más tarde.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isRegistered) {
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-100 space-y-8">
          <div className="flex justify-center"><Logo className="h-16" showText={false} /></div>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-secondary">Consulta con nuestra IA</h2>
            <p className="text-slate-500 text-sm">Regístrate para acceder al asistente jurídico inteligente.</p>
          </div>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsRegistered(true); }}>
            <input 
              type="text" 
              placeholder="Nombre completo" 
              className="w-full h-12 rounded-xl border-slate-200" 
              required 
              onChange={(e) => setUserData({...userData, name: e.target.value})}
            />
            <input 
              type="email" 
              placeholder="Correo electrónico" 
              className="w-full h-12 rounded-xl border-slate-200" 
              required 
              onChange={(e) => setUserData({...userData, email: e.target.value})}
            />
            <button type="submit" className="w-full h-14 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-blue-600 transition-all">
              Acceder al Asistente
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-64px)] bg-slate-50 flex overflow-hidden">
      <div className="hidden lg:flex w-80 bg-white border-r border-slate-200 flex-col p-6 space-y-8">
        <Logo className="h-10" />
        <div className="space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Sugerencias</h3>
          <div className="space-y-2">
            {['¿Qué es la conciliación?', '¿Cuánto cuesta un arbitraje?', 'Documentos necesarios'].map(q => (
              <button key={q} onClick={() => setInput(q)} className="w-full text-left p-3 text-sm text-slate-600 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100 italic">
                "{q}"
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative bg-white lg:bg-transparent">
        <div className="p-4 lg:p-6 flex-1 overflow-y-auto space-y-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${m.role === 'user' ? 'bg-primary text-white' : 'bg-white border border-slate-100 text-slate-700'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 p-4 rounded-2xl animate-pulse text-slate-400 text-sm">
                  Procesando consulta jurídica...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>

        <div className="p-4 lg:p-8 bg-white lg:bg-transparent">
          <form onSubmit={handleChat} className="max-w-3xl mx-auto relative group">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu consulta aquí..." 
              className="w-full h-16 pl-6 pr-20 rounded-2xl border-slate-200 shadow-xl focus:ring-primary focus:border-primary transition-all group-hover:border-primary/50"
            />
            <button type="submit" className="absolute right-3 top-3 size-10 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all shadow-lg">
              <span className="material-symbols-outlined">send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;

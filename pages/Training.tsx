
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Logo from '../components/Logo';

interface Course {
  id: string;
  title: string;
  tag: string;
  instructor: string;
  date_string: string;
  time_string: string;
  price: string;
  is_free: boolean;
  img_url: string;
}

const Training: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [regData, setRegData] = useState({ name: '', ci: '', phone: '' });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const { data } = await supabase.from('courses').select('*');
    if (data) setCourses(data);
  };

  const handleRegister = (course: Course) => {
    setSelectedCourse(course);
    setShowModal(true);
    setIsSuccess(false);
  };

  const handleConfirmRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return;
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('course_registrations').insert([{
        course_id: selectedCourse.id,
        full_name: regData.name,
        ci: regData.ci,
        phone: regData.phone
      }]);

      if (error) throw error;
      setIsSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setIsSuccess(false);
      }, 2500);
    } catch (err) {
      console.error(err);
      alert("Error al registrarse.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <section 
        className="py-24 px-4 text-center bg-secondary text-white relative overflow-hidden"
        style={{ backgroundImage: 'linear-gradient(to bottom, rgba(10, 25, 41, 0.85), rgba(10, 25, 41, 0.95)), url("https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200")' }}
      >
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <Logo textColor="text-white" showText={false} className="h-20 mx-auto" />
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            Escuela de <span className="text-gold">Capacitación</span> Judicial
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
            Formación especializada acreditada por el MJTI del Estado Plurinacional de Bolivia.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((c) => (
            <div key={c.id} className="flex flex-col bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all overflow-hidden group">
              <div className="relative h-56 overflow-hidden">
                <img src={c.img_url} alt={c.title} className="w-full h-full object-cover" />
                <div className="absolute top-6 left-6 bg-white px-4 py-1.5 rounded-full text-[10px] font-black text-primary uppercase">
                  {c.tag}
                </div>
                <div className={`absolute bottom-6 right-6 px-4 py-1.5 rounded-full text-xs font-black uppercase ${c.is_free ? 'bg-green-500 text-white' : 'bg-gold text-white'}`}>
                  {c.price}
                </div>
              </div>
              <div className="p-10 flex flex-col flex-1 space-y-6">
                <h3 className="text-xl font-bold text-secondary">{c.title}</h3>
                <div className="space-y-4 pt-4 border-t border-slate-50">
                  <p className="text-sm font-semibold text-slate-600">Instructor: {c.instructor}</p>
                  <p className="text-sm font-semibold text-slate-600">Fecha: {c.date_string}</p>
                </div>
                <button 
                  onClick={() => handleRegister(c)}
                  className="w-full py-4 bg-secondary text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-lg"
                >
                  Inscribirse ahora
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && selectedCourse && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-secondary/80 backdrop-blur-sm">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden relative">
            {isSuccess ? (
              <div className="p-16 text-center space-y-6">
                <span className="material-symbols-outlined text-6xl text-green-500">verified</span>
                <h3 className="text-3xl font-black text-secondary">¡Registro Exitoso!</h3>
              </div>
            ) : (
              <form onSubmit={handleConfirmRegistration} className="p-10 space-y-6">
                <div className="flex justify-between items-center">
                   <h3 className="font-bold text-secondary">Inscripción: {selectedCourse.title}</h3>
                   <button onClick={() => setShowModal(false)} className="material-symbols-outlined">close</button>
                </div>
                <input required placeholder="Nombre Completo" className="w-full h-12 rounded-xl border-slate-200" onChange={e => setRegData({...regData, name: e.target.value})} />
                <input required placeholder="Cédula de Identidad" className="w-full h-12 rounded-xl border-slate-200" onChange={e => setRegData({...regData, ci: e.target.value})} />
                <input required placeholder="Celular" className="w-full h-12 rounded-xl border-slate-200" onChange={e => setRegData({...regData, phone: e.target.value})} />
                <button type="submit" disabled={isSubmitting} className="w-full py-5 bg-primary text-white font-black rounded-2xl">
                  {isSubmitting ? 'Procesando...' : 'Confirmar Inscripción'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Training;

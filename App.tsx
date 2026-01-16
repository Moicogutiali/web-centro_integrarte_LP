
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import Training from './pages/Training';
import Professionals from './pages/Professionals';
import AIAssistant from './pages/AIAssistant';
import SolicitudForm from './pages/SolicitudForm';
import Confirmation from './pages/Confirmation';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/profesionales" element={<Professionals />} />
            <Route path="/asistente" element={<AIAssistant />} />
            <Route path="/capacitacion" element={<Training />} />
            <Route path="/solicitud" element={<SolicitudForm />} />
            <Route path="/confirmacion" element={<Confirmation />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </HashRouter>
  );
};

export default App;

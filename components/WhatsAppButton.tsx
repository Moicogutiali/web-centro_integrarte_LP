
import React from 'react';

const WhatsAppButton: React.FC = () => {
  const whatsappUrl = "https://wa.me/59177293847"; // Placeholder number

  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[60] flex items-center justify-center size-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group"
    >
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
        alt="WhatsApp" 
        className="size-8"
      />
      <span className="absolute right-full mr-4 bg-white text-slate-800 text-xs font-bold px-3 py-2 rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity hidden md:block border border-slate-100">
        ¿En qué podemos ayudarte?
      </span>
      <span className="absolute -top-1 -right-1 size-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
    </a>
  );
};

export default WhatsAppButton;

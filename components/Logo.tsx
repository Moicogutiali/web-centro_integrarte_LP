
import React from 'react';

interface LogoProps {
  className?: string;
  textColor?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "h-12", textColor = "text-secondary", showText = true }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Representación SVG de la flor multicolor de INTEGRARSE */}
      <div className="relative h-full aspect-square flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          {/* Pétalos exteriores multicolores */}
          <path d="M50 50 L50 10 A15 15 0 0 1 65 25 Z" fill="#FFB347" opacity="0.8"/>
          <path d="M50 50 L85 25 A15 15 0 0 1 90 45 Z" fill="#FFD700" opacity="0.8"/>
          <path d="M50 50 L90 55 A15 15 0 0 1 75 75 Z" fill="#90EE90" opacity="0.8"/>
          <path d="M50 50 L65 85 A15 15 0 0 1 45 90 Z" fill="#20B2AA" opacity="0.8"/>
          <path d="M50 50 L15 75 A15 15 0 0 1 10 55 Z" fill="#6495ED" opacity="0.8"/>
          <path d="M50 50 L10 45 A15 15 0 0 1 25 25 Z" fill="#9370DB" opacity="0.8"/>
          <path d="M50 50 L25 10 A15 15 0 0 1 45 10 Z" fill="#F08080" opacity="0.8"/>
          {/* Flor central blanca */}
          <path d="M50 35 L55 45 L65 45 L57 52 L60 62 L50 56 L40 62 L43 52 L35 45 L45 45 Z" fill="white" />
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col -space-y-1">
          <span className={`text-2xl font-black tracking-tighter ${textColor}`}>INTEGRARSE</span>
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.3em] leading-none">Justicia & Paz</span>
        </div>
      )}
    </div>
  );
};

export default Logo;

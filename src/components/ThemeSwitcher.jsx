'use client';

import { useState, useEffect } from 'react';
import { Palette, Check, X } from 'lucide-react';

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('classic');

  useEffect(() => {
    // Initial theme set
    const savedTheme = localStorage.getItem('kebs-theme') || 'classic';
    setTheme(savedTheme);
    document.documentElement.className = `theme-${savedTheme}`;
  }, []);

  useEffect(() => {
    if (theme) {
      document.documentElement.className = `theme-${theme}`;
      localStorage.setItem('kebs-theme', theme);
    }
  }, [theme]);

  const themes = [
    { id: 'editorial', name: 'Editorial (Playfair)', color: '#2C1810', desc: 'Warm & Elegant' },
    { id: 'classic', name: 'Classic (Cormorant)', color: '#1C1C1C', desc: 'Dark & Moody' },
    { id: 'antique', name: 'Antique (Garamond)', color: '#2D2926', desc: 'Old Library Heritage' },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-[100]">
      {/* Menu */}
      <div className={`absolute bottom-full mb-4 left-0 bg-white border border-kitaab-border p-5 rounded-2xl shadow-2xl transition-all duration-300 w-72 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <div className="flex items-center justify-between mb-4 px-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-kitaab-muted">Design Systems</p>
          <button onClick={() => setIsOpen(false)} className="text-kitaab-muted hover:text-kitaab-text">
            <X size={14} />
          </button>
        </div>
        
        <div className="space-y-3">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTheme(t.id);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all text-left group ${theme === t.id ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]' : 'hover:bg-kitaab-bg text-kitaab-text'}`}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center overflow-hidden" style={{ backgroundColor: t.color }}>
                  {theme === t.id && <Check size={18} className="text-white" />}
                </div>
              </div>
              <div>
                <span className="block text-sm font-bold tracking-tight">{t.name}</span>
                <span className={`block text-[10px] uppercase tracking-wider opacity-60 ${theme === t.id ? 'text-white' : 'text-kitaab-muted'}`}>{t.desc}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 z-50 ${isOpen ? 'rotate-90' : 'rotate-0'}`}
        title="Switch Design System"
      >
        <Palette size={24} />
      </button>
    </div>
  );
}

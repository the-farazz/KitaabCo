'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Menu, X, Heart, User } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart?.items || []);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Novels', href: '/category/novels' },
    { name: 'Academic', href: '/category/academic' },
    { name: 'Islamic', href: '/category/islamic' },
    { name: 'Motivational', href: '/category/motivational' },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-kitaab-nav text-kitaab-nav-text ${
        isScrolled ? 'shadow-xl py-3' : 'py-5 border-b border-white/5'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-4">
              <div className="relative">
                <div className="w-10 h-10 border border-accent/30 flex items-center justify-center rounded-[2px] group-hover:border-accent transition-all duration-700">
                  <span className="font-heading text-2xl font-black italic tracking-tighter text-accent group-hover:scale-110 transition-transform">K</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-kitaab-nav" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-2xl font-bold tracking-[0.15em] leading-none text-white italic">KITAAB<span className="text-accent not-italic">CO.</span></span>
                <span className="text-[8px] uppercase tracking-[0.5em] text-white/40 font-bold mt-1">Premium Bookstore</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[13px] uppercase tracking-[0.08em] font-medium text-kitaab-nav-text hover:text-accent transition-colors relative group py-2"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="hover:text-accent transition-colors p-2"
              >
                <Search size={20} strokeWidth={1.3} />
              </button>
              
              <Link href="/cart" className="hover:text-accent transition-colors p-2 relative group">
                <ShoppingBag size={20} strokeWidth={1.3} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartItems.length}
                  </span>
                )}
              </Link>
              
              {/* Mobile Toggle */}
              <button
                className="lg:hidden p-2 text-kitaab-nav-text"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} strokeWidth={1.3} /> : <Menu size={24} strokeWidth={1.3} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-kitaab-nav text-kitaab-nav-text z-[60] lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}>
          <div className="flex flex-col items-center justify-center h-full gap-8 relative">
            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
              <X size={32} strokeWidth={1.3} />
            </button>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-heading font-medium hover:text-accent transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[200] bg-[#1A1A1A] flex items-center justify-center p-6 animate-fadeIn">
          {/* Close Button */}
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-8 right-8 text-white/50 hover:text-white p-3 hover:bg-white/5 rounded-full transition-all"
            aria-label="Close search"
          >
            <X size={32} strokeWidth={1.3} />
          </button>
          
          <div className="w-full max-w-3xl animate-scaleUp px-4">
            <div className="text-center mb-12">
              <span className="text-accent text-[12px] uppercase tracking-[0.5em] font-bold">Global Search</span>
              <div className="h-[1px] w-12 bg-accent/30 mx-auto mt-4" />
            </div>
            
            <form onSubmit={handleSearchSubmit} className="relative">
              <input 
                autoFocus
                type="text" 
                placeholder="Search books, authors, or categories..." 
                className="w-full bg-transparent border-b-2 border-white/10 focus:border-accent py-8 text-3xl md:text-5xl text-white outline-none transition-all placeholder:text-white/10 font-heading"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 p-4 text-accent hover:scale-110 transition-transform">
                <Search size={36} strokeWidth={1.3} />
              </button>
            </form>
            
            <div className="mt-12">
              <p className="text-white/20 text-[10px] uppercase tracking-[0.2em] font-bold text-center mb-6">Quick Filters</p>
              <div className="flex flex-wrap justify-center gap-3">
                {['Islamic', 'Novels', 'Academic', 'Urdu', 'Motivational'].map(tag => (
                  <button 
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-6 py-2 rounded-full border border-white/5 text-[11px] uppercase tracking-widest text-white/50 hover:text-white hover:border-white transition-all bg-white/5"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

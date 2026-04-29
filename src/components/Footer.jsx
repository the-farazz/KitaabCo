'use client';

import Link from 'next/link';
import { 
  Phone, Mail, Globe, MessageCircle, ArrowUpRight, Send, Bookmark
} from 'lucide-react';

const InstagramIcon = ({ size = 18, strokeWidth = 1.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ size = 18, strokeWidth = 1.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

export default function Footer() {
  const socialLinks = [
    { Icon: InstagramIcon, link: '#', name: 'Instagram' },
    { Icon: FacebookIcon, link: '#', name: 'Facebook' },
    { Icon: MessageCircle, link: 'https://wa.me/923273129464', name: 'WhatsApp' },
  ];

  return (
    <footer className="bg-white text-primary pt-20 md:pt-32 pb-12 border-t border-kitaab-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8 md:space-y-10">
            <Link href="/" className="group flex flex-col md:flex-row items-center gap-4">
              <div className="relative">
                <div className="w-10 h-10 border border-primary/20 flex items-center justify-center rounded-[2px] group-hover:border-accent transition-all duration-700">
                  <span className="font-heading text-2xl font-black italic tracking-tighter text-primary group-hover:text-accent group-hover:scale-110 transition-all">K</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-white" />
              </div>
              <div className="flex flex-col items-center md:items-start">
                <span className="font-heading text-xl md:text-2xl font-bold tracking-[0.15em] leading-none text-primary italic">KITAAB<span className="text-accent not-italic">CO.</span></span>
                <span className="text-[8px] uppercase tracking-[0.5em] text-primary/30 font-bold mt-1">Premium Bookstore</span>
              </div>
            </Link>
            <p className="text-primary/60 text-[13px] md:text-[14px] leading-relaxed max-w-xs font-body italic">
              Pakistan's finest online bookstore with a curated collection of literature, academic, and spiritual books. Delivering excellence across the country.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((item, idx) => (
                <a 
                  key={idx} 
                  href={item.link} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-kitaab-border flex items-center justify-center text-primary/40 hover:text-accent hover:border-accent hover:shadow-lg transition-all duration-500 rounded-full"
                  title={item.name}
                >
                  <item.Icon size={18} strokeWidth={1.2} />
                </a>
              ))}
            </div>
          </div>

          {/* Library Section */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8 md:space-y-10">
            <div className="space-y-2">
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-accent font-body block opacity-70">Library</span>
              <h3 className="text-xl md:text-2xl font-heading font-medium italic italic-heading text-primary">Collections</h3>
            </div>
            <ul className="space-y-4 text-[13px] font-medium text-primary/80 font-body flex flex-col items-center md:items-start">
              {[
                { name: 'Academic Books', link: '/category/academic' },
                { name: 'Islamic Library', link: '/category/islamic' },
                { name: 'Urdu Novels', link: '/category/novels' },
                { name: 'Motivational', link: '/category/motivational' },
                { name: 'Children\'s Books', link: '/category/children' }
              ].map(item => (
                <li key={item.name}>
                  <Link href={item.link} className="hover:text-accent transition-all flex items-center gap-2 group w-fit">
                    <span className="border-b border-transparent group-hover:border-accent py-0.5">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Section */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8 md:space-y-10">
            <div className="space-y-2">
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-accent font-body block opacity-70">Company</span>
              <h3 className="text-xl md:text-2xl font-heading font-medium italic italic-heading text-primary">Resources</h3>
            </div>
            <ul className="space-y-4 text-[13px] font-medium text-primary/80 font-body flex flex-col items-center md:items-start">
              {['Our Story', 'Shipping & Delivery', 'Privacy Policy', 'Terms of Service', 'Contact Us'].map(item => (
                <li key={item}>
                  <Link href="#" className="hover:text-accent transition-all w-fit block py-0.5">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8 md:space-y-10">
            <div className="space-y-2">
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-accent font-body block opacity-70">Concierge</span>
              <h3 className="text-xl md:text-2xl font-heading font-medium italic italic-heading text-primary">Contact Us</h3>
            </div>
            <div className="space-y-6 md:space-y-8 font-body flex flex-col items-center md:items-start">
              <a href="https://wa.me/923273129464" target="_blank" rel="noopener noreferrer" className="flex flex-col md:flex-row items-center md:items-start gap-4 group">
                <div className="w-10 h-10 bg-kitaab-bg border border-kitaab-border flex items-center justify-center text-primary/40 shrink-0 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-500 rounded-full">
                  <Phone size={16} strokeWidth={1.2} />
                </div>
                <div className="flex flex-col items-center md:items-start">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-primary/30 mb-1">WhatsApp</p>
                  <p className="text-[14px] font-medium text-primary tracking-tight group-hover:text-accent transition-colors">+92 327 3129464</p>
                </div>
              </a>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4 group cursor-pointer">
                <div className="w-10 h-10 bg-kitaab-bg border border-kitaab-border flex items-center justify-center text-primary/40 shrink-0 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-500 rounded-full">
                  <Mail size={16} strokeWidth={1.2} />
                </div>
                <div className="flex flex-col items-center md:items-start">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-primary/30 mb-1">Email</p>
                  <p className="text-[14px] font-medium text-primary tracking-tight group-hover:text-accent transition-colors">hello@kebs.pk</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-kitaab-border mt-20 md:mt-32 pt-10 md:pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/30 font-body text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} KITAABCO. PAKISTAN'S PREMIUM BOOKSTORE.</p>
          </div>
          <div className="flex gap-6 md:gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/30 font-body">
            <a href="#" className="hover:text-accent transition-colors">Privacy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms</a>
            <a href="#" className="hover:text-accent transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

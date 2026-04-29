'use client';

import Link from 'next/link';
import * as Icons from 'lucide-react';

export default function CategoryCard({ category }) {
  const IconComponent = Icons[category.icon] || Icons.Book;

  return (
    <Link 
      href={`/category/${category.id}`}
      className="group bg-white p-12 border border-kitaab-border hover:border-primary transition-all duration-700 text-center flex flex-col items-center justify-center gap-10 shadow-sm hover:shadow-2xl hover:-translate-y-3 rounded-[2px] relative overflow-hidden"
    >
      <div className="relative z-10">
        <div className="text-primary group-hover:text-accent transition-all duration-500 transform group-hover:scale-110">
          <IconComponent size={42} strokeWidth={1} />
        </div>
      </div>

      <div className="space-y-3 relative z-10">
        <h3 className="font-heading font-semibold text-primary group-hover:text-accent transition-colors text-[13px] uppercase tracking-[0.4em] leading-none">
          {category.label}
        </h3>
        <div className="w-0 h-[1px] bg-accent mx-auto group-hover:w-full transition-all duration-700" />
        <p className="text-[9px] text-primary/30 uppercase tracking-[0.2em] font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 italic">
          View Collection
        </p>
      </div>
    </Link>
  );
}

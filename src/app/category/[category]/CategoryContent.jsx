'use client';

import { useState, useMemo } from 'react';
import BookGrid from '@/components/BookGrid';
import FilterSidebar from '@/components/FilterSidebar';
import { ChevronRight, Home, Filter, BookOpen } from 'lucide-react';
import Link from 'next/link';
import OrderModal from '@/components/OrderModal';

export default function CategoryContent({ category, categoryId, books }) {
  const [filters, setFilters] = useState({
    board: '',
    class: '',
    price: 10000,
    inStock: false,
    sortBy: 'newest'
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const filteredBooks = useMemo(() => {
    return books
      .filter(book => book.category === categoryId)
      .filter(book => book.price <= filters.price)
      .sort((a, b) => {
        if (filters.sortBy === 'price-low') return a.price - b.price;
        if (filters.sortBy === 'price-high') return b.price - a.price;
        return 0;
      });
  }, [categoryId, filters, books]);

  return (
    <div className="bg-kitaab-bg min-h-screen pt-24 md:pt-32 pb-20">
      {/* Breadcrumb & Header */}
      <div className="container mx-auto px-6 mb-8 md:mb-12">
        <nav className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-kitaab-muted uppercase tracking-[0.2em] mb-6 animate-fadeInUp">
          <Link href="/" className="hover:text-accent flex items-center gap-1 transition-colors">
            <Home size={12} /> Home
          </Link>
          <ChevronRight size={10} className="opacity-50" />
          <span className="text-kitaab-text">{category.label}</span>
        </nav>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 border-b border-kitaab-border pb-8 md:pb-10">
          <div className="space-y-4 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3 text-accent">
              <BookOpen className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">Collection</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-medium italic italic-heading leading-tight">
              {category.label}
            </h1>
            <p className="text-kitaab-muted font-body max-w-xl text-sm md:text-base leading-relaxed">
              Discover our curated selection of {category.label.toLowerCase()}. From timeless classics to modern masterpieces.
            </p>
          </div>
          
          <div className="flex items-center gap-3 md:gap-4 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <div className="flex-grow md:flex-grow-0 flex items-center gap-3 bg-kitaab-card border border-kitaab-border px-4 md:px-5 py-2.5 md:py-3 rounded-kitaab">
              <span className="text-[9px] md:text-[10px] font-bold text-kitaab-muted uppercase tracking-widest">Sort:</span>
              <select 
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                className="text-[11px] md:text-xs font-bold text-kitaab-text bg-transparent outline-none cursor-pointer appearance-none"
              >
                <option value="newest">Latest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown size={12} className="text-kitaab-muted" />
            </div>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden w-10 md:w-12 h-10 md:h-12 bg-primary text-white flex items-center justify-center rounded-kitaab shrink-0 shadow-lg shadow-primary/20"
            >
              <Filter className="w-[18px] h-[18px] md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar - Only show for Academic/Islamic if needed, otherwise hidden for Novels for a cleaner look */}
          <div className={`lg:w-1/4 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-32">
              <FilterSidebar 
                filters={filters} 
                setFilters={setFilters} 
                category={categoryId} 
              />
            </div>
          </div>

          {/* Grid */}
          <div className="flex-grow">
            {filteredBooks.length > 0 ? (
              <BookGrid books={filteredBooks} onOrderClick={(book) => setSelectedBook(book)} />
            ) : (
              <div className="py-20 text-center border-2 border-dashed border-kitaab-border rounded-kitaab bg-kitaab-card/50">
                <p className="text-kitaab-muted font-body italic">No books found in this category yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Modal */}
      {selectedBook && (
        <OrderModal 
          isOpen={!!selectedBook} 
          onClose={() => setSelectedBook(null)} 
          book={selectedBook} 
        />
      )}
    </div>
  );
}

// Custom ChevronDown for the select since I used lucide icons elsewhere
function ChevronDown({ size, className }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m6 9 6 6 6-6"/>
    </svg>
  );
}

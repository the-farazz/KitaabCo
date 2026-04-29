"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  Search,
} from "lucide-react";
import BookCard from "@/components/BookCard";
import CategoryCard from "@/components/CategoryCard";
import OrderModal from "@/components/OrderModal";
import { books, categories } from "@/data/books";

export default function Home() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const handleOrderClick = (book) => {
    setSelectedBook(book);
    setIsOrderModalOpen(true);
  };

  return (
    <div className="space-y-24 pb-20 bg-kitaab-bg transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-48 pb-16 md:pb-24 overflow-hidden min-h-[80vh] md:min-h-[90vh] flex items-center border-b border-kitaab-border">
        <div className="absolute inset-0 opacity-[0.2] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(currentColor 0.5px, transparent 0.5px)', backgroundSize: '60px 60px' }} />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-24">
            <div className="flex-1 space-y-8 md:space-y-12 animate-fadeInUp">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-[1px] w-8 md:w-12 bg-accent" />
                  <span className="text-accent font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-[12px] md:text-[15px] font-body">
                    EST. 2026 PAKISTAN'S PREMIUM BOOKSTORE
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-medium text-primary tracking-tight leading-[1.1] font-heading italic transition-all duration-500">
                  Pakistan's Finest <br />
                  <span className="not-italic font-light">Online Book Store</span>
                </h1>
                <p className="text-primary/80 text-lg md:text-xl leading-relaxed max-w-xl font-medium font-body">
                  Discover thousands of academic, Islamic, Urdu, and motivational books delivered to your doorstep.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/products" className="w-full sm:w-auto btn-primary px-8 py-3.5 rounded-[8px] shadow-xl shadow-primary/5 transition-transform hover:scale-[1.02] text-center">
                  Explore Collections
                </Link>
                <Link href="/category/academic" className="w-full sm:w-auto btn-outline px-8 py-3.5 rounded-[8px] hover:bg-primary hover:text-white transition-all transform hover:scale-[1.02] text-center">
                  Our Stores
                </Link>
              </div>
            </div>
            <div className="flex-1 relative w-full flex justify-center lg:justify-end animate-fadeInUp delay-200">
              <div className="relative w-full max-w-[320px] md:max-w-md aspect-[4/4.5] bg-white rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] group border border-kitaab-border/30 p-0">
                <img src="/modern_books.png" alt="Curated Collection" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 space-y-24">
        {/* Category Grid */}
        <section className="space-y-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-kitaab-border pb-12">
            <div className="space-y-4 text-center md:text-left">
              <span className="text-accent text-[13px] uppercase tracking-[0.3em] font-medium font-body">Collections</span>
              <h2 className="text-3xl md:text-[38px] font-medium text-primary font-heading italic">Explore by Category</h2>
            </div>
            
            <div className="w-full max-w-md">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const query = e.target.search.value;
                  if(query) window.location.href = `/search?q=${encodeURIComponent(query)}`;
                }}
                className="relative group"
              >
                <input 
                  name="search"
                  type="text" 
                  placeholder="Quick search in library..." 
                  className="w-full bg-white border border-kitaab-border rounded-full py-4 px-6 pl-12 text-sm outline-none focus:border-accent transition-all shadow-sm group-hover:shadow-md"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-accent transition-colors" size={20} />
              </form>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
            {categories.map(cat => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="space-y-16 pb-12">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 border-b border-kitaab-border pb-10 text-center md:text-left">
            <div className="space-y-3 flex flex-col items-center md:items-start">
              <span className="text-accent text-[11px] md:text-[13px] uppercase tracking-[0.3em] font-medium font-body">New Arrivals</span>
              <h2 className="text-2xl md:text-[38px] font-medium text-primary font-heading italic transition-all duration-500">Recently Added</h2>
            </div>
            <Link href="/products" className="group flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-body">
              View Catalogue <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {books.filter(b => b.category === 'novels' || b.onSale).slice(0, 4).map((book) => (
              <BookCard key={book.id} book={book} onOrderClick={handleOrderClick} />
            ))}
          </div>
        </section>
      </div>

      {selectedBook && (
        <OrderModal 
          isOpen={isOrderModalOpen} 
          onClose={() => setIsOrderModalOpen(false)} 
          book={selectedBook} 
        />
      )}
    </div>
  );
}

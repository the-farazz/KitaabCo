'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { books } from '@/data/books';
import BookGrid from '@/components/BookGrid';
import { Search, Home, ChevronRight } from 'lucide-react';
import Link from 'next/link';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const results = books.filter(book => {
    const searchStr = `${book.name} ${book.author} ${book.nameUrdu || ''} ${book.subject || ''} ${(book.tags || []).join(' ')}`.toLowerCase();
    return searchStr.includes(query.toLowerCase());
  });

  return (
    <>
      <div className="container mx-auto px-6 mb-8 md:mb-12">
        <nav className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-kitaab-muted uppercase tracking-[0.2em] mb-6 animate-fadeInUp">
          <Link href="/" className="hover:text-accent flex items-center gap-1 transition-colors">
            <Home size={12} /> Home
          </Link>
          <ChevronRight size={10} className="opacity-50" />
          <span className="text-kitaab-text">Search</span>
        </nav>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 border-b border-kitaab-border pb-8 md:pb-10">
          <div className="space-y-4 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3 text-accent">
              <Search className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">Discovery</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-medium italic italic-heading leading-tight">
              {query ? `Results for "${query}"` : 'The Library'}
            </h1>
            <div className="flex items-center gap-4">
              <p className="text-kitaab-muted font-body text-sm md:text-base leading-relaxed">
                Found {results.length} treasures in our collection.
              </p>
              <p className="urdu text-xl text-accent opacity-50 hidden sm:block">تلاش کے نتائج</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-20">
        {results.length > 0 ? (
          <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <BookGrid books={results} />
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center py-20 bg-kitaab-card rounded-kitaab border border-kitaab-border p-8 md:p-12 space-y-8 animate-fadeInUp">
            <div className="bg-kitaab-bg w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mx-auto border border-kitaab-border">
              <Search className="w-8 h-8 md:w-10 md:h-10 text-kitaab-muted/30" />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-heading font-medium italic italic-heading text-kitaab-text">No treasures found for "{query}"</h2>
              <p className="urdu text-2xl text-accent opacity-50">کوئی کتاب نہیں ملی</p>
              <p className="text-kitaab-muted font-body text-sm leading-relaxed max-w-sm mx-auto">Try checking your spelling or use more general keywords like "Physics", "Novel", or "Islamic".</p>
            </div>
            <div className="pt-4 flex flex-wrap justify-center gap-2">
              <span className="text-[10px] font-bold text-kitaab-muted uppercase tracking-[0.2em] w-full mb-2">Suggested Searches:</span>
              {['Mathematics', 'Class 9', 'Umera Ahmed', 'Physics', 'Story Books'].map(tag => (
                <Link 
                  key={tag}
                  href={`/search?q=${encodeURIComponent(tag)}`}
                  className="bg-kitaab-bg hover:bg-primary hover:text-white px-5 py-2 rounded-full text-[11px] font-bold transition-all border border-kitaab-border uppercase tracking-wider"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="bg-kitaab-bg min-h-screen pt-24 md:pt-32">
      <Suspense fallback={
        <div className="container mx-auto px-6 text-center py-20">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="w-12 h-12 bg-kitaab-border rounded-full" />
            <div className="h-4 w-32 bg-kitaab-border rounded" />
          </div>
        </div>
      }>
        <SearchResults />
      </Suspense>
    </div>
  );
}

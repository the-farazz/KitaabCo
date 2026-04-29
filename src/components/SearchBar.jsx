'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import debounce from 'lodash.debounce';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const inputRef = useRef(null);

  const debouncedSearch = useRef(
    debounce((q) => {
      if (q.trim()) {
        router.push(`/search?q=${encodeURIComponent(q)}`);
      }
    }, 500)
  ).current;

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 2) {
      debouncedSearch(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      inputRef.current?.blur();
    }
  };

  const clearSearch = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="relative w-full group"
    >
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
        <Search size={18} />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for books, authors, subjects..."
        className="w-full bg-light-gray border-2 border-transparent focus:border-primary focus:bg-white rounded-full py-2.5 pl-10 pr-10 text-sm outline-none transition-all"
      />
      {query && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-dark-gray"
        >
          <X size={18} />
        </button>
      )}
    </form>
  );
}

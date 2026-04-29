'use client';

import { boards, classes } from '@/data/books';
import { X, ChevronDown, Filter } from 'lucide-react';

export default function FilterSidebar({ filters, setFilters, category }) {
  const isAcademic = category === 'academic';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <aside className="space-y-8 bg-white p-6 rounded-2xl border border-light-gray h-fit sticky top-24">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Filter size={18} className="text-primary" />
          Filters
        </h3>
        <button 
          onClick={() => setFilters({ board: '', class: '', price: 2000, inStock: false })}
          className="text-xs text-accent hover:underline font-bold"
        >
          Reset All
        </button>
      </div>

      {isAcademic && (
        <>
          {/* Board Filter */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700 block">Board</label>
            <div className="relative">
              <select
                name="board"
                value={filters.board}
                onChange={handleChange}
                className="w-full appearance-none bg-light-gray border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary outline-none"
              >
                <option value="">All Boards</option>
                {boards.map(board => (
                  <option key={board} value={board}>{board}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 text-gray-400" size={16} />
            </div>
          </div>

          {/* Class Filter */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700 block">Class / Grade</label>
            <div className="relative">
              <select
                name="class"
                value={filters.class}
                onChange={handleChange}
                className="w-full appearance-none bg-light-gray border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary outline-none"
              >
                <option value="">All Classes</option>
                {classes.map(c => (
                  <option key={c} value={c}>Class {c}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 text-gray-400" size={16} />
            </div>
          </div>
        </>
      )}

      {/* Price Range */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-bold text-gray-700">Max Price</label>
          <span className="text-primary font-bold text-sm">Rs. {filters.price}</span>
        </div>
        <input
          type="range"
          name="price"
          min="100"
          max="5000"
          step="50"
          value={filters.price}
          onChange={handleChange}
          className="w-full accent-primary"
        />
      </div>

      {/* In Stock Toggle */}
      <div className="flex items-center justify-between py-2 border-t border-light-gray">
        <label className="text-sm font-bold text-gray-700 cursor-pointer" htmlFor="inStock">
          In Stock Only
        </label>
        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
          <input
            type="checkbox"
            name="inStock"
            id="inStock"
            checked={filters.inStock}
            onChange={handleChange}
            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
          />
          <label
            htmlFor="inStock"
            className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${filters.inStock ? 'bg-primary' : 'bg-gray-300'}`}
          ></label>
        </div>
      </div>

      <style jsx>{`
        .toggle-checkbox:checked {
          right: 0;
          border-color: #1B4332;
        }
        .toggle-checkbox {
          right: 16px;
          transition: all 0.3s;
          border-color: #ccc;
        }
      `}</style>
    </aside>
  );
}

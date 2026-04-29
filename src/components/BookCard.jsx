'use client';

import Image from 'next/image';
import { ShoppingCart, Book as BookIcon } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import toast from 'react-hot-toast';

export default function BookCard({ book, onOrderClick }) {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(book));
    toast.success(`${book.title || book.name} added to cart!`);
  };

  const handleQuickOrder = (e) => {
    e.preventDefault();
    if (onOrderClick) {
      onOrderClick(book);
    }
  };

  const highResCover = book.cover?.includes('google.com') 
    ? book.cover?.replace('zoom=1', 'zoom=2') + '&fife=w600'
    : book.cover;

  return (
    <div className="group bg-kitaab-card border border-kitaab-border hover:border-accent transition-all duration-500 flex flex-col h-full overflow-hidden shadow-sm hover:shadow-md rounded-kitaab p-3">
      {/* Cover Image */}
      <div className="relative aspect-[3/4.2] w-full overflow-hidden bg-kitaab-bg mb-3 border border-kitaab-border/50 rounded-kitaab shadow-inner">
        {book.cover && book.cover !== "/placeholder-book.jpg" ? (
          <Image
            src={highResCover}
            alt={book.title || book.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-kitaab-bg">
            <BookIcon size={24} className="text-kitaab-border mb-2" strokeWidth={1} />
            <span className="text-[9px] font-medium text-kitaab-muted uppercase tracking-widest line-clamp-2 font-body">
              {book.title || book.name}
            </span>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="flex flex-col flex-grow space-y-3">
        <div className="space-y-1">
          <div className="flex justify-between items-start gap-1">
            <h3 className="font-medium text-kitaab-text text-[14px] leading-tight line-clamp-2 group-hover:text-accent transition-colors font-body tracking-tight">
              {book.title || book.name}
            </h3>
            <span className="bg-kitaab-tag-bg text-kitaab-text text-[8px] px-1.5 py-0.5 rounded-[2px] font-bold uppercase tracking-widest font-body whitespace-nowrap border border-kitaab-border">
              {book.category}
            </span>
          </div>
          <p className="text-kitaab-muted text-[11px] font-normal font-body uppercase tracking-tight">{book.author}</p>
        </div>

        {/* Price Tag */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[15px] font-bold text-accent font-body">
              Rs. {book.price || 0}
            </span>
            {book.originalPrice && (
              <span className="text-[11px] text-kitaab-muted line-through font-body opacity-50">
                Rs. {book.originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleQuickOrder}
            className="btn-primary flex-grow py-2 text-[10px] tracking-widest font-bold"
          >
            Order Now
          </button>
          
          <button
            onClick={handleAddToCart}
            className="w-9 h-9 border border-kitaab-border text-kitaab-muted hover:border-accent hover:text-accent flex items-center justify-center transition-all transform active:scale-95 rounded-kitaab bg-white"
            title="Add to Cart"
          >
            <ShoppingCart size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

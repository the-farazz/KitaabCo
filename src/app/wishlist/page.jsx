'use client';

import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { removeFromWishlist } from '@/store/wishlistSlice';
import { addToCart } from '@/store/cartSlice';
import toast from 'react-hot-toast';

export default function WishlistPage() {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  const handleMoveToCart = (book) => {
    dispatch(addToCart(book));
    dispatch(removeFromWishlist(book.id));
    toast.success(`${book.name} moved to cart!`);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto space-y-8 bg-white p-12 rounded-[40px] shadow-xl border border-light-gray">
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 bg-accent/10 rounded-full animate-pulse" />
            <Heart size={64} className="absolute inset-0 m-auto text-accent" fill="currentColor" />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-black text-dark-gray">Your Wishlist is Empty</h1>
            <p className="text-gray-500">Save your favorite books to read them later. Start adding now!</p>
          </div>
          <Link href="/" className="btn-primary w-full py-4 rounded-2xl text-lg font-bold bg-accent hover:bg-accent/90">
            Discover Books
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light-gray/30 min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-black text-dark-gray mb-2">My Wishlist</h1>
          </div>
          <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">
            {wishlistItems.length} Items Saved
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlistItems.map((book) => (
            <div key={book.id} className="group bg-white rounded-3xl border border-light-gray overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full relative">
              <button 
                onClick={() => dispatch(removeFromWishlist(book.id))}
                className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-md text-red-500 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={20} />
              </button>

              <Link href={`/books/${book.slug}`} className="relative h-72 overflow-hidden bg-gray-100 block">
                <Image
                  src={book.images[0]}
                  alt={book.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </Link>

              <div className="p-6 flex flex-col flex-grow">
                <Link href={`/books/${book.slug}`}>
                  <h3 className="font-bold text-dark-gray text-lg line-clamp-1 mb-1">{book.name}</h3>
                </Link>
                <p className="text-sm text-gray-400 mb-6 font-medium">By {book.author}</p>
                
                <div className="mt-auto space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl font-black text-primary">Rs. {book.price}</span>
                    {book.discount > 0 && <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">-{book.discount}%</span>}
                  </div>
                  <button
                    onClick={() => handleMoveToCart(book)}
                    className="w-full btn-primary py-3 text-sm font-bold rounded-xl"
                  >
                    <ShoppingCart size={18} />
                    Move to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useSelector, useDispatch } from 'react-redux';
import { Heart } from 'lucide-react';
import { addToWishlist, removeFromWishlist } from '@/store/wishlistSlice';
import toast from 'react-hot-toast';

export default function WishlistButton({ book, size = 20 }) {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const isWishlisted = wishlistItems.some(item => item.id === book.id);

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isWishlisted) {
      dispatch(removeFromWishlist(book.id));
      toast.error(`${book.name} removed from wishlist`);
    } else {
      dispatch(addToWishlist(book));
      toast.success(`${book.name} added to wishlist!`);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      className={`p-2.5 rounded-full transition-all duration-300 shadow-md ${
        isWishlisted 
          ? 'bg-accent text-white scale-110' 
          : 'bg-white text-gray-400 hover:text-accent hover:scale-110'
      }`}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart size={size} fill={isWishlisted ? "currentColor" : "none"} />
    </button>
  );
}

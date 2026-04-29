'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import StarRating from '@/components/StarRating';
import WishlistButton from '@/components/WishlistButton';
import BookGrid from '@/components/BookGrid';
import { ShoppingCart, MessageCircle, Truck, ShieldCheck, RotateCcw, Plus, Minus, Share2 } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function BookContent({ book, relatedBooks }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...book, quantity }));
    toast.success(`${book.name} added to cart!`);
  };

  const handleWhatsAppOrder = () => {
    const message = `📚 *INQUIRY — KEBS* 📚\n━━━━━━━━━━━━━━━━━━━━\n\nI want to order:\n*${book.name}*\nQty: ${quantity}\nPrice: Rs. ${book.price * quantity}\n\nIs this available?\n━━━━━━━━━━━━━━━━━━━━\n_Sent via KEBS_`;
    window.open(`https://wa.me/923273129464?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 pt-24 md:pt-32 pb-8 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-20">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square md:aspect-auto md:h-[600px] rounded-3xl overflow-hidden bg-light-gray border border-gray-100 shadow-inner">
              <Image
                src={book.images[activeImage]}
                alt={book.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-4 md:p-8"
                priority
              />
            </div>
            <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {book.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative w-16 md:w-20 h-20 md:h-24 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${activeImage === idx ? 'border-primary' : 'border-transparent'}`}
                >
                  <Image src={img} alt={book.name} fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
 
          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-6 md:mb-8">
              <span className="bg-primary/5 text-primary px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block border border-primary/10">
                {book.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-heading font-medium italic italic-heading text-dark-gray mb-3 tracking-tight">
                {book.name}
              </h1>
              
              <div className="flex items-center gap-4 flex-wrap">
                <StarRating rating={book.rating} total={book.totalRatings} size={16} />
                <span className="text-gray-200 hidden sm:block">|</span>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">
                  By <span className="text-dark-gray">{book.author}</span>
                </span>
                {book.inStock ? (
                  <span className="bg-green-50 text-green-600 px-3 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border border-green-100">In Stock</span>
                ) : (
                  <span className="bg-red-50 text-red-600 px-3 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border border-red-100">Out of Stock</span>
                )}
              </div>
            </div>
 
            <div className="bg-light-gray/30 p-5 md:p-6 rounded-3xl mb-8 border border-gray-100">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-3xl md:text-4xl font-bold text-accent font-body">Rs. {book.price}</span>
                {book.originalPrice > book.price && (
                  <span className="text-lg text-gray-400 line-through opacity-50">Rs. {book.originalPrice}</span>
                )}
              </div>
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Inclusive of all taxes</p>
            </div>
 
            {/* Actions */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="flex items-center bg-light-gray/50 rounded-2xl p-1 w-fit border border-gray-100">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-2 md:p-3 hover:bg-white rounded-xl transition-all shadow-sm disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-10 md:w-12 text-center font-bold text-lg md:text-xl">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => Math.min(10, q + 1))}
                    className="p-2 md:p-3 hover:bg-white rounded-xl transition-all shadow-sm"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <div className="flex gap-2">
                  <WishlistButton book={book} size={20} />
                  <button className="p-3 bg-light-gray/50 border border-gray-100 rounded-2xl hover:bg-gray-200 transition-all text-gray-500">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
 
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 btn-primary py-4 md:py-5 text-sm md:text-base font-bold rounded-2xl shadow-xl shadow-primary/10 flex items-center justify-center gap-3"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button 
                  onClick={handleWhatsAppOrder}
                  className="flex-1 flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1fb355] text-white py-4 md:py-5 px-6 rounded-2xl font-bold text-sm md:text-base transition-all shadow-xl shadow-green-500/10"
                >
                  <MessageCircle size={20} />
                  Order on WhatsApp
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-12 grid grid-cols-3 gap-4 py-8 border-t border-light-gray">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck size={24} className="text-accent" />
                <span className="text-[10px] font-black uppercase text-gray-400 leading-tight">Nationwide<br/>Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <ShieldCheck size={24} className="text-accent" />
                <span className="text-[10px] font-black uppercase text-gray-400 leading-tight">100%<br/>Authentic</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RotateCcw size={24} className="text-accent" />
                <span className="text-[10px] font-black uppercase text-gray-400 leading-tight">Easy<br/>Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="max-w-4xl">
          <div className="border-b border-light-gray flex gap-8 mb-8">
            <button className="border-b-4 border-primary pb-4 font-bold text-lg text-primary">Description</button>
            <button className="pb-4 font-bold text-lg text-gray-400 hover:text-primary transition-colors">Specifications</button>
            <button className="pb-4 font-bold text-lg text-gray-400 hover:text-primary transition-colors">Reviews</button>
          </div>
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6">
            <p>{book.description}</p>
            <p>At KEBS, we ensure that every book is carefully inspected for quality and authenticity before being shipped to our customers. Our packaging is designed to protect your precious books during transit across Pakistan.</p>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-24">
          <BookGrid books={relatedBooks} title="Related Books" />
        </div>
      </div>
    </div>
  );
}

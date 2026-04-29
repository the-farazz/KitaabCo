'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck, CreditCard, ChevronLeft } from 'lucide-react';
import { removeFromCart, updateQuantity } from '@/store/cartSlice';
import CheckoutModal from '@/components/CheckoutModal';

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const originalSubtotal = cartItems.reduce((acc, item) => acc + ((item.originalPrice || item.price) * item.quantity), 0);
  const totalSavings = originalSubtotal - subtotal;

  const handleUpdateQty = (id, newQty) => {
    if (newQty < 1) return;
    dispatch(updateQuantity({ id, quantity: newQty }));
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-kitaab-bg min-h-screen pt-40 pb-20 flex items-center justify-center">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-xl mx-auto space-y-10 animate-fadeInUp">
            <div className="relative w-40 h-40 mx-auto">
              <div className="absolute inset-0 bg-accent/5 rounded-full animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center text-accent/30">
                <ShoppingBag size={80} strokeWidth={1} />
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-heading font-medium italic italic-heading">Your cart is empty</h1>
              <p className="text-kitaab-muted font-body text-sm max-w-sm mx-auto">
                Discover our curated collection of literature and find something that inspires your journey.
              </p>
            </div>
            <Link href="/" className="btn-primary inline-flex items-center gap-3">
              Start Exploring <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-kitaab-bg min-h-screen pt-24 md:pt-32 pb-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-8 md:mb-12 border-b border-kitaab-border pb-8 md:pb-10">
          <div className="space-y-4 animate-fadeInUp">
            <Link href="/" className="inline-flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-kitaab-muted uppercase tracking-[0.2em] hover:text-accent transition-colors">
              <ChevronLeft size={14} /> Back to Library
            </Link>
            <h1 className="text-4xl md:text-5xl font-heading font-medium italic italic-heading">Shopping Cart</h1>
          </div>
          <p className="text-kitaab-muted font-body text-[10px] md:text-xs uppercase tracking-widest animate-fadeInUp">
            {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'} in your collection
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="lg:w-2/3 space-y-8 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <div className="bg-kitaab-card border border-kitaab-border rounded-kitaab overflow-hidden shadow-sm">
              <div className="divide-y divide-kitaab-border">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-4 md:p-8 flex flex-col sm:flex-row gap-6 md:gap-8 group">
                    {/* Image */}
                    <div className="relative w-24 md:w-32 h-36 md:h-44 rounded-kitaab overflow-hidden border border-kitaab-border shrink-0 shadow-lg group-hover:scale-[1.02] transition-transform duration-500">
                      <Image 
                        src={item.cover || item.images?.[0] || "/placeholder-book.jpg"} 
                        alt={item.name} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-grow flex flex-col">
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-1">
                          <h3 className="text-lg md:text-xl font-heading font-medium text-kitaab-text">
                            <Link href={`/books/${item.slug}`} className="hover:text-accent transition-colors">{item.name}</Link>
                          </h3>
                          <p className="text-[10px] md:text-xs text-kitaab-muted font-body uppercase tracking-widest">By {item.author}</p>
                        </div>
                        <button 
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="p-1 md:p-2 text-kitaab-muted hover:text-red-500 transition-colors shrink-0"
                          title="Remove item"
                        >
                          <Trash2 className="w-[18px] h-[18px] md:w-5 md:h-5" strokeWidth={1.5} />
                        </button>
                      </div>
                      
                      <div className="mt-auto pt-8 flex flex-wrap items-center justify-between gap-6">
                        {/* Quantity */}
                        <div className="flex items-center border border-kitaab-border rounded-kitaab bg-kitaab-bg/50 p-1">
                          <button 
                            onClick={() => handleUpdateQty(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-kitaab transition-all text-kitaab-muted"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-10 text-center font-bold font-body text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => handleUpdateQty(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-kitaab transition-all text-kitaab-muted"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        
                        {/* Price */}
                        <div className="text-right">
                          <p className="text-xl font-bold text-accent font-body">Rs. {item.price * item.quantity}</p>
                          {(item.originalPrice || item.price) > item.price && (
                            <p className="text-xs text-kitaab-muted line-through font-body opacity-60">
                              Rs. {(item.originalPrice || item.price) * item.quantity}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <div className="bg-kitaab-card border border-kitaab-border p-10 rounded-kitaab shadow-xl sticky top-32">
              <h2 className="text-2xl font-heading font-medium mb-10 border-b border-kitaab-border pb-6">Order Summary</h2>
              
              <div className="space-y-6 mb-10">
                <div className="flex justify-between text-kitaab-muted font-body text-sm">
                  <span>Subtotal</span>
                  <span className="font-bold text-kitaab-text">Rs. {subtotal}</span>
                </div>
                <div className="flex justify-between text-kitaab-muted font-body text-sm">
                  <span>Delivery Charges</span>
                  <span className="text-accent font-bold italic">To be confirmed</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-accent font-body text-sm">
                    <span className="font-medium italic">Total Savings</span>
                    <span className="font-bold">- Rs. {totalSavings}</span>
                  </div>
                )}
                <div className="pt-6 border-t border-kitaab-border flex justify-between items-end">
                  <span className="text-lg font-heading font-medium">Total Amount</span>
                  <p className="text-3xl font-bold text-primary font-body">Rs. {subtotal}</p>
                </div>
              </div>

              <div className="space-y-6">
                <button 
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full btn-primary py-5 text-[14px] shadow-2xl shadow-primary/20 group"
                >
                  Proceed to Order
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center justify-center gap-2 text-kitaab-muted text-[9px] font-bold uppercase tracking-[0.2em]">
                  <ShieldCheck size={14} className="text-accent" /> Secure WhatsApp Checkout
                </div>
              </div>

              <div className="mt-12 space-y-6 pt-10 border-t border-kitaab-border">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/5 flex items-center justify-center text-accent">
                    <Truck size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-kitaab-text uppercase tracking-widest">Fast Delivery</p>
                    <p className="text-[10px] text-kitaab-muted font-body">Receive in 2-4 days</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/5 flex items-center justify-center text-accent">
                    <CreditCard size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-kitaab-text uppercase tracking-widest">Flexible Payments</p>
                    <p className="text-[10px] text-kitaab-muted font-body">Cash on Delivery & Bank Transfer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        subtotal={subtotal}
      />
    </div>
  );
}

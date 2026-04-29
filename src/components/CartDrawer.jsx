'use client';

import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { removeFromCart, updateQuantity } from '@/store/cartSlice';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer({ isOpen, onClose }) {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleUpdateQty = (id, newQty) => {
    if (newQty < 1) return;
    dispatch(updateQuantity({ id, quantity: newQty }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-light-gray flex items-center justify-between bg-primary text-white">
              <div className="flex items-center gap-3">
                <ShoppingBag size={24} />
                <h2 className="text-xl font-bold">Your Cart</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-20 h-24 rounded-lg overflow-hidden shrink-0 border border-light-gray">
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold text-dark-gray text-sm line-clamp-1">{item.name}</h3>
                      <p className="urdu text-primary text-xs mb-1">{item.nameUrdu}</p>
                      <p className="text-primary font-bold">Rs. {item.price}</p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-light-gray rounded-lg overflow-hidden">
                          <button 
                            onClick={() => handleUpdateQty(item.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-light-gray text-gray-500"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => handleUpdateQty(item.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-light-gray text-gray-500"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 space-y-4">
                  <ShoppingBag size={64} className="mx-auto text-gray-200" />
                  <div>
                    <p className="text-gray-500 font-medium">Your cart is empty</p>
                    <p className="urdu text-primary text-xl">آپ کا کارٹ خالی ہے</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="btn-primary mx-auto"
                  >
                    Start Shopping
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-light-gray bg-light-gray/50">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-gray-600 font-medium">Subtotal:</span>
                  <span className="text-2xl font-bold text-primary">Rs. {subtotal}</span>
                </div>
                <div className="space-y-3">
                  <Link 
                    href="/cart" 
                    onClick={onClose}
                    className="w-full btn-outline"
                  >
                    View Full Cart
                  </Link>
                  <Link 
                    href="/cart" 
                    onClick={onClose}
                    className="w-full btn-primary bg-accent hover:bg-accent/90"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
                <p className="text-[10px] text-gray-400 text-center mt-4 uppercase tracking-widest">
                  Secure WhatsApp Ordering
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

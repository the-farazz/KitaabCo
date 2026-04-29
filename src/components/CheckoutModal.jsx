'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { X, Send, CreditCard, Truck, ShieldCheck } from 'lucide-react';
import { clearCart } from '@/store/cartSlice';
import { cities } from '@/data/books';
import { showToast } from './Toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function CheckoutModal({ isOpen, onClose, cartItems, subtotal }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Karachi',
    address: '',
    payment: 'Cash on Delivery',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.address.trim()) newErrors.address = 'Complete address is required';
    
    const phoneRegex = /^03\d{9}$|^03\d{2}-\d{7}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Valid Pakistani number required (03XX-XXXXXXX)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const orderItems = cartItems.map((item, index) => 
      `${index + 1}. ${item.name} (${item.category === 'academic' ? item.board : item.author}) x${item.quantity} — Rs. ${item.price * item.quantity}`
    ).join('\n');

    const message = `📚 *NEW ORDER — KEBS* 📚\n━━━━━━━━━━━━━━━━━━━━\n\n👤 *Customer Details:*\nName: ${formData.name}\nPhone: ${formData.phone}\nCity: ${formData.city}\nAddress: ${formData.address}\nPayment: ${formData.payment}${formData.payment === 'Bank Transfer' ? '\n⚠️ _Please attach payment screenshot_' : ''}\n\n📦 *Order Summary:*\n${orderItems}\n\n💰 *Subtotal: Rs. ${subtotal}*\n🚚 Delivery charges will be confirmed by our team.\n\n📝 Note: ${formData.notes || 'None'}\n━━━━━━━━━━━━━━━━━━━━\n_Sent via KEBS Website_`;

    const whatsappUrl = `https://wa.me/923273129464?text=${encodeURIComponent(message)}`;
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      showToast.success('Order Processed!', 'Your request has been sent via WhatsApp.');
      dispatch(clearCart());
      setLoading(false);
      onClose();
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-[110] backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-kitaab-bg z-[111] rounded-kitaab overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)] max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="bg-primary p-6 md:p-8 text-white relative overflow-hidden shrink-0">
              <div className="relative z-10 flex justify-between items-center">
                <div className="space-y-1">
                  <h2 className="text-2xl font-heading font-medium italic italic-heading">Finalize Order</h2>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-5 md:p-6 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-kitaab-muted uppercase tracking-widest">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter name"
                    className={`w-full bg-white border-b ${errors.name ? 'border-red-500' : 'border-kitaab-border'} focus:border-accent px-0 py-1.5 outline-none text-sm transition-all`}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-kitaab-muted uppercase tracking-widest">Phone Number</label>
                  <input
                    required
                    type="tel"
                    placeholder="03XX-XXXXXXX"
                    className={`w-full bg-white border-b ${errors.phone ? 'border-red-500' : 'border-kitaab-border'} focus:border-accent px-0 py-1.5 outline-none text-sm transition-all`}
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-kitaab-muted uppercase tracking-widest">City</label>
                  <select
                    className="w-full bg-white border-b border-kitaab-border focus:border-accent px-0 py-1.5 outline-none text-sm cursor-pointer"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  >
                    {cities.map(city => <option key={city} value={city}>{city}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-kitaab-muted uppercase tracking-widest">Payment Method</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, payment: 'Cash on Delivery'})}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 border rounded-kitaab transition-all ${formData.payment === 'Cash on Delivery' ? 'border-accent bg-accent/5' : 'border-kitaab-border opacity-50'}`}
                    >
                      <Truck size={14} className="text-accent" />
                      <span className="text-[9px] font-bold uppercase">COD</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, payment: 'Bank Transfer'})}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 border rounded-kitaab transition-all ${formData.payment === 'Bank Transfer' ? 'border-accent bg-accent/5' : 'border-kitaab-border opacity-50'}`}
                    >
                      <CreditCard size={14} className="text-accent" />
                      <span className="text-[9px] font-bold uppercase">BANK</span>
                    </button>
                  </div>
                </div>
              </div>

              {formData.payment === 'Bank Transfer' && (
                <div className="bg-accent/5 border border-accent/20 rounded-kitaab p-3 space-y-1.5">
                  <p className="text-[9px] font-bold text-accent uppercase tracking-widest">EasyPaisa Details</p>
                  <p className="text-xs font-mono font-bold text-primary bg-white/50 p-1.5 rounded border border-accent/10">PK09TMFB0000000053125038</p>
                  <p className="text-[8px] text-kitaab-muted">Share screenshot on WhatsApp to confirm.</p>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-kitaab-muted uppercase tracking-widest">Delivery Address</label>
                <textarea
                  required
                  rows="1"
                  placeholder="House #, Street, Area..."
                  className={`w-full bg-white border-b ${errors.address ? 'border-red-500' : 'border-kitaab-border'} focus:border-accent px-0 py-1.5 outline-none text-sm resize-none`}
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-kitaab-muted uppercase tracking-widest">Instructions (Optional)</label>
                <input
                  type="text"
                  placeholder="Any special notes..."
                  className="w-full bg-white border-b border-kitaab-border focus:border-accent px-0 py-1.5 outline-none text-sm"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </div>

              <div className="pt-4 border-t border-kitaab-border">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-bold text-kitaab-muted uppercase tracking-widest">Total Payable</span>
                  <span className="text-xl font-bold text-primary">Rs. {subtotal}</span>
                </div>
                <button
                  disabled={loading}
                  type="submit"
                  className="w-full bg-[#25D366] hover:bg-[#1fb355] text-white py-3.5 rounded-kitaab font-bold text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                >
                  {loading ? "Processing..." : <><Send size={16} /> Complete via WhatsApp</>}
                </button>
                <div className="flex items-center justify-center gap-1.5 mt-3 text-kitaab-muted text-[8px] font-bold uppercase tracking-widest">
                  <ShieldCheck size={10} className="text-accent" /> Encrypted Transaction
                </div>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

'use client';

import { useState } from 'react';
import { X, Send, Truck, CreditCard, ShieldCheck } from 'lucide-react';
import { cities } from '@/data/books';

export default function OrderModal({ isOpen, onClose, book }) {
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

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name required';
    if (!formData.address.trim()) newErrors.address = 'Address required';
    if (!/^03\d{9}$/.test(formData.phone.replace(/[-\s]/g, ''))) {
      newErrors.phone = 'Valid 03XX number required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const message = `📚 *NEW ORDER — KEBS* 📚\n━━━━━━━━━━━━━━━━━━━━\n\n👤 *Customer Details:*\nName: ${formData.name}\nPhone: ${formData.phone}\nCity: ${formData.city}\nAddress: ${formData.address}\nPayment: ${formData.payment}${formData.payment === 'Bank Transfer' ? '\n⚠️ _Please attach payment screenshot_' : ''}\n\n📦 *Order Item:*\n1. ${book.title} — Rs. ${book.price}\n\n💰 *Total: Rs. ${book.price}*\n🚚 Delivery charges will be confirmed.\n━━━━━━━━━━━━━━━━━━━━\n_Sent via KEBS Website_`;

    setTimeout(() => {
      window.open(`https://wa.me/923273129464?text=${encodeURIComponent(message)}`, '_blank');
      setLoading(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-kitaab-bg w-full max-w-xl rounded-kitaab overflow-hidden shadow-2xl relative animate-scaleUp max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-primary p-6 md:p-8 text-white relative shrink-0">
          <div className="flex justify-between items-center relative z-10">
            <h2 className="text-2xl font-heading font-medium italic italic-heading">Order Now</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 md:p-6 space-y-4 overflow-y-auto">
          <div className="bg-white/50 border border-kitaab-border p-3 rounded-kitaab flex gap-3 items-center">
            <div className="w-10 h-14 bg-white border border-kitaab-border rounded-sm overflow-hidden shrink-0 shadow-sm">
              <img src={book.cover || "/placeholder-book.jpg"} alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-kitaab-text leading-tight">{book.title}</p>
              <p className="text-[9px] text-kitaab-muted uppercase tracking-widest mt-0.5">Rs. {book.price}</p>
            </div>
          </div>

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

          <div className="pt-4 border-t border-kitaab-border">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-bold text-kitaab-muted uppercase tracking-widest">Total Payable</span>
              <span className="text-xl font-bold text-primary">Rs. {book.price}</span>
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
      </div>
    </div>
  );
}

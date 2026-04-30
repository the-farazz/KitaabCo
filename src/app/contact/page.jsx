'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageCircle, Clock, Globe } from 'lucide-react';

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with KitaabCo for book inquiries, orders, or school/institutional partnerships. Reach us via WhatsApp, email, or our contact form.',
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappMsg = `👋 *NEW INQUIRY — KitaabCo* 📚\n━━━━━━━━━━━━━━━━━━━━\n\n👤 *From:* ${formData.name}\n📧 *Email:* ${formData.email}\n📌 *Subject:* ${formData.subject}\n\n💬 *Message:*\n${formData.message}\n\n━━━━━━━━━━━━━━━━━━━━`;
    window.open(`https://wa.me/923273129464?text=${encodeURIComponent(whatsappMsg)}`, '_blank');
  };

  return (
    <div className="bg-light-gray/30 min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-5xl font-black text-dark-gray">Get In Touch</h1>
            <p className="urdu text-3xl text-primary">ہم سے رابطہ کریں</p>
            <div className="w-20 h-1.5 bg-accent mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-[32px] shadow-sm border border-light-gray space-y-4 hover:shadow-xl transition-all group">
                <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">WhatsApp / Call</h3>
                  <p className="text-primary font-black text-xl">+92 327 3129464</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[32px] shadow-sm border border-light-gray space-y-4 hover:shadow-xl transition-all group">
                <div className="bg-accent/10 w-14 h-14 rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                  <Mail size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Email Address</h3>
                  <p className="text-gray-500 font-medium">info@kitaabco.pk</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[32px] shadow-sm border border-light-gray space-y-4 hover:shadow-xl transition-all group">
                <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Clock size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Business Hours</h3>
                  <p className="text-gray-500 font-medium">Mon - Sat: 9:00 AM - 9:00 PM</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-xl border border-light-gray">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 uppercase tracking-widest px-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Full Name"
                        className="w-full bg-light-gray border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 uppercase tracking-widest px-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="Email (for reply)"
                        className="w-full bg-light-gray border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-widest px-1">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full bg-light-gray border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all appearance-none"
                    >
                      <option>General Inquiry</option>
                      <option>Order Status</option>
                      <option>Institutional Orders</option>
                      <option>Book Request</option>
                      <option>Complaints</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-widest px-1">Your Message</label>
                    <textarea
                      required
                      rows="5"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="How can we help you today?"
                      className="w-full bg-light-gray border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary py-5 rounded-2xl text-xl font-black shadow-xl shadow-primary/20 group"
                  >
                    Send Message via WhatsApp
                    <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="mt-20 bg-white p-4 rounded-[40px] shadow-xl border border-light-gray overflow-hidden">
            <div className="bg-gray-100 h-96 rounded-[32px] flex flex-col items-center justify-center text-gray-400 gap-4">
              <Globe size={64} className="animate-spin-slow" />
              <p className="font-bold">Google Maps Placeholder</p>
              <p className="text-xs uppercase tracking-[0.2em]">KitaabCo Headquarters - Lahore, Pakistan</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}

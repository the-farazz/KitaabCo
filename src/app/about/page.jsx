import { Book, Target, Award, Users, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="bg-white pb-20">
      {/* Hero Header */}
      <section className="bg-primary py-24 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-4">Our Story</h1>
          <p className="urdu text-3xl text-accent mb-8">ہماری کہانی</p>
          <div className="w-24 h-1.5 bg-accent mx-auto rounded-full" />
        </div>
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <Book size={400} />
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* Mission Section */}
        <section className="py-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-accent font-black uppercase tracking-[0.3em] text-sm">Vision & Mission</span>
              <h2 className="text-4xl font-black text-dark-gray leading-tight">Pakistan's Premier Destination for <span className="text-primary underline decoration-accent underline-offset-8">Literary Excellence</span></h2>
              <p className="urdu text-2xl text-primary mt-2">ادبی فضیلت کے لیے پاکستان کا سب سے بڑا ادارہ</p>
            </div>
            
            <div className="prose prose-lg text-gray-600 leading-relaxed">
              <p>
                Founded with a passion for spreading knowledge, KEBS started as a small initiative to make official textbooks and quality literature accessible to every student and reader across Pakistan. Today, we are proud to be one of the most trusted names in the online book industry.
              </p>
              <p>
                Our mission is simple: to ignite the love for reading and provide easy access to authentic educational resources. We believe that books have the power to transform lives, and our goal is to put a book in every hand from Karachi to Khyber.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-light-gray p-8 rounded-[40px] space-y-4 hover:bg-primary hover:text-white transition-all duration-500 group">
              <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-accent group-hover:text-white transition-colors">
                <Target className="text-primary group-hover:text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold">Authenticity</h3>
              <p className="text-sm opacity-70">We only source 100% original and authorized editions.</p>
            </div>
            <div className="bg-light-gray p-8 rounded-[40px] space-y-4 translate-y-12 hover:bg-primary hover:text-white transition-all duration-500 group">
              <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-accent group-hover:text-white transition-colors">
                <Users className="text-primary group-hover:text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold">Community</h3>
              <p className="text-sm opacity-70">Supporting thousands of students and readers nationwide.</p>
            </div>
            <div className="bg-light-gray p-8 rounded-[40px] space-y-4 hover:bg-primary hover:text-white transition-all duration-500 group">
              <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-accent group-hover:text-white transition-colors">
                <Award className="text-primary group-hover:text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold">Quality</h3>
              <p className="text-sm opacity-70">Strict quality control on every shipment we send.</p>
            </div>
            <div className="bg-light-gray p-8 rounded-[40px] space-y-4 translate-y-12 hover:bg-primary hover:text-white transition-all duration-500 group">
              <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-accent group-hover:text-white transition-colors">
                <Truck className="text-primary group-hover:text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold">Coverage</h3>
              <p className="text-sm opacity-70">Fastest delivery to even the most remote areas.</p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-dark-gray rounded-[60px] p-12 md:p-24 text-white overflow-hidden relative">
          <div className="max-w-3xl mx-auto text-center space-y-12 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black">Our Promise to You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
              <div className="space-y-4">
                <h4 className="text-accent text-xl font-bold">No Piracy, Ever</h4>
                <p className="text-gray-400 text-sm">We strictly stand against pirated and low-quality printed books. Your purchase supports the authors and publishers.</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-accent text-xl font-bold">Direct Communication</h4>
                <p className="text-gray-400 text-sm">Unlike automated bots, you talk directly to our team via WhatsApp for any queries or custom orders.</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-accent text-xl font-bold">Student Friendly</h4>
                <p className="text-gray-400 text-sm">We offer special discounts for students and institutions to ensure education is never a financial burden.</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-accent text-xl font-bold">Nationwide Trust</h4>
                <p className="text-gray-400 text-sm">Thousands of positive reviews from parents and educators across all provinces of Pakistan.</p>
              </div>
            </div>
            
            <div className="pt-12">
              <Link href="/contact" className="btn-primary inline-flex bg-accent text-white hover:bg-accent/90 px-12 py-5 rounded-2xl text-xl font-black shadow-2xl shadow-accent/20">
                Contact Our Team
                <MessageCircle size={28} />
              </Link>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </section>
      </div>
    </div>
  );
}

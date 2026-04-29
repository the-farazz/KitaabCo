import { Inter, DM_Sans, Noto_Nastaliq_Urdu, Cormorant_Garamond, Playfair_Display, EB_Garamond, Outfit } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import SocialSidebar from '@/components/SocialSidebar';
import ThemeSwitcher from '@/components/ThemeSwitcher';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const dmsans = DM_Sans({ subsets: ['latin'], variable: '--font-dmsans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-cormorant' });
const ebGaramond = EB_Garamond({ subsets: ['latin'], variable: '--font-garamond' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
const notoUrdu = Noto_Nastaliq_Urdu({ subsets: ['arabic'], weight: ['400', '700'], variable: '--font-noto-urdu' });

export const metadata = {
  title: 'KEBS',
  description: 'Premium Bookstore Pakistan',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`
      ${inter.variable} 
      ${dmsans.variable} 
      ${playfair.variable} 
      ${cormorant.variable} 
      ${ebGaramond.variable}
      ${outfit.variable}
      ${notoUrdu.variable}
      theme-classic
    `}>
      <body className="bg-kitaab-bg text-kitaab-text font-body min-h-screen flex flex-col antialiased">
        <Providers>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <ThemeSwitcher />
          <WhatsAppButton />
          <SocialSidebar />
        </Providers>
      </body>
    </html>
  );
}

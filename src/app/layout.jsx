import { Inter, DM_Sans, Noto_Nastaliq_Urdu, Cormorant_Garamond, Playfair_Display, EB_Garamond, Outfit } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import SocialSidebar from '@/components/SocialSidebar';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import JsonLd from '@/components/JsonLd';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const dmsans = DM_Sans({ subsets: ['latin'], variable: '--font-dmsans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-cormorant' });
const ebGaramond = EB_Garamond({ subsets: ['latin'], variable: '--font-garamond' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
const notoUrdu = Noto_Nastaliq_Urdu({ subsets: ['arabic'], weight: ['400', '700'], variable: '--font-noto-urdu' });

export const metadata = {
  metadataBase: new URL('https://www.kitaabco.pk'),
  title: {
    default: 'KitaabCo | Premium Bookstore in Pakistan',
    template: '%s | KitaabCo'
  },
  description: 'KitaabCo is Pakistan\'s premier online bookstore, offering a curated collection of classic literature, modern bestsellers, and rare finds. Premium quality books delivered to your doorstep.',
  keywords: ['books', 'online bookstore', 'Pakistan', 'literature', 'buy books online', 'KitaabCo'],
  authors: [{ name: 'KitaabCo' }],
  creator: 'KitaabCo',
  publisher: 'KitaabCo',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'KitaabCo | Premium Bookstore in Pakistan',
    description: 'Pakistan\'s premier online bookstore for curated literature and bestsellers.',
    url: 'https://www.kitaabco.pk',
    siteName: 'KitaabCo',
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KitaabCo | Premium Bookstore in Pakistan',
    description: 'Pakistan\'s premier online bookstore for curated literature and bestsellers.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'DdSrKhHONmCz_OYa6_vdHjHgqGuZNQD_ad-8gdd7Uv4',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico', // Ideally should be a separate apple-touch-icon.png
  },
};

export default function RootLayout({ children }) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'KitaabCo',
    url: 'https://www.kitaabco.pk',
    logo: 'https://www.kitaabco.pk/logo.png',
    sameAs: [
      'https://www.facebook.com/kitaabco',
      'https://www.instagram.com/kitaabco',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+92-XXXXXXXXXX',
      contactType: 'customer service',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'KitaabCo',
    url: 'https://www.kitaabco.pk',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.kitaabco.pk/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

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
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
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

import { books } from '@/data/books';
import BookContent from './BookContent';
import JsonLd from '@/components/JsonLd';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const book = books.find(b => b.slug === slug);
  
  if (!book) return { title: 'Book Not Found' };

  return {
    title: `${book.title} by ${book.author}`,
    description: book.description?.slice(0, 160) || `Buy ${book.title} by ${book.author} online at KitaabCo. Premium quality bookstore in Pakistan.`,
    openGraph: {
      title: `${book.title} by ${book.author} | KitaabCo`,
      description: book.description?.slice(0, 160),
      images: book.images?.length > 0 ? [{ url: book.images[0], width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${book.title} by ${book.author} | KitaabCo`,
      description: book.description?.slice(0, 160),
      images: book.images?.length > 0 ? [book.images[0]] : [],
    },
  };
}

export default async function BookDetailPage({ params }) {
  const { slug } = await params;
  const book = books.find(b => b.slug === slug);

  if (!book) return <div className="container mx-auto px-4 py-20 text-center">Book not found</div>;

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    description: book.description,
    author: {
      '@type': 'Person',
      name: book.author,
    },
    image: book.images,
    offers: {
      '@type': 'Offer',
      price: book.price,
      priceCurrency: 'PKR',
      availability: 'https://schema.org/InStock',
    },
  };

  const relatedBooks = books
    .filter(b => b.category === book.category && b.id !== book.id)
    .slice(0, 4);

  return (
    <>
      <JsonLd data={productSchema} />
      <BookContent book={book} relatedBooks={relatedBooks} />
    </>
  );
}

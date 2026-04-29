import { books } from '@/data/books';
import BookContent from './BookContent';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const book = books.find(b => b.slug === slug);
  if (!book) return { title: 'Book Not Found' };
  return {
    description: book.description,
    openGraph: {
      description: book.description,
      images: [{ url: book.images[0], width: 1200, height: 630 }],
    },
  };
}

export default async function BookDetailPage({ params }) {
  const { slug } = await params;
  const book = books.find(b => b.slug === slug);

  if (!book) return <div className="container mx-auto px-4 py-20 text-center">Book not found</div>;

  const relatedBooks = books
    .filter(b => b.category === book.category && b.id !== book.id)
    .slice(0, 4);

  return (
    <BookContent book={book} relatedBooks={relatedBooks} />
  );
}

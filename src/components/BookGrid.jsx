import BookCard from './BookCard';

export default function BookGrid({ books, onOrderClick, emptyMessage = "No books found for this category." }) {
  if (!books || books.length === 0) {
    return (
      <div className="py-20 text-center space-y-4 animate-fadeInUp bg-kitaab-card/30 rounded-kitaab border border-dashed border-kitaab-border">
        <div className="w-20 h-20 bg-kitaab-bg rounded-full flex items-center justify-center mx-auto border border-kitaab-border">
          <span className="text-4xl opacity-50">📚</span>
        </div>
        <h3 className="text-xl font-heading font-medium italic italic-heading text-kitaab-text">{emptyMessage}</h3>
        <p className="text-kitaab-muted font-body text-sm">Try switching to another tab or search for a different topic.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-8">
      {books.map((book) => (
        <BookCard 
          key={book.id} 
          book={book} 
          onOrderClick={onOrderClick}
        />
      ))}
    </div>
  );
}

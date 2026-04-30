import { books, categories } from '@/data/books';
import CategoryContent from './CategoryContent';

export async function generateMetadata({ params }) {
  const { category } = await params;
  const cat = categories.find(c => c.id === category);
  
  if (!cat) return { title: 'Category Not Found' };

  return {
    title: `${cat.label} Books`,
    description: `Browse our extensive collection of ${cat.label} books at KitaabCo. Premium quality, best prices, and cash on delivery across Pakistan.`,
    openGraph: {
      title: `${cat.label} Books | KitaabCo`,
      description: `Shop the best ${cat.label} in Pakistan at KitaabCo. Order via WhatsApp with Cash on Delivery.`,
    },
  };
}

export default async function CategoryPage({ params }) {
  const { category: categoryId } = await params;
  const category = categories.find(c => c.id === categoryId);

  if (!category) return <div className="container mx-auto px-4 py-20 text-center">Category not found</div>;

  return (
    <CategoryContent 
      category={category} 
      categoryId={categoryId} 
      books={books} 
    />
  );
}

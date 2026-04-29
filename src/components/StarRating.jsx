import { Star, StarHalf } from 'lucide-react';

export default function StarRating({ rating, total, size = 16 }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={size} className="fill-accent text-accent" />
        ))}
        {hasHalfStar && <StarHalf size={size} className="fill-accent text-accent" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={size} className="text-gray-300" />
        ))}
      </div>
      {total !== undefined && (
        <span className="text-xs text-gray-400 font-medium">({total})</span>
      )}
    </div>
  );
}

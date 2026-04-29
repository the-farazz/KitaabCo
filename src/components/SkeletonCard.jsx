export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-[32px] p-5 border border-slate-100 flex flex-col h-full animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-[3/4] w-full rounded-2xl bg-slate-100 mb-6" />

      {/* Content Skeleton */}
      <div className="flex flex-col flex-grow space-y-4">
        <div className="space-y-2">
          <div className="h-5 bg-slate-100 rounded-full w-4/5" />
          <div className="h-5 bg-slate-100 rounded-full w-2/3" />
        </div>
        
        <div className="h-4 bg-slate-50 rounded-full w-1/3" />

        <div className="flex justify-between py-3 border-y border-slate-50">
          <div className="h-3 bg-slate-50 rounded-full w-1/4" />
          <div className="h-3 bg-slate-50 rounded-full w-1/4" />
        </div>

        {/* Button Skeleton */}
        <div className="h-14 bg-slate-100 rounded-2xl w-full mt-auto" />
      </div>
    </div>
  );
}

'use client';

export default function SubCategoryTabs({ activeTab, onTabChange, tabs }) {
  if (!tabs) return null;

  return (
    <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar scroll-smooth">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-shrink-0 px-6 py-3 rounded-xl border transition-all duration-300 flex flex-col items-center gap-0.5 min-w-[120px] ${
              isActive 
                ? "bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-200" 
                : "bg-white border-slate-100 text-slate-500 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-widest leading-none">
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

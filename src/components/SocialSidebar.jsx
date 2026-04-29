'use client';

const SocialSidebar = () => {
  // Clean & Accurate Brand Icons
  const BrandIcons = {
    Instagram: (props) => (
      <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
    Youtube: (props) => (
      <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    Facebook: (props) => (
      <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    TikTok: (props) => (
      <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
      </svg>
    )
  };

  const socialItems = [
    { name: 'Instagram', color: 'border-[#E4405F] text-[#E4405F]', hover: 'hover:bg-[#E4405F]', icon: BrandIcons.Instagram, link: '#' },
    { name: 'TikTok', color: 'border-black text-black', hover: 'hover:bg-black', icon: BrandIcons.TikTok, link: '#' },
    { name: 'Facebook', color: 'border-[#1877F2] text-[#1877F2]', hover: 'hover:bg-[#1877F2]', icon: BrandIcons.Facebook, link: '#' },
  ];

  return (
    <div className="fixed right-6 bottom-[104px] z-[100] flex flex-col gap-4 items-center w-16">
      {socialItems.map((item, idx) => (
        <a
          key={idx}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-16 h-16 rounded-full border-2 bg-white flex items-center justify-center transition-all duration-500 shadow-2xl ${item.color} ${item.hover} hover:text-white hover:scale-110 group relative`}
        >
          <span className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 animate-ping bg-current transition-opacity`} />
          <item.icon className="relative z-10 transition-transform duration-500 group-hover:rotate-[360deg]" />
          
          <span className="absolute right-full mr-6 px-4 py-2 bg-white text-slate-900 text-[10px] font-bold uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 pointer-events-none whitespace-nowrap shadow-2xl border border-slate-100">
            {item.name}
          </span>
        </a>
      ))}
    </div>
  );
};

export default SocialSidebar;

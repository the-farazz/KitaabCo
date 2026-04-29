/**
 * KEBS - Core Data System
 */

export const categories = [
  { id: "novels",       label: "Novels",            icon: "BookText" },
  { id: "academic",     label: "Academic",          icon: "GraduationCap" },
  { id: "islamic",      label: "Islamic Books",     icon: "Scroll" },
  { id: "urdu-adab",    label: "Urdu Adab",         icon: "Feather" },
  { id: "motivational", label: "Motivational",      icon: "Compass" },
  { id: "children",     label: "Children's Books",  icon: "CloudMoon" },
  { id: "english-books",label: "English Books",     icon: "Globe" },
];

export const books = [
  {
    id: "jkp-001",
    slug: "jannat-kay-pattay",
    name: "Jannat Kay Pattay",
    title: "Jannat Kay Pattay",
    author: "Nemrah Ahmed",
    price: 1200,
    originalPrice: 1500,
    category: "novels",
    description: "A journey of faith and transformation.",
    cover: "/placeholder-book.jpg",
    inStock: true,
    onSale: true
  },
  {
    id: "isl-001",
    slug: "seerat-un-nabi",
    name: "Seerat-un-Nabi",
    title: "Seerat-un-Nabi",
    author: "Shibli Nomani",
    price: 1800,
    category: "islamic",
    description: "Comprehensive biography of the Prophet (PBUH).",
    cover: "/placeholder-book.jpg",
    inStock: true
  },
  {
    id: "mot-001",
    slug: "rich-dad-poor-dad",
    name: "Rich Dad Poor Dad",
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    price: 950,
    originalPrice: 1200,
    category: "motivational",
    description: "Financial literacy and wealth building.",
    cover: "/placeholder-book.jpg",
    inStock: true,
    onSale: true
  },
  {
    id: "aca-001",
    slug: "physics-class-10",
    name: "Physics Class 10",
    title: "Physics Class 10",
    author: "Punjab Board",
    price: 450,
    category: "academic",
    description: "Official textbook for Class 10.",
    cover: "/placeholder-book.jpg",
    inStock: true
  },
  {
    id: "eng-001",
    slug: "the-alchemist",
    name: "The Alchemist",
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 850,
    category: "english-books",
    description: "A magical story about following your dreams.",
    cover: "/placeholder-book.jpg",
    inStock: true,
    tags: ["Philosophy", "Adventure", "Best Seller"]
  }
];

export const boards = ["Punjab Board", "Sindh Board", "Federal Board", "KPK Board"];
export const classes = ["1","2","3","4","5","6","7","8","9","10","11","12"];
export const cities = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Peshawar", "Quetta", "Multan", "Other"];

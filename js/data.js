// Mock Database for Stackly Estates

const AGENTS = [
  {
    id: 1,
    name: "Vikram Malhotra",
    designation: "Principal Luxury Broker",
    experience: "12 Years",
    sold: 148,
    rating: 4.9,
    image: "images/agents/agent-1.jpg",
    phone: "+91 98765 43210",
    email: "vikram@stacklyestates.com"
  },
  {
    id: 2,
    name: "Aanya Sen",
    designation: "Executive Real Estate Advisor",
    experience: "8 Years",
    sold: 92,
    rating: 4.8,
    image: "images/agents/agent-2.jpg",
    phone: "+91 98765 43211",
    email: "aanya@stacklyestates.com"
  },
  {
    id: 3,
    name: "Rajesh Kulkarni",
    designation: "Commercial Portfolio Specialist",
    experience: "15 Years",
    sold: 210,
    rating: 4.95,
    image: "images/agents/agent-3.jpg",
    phone: "+91 98765 43212",
    email: "rajesh@stacklyestates.com"
  },
  {
    id: 4,
    name: "Meera Nair",
    designation: "Residential Investment Expert",
    experience: "6 Years",
    sold: 54,
    rating: 4.7,
    image: "images/agents/agent-4.jpg",
    phone: "+91 98765 43213",
    email: "meera@stacklyestates.com"
  }
];

const PROPERTIES = [
  {
    id: 1,
    title: "The Golden Crest Villa",
    type: "Villas",
    price: "$4,850,000",
    priceRaw: 4850000,
    city: "Hyderabad",
    address: "Jubilee Hills, Hyderabad, Telangana",
    beds: 5,
    baths: 6,
    area: 7200,
    parking: 3,
    image: "images/properties/villa-1.jpg",
    description: "An architectural masterpiece in the ultra-luxury enclave of Jubilee Hills. This palatial estate features double-height ceilings, a private infinity pool overlooking the city skyline, a temperature-controlled wine cellar, and integrated smart-home automation.",
    featured: true,
    amenities: ["Swimming Pool", "Private Gym", "Home Theater", "24/7 Security", "Wine Cellar", "Smart Home"],
    agentId: 1
  },
  {
    id: 2,
    title: "Skyline Premium Penthouse",
    type: "Apartments",
    price: "$2,950,000",
    priceRaw: 2950000,
    city: "Mumbai",
    address: "Worli, Mumbai, Maharashtra",
    beds: 4,
    baths: 5,
    area: 4500,
    parking: 2,
    image: "images/properties/apt-1.jpg",
    description: "Suspended above the Arabian Sea, this magnificent penthouse provides panoramic views of the Bandra-Worli Sea Link. Features custom Italian marble flooring, high-end chef's kitchen, and direct private elevator entry.",
    featured: true,
    amenities: ["Sea View", "Concierge Service", "Smart Home", "Swimming Pool", "High Ceilings", "Private Elevator"],
    agentId: 2
  },
  {
    id: 3,
    title: "Elysian Farm Estate",
    type: "Farm Houses",
    price: "$6,200,000",
    priceRaw: 6200000,
    city: "Delhi",
    address: "Chhatarpur Farms, New Delhi, Delhi",
    beds: 6,
    baths: 7,
    area: 12500,
    parking: 6,
    image: "images/properties/farm-1.jpg",
    description: "Spreading across two acres of lush manicured landscaping, this farmhouse offers ultimate privacy. Includes a private tennis court, detached guest house, sprawling wrap-around verandas, and organic fruit orchards.",
    featured: true,
    amenities: ["Sprawling Lawn", "Tennis Court", "Guest House", "24/7 Security", "Fireplace", "Water Body"],
    agentId: 3
  },
  {
    id: 4,
    title: "Alpha Tech Commercial HQ",
    type: "Commercial",
    price: "$11,500,000",
    priceRaw: 11500000,
    city: "Bengaluru",
    address: "Outer Ring Road, Bengaluru, Karnataka",
    beds: 0,
    baths: 12,
    area: 32000,
    parking: 15,
    image: "images/properties/comm-1.jpg",
    description: "A state-of-the-art corporate headquarters building built to absolute Grade-A specifications. Offers high efficiency open-plan layouts, multi-tier safety standards, and sustainable LEED Gold certified design.",
    featured: false,
    amenities: ["LEED Certified", "Fibre Connectivity", "Cafeteria", "Ample Parking", "Central AC", "Power Backup"],
    agentId: 3
  },
  {
    id: 5,
    title: "Infinity Bay Retreat",
    type: "Luxury Homes",
    price: "$3,650,000",
    priceRaw: 3650000,
    city: "Chennai",
    address: "ECR, Chennai, Tamil Nadu",
    beds: 4,
    baths: 4,
    area: 5800,
    parking: 2,
    image: "images/properties/villa-2.jpg",
    description: "A modern beachside sanctuary capturing cool sea breezes and serene sunrises. Featuring floor-to-ceiling glass walls, wrap-around pool decking, and high-quality premium fittings throughout.",
    featured: true,
    amenities: ["Beach Access", "Infinity Pool", "Private Deck", "Solar Power", "24/7 Security"],
    agentId: 4
  },
  {
    id: 6,
    title: "Apex Corporate Suite",
    type: "Office Spaces",
    price: "$1,850,000",
    priceRaw: 1850000,
    city: "Pune",
    address: "Kharadi, Pune, Maharashtra",
    beds: 0,
    baths: 4,
    area: 6400,
    parking: 4,
    image: "images/properties/office-1.jpg",
    description: "An elegant, ready-to-move-in corporate office suite designed for modern startups or consulting firms. Fully plug-and-play with ergonomic conference rooms, glass cabins, and a pantry.",
    featured: false,
    amenities: ["Plug & Play", "High Speed Internet", "Executive Lounge", "24/7 Access"],
    agentId: 2
  },
  {
    id: 7,
    title: "The Regal Manor",
    type: "Independent Houses",
    price: "$2,200,000",
    priceRaw: 2200000,
    city: "Pune",
    address: "Koregaon Park, Pune, Maharashtra",
    beds: 4,
    baths: 4,
    area: 4800,
    parking: 2,
    image: "images/properties/house-1.jpg",
    description: "A classical colonial-style mansion nestling in Pune's most leafiest neighborhood. Combining old-world charm with modern enhancements like thermal insulation and updated plumbing.",
    featured: false,
    amenities: ["Private Garden", "Servant Quarter", "High Ceilings", "Teak Flooring"],
    agentId: 1
  },
  {
    id: 8,
    title: "Heritage Acres Development Plot",
    type: "Plots",
    price: "$1,450,000",
    priceRaw: 1450000,
    city: "Hyderabad",
    address: "Gachibowli Extension, Hyderabad, Telangana",
    beds: 0,
    baths: 0,
    area: 15000,
    parking: 0,
    image: "images/properties/plot-1.jpg",
    description: "A premium corner plot ideal for bespoke villa construction or high-end residential development. Strategically positioned with close accessibility to international schools and the Financial District.",
    featured: false,
    amenities: ["Corner Plot", "Road Facing", "Gated Community", "Clear Title"],
    agentId: 3
  },
  {
    id: 9,
    title: "The Obsidian Glass Mansion",
    type: "Villas",
    price: "$7,900,000",
    priceRaw: 7900000,
    city: "Delhi",
    address: "Vasant Vihar, New Delhi, Delhi",
    beds: 6,
    baths: 8,
    area: 11000,
    parking: 5,
    image: "images/properties/villa-3.jpg",
    description: "A striking minimalist villa featuring black structural steel and expansive smart glass panes. Incorporates an indoor climate-controlled pool, private elevator, automated home theater, and an observation deck.",
    featured: true,
    amenities: ["Indoor Pool", "Observation Deck", "Smart Glass", "Home Theater", "Private Elevator"],
    agentId: 1
  }
];

const BLOGS = [
  {
    id: 1,
    title: "How to Build a Diverse Real Estate Portfolio in India",
    category: "Investment",
    date: "July 12, 2026",
    summary: "Exploring the dynamic growth metrics of Indian high-end real estate, assessing residential vs commercial developments for high returns.",
    image: "images/blogs/blog-1.jpg",
    author: "Rajesh Kulkarni"
  },
  {
    id: 2,
    title: "Designing the Ultimate Smart Home: Trends for 2026",
    category: "Design",
    date: "June 28, 2026",
    summary: "From glass walls that adapt to outside lighting to touchless environments, discover the luxury tech changing modern lifestyles.",
    image: "images/blogs/blog-2.jpg",
    author: "Aanya Sen"
  },
  {
    id: 3,
    title: "Evaluating Legal Feasibility When Buying Plots",
    category: "Tips",
    date: "May 15, 2026",
    summary: "Avoid zoning and title-ownership pitfalls. A comprehensive legal checklist curated by our leading compliance advisors.",
    image: "images/blogs/blog-3.jpg",
    author: "Vikram Malhotra"
  }
];

// Helper Functions for Wishlist & Compare
const getWishlist = () => {
  return JSON.parse(localStorage.getItem('stackly_wishlist') || '[]');
};

const toggleWishlist = (id) => {
  let list = getWishlist();
  const index = list.indexOf(id);
  if (index === -1) {
    list.push(id);
  } else {
    list.splice(index, 1);
  }
  localStorage.setItem('stackly_wishlist', JSON.stringify(list));
  return list.includes(id);
};

const getCompareList = () => {
  return JSON.parse(localStorage.getItem('stackly_compare') || '[]');
};

const toggleCompareList = (id) => {
  let list = getCompareList();
  const index = list.indexOf(id);
  if (index === -1) {
    if (list.length >= 4) {
      alert("You can compare up to 4 properties at a time.");
      return false;
    }
    list.push(id);
  } else {
    list.splice(index, 1);
  }
  localStorage.setItem('stackly_compare', JSON.stringify(list));
  return list.includes(id);
};

// Global Routing Helper to satisfy button destination requirements
const setupGlobalRouting = () => {
  document.addEventListener('click', (e) => {
    // Intercept clicks on links/buttons
    const target = e.target.closest('a, button');
    if (!target) return;
    
    // Redirect all footer links to 404.html
    if (target.closest('footer') && target.tagName.toLowerCase() === 'a') {
      e.preventDefault();
      window.location.href = '404.html';
      return;
    }
    
    const text = target.innerText ? target.innerText.trim().toLowerCase() : '';
    const href = target.getAttribute('href');

    // Allow core page navbar links to route normally without interception
    if (href && ['index.html', 'about.html', 'properties.html', 'blog.html', 'contact.html'].includes(href)) {
      return;
    }
    // "Get Started" -> create-account.html
    if (text === 'get started') {
      e.preventDefault();
      window.location.href = 'create-account.html';
      return;
    }
    
    // "Login" -> login.html
    if (text === 'login') {
      e.preventDefault();
      window.location.href = 'login.html';
      return;
    }
    
    // "Logout" -> login.html
    if (text === 'logout') {
      e.preventDefault();
      window.location.href = 'login.html';
      return;
    }
    
    // "Back to Home" -> index.html
    if (text === 'back to home') {
      e.preventDefault();
      window.location.href = 'index.html';
      return;
    }
    
    // Check if the element has explicit redirections in code or matches the 404 block-list:
    const blockList = ['view details', 'contact agent', 'book visit', 'read more', 'explore', 'learn more', 'search', 'schedule visit'];
    if (blockList.some(term => text.includes(term))) {
      e.preventDefault();
      window.location.href = '404.html';
      return;
    }
    
    // If it's a 404 placeholder href
    if (href === '404.html') {
      e.preventDefault();
      window.location.href = '404.html';
    }
  });
};

// ===== PLACES DATA =====
export const PLACES = [
  { id: 1, name: "MTR Restaurant", category: "Food", emoji: "🍛", desc: "Iconic South Indian breakfast spot since 1924. Famous for rava idli and filter coffee.", rating: 4.7, price: "₹₹", safety: "high", lat: 12.9716, lng: 77.5946, tags: ["Breakfast", "Iconic", "Vegetarian"], reviews: [{ user: "Priya R.", text: "Best masala dosa in Bangalore, hands down!" },{ user: "Rahul M.", text: "Must visit! The filter coffee is divine." }], scores: { rating: 4.7, safety: 9.2, value: 8.5 } },
  { id: 2, name: "Toit Brewpub", category: "Food", emoji: "🍺", desc: "Craft beer haven with excellent wood-fired pizzas. Koramangala's favorite hangout.", rating: 4.5, price: "₹₹₹", safety: "high", lat: 12.9352, lng: 77.6245, tags: ["Craft Beer", "Pizza", "Nightlife"], reviews: [{ user: "Ananya S.", text: "Amazing ambience and the beers are top notch!" },{ user: "Vikram L.", text: "Go for the Windmills Wit!" }], scores: { rating: 4.5, safety: 8.8, value: 7.2 } },
  { id: 3, name: "Cubbon Park", category: "Landmark", emoji: "🌳", desc: "A lush 300-acre green lung in the heart of Bangalore. Perfect for morning jogs and picnics.", rating: 4.6, price: "Free", safety: "high", lat: 12.9763, lng: 77.5929, tags: ["Park", "Nature", "Family"], reviews: [{ user: "Meera K.", text: "Beautiful park! Very peaceful on weekday mornings." },{ user: "Suresh P.", text: "Great place for jogging. Well maintained." }], scores: { rating: 4.6, safety: 9.5, value: 9.8 } },
  { id: 4, name: "The Ritz-Carlton", category: "Hotel", emoji: "🏨", desc: "5-star luxury in the heart of the city with stunning skyline views and world-class dining.", rating: 4.8, price: "₹₹₹₹₹", safety: "high", lat: 12.9715, lng: 77.5945, tags: ["Luxury", "5-Star", "Spa"], reviews: [{ user: "Anjali T.", text: "Absolutely world class. The breakfast buffet is incredible." }], scores: { rating: 4.8, safety: 9.9, value: 5.5 } },
  { id: 5, name: "Vidhan Soudha", category: "Landmark", emoji: "🏛️", desc: "The magnificent state legislature building, a masterpiece of neo-Dravidian architecture built in 1956.", rating: 4.4, price: "Free", safety: "high", lat: 12.9793, lng: 77.5906, tags: ["Heritage", "Architecture", "History"], reviews: [{ user: "Kumar V.", text: "Majestic building! Great for photography." }], scores: { rating: 4.4, safety: 9.0, value: 9.5 } },
  { id: 6, name: "Church Street Social", category: "Food", emoji: "🍹", desc: "Vibrant cafe-bar with eclectic food menu, cocktails, and a great mix of young Bangaloreans.", rating: 4.3, price: "₹₹₹", safety: "high", lat: 12.9719, lng: 77.6094, tags: ["Cafe", "Bar", "Social"], reviews: [{ user: "Nisha A.", text: "Love the vibes and the cocktail menu!" }], scores: { rating: 4.3, safety: 8.5, value: 7.0 } },
  { id: 7, name: "Lalbagh Botanical Garden", category: "Landmark", emoji: "🌸", desc: "240-acre botanical garden home to 1,000+ plant species and a stunning glass house.", rating: 4.7, price: "₹10", safety: "high", lat: 12.9507, lng: 77.5848, tags: ["Botanical", "Heritage", "Nature"], reviews: [{ user: "Deepa R.", text: "Beautiful during flower shows. A must visit!" },{ user: "Arjun S.", text: "Great morning walk spot." }], scores: { rating: 4.7, safety: 9.3, value: 9.6 } },
  { id: 8, name: "Koramangala Street Food", category: "Food", emoji: "🌮", desc: "Bustling street food zone near 80 Feet Road with pani puri, rolls, and regional snacks.", rating: 4.1, price: "₹", safety: "mid", lat: 12.9352, lng: 77.6244, tags: ["Street Food", "Budget", "Snacks"], reviews: [{ user: "Rohan M.", text: "Budget foodie paradise!" }], scores: { rating: 4.1, safety: 6.5, value: 9.2 } },
  { id: 9, name: "Taj West End", category: "Hotel", emoji: "🌴", desc: "Heritage hotel set in 20 acres of tropical gardens. Colonial charm meets modern luxury.", rating: 4.9, price: "₹₹₹₹₹", safety: "high", lat: 12.9766, lng: 77.5713, tags: ["Heritage", "Luxury", "Garden"], reviews: [{ user: "Smitha C.", text: "Gorgeous property. The gardens are breathtaking." }], scores: { rating: 4.9, safety: 9.8, value: 5.0 } },
  { id: 10, name: "MG Road", category: "Landmark", emoji: "🛍️", desc: "Bangalore's iconic commercial street, lined with shops, restaurants, and the famous metro station.", rating: 3.8, price: "Varies", safety: "mid", lat: 12.9757, lng: 77.6099, tags: ["Shopping", "Metro", "Central"], reviews: [{ user: "Tanya B.", text: "Great shopping but gets very crowded on weekends." }], scores: { rating: 3.8, safety: 7.0, value: 7.5 } },
  { id: 11, name: "Truffles", category: "Food", emoji: "🍔", desc: "Legendary burger joint in Koramangala. Long queues, big portions, bigger flavors.", rating: 4.6, price: "₹₹", safety: "high", lat: 12.9355, lng: 77.6248, tags: ["Burgers", "Comfort Food", "Popular"], reviews: [{ user: "Kiran J.", text: "Best burgers in the city!" },{ user: "Pooja N.", text: "The cheese burst burger is legendary." }], scores: { rating: 4.6, safety: 8.7, value: 8.3 } },
  { id: 12, name: "ISKCON Temple", category: "Culture", emoji: "🛕", desc: "A grand Krishna temple complex with stunning architecture, spiritual programs, and a large prasad hall.", rating: 4.8, price: "Free", safety: "high", lat: 13.0095, lng: 77.5510, tags: ["Temple", "Spiritual", "Heritage"], reviews: [{ user: "Lakshmi R.", text: "Very peaceful and well maintained. Must visit!" }], scores: { rating: 4.8, safety: 9.7, value: 9.5 } },
  { id: 13, name: "UB City Mall", category: "Landmark", emoji: "🏢", desc: "Bangalore's luxury shopping hub with high-end brands, fine dining, and rooftop events.", rating: 4.2, price: "₹₹₹₹", safety: "high", lat: 12.9719, lng: 77.5946, tags: ["Shopping", "Luxury", "Dining"], reviews: [{ user: "Aditi M.", text: "Great mall for luxury brands. Love the rooftop." }], scores: { rating: 4.2, safety: 9.1, value: 5.8 } },
  { id: 14, name: "Saavn's Natural Ice Cream", category: "Food", emoji: "🍦", desc: "Famous for unique flavors like tender coconut, jackfruit, and custard apple. Indiranagar gem.", rating: 4.5, price: "₹", safety: "high", lat: 12.9784, lng: 77.6408, tags: ["Dessert", "Budget", "Unique"], reviews: [{ user: "Ritu P.", text: "Tender coconut ice cream is to die for!" }], scores: { rating: 4.5, safety: 8.9, value: 9.4 } },
  { id: 15, name: "Whitefield", category: "Landmark", emoji: "🏙️", desc: "The tech corridor of Bangalore, home to major IT parks, malls, and a booming expat community.", rating: 3.5, price: "Varies", safety: "mid", lat: 12.9698, lng: 77.7500, tags: ["Tech Hub", "IT Parks", "Expat"], reviews: [{ user: "Sam T.", text: "Traffic is a nightmare but has good restaurants." }], scores: { rating: 3.5, safety: 7.2, value: 7.0 } },
  { id: 16, name: "Indiranagar 100 Feet Road", category: "Food", emoji: "🎉", desc: "Bangalore's best nightlife street with rooftop bars, brewpubs, and international cuisine.", rating: 4.4, price: "₹₹₹", safety: "high", lat: 12.9784, lng: 77.6408, tags: ["Nightlife", "Bars", "Dining"], reviews: [{ user: "Sanjay V.", text: "Best street in Bangalore for nightlife!" }], scores: { rating: 4.4, safety: 8.6, value: 7.3 } },
  { id: 17, name: "Tipu Sultan's Summer Palace", category: "Culture", emoji: "🏯", desc: "A stunning 18th-century wooden palace with intricate carvings, once the summer retreat of Tipu Sultan.", rating: 4.3, price: "₹15", safety: "high", lat: 12.9595, lng: 77.5736, tags: ["History", "Heritage", "Palace"], reviews: [{ user: "Harish K.", text: "Incredible piece of history. Very underrated." }], scores: { rating: 4.3, safety: 8.8, value: 9.7 } },
  { id: 18, name: "Budget Biryani Corner", category: "Food", emoji: "🍚", desc: "Hole-in-the-wall biryani joint near Shivajinagar known for authentic Lucknawi biryani at pocket prices.", rating: 4.2, price: "₹", safety: "mid", lat: 12.9849, lng: 77.6090, tags: ["Biryani", "Budget", "Authentic"], reviews: [{ user: "Faisal A.", text: "Best biryani under ₹200 in the city!" }], scores: { rating: 4.2, safety: 7.0, value: 9.8 } },
];

// ===== SAFETY REPORTS =====
export const SAFETY_REPORTS = [
  { id: 1, type: "accident", icon: "🚗", title: "Minor accident at MG Road junction", desc: "Two-wheeler collided with auto. Traffic affected for ~30 mins. Avoid the inner road.", location: "MG Road Junction", time: "2 hours ago", status: "Verified", votes: 47, category: "accident" },
  { id: 2, type: "unsafe", icon: "⚠️", title: "Poor street lighting in Ejipura", desc: "Multiple lights out on main stretch. Area feels unsafe after 9PM. Please report to BESCOM.", location: "Ejipura Main Road", time: "5 hours ago", status: "Under Review", votes: 32, category: "unsafe" },
  { id: 3, type: "pothole", icon: "🕳️", title: "Large pothole on Sarjapur Road", desc: "Dangerous pothole near Domino's outlet. Several two-wheelers have skidded. Immediate repair needed.", location: "Sarjapur Road, near Bellandur", time: "Yesterday", status: "Reported to BBMP", votes: 89, category: "pothole" },
  { id: 4, type: "flooding", icon: "🌊", title: "Waterlogging near Silk Board flyover", desc: "After 30 min of rain, the underpass floods to knee level. Avoid during rains.", location: "Silk Board Flyover", time: "3 days ago", status: "Chronic Issue", votes: 124, category: "flooding" },
  { id: 5, type: "event", icon: "🎪", title: "Bangalore Marathon - Route Closures", desc: "Several main roads closed on Sunday morning from 5AM to 11AM for the marathon.", location: "Cubbon Park to M.G. Road", time: "Just now", status: "Upcoming", votes: 15, category: "event" },
  { id: 6, type: "cleanliness", icon: "🧹", title: "Garbage pile-up near HSR Layout BDA complex", desc: "Garbage collection missed for 3 days. Large pile forming near main entrance.", location: "HSR Layout, Sector 2", time: "1 day ago", status: "Reported to BBMP", votes: 41, category: "cleanliness" },
];

// ===== TRAFFIC DATA =====
export const TRAFFIC_DATA = [
  { road: "Outer Ring Road", detail: "Heavy congestion between Marathahalli and KR Puram. 45-min delay.", severity: "high" },
  { road: "MG Road", detail: "Minor accident near Trinity Circle. Expect 15-min delays.", severity: "med" },
  { road: "Bannerghatta Road", detail: "Normal flow with minor slowdown near Dairy Circle.", severity: "med" },
  { road: "Old Madras Road", detail: "Traffic moving freely. Good conditions.", severity: "low" },
  { road: "Tumkur Road", detail: "Construction work causing 20-min delay near Peenya.", severity: "high" },
];

// ===== SOCIAL FEED =====
export const SOCIAL_FEED = [
  { user: "@roaming_bengaluru", text: "Cubbon Park at 6AM is pure magic 🌳 The mist, the birds... city life at its finest! #BangaloreLife", time: "12 min ago", likes: 124, type: "🐦" },
  { user: "@foodie_blr_tales", text: "Just discovered a tiny South Indian restaurant in Malleswaram. Life-changing filter coffee ☕ The idli was so soft!", time: "28 min ago", likes: 87, type: "📸" },
  { user: "@bangalore_alerts", text: "⚠️ ALERT: Waterlogging reported near Silk Board Junction. Please avoid if possible. Stay safe Bengaluru!", time: "1 hr ago", likes: 312, type: "🚨" },
  { user: "@tech_park_life", text: "Anyone else notice how the traffic on ORR is actually moving today? Who are these people and what did they do with Bengaluru? 😂", time: "2 hrs ago", likes: 543, type: "😂" },
];

// ===== NEWS DATA =====
export const NEWS_DATA = [
  { title: "Bengaluru Metro Phase 3 gets central approval — 44 new stations planned", time: "Today, 9:30 AM", cat: "Infrastructure" },
  { title: "BBMP launches 24x7 pothole helpline amid monsoon season", time: "Today, 8:15 AM", cat: "Civic" },
  { title: "Bengaluru ranked India's top tech startup hub for 5th consecutive year", time: "Yesterday", cat: "Business" },
  { title: "Lalbagh flower show draws record 4 lakh visitors this season", time: "Yesterday", cat: "Events" },
  { title: "State govt announces new electric bus fleet for BMTC by December", time: "2 days ago", cat: "Transport" },
];

// ===== HERITAGE TRAILS =====
export const HERITAGE_TRAILS = [
  { name: "Old City Heritage Walk", difficulty: "easy", distance: "3.2 km", duration: "2.5 hrs", stops: ["Tipu Sultan's Palace", "Jumma Masjid", "Krishnarajendra Market (KR Market)", "Bull Temple Road"] },
  { name: "Cantonment & Colonial Trail", difficulty: "easy", distance: "4.0 km", duration: "3 hrs", stops: ["St. Mark's Cathedral", "Cubbon Park", "Government Museum", "Seshadri Iyer Memorial Hall"] },
  { name: "Garden City Circuit", difficulty: "medium", distance: "6.5 km", duration: "4 hrs", stops: ["Lalbagh Botanical Garden", "Glass House", "Shivajinagar Market", "Cariappa Park"] },
  { name: "Tech & Transition Trail", difficulty: "medium", distance: "5.0 km", duration: "3.5 hrs", stops: ["UB City", "Vittal Mallya Road", "MG Road Metro", "Church Street", "Brigade Road"] },
];

// ===== HISTORICAL LANDMARKS =====
export const LANDMARKS = [
  { emoji: "🏯", name: "Bangalore Fort", era: "16th Century", desc: "Mud fort built by Kempe Gowda I in 1537, later rebuilt in stone by Hyder Ali." },
  { emoji: "🏛️", name: "Vidhana Soudha", era: "1956", desc: "Neo-Dravidian granite masterpiece housing the State Legislature." },
  { emoji: "🌳", name: "Lalbagh", era: "18th Century", desc: "Designed by Hyder Ali in 1760, expanded by Tipu Sultan with plants from worldwide." },
  { emoji: "⛪", name: "St. Mary's Basilica", era: "1882", desc: "The oldest church in Bengaluru, a beautiful Gothic structure in Shivajinagar." },
  { emoji: "🎨", name: "Karnataka Chitrakala Parishath", era: "1960", desc: "Premier art institution showcasing classical and contemporary Indian art forms." },
  { emoji: "⚙️", name: "Sir M. Visvesvaraya Museum", era: "1962", desc: "Dedicated to India's greatest engineer, with exhibits on science and technology." },
];

// ===== TRADITIONS =====
export const TRADITIONS = [
  { emoji: "🎆", name: "Karaga Festival", when: "March - April", desc: "One of Bengaluru's oldest festivals celebrating the goddess Draupadi with a spectacular fire-walk procession through Pete area." },
  { emoji: "🌺", name: "Kadalekai Parishe", when: "November", desc: "The groundnut fair held annually near Bull Temple where farmers offer the season's first harvest." },
  { emoji: "🎭", name: "Bengaluru Habba", when: "December", desc: "A city-wide cultural festival celebrating music, dance, theater, and art across multiple venues." },
  { emoji: "🥁", name: "Mysore Dasara", when: "October", desc: "The grand 10-day festival celebrated with royal processions, music, and cultural performances." },
  { emoji: "🏮", name: "Deepotsava", when: "Diwali", desc: "Massive lamp-lighting ceremony at temples across the city, creating a magical golden glow." },
];

// ===== MAP POINTS =====
export const MAP_POINTS = [
  ...PLACES.map(p => ({ ...p, markerType: p.category === 'Food' ? 'food' : p.category === 'Hotel' ? 'hotel' : 'landmark' })),
  { id: 100, name: "Koramangala Safe Zone", category: "safety", emoji: "🟢", safetyLevel: "safe", lat: 12.9352, lng: 77.6245, desc: "Well-lit area with active community patrolling." },
  { id: 101, name: "Silk Board Junction", category: "safety", emoji: "🟡", safetyLevel: "caution", lat: 12.9175, lng: 77.6229, desc: "Flooding risk during monsoons. Use caution at night." },
  { id: 102, name: "Shivajinagar Night Zone", category: "safety", emoji: "🟠", safetyLevel: "caution", lat: 12.9849, lng: 77.6090, desc: "Moderate safety. Avoid isolated lanes after 11PM." },
  { id: 103, name: "Indiranagar 100ft Road", category: "safety", emoji: "🟢", safetyLevel: "safe", lat: 12.9784, lng: 77.6408, desc: "High police visibility. Active CCTV coverage." },
];

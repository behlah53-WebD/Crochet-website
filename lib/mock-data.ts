import { Product, Category, Coupon, BlogPost, Review, CustomOrderRequest, Order } from "@/types";

export const MOCK_CATEGORIES: Category[] = [
  {
    _id: "cat-1",
    name: "Crochet Bags",
    slug: "crochet-bags",
    description: "Whimsical totes, shoulder bags, and pearl-accented clutches handcrafted from plush cotton.",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop",
    icon: "ShoppingBag",
    displayOrder: 1,
    itemCount: 4,
  },
  {
    _id: "cat-2",
    name: "Flower Bouquets",
    slug: "flower-bouquets",
    description: "Forever-blooming handmade flowers, tulips, daisies, and lavender stems that never wilt.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop",
    icon: "Flower2",
    displayOrder: 2,
    itemCount: 3,
  },
  {
    _id: "cat-3",
    name: "Amigurumi & Plushies",
    slug: "amigurumi-plushies",
    description: "Lovingly stitched cuddly companions, cloud bunnies, strawberry bears, and nursery keepsakes.",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=800&auto=format&fit=crop",
    icon: "Smile",
    displayOrder: 3,
    itemCount: 3,
  },
  {
    _id: "cat-4",
    name: "Keychains & Charms",
    slug: "keychains-charms",
    description: "Dainty bag charms, mini strawberry puffs, and floral pendants woven with metallic hardware.",
    image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?q=80&w=800&auto=format&fit=crop",
    icon: "KeyRound",
    displayOrder: 4,
    itemCount: 2,
  },
  {
    _id: "cat-5",
    name: "Home & Living",
    slug: "home-living",
    description: "Textured mug cosies, floral lace coasters, heirloom baskets, and warm pastel cushions.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop",
    icon: "Home",
    displayOrder: 5,
    itemCount: 2,
  },
  {
    _id: "cat-6",
    name: "Gifts Under ₹999",
    slug: "gifts-under-999",
    description: "Budget-friendly handcrafted treasures, wrapped in our signature blush ribbon.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
    icon: "Gift",
    displayOrder: 6,
    itemCount: 4,
  },
  {
    _id: "cat-7",
    name: "Custom Creations",
    slug: "custom-creations",
    description: "Bespoke pieces crafted exclusively to your chosen palette, dimensions, and monogram.",
    image: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=800&auto=format&fit=crop",
    icon: "Sparkles",
    displayOrder: 7,
    itemCount: 2,
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    _id: "prod-1",
    title: "Blush Bloom Pearl Handbag",
    slug: "blush-bloom-pearl-handbag",
    description: "Inspired by gentle Parisian mornings, the Blush Bloom Handbag is crafted from triple-ply chunky milk cotton yarn with exquisite faux-pearl handle detailing. Featuring structured shell stitches, an inner organic cotton lining, and a signature gold-plated heart charm, this statement accessory effortlessly elevates daytime brunches and evening celebrations alike.",
    shortDescription: "Chunky milk-cotton handbag with hand-strung faux pearl strap and gold heart charm.",
    price: 2499,
    compareAtPrice: 2999,
    category: "crochet-bags",
    categoryName: "Crochet Bags",
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=800&auto=format&fit=crop"
    ],
    variants: [
      { name: "Blush Pink", colorHex: "#EFC8D1", size: "Standard", priceModifier: 0, stock: 8 },
      { name: "Powder Ivory", colorHex: "#FFF9F4", size: "Standard", priceModifier: 0, stock: 5 },
      { name: "Soft Lilac", colorHex: "#D9C9DD", size: "Standard", priceModifier: 150, stock: 4 }
    ],
    stock: 17,
    tags: ["Bestseller", "Handbag", "Pearl Accent", "Romantic"],
    dimensions: "22cm (W) x 18cm (H) x 7cm (D)",
    materials: "100% Premium Milk Cotton, Faux Glass Pearls, Gold-plated Brass Alloy",
    careInstructions: "Spot clean gently with cold water and mild detergent. Do not wring or tumble dry.",
    isFeatured: true,
    isBestSeller: true,
    isMadeToOrder: false,
    productionDays: 2,
    rating: 4.9,
    reviewCount: 38,
    weight: "380g",
    createdAt: "2024-01-15T00:00:00.000Z"
  },
  {
    _id: "prod-2",
    title: "Daisy Daydream Shoulder Tote",
    slug: "daisy-daydream-shoulder-tote",
    description: "Embrace everyday romance with our Daisy Daydream Tote. Woven from breathable cotton yarn with fifteen interlocking granny squares featuring sunny ivory petals and a buttery yellow center. Sturdy reinforced double shoulder straps ensure comfortable wear for farmer's markets, library runs, or seaside strolls.",
    shortDescription: "Vintage-inspired daisy granny square tote bag with reinforced handles.",
    price: 1899,
    compareAtPrice: 2299,
    category: "crochet-bags",
    categoryName: "Crochet Bags",
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop"
    ],
    variants: [
      { name: "Sage Garden", colorHex: "#D1E2D3", size: "Medium", priceModifier: 0, stock: 6 },
      { name: "Warm Cream", colorHex: "#F3EADF", size: "Medium", priceModifier: 0, stock: 9 },
      { name: "Dusty Lavender", colorHex: "#D9C9DD", size: "Medium", priceModifier: 0, stock: 4 }
    ],
    stock: 19,
    tags: ["Tote", "Granny Square", "Floral", "Summer"],
    dimensions: "34cm (W) x 36cm (H) (Strap drop: 28cm)",
    materials: "100% Combed Cotton Yarn",
    careInstructions: "Hand wash in cool water; reshape gently and dry flat in shade.",
    isFeatured: true,
    isBestSeller: true,
    isMadeToOrder: true,
    productionDays: 4,
    rating: 4.8,
    reviewCount: 24,
    weight: "320g",
    createdAt: "2024-01-20T00:00:00.000Z"
  },
  {
    _id: "prod-3",
    title: "Forever Lavender Love Bouquet",
    slug: "forever-lavender-love-bouquet",
    description: "An enchanting bouquet of handcrafted crochet blooms that remain radiant forever. Includes 4 scented English lavender sprigs, 2 blush English roses, 1 baby's breath stem, and 2 eucalyptus fronds, all individually wired and wrapped in textured kraft paper with dusty rose satin ribbon.",
    shortDescription: "Hand-knitted botanical bouquet wrapped in luxury gift paper with satin ribbon.",
    price: 1499,
    compareAtPrice: 1799,
    category: "flower-bouquets",
    categoryName: "Flower Bouquets",
    images: [
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop"
    ],
    variants: [
      { name: "Lavender Dream", colorHex: "#D9C9DD", stock: 12 },
      { name: "Blush Meadow", colorHex: "#EFC8D1", stock: 10 }
    ],
    stock: 22,
    tags: ["Gift", "Bouquet", "Flowers", "Keepsake"],
    dimensions: "40cm (H) x 25cm (Spread)",
    materials: "Fine Acrylic & Milk Cotton Blend, Florist Wire, Satin Ribbon",
    careInstructions: "Dust lightly with a soft brush or hair dryer on cool setting.",
    isFeatured: true,
    isBestSeller: true,
    isMadeToOrder: false,
    productionDays: 2,
    rating: 5.0,
    reviewCount: 42,
    weight: "260g",
    createdAt: "2024-02-01T00:00:00.000Z"
  },
  {
    _id: "prod-4",
    title: "Cloud Bunny Amigurumi Plushie",
    slug: "cloud-bunny-amigurumi-plushie",
    description: "Meet Pip, the Cloud Bunny! Hand-stitched with ultra-soft baby velvet chenille yarn, safe embroidered eyes, and rosy crocheted cheeks. Pip wears a delicate removable crochet pinafore dress with tiny wooden buttons. Designed to bring comfort, warmth, and nostalgia to nurseries and collectors.",
    shortDescription: "Heirloom velvet amigurumi rabbit with removable handmade pinafore dress.",
    price: 1299,
    compareAtPrice: 1599,
    category: "amigurumi-plushies",
    categoryName: "Amigurumi & Plushies",
    images: [
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop"
    ],
    variants: [
      { name: "Butter Cream", colorHex: "#FFF9F4", stock: 7 },
      { name: "Blush Petal", colorHex: "#F8E9EC", stock: 8 },
      { name: "Misty Grey", colorHex: "#E3DCE7", stock: 5 }
    ],
    stock: 20,
    tags: ["Amigurumi", "Plushie", "Baby Safe", "Nursery"],
    dimensions: "24cm (H) seated, 32cm full length",
    materials: "Hypoallergenic Velvet Chenille Yarn, Polyfill stuffing, Natural Beechwood buttons",
    careInstructions: "Spot clean with damp cloth. Air dry away from direct sun.",
    isFeatured: true,
    isBestSeller: false,
    isMadeToOrder: false,
    productionDays: 3,
    rating: 4.9,
    reviewCount: 19,
    weight: "210g",
    createdAt: "2024-02-10T00:00:00.000Z"
  },
  {
    _id: "prod-5",
    title: "Strawberry Puff Bag Charm & Keychain",
    slug: "strawberry-puff-bag-charm",
    description: "A delightful bite-sized accessory! Hand-stitched ripe strawberry with textured golden seeds, verdant leaves, and a tiny blossoming white flower. Fitted with an antique gold lobster clasp and key ring, making it the sweetest addition to bags, keys, or journals.",
    shortDescription: "Miniature 3D crochet strawberry charm with antique gold hardware.",
    price: 449,
    compareAtPrice: 599,
    category: "keychains-charms",
    categoryName: "Keychains & Charms",
    images: [
      "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop"
    ],
    variants: [
      { name: "Ruby Strawberry", colorHex: "#B98291", stock: 25 },
      { name: "Pastel Pink Berry", colorHex: "#EFC8D1", stock: 18 }
    ],
    stock: 43,
    tags: ["Gifts Under 999", "Keychain", "Charm", "Strawberry"],
    dimensions: "6cm (H) x 4cm (W)",
    materials: "100% Mercerized Cotton, Brass swivel lobster clasp",
    careInstructions: "Gently wipe clean with damp cloth.",
    isFeatured: false,
    isBestSeller: true,
    isMadeToOrder: false,
    productionDays: 1,
    rating: 4.9,
    reviewCount: 52,
    weight: "45g",
    createdAt: "2024-02-15T00:00:00.000Z"
  },
  {
    _id: "prod-6",
    title: "Pearl Petal Mini Clutch",
    slug: "pearl-petal-mini-clutch",
    description: "A romantic jewel of a bag. The Pearl Petal Mini Clutch features dense popcorn stitches that mimic tender rosebuds, topped with a genuine freshwater pearl button closure and a detachable twisted crochet crossbody strap.",
    shortDescription: "Textured popcorn-stitch mini clutch with freshwater pearl clasp.",
    price: 1999,
    compareAtPrice: 2499,
    category: "crochet-bags",
    categoryName: "Crochet Bags",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop"
    ],
    variants: [
      { name: "Warm Ivory", colorHex: "#FFF9F4", stock: 5 },
      { name: "Dusty Mauve", colorHex: "#B98291", stock: 6 },
      { name: "Soft Mint", colorHex: "#D1E2D3", stock: 3 }
    ],
    stock: 14,
    tags: ["Clutch", "Pearl", "Handbag", "Evening"],
    dimensions: "20cm (W) x 14cm (H) x 5cm (D)",
    materials: "Egyptian Mercerized Cotton Yarn, Freshwater Pearl Button",
    careInstructions: "Spot clean gently. Keep away from rough abrasive surfaces.",
    isFeatured: true,
    isBestSeller: false,
    isMadeToOrder: true,
    productionDays: 3,
    rating: 4.7,
    reviewCount: 16,
    weight: "240g",
    createdAt: "2024-02-20T00:00:00.000Z"
  },
  {
    _id: "prod-7",
    title: "Handmade Blossom Coaster Set (Set of 4)",
    slug: "blossom-coaster-set-4",
    description: "Bring artisanal warmth to your morning tea rituals. Set of four blooming flower coasters hand-crocheted from absorbent thick cotton yarn, complete with scalloped petal rims and tied with organic cotton twine.",
    shortDescription: "Set of 4 scalloped floral drink coasters in coordinating blush and ivory.",
    price: 699,
    compareAtPrice: 899,
    category: "home-living",
    categoryName: "Home & Living",
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop"
    ],
    variants: [
      { name: "Pastel Meadow", colorHex: "#EFC8D1", stock: 15 },
      { name: "Warm Earth", colorHex: "#F3EADF", stock: 12 }
    ],
    stock: 27,
    tags: ["Gifts Under 999", "Home", "Coasters", "Floral"],
    dimensions: "12cm diameter each",
    materials: "100% Recycled Natural Cotton Yarn",
    careInstructions: "Machine wash on delicate gentle cycle or hand wash. Lay flat to dry.",
    isFeatured: false,
    isBestSeller: true,
    isMadeToOrder: false,
    productionDays: 1,
    rating: 4.8,
    reviewCount: 31,
    weight: "180g",
    createdAt: "2024-02-22T00:00:00.000Z"
  },
  {
    _id: "prod-8",
    title: "The Heartfelt Gift Box Keepsake",
    slug: "heartfelt-gift-box-keepsake",
    description: "Curated with boundless love, this luxury gift box arrives ready to captivate. Contains 1 mini crocheted flower bouquet (blush rose & tulip), 1 Strawberry Puff charm, 1 scented soy candle, and a handwritten personalized calligraphy gift card inside a gold-embossed ivory box.",
    shortDescription: "Luxury gift set featuring mini bouquet, charm, soy wax candle, and personalized card.",
    price: 1899,
    compareAtPrice: 2299,
    category: "custom-creations",
    categoryName: "Custom Creations",
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop"
    ],
    variants: [
      { name: "Blush Harmony", colorHex: "#EFC8D1", stock: 10 },
      { name: "Lavender Serenade", colorHex: "#D9C9DD", stock: 8 }
    ],
    stock: 18,
    tags: ["Gift Box", "Romantic", "Care Package", "Bestseller"],
    dimensions: "26cm x 20cm x 10cm gift box",
    materials: "Crochet cotton, Natural Soy Wax, Satin ribbon, Rigid box",
    careInstructions: "Store in a cool dry place.",
    isFeatured: true,
    isBestSeller: true,
    isMadeToOrder: true,
    productionDays: 3,
    rating: 5.0,
    reviewCount: 29,
    weight: "650g",
    createdAt: "2024-02-28T00:00:00.000Z"
  }
];

export const MOCK_COUPONS: Coupon[] = [
  {
    _id: "coup-1",
    code: "LOOM10",
    discountType: "PERCENTAGE",
    discountValue: 10,
    minOrderValue: 999,
    maxDiscount: 500,
    isActive: true,
    usageCount: 142,
  },
  {
    _id: "coup-2",
    code: "FIRSTLOVE",
    discountType: "FIXED",
    discountValue: 200,
    minOrderValue: 1499,
    isActive: true,
    usageCount: 88,
  },
  {
    _id: "coup-3",
    code: "FREESHIP",
    discountType: "FIXED",
    discountValue: 100,
    minOrderValue: 799,
    isActive: true,
    usageCount: 310,
  }
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    _id: "blog-1",
    title: "Caring for Your Handcrafted Crochet: The Tender Wash Guide",
    slug: "caring-for-handcrafted-crochet-tender-wash-guide",
    excerpt: "Learn how to preserve the softness, shape, and delicate hues of your favorite handmade crochet pieces for decades to come.",
    content: `Crochet pieces are not just accessories; they are tactile stories woven with hours of patience and mindful attention. With proper care, your Loom & Love pieces will retain their velvety texture and structural integrity across many seasons.

### 1. The Gentle Cold Soak
Always avoid aggressive machine agitation unless the care tag explicitly allows it. Fill a clean basin with cool to lukewarm water and dissolve a few drops of pH-neutral delicate wool/silk wash. Submerge your crochet item gently, pressing softly rather than rubbing or scrubbing.

### 2. No Wringing or Twisting
Yarn fibers can stretch out of proportion when weighed down with water. Gently press the excess water out against the side of the basin. Roll your piece inside a clean, dry white bath towel like a sushi roll and press down firmly to absorb moisture.

### 3. Flat Air Drying
Never hang a damp crochet bag or plushie from its straps or ears, as gravity will distort the stitches! Lay it flat upon a clean, dry towel in a well-ventilated space away from direct, harsh sunlight. Reshape the stitches softly with your fingers while damp.

Cherish the slow stitches!`,
    coverImage: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
    category: "Crochet Care",
    author: "Aanya Verma, Founder & Master Maker",
    readTime: "4 min read",
    tags: ["Care Guide", "Slow Fashion", "Handmade"],
    publishedAt: "2024-02-12T10:00:00.000Z",
    isPublished: true,
  },
  {
    _id: "blog-2",
    title: "The Art of Slow Gifting: Why Forever Flowers Mean So Much More",
    slug: "art-of-slow-gifting-forever-flowers",
    excerpt: "In a world of fast disposable trends, gifting a handcrafted crochet bloom is an enduring gesture of heartfelt intimacy.",
    content: `When you hand someone a freshly cut rose, you gift a transient beauty destined to wither in a week. When you gift a hand-crocheted botanical stem, you gift hours of human presence, intention, and affection that never dims.

Our botanical collection was born out of a desire to freeze springtime warmth forever. Each petal is individually crocheted, shaped over flexible jeweler's wire, and bound with silk thread.`,
    coverImage: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop",
    category: "Gift Ideas",
    author: "Radhika Sen, Textile Artisan",
    readTime: "3 min read",
    tags: ["Gifting", "Bouquets", "Sustainable Craft"],
    publishedAt: "2024-02-18T10:00:00.000Z",
    isPublished: true,
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    _id: "rev-1",
    productId: "prod-1",
    userName: "Ananya Sharma",
    userEmail: "ananya.s@example.com",
    rating: 5,
    title: "Beyond breathtaking! The pearl strap is pure luxury",
    comment: "I carried the Blush Bloom handbag to my sister's engagement brunch and received so many compliments! The stitches are incredibly tight and sturdy, and the lining inside keeps everything secure. It feels like wearing an art piece.",
    images: ["https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop"],
    isVerified: true,
    status: "APPROVED",
    createdAt: "2024-02-05T14:30:00.000Z"
  },
  {
    _id: "rev-2",
    productId: "prod-1",
    userName: "Meera Krishnan",
    rating: 5,
    title: "Softest cotton yarn and flawless packaging",
    comment: "The packaging alone made my day—unwrapping the blush tissue paper tied with real satin ribbon felt so special. The bag is roomy enough for my phone, cardholder, lipstick, and keys.",
    images: [],
    isVerified: true,
    status: "APPROVED",
    createdAt: "2024-02-14T09:15:00.000Z"
  },
  {
    _id: "rev-3",
    productId: "prod-3",
    userName: "Pooja Desai",
    rating: 5,
    title: "Best anniversary present ever",
    comment: "My partner got me the Forever Lavender Bouquet for our anniversary. Seeing it every morning on my nightstand without ever wilting brings the warmest smile to my face.",
    images: [],
    isVerified: true,
    status: "APPROVED",
    createdAt: "2024-02-24T18:20:00.000Z"
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    _id: "ord-1",
    orderNumber: "LL-2402-1082",
    userEmail: "customer@loomandlove.com",
    userName: "Priyanka Roy",
    shippingAddress: {
      fullName: "Priyanka Roy",
      phone: "+91 98765 43210",
      street: "Flat 402, Lotus Residency, Indiranagar",
      apartment: "12th Cross",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038"
    },
    items: [
      {
        productId: "prod-1",
        title: "Blush Bloom Pearl Handbag",
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop",
        price: 2499,
        quantity: 1,
        selectedColor: "Blush Pink",
        selectedSize: "Standard"
      },
      {
        productId: "prod-5",
        title: "Strawberry Puff Bag Charm & Keychain",
        image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?q=80&w=800&auto=format&fit=crop",
        price: 449,
        quantity: 1,
        selectedColor: "Ruby Strawberry"
      }
    ],
    subtotal: 2948,
    discountAmount: 295,
    couponCode: "LOOM10",
    giftWrapFee: 99,
    giftMessage: "Happy Birthday dearest Priyanka! May your year be soft and full of love.",
    shippingFee: 0,
    total: 2752,
    paymentMethod: "RAZORPAY",
    paymentStatus: "PAID",
    razorpayPaymentId: "pay_Nkm8821901a",
    orderStatus: "SHIPPED",
    trackingNumber: "BLUEDART-891024",
    courierName: "Blue Dart Express",
    notes: "Signature packaging with handwritten card.",
    createdAt: "2024-02-26T11:20:00.000Z",
    timeline: [
      { status: "PENDING", date: "2024-02-26T11:20:00.000Z", note: "Order placed & verified" },
      { status: "PROCESSING", date: "2024-02-26T12:00:00.000Z", note: "Crafted in studio" },
      { status: "SHIPPED", date: "2024-02-27T16:00:00.000Z", note: "Handed over to Blue Dart (AWB: BLUEDART-891024)" }
    ]
  },
  {
    _id: "ord-2",
    orderNumber: "LL-2402-9931",
    userEmail: "shreya.patel@example.com",
    userName: "Shreya Patel",
    shippingAddress: {
      fullName: "Shreya Patel",
      phone: "+91 91234 56789",
      street: "B-14 Silver Oak Heights, Koregaon Park",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411001"
    },
    items: [
      {
        productId: "prod-3",
        title: "Forever Lavender Love Bouquet",
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop",
        price: 1499,
        quantity: 1,
        selectedColor: "Lavender Dream"
      }
    ],
    subtotal: 1499,
    discountAmount: 0,
    giftWrapFee: 0,
    shippingFee: 0,
    total: 1499,
    paymentMethod: "COD",
    paymentStatus: "PENDING",
    orderStatus: "PROCESSING",
    createdAt: "2024-02-28T09:00:00.000Z",
    timeline: [
      { status: "PENDING", date: "2024-02-28T09:00:00.000Z", note: "Cash on delivery confirmed" },
      { status: "PROCESSING", date: "2024-02-28T10:30:00.000Z", note: "Artisan assembling blooms" }
    ]
  }
];

export const MOCK_CUSTOM_ORDERS: CustomOrderRequest[] = [
  {
    _id: "custom-1",
    requestNumber: "REQ-2024-041",
    customerName: "Tanvi Kapoor",
    customerEmail: "tanvi.k@example.com",
    customerPhone: "+91 98200 11223",
    category: "Crochet Bags",
    title: "Lilac Cloud Crossbody with Rose Monogram",
    description: "Looking for a rounded dumpling-shaped shoulder bag in pastel lilac with ivory scalloped edging and my initials 'TK' embroidered in dusty rose yarn on the flap.",
    yarnColors: ["#D9C9DD", "#FFF9F4", "#B98291"],
    sizePreference: "20cm x 15cm compact crossbody",
    personalizationText: "TK",
    targetDate: "2024-03-20",
    budgetEstimated: 3200,
    referenceImages: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop"
    ],
    status: "QUOTE_SENT",
    quotedPrice: 2899,
    adminNotes: "Yarn swatches approved. Customer requesting adjustable 110cm strap.",
    createdAt: "2024-02-25T15:45:00.000Z"
  }
];

import { connectToDatabase } from "@/lib/db";
import { SiteSettings } from "@/models/SiteSettings";
import { HomeContent } from "@/models/HomeContent";
import { FAQ } from "@/models/FAQ";
import { Testimonial } from "@/models/Testimonial";
import { PageContent } from "@/models/PageContent";

export const DEFAULT_SITE_SETTINGS = {
  storeName: "Loom & Love",
  tagline: "Handmade softness, woven with heart.",
  contactEmail: "hello@loomandlove.com",
  phone: "+91 98765 43210",
  studioAddress: "Indiranagar, Bengaluru, Karnataka - 560038",
  workingHours: "Mon–Sat, 10am to 6pm IST",
  appointmentNote:
    "Feel our yarn swatches and witness our weavers in action by booking an artisan appointment.",
  announcements: [
    { id: "1", text: "Handmade with love in small batches 🌸", iconName: "Sparkles", link: "/shop" },
    { id: "2", text: "Free express shipping on all orders over ₹999 📦", iconName: "Package", link: "/shop" },
    { id: "3", text: "Bespoke made-to-order creations tailored for you ✨", iconName: "Flower2", link: "/custom-order" },
    { id: "4", text: "Complimentary luxury gift wrapping & card notes 🎀", iconName: "Gift", link: "/shop" },
  ],
  freeShippingThreshold: 999,
  giftPackagingFee: 99,
  trustPillars: [
    {
      id: "1",
      title: "Free Insured Delivery",
      description: "Complimentary courier on orders over ₹999",
      iconName: "Truck",
    },
    {
      id: "2",
      title: "100% Artisan Made",
      description: "Hand-crocheted slowly in small batches",
      iconName: "ShieldCheck",
    },
    {
      id: "3",
      title: "Loved or Exchanged",
      description: "Gentle 7-day handcrafted quality guarantee",
      iconName: "RotateCcw",
    },
  ],
  instagramUrl: "https://instagram.com",
  whatsappNumber: "+91 98765 43210",
  pinterestUrl: "https://pinterest.com",
  copyrightText: "Loom & Love Atelier. Hand-hooked with love in small batches.",
};

export const DEFAULT_HOME_CONTENT = {
  // Hero
  heroBadge: "Small-Batch Artisan Studio • Handcrafted in India",
  heroHeadingMain: "Handmade with",
  heroHeadingHighlight: "every stitch.",
  heroCursiveQuote: "“Little stitches, big happiness — made slowly, loved forever.”",
  heroDescription:
    "Welcome to our boutique crochet atelier. Explore luxury handbags, forever flower bouquets that never wilt, cuddly amigurumi companions, and bespoke made-to-order keepsakes, all meticulously hand-hooked with silky milk cotton yarn.",
  heroPrimaryBtnText: "Shop the Collection",
  heroPrimaryBtnLink: "/shop",
  heroSecondaryBtnText: "Custom Order Studio",
  heroSecondaryBtnLink: "/custom-order",
  heroTrustBadges: [
    "100% Cotton & Milk Yarn",
    "Gift-Ready Ribbon Box",
    "10,000+ Happy Stitches",
  ],
  heroSpotlightImage:
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop",
  heroSpotlightBadge: "Artisan Spotlight No. 01",
  heroSpotlightTitle: "The Blush Bloom Pearl Bag",
  heroSpotlightDesc:
    "18 hours of mindful hand-crocheting in milk-cotton with genuine freshwater pearl accents.",
  heroFloatingBadge1Image:
    "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=400&auto=format&fit=crop",
  heroFloatingBadge1Title: "Forever Blooms",
  heroFloatingBadge1Subtitle: "Never wilts • Always lovely",
  heroFloatingBadge2Rating: "4.9 / 5.0",
  heroFloatingBadge2Text: "From 850+ Verified Shoppers",

  // Trust Strip (4 items)
  trustStripItems: [
    {
      id: "1",
      title: "Handmade with Love",
      description: "Slow-hooked by women artisans",
      iconName: "Heart",
      theme: "clay",
    },
    {
      id: "2",
      title: "100% Breathable Cotton",
      description: "Hypoallergenic & baby-safe fibers",
      iconName: "Feather",
      theme: "moss",
    },
    {
      id: "3",
      title: "Gift-Ready Packaging",
      description: "Satin ribbon & handwritten card",
      iconName: "Gift",
      theme: "amber",
    },
    {
      id: "4",
      title: "Bespoke Tailored",
      description: "Your colors, dimensions & initials",
      iconName: "Palette",
      theme: "clay",
    },
  ],

  // Category Section
  categoryBadge: "Taxonomy of Softness",
  categoryTitle: "Shop by Handcrafted Category",
  categorySubtitle:
    "Explore curated collections, from everyday structured totes to nursery amigurumi treasures.",
  categoryLinkText: "View Full Catalog",

  // Featured Section
  featuredBadge: "The Atelier Edit",
  featuredTitle: "Featured Creations",
  featuredCursiveQuote: "“Pieces that bring quiet romance to ordinary days.”",
  featuredButtonText: "Browse All 14+ Creations",

  // Maker / Story Section
  storyBadge: "The Maker's Heart",
  storyHeading: "Woven slowly, with mindful gentleness.",
  storyQuote:
    "“Crochet is my meditation. Every loop is an act of presence, turning a single strand of soft cotton yarn into an heirloom that holds your everyday belongings and heartfelt memories.”",
  storyQuoteAuthor: "— Aanya Verma, Founder & Master Hook Artisan",
  storyParagraph:
    "Founded with a vision to preserve traditional yarn crafts and provide dignified work for women artisans across India, Loom & Love rejects mass machine manufacturing. Each piece is hooked entirely by hand using certified milk-cotton yarns.",
  storyBtnText: "Read Our Full Story",
  storyBtnLink: "/about",
  storyPolaroids: [
    {
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
      caption: "Mindful stitches in studio No. 04",
    },
    {
      image:
        "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600&auto=format&fit=crop",
      caption: "Tulip blossoms that never wilt",
    },
  ],

  // 4-Step Process Section
  processBadge: "Handcrafted Journey",
  processTitle: "From Yarn Spool to Heirloom",
  processSubtitle:
    "Every piece passes through attentive hands, patient hours, and rigorous artisan care.",
  processSteps: [
    {
      id: "1",
      stepNumber: "01",
      title: "Select Fine Yarn",
      description:
        "We hand-pick combed milk-cotton fibers for maximum tactile softness and durability.",
    },
    {
      id: "2",
      stepNumber: "02",
      title: "Hand-Stitched",
      description:
        "Women artisans patiently hook each row over 12 to 24 dedicated studio hours.",
    },
    {
      id: "3",
      stepNumber: "03",
      title: "Quality Checked",
      description:
        "Every seam, bead attachment, and fabric lining is steam-blocked and examined.",
    },
    {
      id: "4",
      stepNumber: "04",
      title: "Shipped with Love",
      description:
        "Carefully boxed in sustainable wrap with satin ribbon and a wax-sealed card.",
    },
  ],
  processCtaTitle: "Ready to weave your one-of-a-kind piece?",
  processCtaDescription:
    "Submit your custom crochet request in less than 2 minutes and receive a personalized price quote from our head artisan.",
  processCtaBtnText: "Start Custom Request",
  processCtaBtnLink: "/custom-order",

  // Best Sellers
  bestSellersBadge: "Community Favorites",
  bestSellersTitle: "Most Cherished Pieces",
  bestSellersSubtitle:
    "Handcrafted best-sellers that have brought warmth to homes across the country.",

  // Testimonials
  testimonialsBadge: "Words from the Heart",
  testimonialsTitle: "Loved by Crochet Enthusiasts",
  testimonialsSubtitle:
    "Over 850+ five-star reviews from customers who value slow, artisanal luxury.",
  testimonialsMarquee:
    "“So soft and beautifully made” • “The pearls are exquisite” • “Packaged with so much love” • “My daughter sleeps with the bunny every night” • “Best gift ever” • ",

  // Gallery
  galleryBadge: "#LoomAndLoveInTheWild",
  galleryTitle: "Follow the Atelier Journey",
  gallerySubtitle:
    "Behind-the-scenes stitch tutorials, new shade reveals, and real-life styling.",
  galleryImages: [
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?q=80&w=600&auto=format&fit=crop",
  ],

  // Newsletter
  newsletterBadge: "The Cozy Club",
  newsletterTitle: "Join our little yarn circle.",
  newsletterSubtitle:
    "Receive gentle seasonal drops, custom order openings, and gifting inspiration from our atelier.",
  newsletterBtnText: "Join Circle",
  newsletterDisclaimer:
    "Zero spam. Only gentle stitches & warm announcements. Unsubscribe anytime.",
};

export const DEFAULT_TESTIMONIALS = [
  {
    _id: "test-1",
    name: "Aanya Verma",
    city: "Mumbai",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    item: "Blush Bloom Pearl Handbag",
    rating: 5,
    date: "Verified Buyer",
    comment:
      "“Opening the gift box felt like receiving a hug from an old friend. The stitches are unimaginably neat, and the pearls feel so sturdy. I've received compliments everywhere I carry it!”",
    isFeatured: true,
  },
  {
    _id: "test-2",
    name: "Sneha Kapoor",
    city: "Bengaluru",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop",
    item: "Pastel Tulip Everlasting Bouquet",
    rating: 5,
    date: "Verified Buyer",
    comment:
      "“My mother couldn't believe they were hand-crocheted. They sit by our sunlit living room window and never wilt. The packaging with dried lavender made it so special.”",
    isFeatured: true,
  },
  {
    _id: "test-3",
    name: "Tanvi Saxena",
    city: "New Delhi",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=300&auto=format&fit=crop",
    item: "Marshmallow Cloud Bunny",
    rating: 5,
    date: "Verified Buyer",
    comment:
      "“The softest amigurumi plushie I have ever held. Stitched with so much tenderness. Loom & Love is my go-to boutique for thoughtful gifts now.”",
    isFeatured: true,
  },
];

export const DEFAULT_FAQS = [
  {
    _id: "faq-1",
    question: "What materials do you use in Loom & Love pieces?",
    answer:
      "We work almost exclusively with premium combed milk-cotton yarn and Egyptian mercerized cotton. For botanical stems, we use flexible jeweler's wire and floral tape. For bags, we use organic cotton canvas inner linings and rust-resistant golden-plated alloy hardware.",
    category: "Materials & Quality",
    displayOrder: 1,
    isActive: true,
  },
  {
    _id: "faq-2",
    question: "How do I clean my crochet bag or plushie?",
    answer:
      "Submerge the item gently in a basin of cool water with a few drops of mild wool/silk wash. Gently squeeze water out without wringing. Press in a clean dry towel and lay completely flat to dry in shade.",
    category: "Care Guide",
    displayOrder: 2,
    isActive: true,
  },
  {
    _id: "faq-3",
    question: "Do the crochet flowers really last forever?",
    answer:
      "Yes! Unlike real flowers that wilt within a week, our handcrafted crochet stems retain their bright petals and sculptural structure for decades with occasional light dusting.",
    category: "Products",
    displayOrder: 3,
    isActive: true,
  },
  {
    _id: "faq-4",
    question: "Can I order in bulk for wedding favors or baby showers?",
    answer:
      "Yes! We frequently craft custom bridal party bouquets, personalized initial keychains, and return favor hampers. Submit your requirements through our Custom Orders page for special bulk studio pricing.",
    category: "Custom Orders",
    displayOrder: 4,
    isActive: true,
  },
  {
    _id: "faq-5",
    question: "Which payment methods do you accept?",
    answer:
      "We accept all Indian UPI apps (Google Pay, PhonePe, Paytm), RuPay/Visa/Mastercard debit and credit cards, Net Banking, and Cash on Delivery (COD).",
    category: "Payments",
    displayOrder: 5,
    isActive: true,
  },
];

export const DEFAULT_ABOUT_PAGE = {
  badge: "Our Artisan Story",
  heroTitle: "Woven with Heart,",
  heroHighlight: "One Loop at a Time.",
  heroSubtitle:
    "Loom & Love began as a quiet counter-movement to disposable fast fashion—an intimate studio where time slows down and every stitch tells a story of care.",
  founderImage:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
  founderSubtitle: "Meet the Maker",
  founderQuote: "“There is healing in the steady, gentle rhythm of yarn.”",
  storyParagraph1:
    "Founded by textile designer Aanya Verma in 2022, Loom & Love was born from a crochet hook inherited from her grandmother. What started on a balcony in Bengaluru has blossomed into a collaborative atelier supporting over twenty talented women artisans across Karnataka and Rajasthan.",
  storyParagraph2:
    "Unlike mass factories that stamp out identical clones, every single bag, flower stem, and plush companion that leaves our studio bears slight, exquisite nuances of the human hands that created it.",
  philosophyBadge: "Our Guiding Philosophy",
  philosophyTitle: "The Slow Craft Promise",
  values: [
    {
      title: "Mindful Materials",
      description:
        "We use 100% natural combed milk cotton and recycled plant fibers colored with gentle, skin-safe azo-free dyes.",
      icon: "Sparkles",
    },
    {
      title: "Artisan Empowerment",
      description:
        "Our weavers earn well above fair-trade living wages, work in self-determined home rhythms, and maintain creative autonomy.",
      icon: "Heart",
    },
    {
      title: "Zero Waste Mindset",
      description:
        "Every yarn scrap is saved and repurposed into miniature charms, amigurumi stuffing, and reusable packaging cords.",
      icon: "CheckCircle2",
    },
  ],
};

// ==================== GETTER HELPERS ====================

export async function getSiteSettings() {
  try {
    const db = await connectToDatabase();
    if (db && SiteSettings) {
      const settings = await SiteSettings.findOne().lean();
      if (settings) {
        return {
          ...DEFAULT_SITE_SETTINGS,
          ...JSON.parse(JSON.stringify(settings)),
        };
      }
    }
  } catch (err) {
    console.warn("Could not load SiteSettings from DB, using defaults:", err);
  }
  return DEFAULT_SITE_SETTINGS;
}

export async function getHomePageContent() {
  try {
    const db = await connectToDatabase();
    if (db && HomeContent) {
      const content = await HomeContent.findOne().lean();
      if (content) {
        return {
          ...DEFAULT_HOME_CONTENT,
          ...JSON.parse(JSON.stringify(content)),
        };
      }
    }
  } catch (err) {
    console.warn("Could not load HomeContent from DB, using defaults:", err);
  }
  return DEFAULT_HOME_CONTENT;
}

export async function getFAQs() {
  try {
    const db = await connectToDatabase();
    if (db && FAQ) {
      const faqs = await FAQ.find({ isActive: true })
        .sort({ displayOrder: 1, createdAt: 1 })
        .lean();
      if (faqs && faqs.length > 0) {
        return JSON.parse(JSON.stringify(faqs));
      }
    }
  } catch (err) {
    console.warn("Could not load FAQs from DB, using defaults:", err);
  }
  return DEFAULT_FAQS;
}

export async function getTestimonials(featuredOnly = true) {
  try {
    const db = await connectToDatabase();
    if (db && Testimonial) {
      const query = featuredOnly ? { isFeatured: true } : {};
      const testimonials = await Testimonial.find(query)
        .sort({ displayOrder: 1, createdAt: -1 })
        .lean();
      if (testimonials && testimonials.length > 0) {
        return JSON.parse(JSON.stringify(testimonials));
      }
    }
  } catch (err) {
    console.warn("Could not load Testimonials from DB, using defaults:", err);
  }
  return DEFAULT_TESTIMONIALS;
}

export async function getPageContent(slug: string) {
  try {
    const db = await connectToDatabase();
    if (db && PageContent) {
      const page = await PageContent.findOne({ slug }).lean();
      if (page && page.data) {
        return JSON.parse(JSON.stringify(page.data));
      }
    }
  } catch (err) {
    console.warn(`Could not load PageContent (${slug}) from DB, using defaults:`, err);
  }

  if (slug === "about") return DEFAULT_ABOUT_PAGE;
  return null;
}

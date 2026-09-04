import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITrustStripItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  theme: "clay" | "moss" | "amber" | "espresso";
}

export interface IProcessStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
}

export interface IPolaroidItem {
  image: string;
  caption: string;
}

export interface IHomeContent extends Document {
  // 1. Hero Section
  heroBadge: string;
  heroHeadingMain: string;
  heroHeadingHighlight: string;
  heroCursiveQuote: string;
  heroDescription: string;
  heroPrimaryBtnText: string;
  heroPrimaryBtnLink: string;
  heroSecondaryBtnText: string;
  heroSecondaryBtnLink: string;
  heroTrustBadges: string[];
  heroSpotlightImage: string;
  heroSpotlightBadge: string;
  heroSpotlightTitle: string;
  heroSpotlightDesc: string;
  heroFloatingBadge1Image: string;
  heroFloatingBadge1Title: string;
  heroFloatingBadge1Subtitle: string;
  heroFloatingBadge2Rating: string;
  heroFloatingBadge2Text: string;

  // 2. Trust Strip (4 items)
  trustStripItems: ITrustStripItem[];

  // 3. Category Section
  categoryBadge: string;
  categoryTitle: string;
  categorySubtitle: string;
  categoryLinkText: string;

  // 4. Featured Products Section
  featuredBadge: string;
  featuredTitle: string;
  featuredCursiveQuote: string;
  featuredButtonText: string;

  // 5. Maker / Story Section
  storyBadge: string;
  storyHeading: string;
  storyQuote: string;
  storyQuoteAuthor: string;
  storyParagraph: string;
  storyBtnText: string;
  storyBtnLink: string;
  storyPolaroids: IPolaroidItem[];

  // 6. 4-Step Process Section
  processBadge: string;
  processTitle: string;
  processSubtitle: string;
  processSteps: IProcessStep[];
  processCtaTitle: string;
  processCtaDescription: string;
  processCtaBtnText: string;
  processCtaBtnLink: string;

  // 7. Best Sellers Section
  bestSellersBadge: string;
  bestSellersTitle: string;
  bestSellersSubtitle: string;

  // 8. Testimonials Section
  testimonialsBadge: string;
  testimonialsTitle: string;
  testimonialsSubtitle: string;
  testimonialsMarquee: string;

  // 9. Instagram Gallery Section
  galleryBadge: string;
  galleryTitle: string;
  gallerySubtitle: string;
  galleryImages: string[];

  // 10. Newsletter Section
  newsletterBadge: string;
  newsletterTitle: string;
  newsletterSubtitle: string;
  newsletterBtnText: string;
  newsletterDisclaimer: string;

  createdAt: Date;
  updatedAt: Date;
}

const TrustStripItemSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  iconName: { type: String, default: "Heart" },
  theme: { type: String, default: "clay" },
});

const ProcessStepSchema = new Schema({
  id: { type: String, required: true },
  stepNumber: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const PolaroidSchema = new Schema({
  image: { type: String, required: true },
  caption: { type: String, required: true },
});

const HomeContentSchema = new Schema<IHomeContent>(
  {
    // Hero
    heroBadge: { type: String, default: "Small-Batch Artisan Studio • Handcrafted in India" },
    heroHeadingMain: { type: String, default: "Handmade with" },
    heroHeadingHighlight: { type: String, default: "every stitch." },
    heroCursiveQuote: {
      type: String,
      default: "“Little stitches, big happiness — made slowly, loved forever.”",
    },
    heroDescription: {
      type: String,
      default:
        "Welcome to our boutique crochet atelier. Explore luxury handbags, forever flower bouquets that never wilt, cuddly amigurumi companions, and bespoke made-to-order keepsakes, all meticulously hand-hooked with silky milk cotton yarn.",
    },
    heroPrimaryBtnText: { type: String, default: "Shop the Collection" },
    heroPrimaryBtnLink: { type: String, default: "/shop" },
    heroSecondaryBtnText: { type: String, default: "Custom Order Studio" },
    heroSecondaryBtnLink: { type: String, default: "/custom-order" },
    heroTrustBadges: {
      type: [String],
      default: [
        "100% Cotton & Milk Yarn",
        "Gift-Ready Ribbon Box",
        "10,000+ Happy Stitches",
      ],
    },
    heroSpotlightImage: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop",
    },
    heroSpotlightBadge: { type: String, default: "Artisan Spotlight No. 01" },
    heroSpotlightTitle: { type: String, default: "The Blush Bloom Pearl Bag" },
    heroSpotlightDesc: {
      type: String,
      default:
        "18 hours of mindful hand-crocheting in milk-cotton with genuine freshwater pearl accents.",
    },
    heroFloatingBadge1Image: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=400&auto=format&fit=crop",
    },
    heroFloatingBadge1Title: { type: String, default: "Forever Blooms" },
    heroFloatingBadge1Subtitle: { type: String, default: "Never wilts • Always lovely" },
    heroFloatingBadge2Rating: { type: String, default: "4.9 / 5.0" },
    heroFloatingBadge2Text: { type: String, default: "From 850+ Verified Shoppers" },

    // Trust Strip
    trustStripItems: [TrustStripItemSchema],

    // Category
    categoryBadge: { type: String, default: "Taxonomy of Softness" },
    categoryTitle: { type: String, default: "Shop by Handcrafted Category" },
    categorySubtitle: {
      type: String,
      default:
        "Explore curated collections, from everyday structured totes to nursery amigurumi treasures.",
    },
    categoryLinkText: { type: String, default: "View Full Catalog" },

    // Featured Section
    featuredBadge: { type: String, default: "The Atelier Edit" },
    featuredTitle: { type: String, default: "Featured Creations" },
    featuredCursiveQuote: {
      type: String,
      default: "“Pieces that bring quiet romance to ordinary days.”",
    },
    featuredButtonText: { type: String, default: "Browse All Creations" },

    // Story Section
    storyBadge: { type: String, default: "The Maker's Heart" },
    storyHeading: { type: String, default: "Woven slowly, with mindful gentleness." },
    storyQuote: {
      type: String,
      default:
        "“Crochet is my meditation. Every loop is an act of presence, turning a single strand of soft cotton yarn into an heirloom that holds your everyday belongings and heartfelt memories.”",
    },
    storyQuoteAuthor: {
      type: String,
      default: "— Aanya Verma, Founder & Master Hook Artisan",
    },
    storyParagraph: {
      type: String,
      default:
        "Founded with a vision to preserve traditional yarn crafts and provide dignified work for women artisans across India, Loom & Love rejects mass machine manufacturing. Each piece is hooked entirely by hand using certified milk-cotton yarns.",
    },
    storyBtnText: { type: String, default: "Read Our Full Story" },
    storyBtnLink: { type: String, default: "/about" },
    storyPolaroids: [PolaroidSchema],

    // Process
    processBadge: { type: String, default: "Handcrafted Journey" },
    processTitle: { type: String, default: "From Yarn Spool to Heirloom" },
    processSubtitle: {
      type: String,
      default:
        "Every piece passes through attentive hands, patient hours, and rigorous artisan care.",
    },
    processSteps: [ProcessStepSchema],
    processCtaTitle: {
      type: String,
      default: "Ready to weave your one-of-a-kind piece?",
    },
    processCtaDescription: {
      type: String,
      default:
        "Submit your custom crochet request in less than 2 minutes and receive a personalized price quote from our head artisan.",
    },
    processCtaBtnText: { type: String, default: "Start Custom Request" },
    processCtaBtnLink: { type: String, default: "/custom-order" },

    // Best Sellers
    bestSellersBadge: { type: String, default: "Community Favorites" },
    bestSellersTitle: { type: String, default: "Most Cherished Pieces" },
    bestSellersSubtitle: {
      type: String,
      default:
        "Handcrafted best-sellers that have brought warmth to homes across the country.",
    },

    // Testimonials
    testimonialsBadge: { type: String, default: "Words from the Heart" },
    testimonialsTitle: { type: String, default: "Loved by Crochet Enthusiasts" },
    testimonialsSubtitle: {
      type: String,
      default:
        "Over 850+ five-star reviews from customers who value slow, artisanal luxury.",
    },
    testimonialsMarquee: {
      type: String,
      default:
        "“So soft and beautifully made” • “The pearls are exquisite” • “Packaged with so much love” • “My daughter sleeps with the bunny every night” • “Best gift ever” • ",
    },

    // Gallery
    galleryBadge: { type: String, default: "#LoomAndLoveInTheWild" },
    galleryTitle: { type: String, default: "Follow the Atelier Journey" },
    gallerySubtitle: {
      type: String,
      default:
        "Behind-the-scenes stitch tutorials, new shade reveals, and real-life styling.",
    },
    galleryImages: {
      type: [String],
      default: [
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?q=80&w=600&auto=format&fit=crop",
      ],
    },

    // Newsletter
    newsletterBadge: { type: String, default: "The Cozy Club" },
    newsletterTitle: { type: String, default: "Join our little yarn circle." },
    newsletterSubtitle: {
      type: String,
      default:
        "Receive gentle seasonal drops, custom order openings, and gifting inspiration from our atelier.",
    },
    newsletterBtnText: { type: String, default: "Join Circle" },
    newsletterDisclaimer: {
      type: String,
      default:
        "Zero spam. Only gentle stitches & warm announcements. Unsubscribe anytime.",
    },
  },
  { timestamps: true }
);

export const HomeContent: Model<IHomeContent> =
  mongoose.models.HomeContent || mongoose.model<IHomeContent>("HomeContent", HomeContentSchema);

# 🌸 Loom & Love — Luxury Handcrafted Crochet Boutique

> **“Handmade softness, woven with heart.”**

Loom & Love is an editorial, luxury e-commerce web platform for artisanal crochet creations, including handcrafted handbags, everlasting flower bouquets, amigurumi plushies, keychains, and custom made-to-order commissions.

Designed with a romantic cottagecore aesthetic: blush pinks (`#EFC8D1`), warm ivory (`#FFF9F4`), soft lavender (`#D9C9DD`), dusty rose (`#B98291`), and cocoa brown (`#4C3437`), paired with Playfair Display and DM Sans typography.

---

## 🌟 Key Features

### 🛍️ Public Storefront
- **Immersive Editorial Homepage**: Hero section with artisan badge, Trust Highlights, Shop by Category, Best Sellers, and customer love stories.
- **Interactive Yarn Color Swatch Studio**: Shoppers can tap different yarn hues (Petal Blush, Warm Ivory, Lilac Whisper, Sage Meadow, Dusty Rosewood) to preview matching handcrafted textures and pieces in real time.
- **Shop & Faceted Filtering**: Filter by category, price range, availability, sort by featured / price / best selling, with debounced search.
- **Luxury Product Detail Page**: High-resolution image gallery with thumbnails, stock indicator, color shade swatches, complimentary monogram embroidery input, production lead time, and pincode delivery checker.
- **Bespoke Custom Order Flow (`/custom-order`)**: Multi-step commission builder allowing shoppers to pick categories, select yarn colors, enter target dimensions, and track their commission lifecycle: *Submitted → Reviewing → Quote Sent → Approved → In Production → Shipped*.
- **Persistent Cart & Sliding Bag Drawer**: Real-time free shipping meter (threshold ₹999), promo codes (`LOOM10`, `FIRSTLOVE`, `FREESHIP`), and gift packaging add-on (+₹99) with personalized card message.
- **Multi-Step Checkout**: Validated shipping address, payment selection (Razorpay online or Cash on Delivery), automatic order creation, and celebratory confetti confirmation.
- **Order Tracking (`/track-order`)**: Real-time status lookup with visual progress journey and courier AWB number.
- **Artisan Journal / Blog**: Slow craft philosophy, crochet tender care guide, and forever flower gifting guides.

### 🛡️ Admin Management Suite (`/admin`)
- **Dashboard**: Real-time KPI cards (Total Revenue, Handcrafted Orders, Pending in Studio, Low-Stock Batches), recent orders table, and top-selling pieces.
- **Product Catalog Management**: Create, edit, and manage products, image URLs, stock levels, variants, and pricing in INR.
- **Order Fulfillment & Logistics**: Filter orders by status, change fulfillment phase, assign courier AWB tracking numbers, and print packing slips.
- **Custom Commission Manager**: Inspect customer design requests, calculate price quotes, communicate status updates, and mark approved.
- **Promotional Coupons**: Create and toggle discount codes with percentage or flat discounts and minimum cart thresholds.
- **Review Moderation**: Approve or remove customer reviews.
- **Store Settings**: Customize announcement banners, contact info, free shipping threshold, and gift wrap fees.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + Custom Brand Tokens
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: MongoDB Atlas with Mongoose (with robust hot-reload connection pooling and graceful zero-crash fallback)
- **Authentication**: NextAuth.js / Auth.js (Credentials + Role-based JWT: `ADMIN`, `CUSTOMER`)
- **Validation**: Zod + React Hook Form
- **Notifications**: Sonner Toasts
- **Payment Structure**: Razorpay Integration Architecture (with immediate simulated sandbox support)

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ (tested on Node v20/v26)
- npm or yarn

### 2. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your variables in `.env.local`:
```env
# MongoDB Atlas connection URI
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/loom_and_love?retryWrites=true&w=majority

# NextAuth Secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=loom_and_love_handcrafted_secret_key_2024_blush_luxury

# Razorpay Test Credentials (Optional for local testing)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_loomlove123456
RAZORPAY_KEY_SECRET=secret_test_loomlove789

# Cloudinary (Optional)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=loomandlove
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Seed the Database (Optional if using MongoDB Atlas)
To populate the database with realistic products, categories, coupons, and orders:
```bash
npm run seed
```

### 5. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Default Credentials

| Role | Email | Password | Access |
|---|---|---|---|
| **Admin** | `admin@loomandlove.com` | `Admin@123` | Full `/admin` dashboard & storefront |
| **Customer** | `customer@loomandlove.com` | `Customer@123` | Customer portal, orders & wishlist |

---

## 📦 Project Structure

```
├── app/
│   ├── (storefront)/         # Public shopping experience
│   │   ├── about/            # Brand backstory & artisan ethics
│   │   ├── account/          # Customer dashboard & order history
│   │   ├── cart/             # Shopping bag page
│   │   ├── category/[slug]/  # Dynamic category pages
│   │   ├── checkout/         # Multi-step checkout & payment
│   │   ├── custom-order/     # Bespoke crochet commission flow
│   │   ├── journal/          # Crochet care guides & blog
│   │   ├── login/            # Sign in with demo shortcuts
│   │   ├── order-success/    # Confirmation & receipt print
│   │   ├── products/[slug]/  # Editorial product detail page
│   │   ├── register/         # Account registration
│   │   ├── shop/             # Catalog with faceted filters
│   │   ├── track-order/      # Real-time parcel tracking
│   │   └── wishlist/         # Saved favorite pieces
│   ├── admin/                # Secure /admin management panel
│   │   ├── categories/       # Category taxonomy CRUD
│   │   ├── coupons/          # Promo codes management
│   │   ├── custom-orders/    # Bespoke requests & quoting
│   │   ├── orders/           # Fulfillments & courier tracking
│   │   ├── products/         # Product catalog management
│   │   ├── reviews/          # Review moderation
│   │   └── settings/         # Store configuration
│   └── api/                  # Route handlers (auth, products, orders, etc.)
├── components/
│   ├── admin/                # Admin navigation & components
│   └── storefront/           # Navbar, Footer, Hero, SwatchPicker, ProductCard
├── lib/                      # Database connection, auth, cart context, mock data
├── models/                   # Mongoose schemas (User, Product, Order, etc.)
├── scripts/                  # MongoDB seed script
└── types/                    # TypeScript interfaces
```

---

## ☁️ Deployment on Vercel

1. Push this repository to GitHub or GitLab.
2. Import the repository into **Vercel**.
3. In the Vercel project settings under **Environment Variables**, add:
   - `MONGODB_URI`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (set to your production domain or leave blank for Vercel auto-detection)
   - `NEXT_PUBLIC_APP_URL`
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
4. Click **Deploy**.

---

© 2026 Loom & Love. Handcrafted with devotion in India.

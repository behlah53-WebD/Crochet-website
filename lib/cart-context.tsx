"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { CartItem, Product } from "@/types";
import { toast } from "sonner";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, selectedColor?: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedColor?: string, selectedSize?: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  giftWrap: boolean;
  setGiftWrap: (wrap: boolean) => void;
  giftMessage: string;
  setGiftMessage: (msg: string) => void;
  giftWrapFee: number;
  couponCode: string;
  discountAmount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  shippingFee: number;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 999;
const GIFT_WRAP_PRICE = 99;
const BASE_SHIPPING_FEE = 99;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" && !!session?.user?.email;

  const [cart, setCart] = useState<CartItem[]>([]);
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountFixed, setDiscountFixed] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const hasSyncedWithDb = useRef(false);
  const lastUserEmailRef = useRef<string | null>(null);

  // Load coupon from localStorage (checkout promo code)
  useEffect(() => {
    try {
      const savedCoupon = localStorage.getItem("loom_and_love_coupon");
      if (savedCoupon) {
        const parsed = JSON.parse(savedCoupon);
        setCouponCode(parsed.code);
        setDiscountPercent(parsed.percent || 0);
        setDiscountFixed(parsed.fixed || 0);
      }
    } catch (e) {
      console.warn("Could not parse coupon from storage:", e);
    }
  }, []);

  // Handle Cart & Wishlist loading based on auth state
  useEffect(() => {
    let isMounted = true;

    async function initializeData() {
      if (status === "loading") return;

      if (isAuthenticated && session?.user?.email) {
        const currentEmail = session.user.email;

        if (lastUserEmailRef.current !== currentEmail || !hasSyncedWithDb.current) {
          lastUserEmailRef.current = currentEmail;

          // Check if guest had temporary items in localStorage to migrate
          let guestCart: CartItem[] = [];
          let guestWishlist: string[] = [];
          try {
            const savedCart = localStorage.getItem("loom_and_love_cart");
            if (savedCart) guestCart = JSON.parse(savedCart);
            const savedWishlist = localStorage.getItem("loom_and_love_wishlist");
            if (savedWishlist) guestWishlist = JSON.parse(savedWishlist);
          } catch {}

          // STRICT REQUIREMENT: Ensure localStorage has NO cart or wishlist for logged-in user!
          try {
            localStorage.removeItem("loom_and_love_cart");
            localStorage.removeItem("loom_and_love_wishlist");
          } catch {}

          try {
            const res = await fetch("/api/user/cart-wishlist");
            if (res.ok) {
              const data = await res.json();
              if (isMounted) {
                let initialCart = Array.isArray(data.cart) ? data.cart : [];
                let initialWishlist = Array.isArray(data.wishlist) ? data.wishlist : [];

                // If DB cart is empty and user had guest items, migrate them into DB
                if (initialCart.length === 0 && guestCart.length > 0) {
                  initialCart = guestCart;
                  await fetch("/api/user/cart-wishlist", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ cart: initialCart }),
                  });
                }
                // If DB wishlist is empty and user had guest wishlist, migrate them into DB
                if (initialWishlist.length === 0 && guestWishlist.length > 0) {
                  initialWishlist = guestWishlist;
                  await fetch("/api/user/cart-wishlist", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ wishlist: initialWishlist }),
                  });
                }

                setCart(initialCart);
                setWishlist(initialWishlist);
                hasSyncedWithDb.current = true;
              }
            }
          } catch (err) {
            console.error("Failed to load user cart/wishlist from database:", err);
          } finally {
            if (isMounted) setIsInitialized(true);
          }
        }
      } else if (status === "unauthenticated") {
        hasSyncedWithDb.current = false;
        lastUserEmailRef.current = null;
        // Unauthenticated guest user: load from localStorage
        try {
          const savedCart = localStorage.getItem("loom_and_love_cart");
          if (savedCart) setCart(JSON.parse(savedCart));
          else setCart([]);

          const savedWishlist = localStorage.getItem("loom_and_love_wishlist");
          if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
          else setWishlist([]);
        } catch (e) {
          console.warn("Could not parse guest localStorage:", e);
        } finally {
          if (isMounted) setIsInitialized(true);
        }
      }
    }

    initializeData();

    return () => {
      isMounted = false;
    };
  }, [status, session?.user?.email, isAuthenticated]);

  // Persist changes: If logged in, save to MongoDB database (NEVER in localStorage). If guest, save to localStorage.
  useEffect(() => {
    if (!isInitialized) return;

    if (isAuthenticated) {
      // STRICT REQUIREMENT: Do NOT store in localStorage for logged-in user!
      try {
        localStorage.removeItem("loom_and_love_cart");
        localStorage.removeItem("loom_and_love_wishlist");
      } catch {}

      if (!hasSyncedWithDb.current) return;

      const timer = setTimeout(() => {
        fetch("/api/user/cart-wishlist", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart, wishlist }),
        }).catch((err) => console.error("Failed to sync cart/wishlist to database:", err));
      }, 300);

      return () => clearTimeout(timer);
    } else if (status === "unauthenticated") {
      // Guest only: save to localStorage
      try {
        localStorage.setItem("loom_and_love_cart", JSON.stringify(cart));
        localStorage.setItem("loom_and_love_wishlist", JSON.stringify(wishlist));
      } catch (e) {
        console.error(e);
      }
    }
  }, [cart, wishlist, isInitialized, isAuthenticated, status]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (i) =>
          i.productId === item.productId &&
          i.selectedColor === item.selectedColor &&
          i.selectedSize === item.selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity;
        return updated;
      }
      return [...prev, item];
    });

    toast.success(`Added ${item.title} to your bag 🌸`, {
      description: item.selectedColor ? `Color: ${item.selectedColor}` : "Handmade with love",
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedColor?: string, selectedSize?: string) => {
    setCart((prev) =>
      prev.filter(
        (i) =>
          !(
            i.productId === productId &&
            i.selectedColor === selectedColor &&
            i.selectedSize === selectedSize
          )
      )
    );
    toast.info("Item removed from your bag");
  };

  const updateQuantity = (
    productId: string,
    quantity: number,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor, selectedSize);
      return;
    }
    setCart((prev) =>
      prev.map((i) => {
        if (
          i.productId === productId &&
          i.selectedColor === selectedColor &&
          i.selectedSize === selectedSize
        ) {
          return { ...i, quantity };
        }
        return i;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setGiftWrap(false);
    setGiftMessage("");
    setCouponCode("");
    setDiscountPercent(0);
    setDiscountFixed(0);
    try {
      localStorage.removeItem("loom_and_love_cart");
      localStorage.removeItem("loom_and_love_coupon");
    } catch {}

    if (isAuthenticated) {
      fetch("/api/user/cart-wishlist", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart: [] }),
      }).catch((err) => console.error("Failed to clear cart in database:", err));
    }
  };

  // Calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const giftWrapFee = giftWrap ? GIFT_WRAP_PRICE : 0;

  // Coupon application logic
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === "LOOM10") {
      if (subtotal < 999) {
        return { success: false, message: "Code LOOM10 requires a minimum order of ₹999." };
      }
      setCouponCode("LOOM10");
      setDiscountPercent(10);
      setDiscountFixed(0);
      localStorage.setItem("loom_and_love_coupon", JSON.stringify({ code: "LOOM10", percent: 10 }));
      return { success: true, message: "Yay! 10% discount applied to your order." };
    } else if (cleanCode === "FIRSTLOVE") {
      if (subtotal < 1499) {
        return { success: false, message: "Code FIRSTLOVE requires a minimum order of ₹1499." };
      }
      setCouponCode("FIRSTLOVE");
      setDiscountFixed(200);
      setDiscountPercent(0);
      localStorage.setItem("loom_and_love_coupon", JSON.stringify({ code: "FIRSTLOVE", fixed: 200 }));
      return { success: true, message: "₹200 flat discount applied!" };
    } else if (cleanCode === "FREESHIP") {
      setCouponCode("FREESHIP");
      setDiscountFixed(0);
      setDiscountPercent(0);
      localStorage.setItem("loom_and_love_coupon", JSON.stringify({ code: "FREESHIP" }));
      return { success: true, message: "Free shipping coupon activated!" };
    }
    return { success: false, message: "Invalid promo code. Try LOOM10 or FIRSTLOVE." };
  };

  const removeCoupon = () => {
    setCouponCode("");
    setDiscountPercent(0);
    setDiscountFixed(0);
    localStorage.removeItem("loom_and_love_coupon");
    toast.info("Coupon code removed");
  };

  const discountAmount =
    discountPercent > 0
      ? Math.round((subtotal * discountPercent) / 100)
      : Math.min(discountFixed, subtotal);

  const shippingFee =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD || couponCode === "FREESHIP"
      ? 0
      : BASE_SHIPPING_FEE;

  const total = Math.max(0, subtotal - discountAmount + giftWrapFee + shippingFee);

  // Wishlist actions
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        toast.info("Removed from your wishlist");
        return prev.filter((id) => id !== productId);
      } else {
        toast.success("Saved to your wishlist 💖");
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);
  const wishlistCount = wishlist.length;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        giftWrap,
        setGiftWrap,
        giftMessage,
        setGiftMessage,
        giftWrapFee,
        couponCode,
        discountAmount,
        applyCoupon,
        removeCoupon,
        shippingFee,
        total,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

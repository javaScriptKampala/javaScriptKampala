'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useEffect, useState, useMemo, ReactNode } from 'react';
import { CartItem, Currency, Product, ProductVariant, PlacedOrder } from '@/types/store';
import { PROMO_CODES, FREE_GIFT_THRESHOLD_UGX, FREE_GIFT_THRESHOLD_USD } from '@/data/storeProducts';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  formatPrice: (ugx: number, usd: number) => string;
  formatAmount: (amount: number, curr?: Currency) => string;
  discountCode: string;
  discountRate: number;
  applyDiscountCode: (code: string) => { success: boolean; message: string };
  removeDiscountCode: () => void;
  subtotalUGX: number;
  subtotalUSD: number;
  discountUGX: number;
  discountUSD: number;
  totalUGX: number;
  totalUSD: number;
  totalItemCount: number;
  freeGiftProgress: number; // 0 to 100
  qualifiesForFreeGift: boolean;
  selectedProductForModal: Product | null;
  setSelectedProductForModal: (product: Product | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  lastPlacedOrder: PlacedOrder | null;
  setLastPlacedOrder: (order: PlacedOrder | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'jskla_store_cart_v1';
const CURRENCY_STORAGE_KEY = 'jskla_store_currency_v1';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [currency, setCurrencyState] = useState<Currency>('UGX');
  const [isInitialized, setIsInitialized] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountRate, setDiscountRate] = useState(0);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<PlacedOrder | null>(null);

  // Initialize from localStorage after client hydration
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setItems(JSON.parse(savedCart));
      }
      const savedCurr = localStorage.getItem(CURRENCY_STORAGE_KEY);
      if (savedCurr === 'USD') {
        setCurrencyState('USD');
      }
    } catch (e) {
      console.error('Failed to read store state from localStorage', e);
    }
    setIsInitialized(true);
  }, []);

  // Sync cart to localStorage after initialization
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items, isInitialized]);

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
    try {
      localStorage.setItem(CURRENCY_STORAGE_KEY, curr);
    } catch (e) {
      console.error('Failed to save currency to localStorage', e);
    }
  };

  const addItem = (product: Product, variant?: ProductVariant, quantity: number = 1) => {
    setItems((prev) => {
      const targetVariant =
        variant ||
        (product.variants
          ? product.variants.find((v) => v.id === product.defaultVariantId) || product.variants[0]
          : undefined);
      const existingIndex = prev.findIndex(
        (i) => i.product.id === product.id && i.selectedVariant?.id === targetVariant?.id
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Math.min(newQty, product.stockCount),
        };
        return updated;
      }

      return [
        ...prev,
        {
          product,
          selectedVariant: targetVariant,
          quantity: Math.min(quantity, product.stockCount),
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeItem = (productId: string, variantId?: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.selectedVariant?.id === variantId))
    );
  };

  const updateQuantity = (productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeItem(productId, variantId);
      return;
    }

    setItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedVariant?.id === variantId) {
          return {
            ...item,
            quantity: Math.min(quantity, item.product.stockCount),
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyDiscountCode = (rawCode: string) => {
    const code = rawCode.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setDiscountCode(code);
      setDiscountRate(PROMO_CODES[code]);
      return { success: true, message: `Promo ${code} applied (${PROMO_CODES[code] * 100}% off)` };
    }
    return { success: false, message: 'Invalid promo code. Try "JSKLA5"' };
  };

  const removeDiscountCode = () => {
    setDiscountCode('');
    setDiscountRate(0);
  };

  const subtotalUGX = useMemo(
    () => items.reduce((sum, item) => sum + item.product.priceUGX * item.quantity, 0),
    [items]
  );

  const subtotalUSD = useMemo(
    () => items.reduce((sum, item) => sum + item.product.priceUSD * item.quantity, 0),
    [items]
  );

  const discountUGX = useMemo(() => Math.round(subtotalUGX * discountRate), [subtotalUGX, discountRate]);
  const discountUSD = useMemo(() => Math.round(subtotalUSD * discountRate * 10) / 10, [subtotalUSD, discountRate]);

  const totalUGX = Math.max(0, subtotalUGX - discountUGX);
  const totalUSD = Math.max(0, subtotalUSD - discountUSD);

  const totalItemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const qualifiesForFreeGift =
    currency === 'UGX' ? subtotalUGX >= FREE_GIFT_THRESHOLD_UGX : subtotalUSD >= FREE_GIFT_THRESHOLD_USD;

  const freeGiftProgress = useMemo(() => {
    if (currency === 'UGX') {
      return Math.min(100, Math.round((subtotalUGX / FREE_GIFT_THRESHOLD_UGX) * 100));
    } else {
      return Math.min(100, Math.round((subtotalUSD / FREE_GIFT_THRESHOLD_USD) * 100));
    }
  }, [currency, subtotalUGX, subtotalUSD]);

  const formatAmount = (amount: number, currOverride?: Currency) => {
    const curr = currOverride || currency;
    if (curr === 'UGX') {
      return `UGX ${amount.toLocaleString('en-US')}`;
    }
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  };

  const formatPrice = (ugx: number, usd: number) => {
    if (currency === 'UGX') {
      return `UGX ${ugx.toLocaleString('en-US')}`;
    }
    return `$${usd.toLocaleString('en-US')}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        currency,
        setCurrency,
        formatPrice,
        formatAmount,
        discountCode,
        discountRate,
        applyDiscountCode,
        removeDiscountCode,
        subtotalUGX,
        subtotalUSD,
        discountUGX,
        discountUSD,
        totalUGX,
        totalUSD,
        totalItemCount,
        freeGiftProgress,
        qualifiesForFreeGift,
        selectedProductForModal,
        setSelectedProductForModal,
        isCheckoutOpen,
        setIsCheckoutOpen,
        lastPlacedOrder,
        setLastPlacedOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

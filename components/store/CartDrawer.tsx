'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, Tag, Gift } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { FREE_GIFT_THRESHOLD_UGX, FREE_GIFT_THRESHOLD_USD } from '@/data/storeProducts';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    clearCart,
    currency,
    setCurrency,
    formatAmount,
    discountCode,
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
    setIsCheckoutOpen,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ success: boolean; message: string } | null>(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyDiscountCode(promoInput);
    setPromoFeedback(res);
    if (res.success) {
      setPromoInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const remainingForGift =
    currency === 'UGX'
      ? Math.max(0, FREE_GIFT_THRESHOLD_UGX - subtotalUGX)
      : Math.max(0, FREE_GIFT_THRESHOLD_USD - subtotalUSD);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart"
      className="fixed inset-0 z-[80] overflow-hidden"
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0a0a0a] border-l border-gray-800 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-js-yellow text-black p-2 font-black">
                <ShoppingBag size={18} />
              </div>
              <div>
                <h2 className="text-lg font-black uppercase tracking-tight text-white">
                  Your Cart ({totalItemCount})
                </h2>
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                  JavaScript Kampala Official Swag
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Currency Toggle */}
              <div className="inline-flex border border-gray-800 p-0.5 bg-black">
                <button
                  type="button"
                  onClick={() => setCurrency('UGX')}
                  className={`px-2 py-0.5 text-[10px] font-mono font-bold transition-colors ${
                    currency === 'UGX' ? 'bg-js-yellow text-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  UGX
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`px-2 py-0.5 text-[10px] font-mono font-bold transition-colors ${
                    currency === 'USD' ? 'bg-js-yellow text-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  USD
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Free Gift Threshold Progress Bar */}
          <div className="bg-black px-6 py-3 border-b border-gray-900">
            <div className="flex items-center justify-between text-[11px] mb-1.5 font-mono">
              <span className="flex items-center gap-1.5 font-bold text-white">
                <Gift size={13} className="text-js-yellow" />
                {qualifiesForFreeGift ? (
                  <span className="text-js-yellow">Free Sticker Pack Unlocked!</span>
                ) : (
                  <span>
                    Add <strong className="text-js-yellow">{formatAmount(remainingForGift)}</strong> for Free Stickers
                  </span>
                )}
              </span>
              <span className="text-gray-500">{freeGiftProgress}%</span>
            </div>
            <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-js-yellow h-full transition-all duration-500 ease-out"
                style={{ width: `${freeGiftProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-gray-900 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-500">
                  <ShoppingBag size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-base uppercase text-white">Your cart is empty</h3>
                  <p className="text-xs text-gray-400 max-w-xs mt-1">
                    Grab a limited-edition anniversary hoodie, classic Kampala dev tee, or laptop stickers to support our community.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="bg-js-yellow hover:bg-white text-black font-black uppercase text-xs px-5 py-2.5 tracking-wider transition-colors"
                >
                  Browse Swag
                </button>
              </div>
            ) : (
              items.map((item, index) => {
                const itemPrice = currency === 'UGX' ? item.product.priceUGX : item.product.priceUSD;
                return (
                  <div key={`${item.product.id}-${item.selectedVariant?.id || index}`} className="pt-4 first:pt-0 flex gap-4">
                    {/* Item Thumbnail */}
                    <div className="w-20 h-20 bg-black border border-gray-800 p-1 flex-shrink-0 flex items-center justify-center">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-black text-xs uppercase tracking-tight text-white truncate pr-2">
                            {item.product.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => removeItem(item.product.id, item.selectedVariant?.id)}
                            className="text-gray-500 hover:text-red-400 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        {item.selectedVariant && (
                          <span className="text-[10px] font-mono text-js-yellow block mt-0.5">
                            Variant: {item.selectedVariant.name}
                          </span>
                        )}
                      </div>

                      {/* Quantity & Item Subtotal */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-800 bg-black">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedVariant?.id)}
                            className="px-2 py-0.5 text-xs text-gray-400 hover:text-white"
                          >
                            -
                          </button>
                          <span className="px-2 py-0.5 text-xs font-mono font-bold text-white min-w-[1.5rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedVariant?.id)}
                            className="px-2 py-0.5 text-xs text-gray-400 hover:text-white"
                          >
                            +
                          </button>
                        </div>

                        <div className="font-mono font-black text-xs text-white">
                          {formatAmount(itemPrice * item.quantity)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Free Gift Card if unlocked */}
            {qualifiesForFreeGift && items.length > 0 && (
              <div className="pt-4 flex gap-3 p-3 bg-js-yellow/10 border border-js-yellow/40">
                <div className="w-10 h-10 bg-js-yellow text-black flex items-center justify-center font-black shrink-0">
                  <Sparkles size={18} />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-js-yellow uppercase tracking-wide">
                    Free Bonus Gift Included
                  </div>
                  <div className="text-gray-400 text-[11px]">
                    1x Die-Cut Holographic Sticker Pack (Auto-applied to order)
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-gray-800 bg-black space-y-4">
              {/* Promo code input */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={13} className="absolute left-3 top-3 text-gray-500" />
                    <input
                      type="text"
                      placeholder="PROMO CODE (e.g. JSKLA5)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full bg-[#111] border border-gray-800 pl-8 pr-3 py-2 text-xs font-mono uppercase text-white placeholder:text-gray-600 focus:border-js-yellow outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 text-xs font-mono font-bold uppercase transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoFeedback && (
                  <p
                    className={`text-[10px] font-mono ${
                      promoFeedback.success ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {promoFeedback.message}
                  </p>
                )}
                {discountCode && (
                  <div className="flex items-center justify-between text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-1">
                    <span>Coupon: {discountCode}</span>
                    <button
                      type="button"
                      onClick={removeDiscountCode}
                      className="text-gray-400 hover:text-white text-[10px] underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>{formatAmount(currency === 'UGX' ? subtotalUGX : subtotalUSD)}</span>
                </div>
                {(currency === 'UGX' ? discountUGX : discountUSD) > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span>-{formatAmount(currency === 'UGX' ? discountUGX : discountUSD)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-400">
                  <span>Delivery</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="pt-2 border-t border-gray-800 flex justify-between text-base font-black font-sans text-white">
                  <span className="uppercase">Total</span>
                  <span className="text-js-yellow font-mono text-lg">
                    {formatAmount(currency === 'UGX' ? totalUGX : totalUSD)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full bg-js-yellow hover:bg-white text-black font-black uppercase text-xs py-3.5 px-4 tracking-widest flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>

              <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 pt-1">
                <span>MoMo • Airtel • Card • Pickup</span>
                <button
                  type="button"
                  onClick={clearCart}
                  className="hover:text-red-400 underline transition-colors"
                >
                  Clear Bag
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

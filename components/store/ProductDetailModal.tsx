'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Check, ShoppingBag, ShieldCheck, Heart } from 'lucide-react';
import { ProductVariant } from '@/types/store';
import { useCart } from '@/context/CartContext';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductForModal: product,
    setSelectedProductForModal,
    addItem,
    formatPrice,
  } = useCart();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  useEffect(() => {
    if (product) {
      if (product.variants && product.variants.length > 0) {
        const initial = product.variants.find((v) => v.id === product.defaultVariantId) || product.variants[0];
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedVariant(initial);
      } else {
        setSelectedVariant(undefined);
      }
      setQuantity(1);
      setAddedSuccess(false);
    }
  }, [product]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProductForModal(null);
      }
    };
    if (product) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, setSelectedProductForModal]);

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      setSelectedProductForModal(null);
    }, 900);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={() => setSelectedProductForModal(null)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#0d0d0d] border border-gray-800 shadow-2xl z-10 my-8 flex flex-col md:flex-row overflow-hidden max-h-[90vh]">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setSelectedProductForModal(null)}
          className="absolute top-4 right-4 z-20 bg-black/60 p-2 border border-gray-800 text-gray-400 hover:text-js-yellow hover:border-js-yellow transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Left: Product Artwork Preview */}
        <div className="w-full md:w-1/2 bg-black flex flex-col items-center justify-center p-8 border-b md:border-b-0 md:border-r border-gray-800 relative">
          <div className="w-full aspect-square max-w-[340px] flex items-center justify-center">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(247,223,30,0.15)]"
            />
          </div>

          <div className="mt-4 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-gray-500">
            <ShieldCheck size={14} className="text-js-yellow" /> Official JS Kampala Swag
          </div>
        </div>

        {/* Right: Product Details & Controls */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.badge && (
                  <span className="inline-flex items-center px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-js-yellow text-black">
                    {product.badge}
                  </span>
                )}
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                  {product.category}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
                {product.name}
              </h2>
              <p className="text-xs font-mono text-js-yellow mt-1">{product.tagline}</p>
            </div>

            {/* Price display */}
            <div className="flex items-baseline gap-3 pb-3 border-b border-gray-800">
              <span className="text-2xl md:text-3xl font-black text-white">
                {formatPrice(product.priceUGX, product.priceUSD)}
              </span>
              <span className="text-[11px] font-mono text-emerald-400">
                ● {product.stockCount > 0 ? `${product.stockCount} in stock` : 'Sold Out'}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-300 leading-relaxed">
              {product.detailedDescription || product.description}
            </p>

            {/* Variants (e.g. Sizing) */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2 pt-2">
                <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-400 block">
                  Select Size:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => {
                    const isSelected = selectedVariant?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        disabled={!v.inStock}
                        onClick={() => setSelectedVariant(v)}
                        className={`min-w-[42px] px-3 py-1.5 text-xs font-mono font-bold border transition-all ${
                          !v.inStock
                            ? 'border-gray-800 text-gray-700 line-through cursor-not-allowed bg-black/40'
                            : isSelected
                            ? 'border-js-yellow bg-js-yellow text-black font-black'
                            : 'border-gray-800 text-gray-300 hover:border-gray-600 bg-black/40'
                        }`}
                      >
                        {v.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Specifications */}
            <div className="pt-3 border-t border-gray-800 space-y-1.5 text-[11px]">
              <div className="text-gray-500 font-mono uppercase text-[9px] tracking-wider mb-1">
                Item Specs:
              </div>
              <div className="text-gray-300">
                <span className="text-gray-500">Material:</span> {product.specs.material}
              </div>
              {product.specs.fit && (
                <div className="text-gray-300">
                  <span className="text-gray-500">Fit:</span> {product.specs.fit}
                </div>
              )}
              {product.specs.capacity && (
                <div className="text-gray-300">
                  <span className="text-gray-500">Capacity:</span> {product.specs.capacity}
                </div>
              )}
              {product.specs.size && (
                <div className="text-gray-300">
                  <span className="text-gray-500">Size:</span> {product.specs.size}
                </div>
              )}
              {product.specs.origin && (
                <div className="text-gray-300">
                  <span className="text-gray-500">Origin:</span> {product.specs.origin}
                </div>
              )}
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <ul className="space-y-1 pt-1 text-[11px] text-gray-400">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-js-yellow mt-0.5">✦</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Community Impact note */}
            <div className="p-3 bg-js-yellow/10 border-l-2 border-js-yellow flex items-start gap-2 text-[11px] text-gray-300">
              <Heart size={14} className="text-js-yellow shrink-0 mt-0.5" />
              <span>
                <strong className="text-white">100% Community-Funded:</strong> Every purchase helps sponsor meetup venues, refreshments, and free tickets for students and early-career devs in Uganda.
              </span>
            </div>
          </div>

          {/* Quantity & Add to Cart button */}
          <div className="pt-6 border-t border-gray-800 mt-6 flex items-center gap-3">
            <div className="flex items-center border border-gray-800 bg-black">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-3 py-2 font-mono text-xs font-bold text-white min-w-[2rem] text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                className="px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                disabled={quantity >= product.stockCount}
              >
                +
              </button>
            </div>

            <button
              type="button"
              disabled={product.stockCount <= 0}
              onClick={handleAddToCart}
              className={`flex-1 py-3 px-4 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                addedSuccess
                  ? 'bg-emerald-500 text-black'
                  : 'bg-js-yellow hover:bg-white text-black active:scale-[0.98]'
              } ${product.stockCount <= 0 ? 'opacity-40 cursor-not-allowed bg-gray-800 text-gray-500' : ''}`}
            >
              {addedSuccess ? (
                <>
                  <Check size={16} /> Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingBag size={16} /> Add to Cart (
                  {formatPrice(product.priceUGX * quantity, product.priceUSD * quantity)})
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

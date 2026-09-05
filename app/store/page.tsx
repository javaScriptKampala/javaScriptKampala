'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ShoppingBag,
  Search,
  Filter,
  Sparkles,
  Heart,
  Truck,
  ShieldCheck,
  Zap,
  HelpCircle,
  Gift,
} from 'lucide-react';
import { Section, Heading, Card, Badge } from '@/components/UI';
import { useCart } from '@/context/CartContext';
import { STORE_PRODUCTS } from '@/data/storeProducts';
import { ProductCategory } from '@/types/store';
import { ProductCard } from '@/components/store/ProductCard';
import { ProductDetailModal } from '@/components/store/ProductDetailModal';
import { CartDrawer } from '@/components/store/CartDrawer';
import { CheckoutModal } from '@/components/store/CheckoutModal';

export default function StorePage() {
  const {
    totalItemCount,
    setIsCartOpen,
    currency,
    setCurrency,
    qualifiesForFreeGift,
  } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Items' },
    { id: 'apparel', label: 'Apparel' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'stickers', label: 'Stickers' },
    { id: 'drinkware', label: 'Drinkware' },
  ];

  const filteredProducts = useMemo(() => {
    return STORE_PRODUCTS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      {/* Hero Section */}
      <div className="bg-[#050505] border-b border-gray-800 pt-12 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-js-yellow/5 skew-x-12 transform origin-top-right pointer-events-none" />

        <Section noPadding>
          <div className="max-w-7xl mx-auto px-4">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-gray-500 hover:text-js-yellow transition-colors"
              >
                <ArrowLeft size={16} />
                Back to Home
              </Link>

              <div className="flex items-center gap-3">
                {/* Currency Switch */}
                <div className="inline-flex border border-gray-800 p-0.5 bg-black">
                  <button
                    type="button"
                    onClick={() => setCurrency('UGX')}
                    className={`px-3 py-1 text-xs font-mono font-bold transition-colors ${
                      currency === 'UGX'
                        ? 'bg-js-yellow text-black'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    UGX (USh)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency('USD')}
                    className={`px-3 py-1 text-xs font-mono font-bold transition-colors ${
                      currency === 'USD'
                        ? 'bg-js-yellow text-black'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    USD ($)
                  </button>
                </div>

                {/* Cart Button */}
                <button
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  className="bg-js-yellow hover:bg-white text-black px-5 py-2 font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all active:scale-95 border-2 border-js-yellow hover:border-white"
                >
                  <ShoppingBag size={16} />
                  <span>Bag ({totalItemCount})</span>
                </button>
              </div>
            </div>

            {/* Hero Main Content */}
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge color="yellow">Official Merch</Badge>
                <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
                  Celebrating 5 Years of Community
                </span>
                {qualifiesForFreeGift && (
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 flex items-center gap-1">
                    <Gift size={11} /> Free Sticker Pack Unlocked!
                  </span>
                )}
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white mb-6 uppercase leading-[0.85] tracking-tighter">
                Wear Your Code. <br />
                <span
                  className="text-transparent bg-clip-text bg-none stroke-white"
                  style={{ WebkitTextStroke: '1px white' }}
                >
                  Support Kampala.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl leading-relaxed border-l-4 border-js-yellow pl-6 mb-8">
                100% of all swag proceeds fund developer meetups, student tickets, speaker kits, and open-source maker grants across Uganda.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-800 text-xs font-mono text-gray-400 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-js-yellow" /> MTN &amp; Airtel MoMo Accepted
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={14} className="text-js-yellow" /> Boda or Meetup Pickup
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-js-yellow" /> Official 5th Year Edition
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* Catalog Section */}
      <Section className="py-12 md:py-16">
        {/* Search, Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#0a0a0a] border border-gray-800 p-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs font-mono font-bold uppercase tracking-wider px-4 py-2.5 transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-js-yellow text-black font-black'
                    : 'bg-black text-gray-400 hover:text-white hover:bg-gray-900 border border-gray-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search size={14} className="absolute left-3 top-3.5 text-gray-500" />
            <input
              type="text"
              placeholder="SEARCH SWAG..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black border border-gray-800 pl-9 pr-3 py-2.5 text-xs font-mono uppercase text-white placeholder:text-gray-600 focus:border-js-yellow outline-none"
            />
          </div>
        </div>

        {/* Product Count / Clear Search */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-gray-500">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'Item' : 'Items'}
          </span>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-xs font-mono text-js-yellow hover:underline"
            >
              Clear search
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="p-16 text-center bg-[#0a0a0a] border border-gray-800 space-y-4">
            <div className="w-12 h-12 bg-black border border-gray-800 mx-auto flex items-center justify-center text-gray-500">
              <Filter size={20} />
            </div>
            <h3 className="text-lg font-bold uppercase text-white">No products found</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto font-mono">
              Try changing your search terms or resetting the selected category filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="bg-gray-800 hover:bg-gray-700 text-white text-xs font-mono uppercase px-5 py-2.5 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Section>

      {/* Community Impact & Perks */}
      <Section className="py-12 bg-[#050505] border-t border-b border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8">
            <div className="text-js-yellow mb-4">
              <Heart size={28} />
            </div>
            <h3 className="text-lg font-bold uppercase text-white tracking-wide mb-2">
              100% Non-Profit
            </h3>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              Every shilling raised directly pays for meetup refreshments, venue sound systems, and scholarships for Ugandan developers.
            </p>
          </Card>

          <Card className="p-8">
            <div className="text-js-yellow mb-4">
              <Truck size={28} />
            </div>
            <h3 className="text-lg font-bold uppercase text-white tracking-wide mb-2">
              Kampala Delivery
            </h3>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              Pick up for free at the next community meetup, collect from The Innovation Village / MoTIV, or get door-to-door Boda delivery.
            </p>
          </Card>

          <Card className="p-8">
            <div className="text-js-yellow mb-4">
              <Sparkles size={28} />
            </div>
            <h3 className="text-lg font-bold uppercase text-white tracking-wide mb-2">
              Bespoke Kampala Swag
            </h3>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              Locally designed and screenprinted in Kampala, combining technical dev humor with East African streetwear style.
            </p>
          </Card>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section className="py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center gap-3">
            <HelpCircle size={22} className="text-js-yellow" />
            <Heading level={2}>Store FAQ</Heading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <div className="space-y-2 border-l-2 border-js-yellow pl-4">
              <h4 className="font-bold text-white uppercase tracking-wider">
                How do I pay with MTN or Airtel MoMo?
              </h4>
              <p className="text-gray-400 leading-relaxed font-light">
                Choose Mobile Money during checkout and enter your number. You will receive an instant push notification on your phone to approve with your PIN.
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-js-yellow pl-4">
              <h4 className="font-bold text-white uppercase tracking-wider">
                Can I collect my order at the meetup?
              </h4>
              <p className="text-gray-400 leading-relaxed font-light">
                Yes! Select &quot;Free Meetup Pickup&quot; during checkout. We will hold your package at the registration desk for you to claim with your order ID.
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-js-yellow pl-4">
              <h4 className="font-bold text-white uppercase tracking-wider">
                Can I exchange my size?
              </h4>
              <p className="text-gray-400 leading-relaxed font-light">
                Yes, unwashed and unworn apparel can be exchanged for another size at any JS Kampala meetup.
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-js-yellow pl-4">
              <h4 className="font-bold text-white uppercase tracking-wider">
                Do you ship internationally?
              </h4>
              <p className="text-gray-400 leading-relaxed font-light">
                Yes, international shipping via DHL is available for diaspora community supporters upon request.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
    </div>
  );
}

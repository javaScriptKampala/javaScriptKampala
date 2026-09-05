'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Smartphone, Truck, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '@/context/CartContext';
import { DELIVERY_FEES } from '@/data/storeProducts';
import { DeliveryMethod, PaymentMethod, PlacedOrder } from '@/types/store';

export const CheckoutModal: React.FC = () => {
  const {
    items,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
    currency,
    formatAmount,
    subtotalUGX,
    subtotalUSD,
    discountUGX,
    discountUSD,
    totalUGX,
    totalUSD,
    qualifiesForFreeGift,
    setLastPlacedOrder,
  } = useCart();

  const [step, setStep] = useState<'form' | 'processing' | 'confirmed'>('form');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('pickup_meetup');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mtn_momo');
  const [momoNumber, setMomoNumber] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<PlacedOrder | null>(null);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCheckoutOpen && step !== 'processing') {
        setIsCheckoutOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCheckoutOpen, step, setIsCheckoutOpen]);

  if (!isCheckoutOpen) return null;

  const deliveryFeeUGX = DELIVERY_FEES[deliveryMethod].UGX;
  const deliveryFeeUSD = DELIVERY_FEES[deliveryMethod].USD;

  const grandTotalUGX = totalUGX + deliveryFeeUGX;
  const grandTotalUSD = totalUSD + deliveryFeeUSD;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');

    const orderId = `JSKLA-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: PlacedOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      items: [...items],
      customer: {
        fullName,
        email,
        phone,
        deliveryMethod,
        deliveryAddress:
          deliveryMethod === 'boda_kampala' || deliveryMethod === 'regional_uganda'
            ? deliveryAddress
            : undefined,
        notes,
        paymentMethod,
        momoNumber:
          paymentMethod === 'mtn_momo' || paymentMethod === 'airtel_money'
            ? momoNumber || phone
            : undefined,
      },
      subtotalUGX,
      subtotalUSD,
      discountUGX,
      discountUSD,
      deliveryFeeUGX,
      deliveryFeeUSD,
      totalUGX: grandTotalUGX,
      totalUSD: grandTotalUSD,
      currency,
      status: paymentMethod === 'pay_on_pickup' ? 'ready_for_pickup' : 'confirmed',
    };

    setTimeout(() => {
      setConfirmedOrder(newOrder);
      setLastPlacedOrder(newOrder);
      setStep('confirmed');
      clearCart();

      // Trigger Confetti explosion
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F7DF1E', '#ffffff', '#000000', '#ffd700'],
        });
      } catch (err) {
        console.error('Confetti error', err);
      }
    }, 1400);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep('form');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={step === 'processing' ? undefined : handleClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Main Checkout Modal Window */}
      <div className="relative w-full max-w-2xl bg-[#0d0d0d] border border-gray-800 shadow-2xl z-10 my-6 overflow-hidden max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-gray-800 bg-black flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-js-yellow text-black px-2.5 py-0.5 font-black text-xs uppercase tracking-tighter">
              JS KAMPALA
            </span>
            <h3 className="font-black text-base uppercase tracking-tight text-white">
              {step === 'confirmed' ? 'Order Confirmed!' : 'Community Swag Checkout'}
            </h3>
          </div>
          {step !== 'processing' && (
            <button
              type="button"
              onClick={handleClose}
              className="p-1.5 text-gray-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 'processing' && (
            <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-12 h-12 border-4 border-js-yellow border-t-transparent rounded-full animate-spin" />
              <h4 className="text-lg font-black uppercase text-white">Processing Order...</h4>
              <p className="text-xs text-gray-400 max-w-sm">
                Generating your community order slip and routing dispatch details.
              </p>
            </div>
          )}

          {step === 'confirmed' && confirmedOrder && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-js-yellow text-black mx-auto flex items-center justify-center">
                <CheckCircle size={36} />
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-js-yellow">
                  Payment &amp; Booking Registered
                </span>
                <h2 className="text-2xl font-black uppercase tracking-tight text-white mt-1">
                  Thank You, {confirmedOrder.customer.fullName}!
                </h2>
                <div className="inline-block mt-2 px-3 py-1 bg-gray-900 font-mono text-xs font-bold text-white border border-gray-800">
                  Reference: <span className="text-js-yellow">{confirmedOrder.orderId}</span>
                </div>
              </div>

              <div className="bg-black border border-gray-800 p-4 text-left text-xs font-mono space-y-2">
                <div className="flex justify-between text-gray-400 border-b border-gray-900 pb-2">
                  <span>Method</span>
                  <span className="text-white uppercase">
                    {DELIVERY_FEES[confirmedOrder.customer.deliveryMethod].label}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400 border-b border-gray-900 pb-2">
                  <span>Payment</span>
                  <span className="text-white uppercase">
                    {confirmedOrder.customer.paymentMethod.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex justify-between text-white font-bold pt-1">
                  <span>Grand Total</span>
                  <span className="text-js-yellow text-sm">
                    {formatAmount(
                      confirmedOrder.currency === 'UGX'
                        ? confirmedOrder.totalUGX
                        : confirmedOrder.totalUSD
                    )}
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
                A confirmation has been logged for{' '}
                <strong className="text-white">{confirmedOrder.customer.email}</strong>. If you
                picked Meetup or Hub pickup, you can collect your merch package using your reference
                number.
              </p>

              <button
                type="button"
                onClick={handleClose}
                className="bg-js-yellow hover:bg-white text-black font-black uppercase text-xs px-6 py-3 tracking-wider transition-colors"
              >
                Back to Store
              </button>
            </div>
          )}

          {step === 'form' && (
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Order summary mini bar */}
              <div className="bg-black p-4 border border-gray-800 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-gray-400">Items in Bag: </span>
                  <strong className="text-white">
                    {items.reduce((s, i) => s + i.quantity, 0)}
                  </strong>
                  {qualifiesForFreeGift && (
                    <span className="text-js-yellow ml-2 text-[10px]">+ Free Stickers 🎁</span>
                  )}
                </div>
                <div>
                  <span className="text-gray-400">Due: </span>
                  <strong className="text-js-yellow text-sm">
                    {formatAmount(currency === 'UGX' ? grandTotalUGX : grandTotalUSD)}
                  </strong>
                </div>
              </div>

              {/* Section 1: Customer Info */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-js-yellow flex items-center gap-1.5">
                  1. Contact Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-black border border-gray-800 p-3 text-white focus:border-js-yellow outline-none font-bold uppercase tracking-widest text-xs"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black border border-gray-800 p-3 text-white focus:border-js-yellow outline-none font-bold uppercase tracking-widest text-xs"
                  />
                </div>
                <input
                  type="tel"
                  required
                  placeholder="Phone / WhatsApp (+256...) *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-black border border-gray-800 p-3 text-white focus:border-js-yellow outline-none font-bold uppercase tracking-widest text-xs"
                />
              </div>

              {/* Section 2: Delivery & Pickup */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-js-yellow flex items-center gap-1.5">
                  <Truck size={14} /> 2. Collection or Delivery (Kampala)
                </h4>
                <div className="space-y-2">
                  {(Object.keys(DELIVERY_FEES) as DeliveryMethod[]).map((key) => {
                    const fee = DELIVERY_FEES[key];
                    const isSelected = deliveryMethod === key;
                    const feeText =
                      fee.UGX === 0 ? 'FREE' : formatAmount(currency === 'UGX' ? fee.UGX : fee.USD);
                    return (
                      <label
                        key={key}
                        className={`flex items-center justify-between p-3 border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-js-yellow bg-js-yellow/10'
                            : 'border-gray-800 hover:border-gray-700 bg-black'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="deliveryMethod"
                            checked={isSelected}
                            onChange={() => setDeliveryMethod(key)}
                            className="accent-yellow-400"
                          />
                          <span className="text-xs font-mono font-bold text-white">
                            {fee.label}
                          </span>
                        </div>
                        <span className="text-xs font-mono font-black text-js-yellow">
                          {feeText}
                        </span>
                      </label>
                    );
                  })}
                </div>

                {(deliveryMethod === 'boda_kampala' || deliveryMethod === 'regional_uganda') && (
                  <div className="pt-2">
                    <textarea
                      required
                      placeholder="Enter specific Drop-off Address / Landmark / Street in Kampala *"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      rows={2}
                      className="w-full bg-black border border-gray-800 p-3 text-white focus:border-js-yellow outline-none font-bold uppercase tracking-widest text-xs"
                    />
                  </div>
                )}
              </div>

              {/* Section 3: Payment Method */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-js-yellow flex items-center gap-1.5">
                  <Smartphone size={14} /> 3. Payment Method
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <label
                    className={`p-3 border cursor-pointer flex items-center gap-3 ${
                      paymentMethod === 'mtn_momo'
                        ? 'border-js-yellow bg-js-yellow/10 text-white'
                        : 'border-gray-800 text-gray-400 hover:border-gray-700 bg-black'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'mtn_momo'}
                      onChange={() => setPaymentMethod('mtn_momo')}
                      className="accent-yellow-400"
                    />
                    <span className="text-xs font-mono font-bold">MTN Mobile Money</span>
                  </label>

                  <label
                    className={`p-3 border cursor-pointer flex items-center gap-3 ${
                      paymentMethod === 'airtel_money'
                        ? 'border-js-yellow bg-js-yellow/10 text-white'
                        : 'border-gray-800 text-gray-400 hover:border-gray-700 bg-black'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'airtel_money'}
                      onChange={() => setPaymentMethod('airtel_money')}
                      className="accent-yellow-400"
                    />
                    <span className="text-xs font-mono font-bold">Airtel Money</span>
                  </label>

                  <label
                    className={`p-3 border cursor-pointer flex items-center gap-3 ${
                      paymentMethod === 'card'
                        ? 'border-js-yellow bg-js-yellow/10 text-white'
                        : 'border-gray-800 text-gray-400 hover:border-gray-700 bg-black'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-yellow-400"
                    />
                    <span className="text-xs font-mono font-bold">Debit / Credit Card</span>
                  </label>

                  <label
                    className={`p-3 border cursor-pointer flex items-center gap-3 ${
                      paymentMethod === 'pay_on_pickup'
                        ? 'border-js-yellow bg-js-yellow/10 text-white'
                        : 'border-gray-800 text-gray-400 hover:border-gray-700 bg-black'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'pay_on_pickup'}
                      onChange={() => setPaymentMethod('pay_on_pickup')}
                      className="accent-yellow-400"
                    />
                    <span className="text-xs font-mono font-bold">Pay on Pickup</span>
                  </label>
                </div>

                {(paymentMethod === 'mtn_momo' || paymentMethod === 'airtel_money') && (
                  <div className="pt-2">
                    <input
                      type="tel"
                      placeholder={`Enter ${paymentMethod === 'mtn_momo' ? 'MTN' : 'Airtel'} MoMo Number for Prompt (+256...)`}
                      value={momoNumber}
                      onChange={(e) => setMomoNumber(e.target.value)}
                      className="w-full bg-black border border-gray-800 p-3 text-white focus:border-js-yellow outline-none font-bold uppercase tracking-widest text-xs"
                    />
                  </div>
                )}
              </div>

              {/* Order Notes */}
              <div>
                <input
                  type="text"
                  placeholder="Special instructions or notes (optional)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-black border border-gray-800 p-3 text-white focus:border-js-yellow outline-none font-bold uppercase tracking-widest text-xs"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-gray-800 flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={items.length === 0}
                  className="w-full bg-js-yellow hover:bg-white text-black font-black uppercase text-xs py-4 px-4 tracking-widest transition-all active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  <span>Place Community Order</span>
                  <span>({formatAmount(currency === 'UGX' ? grandTotalUGX : grandTotalUSD)})</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-gray-500">
                  <ShieldCheck size={12} className="text-js-yellow" />
                  <span>Secure Community Swag Order Guarantee</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

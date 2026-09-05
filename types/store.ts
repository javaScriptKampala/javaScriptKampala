/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Currency = 'UGX' | 'USD';

export type ProductCategory = 'all' | 'apparel' | 'accessories' | 'stickers' | 'drinkware';

export interface ProductVariant {
  id: string;
  name: string; // e.g. 'S', 'M', 'L', 'XL', 'XXL'
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  detailedDescription?: string;
  category: ProductCategory;
  priceUGX: number;
  priceUSD: number;
  badge?: 'Limited Edition' | 'Bestseller' | 'Community Favorite' | 'Staff Pick' | 'New';
  variants?: ProductVariant[];
  defaultVariantId?: string;
  stockCount: number;
  specs: {
    material: string;
    fit?: string;
    printType?: string;
    origin?: string;
    capacity?: string;
    size?: string;
  };
  features: string[];
  imageUrl: string;
}

export interface CartItem {
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
}

export type DeliveryMethod = 'pickup_meetup' | 'hub_village' | 'boda_kampala' | 'regional_uganda';

export type PaymentMethod = 'mtn_momo' | 'airtel_money' | 'card' | 'pay_on_pickup';

export interface OrderCustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  deliveryMethod: DeliveryMethod;
  deliveryAddress?: string;
  notes?: string;
  paymentMethod: PaymentMethod;
  momoNumber?: string;
}

export interface PlacedOrder {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  customer: OrderCustomerInfo;
  subtotalUGX: number;
  subtotalUSD: number;
  discountUGX: number;
  discountUSD: number;
  deliveryFeeUGX: number;
  deliveryFeeUSD: number;
  totalUGX: number;
  totalUSD: number;
  currency: Currency;
  status: 'pending_payment' | 'confirmed' | 'ready_for_pickup';
}

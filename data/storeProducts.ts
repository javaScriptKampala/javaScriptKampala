/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from '../types/store';

// Helper to generate bespoke, stylish SVG product mockups in JS Kampala styling
function makeSvg(content: string, bg: string = '#0a0a0a'): string {
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
    <rect width="500" height="500" fill="${bg}"/>
    <pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse">
      <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
    </pattern>
    <rect width="500" height="500" fill="url(#grid)" />
    ${content}
    <text x="30" y="475" fill="#F7DF1E" font-family="monospace" font-size="11" font-weight="bold" letter-spacing="3">JS KAMPALA // MERCH</text>
    <text x="470" y="475" text-anchor="end" fill="rgba(255,255,255,0.3)" font-family="monospace" font-size="10">0.3476° N, 32.5825° E</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
}

export const STORE_PRODUCTS: Product[] = [
  {
    id: 'hoodie-5years',
    name: '5th Anniversary Heavyweight Hoodie',
    tagline: '5 Years of Kampala Community Fleece',
    description: 'Ultra-heavyweight 420 GSM brushed cotton hoodie celebrating 5 years of JavaScript Kampala. Features signature yellow drawstrings and Kampala coordinate backprint.',
    detailedDescription: 'Engineered for chilly rainy days in Kampala and late-night coding sessions. Crafted from 420 GSM 100% organic combed cotton with double-layer hood, hidden phone pouch in the kangaroo pocket, and high-density screenprinted 5-year commemorative graphics on the back.',
    category: 'apparel',
    priceUGX: 125000,
    priceUSD: 34,
    badge: 'Limited Edition',
    stockCount: 14,
    variants: [
      { id: 'h-s', name: 'S', inStock: true },
      { id: 'h-m', name: 'M', inStock: true },
      { id: 'h-l', name: 'L', inStock: true },
      { id: 'h-xl', name: 'XL', inStock: true },
      { id: 'h-xxl', name: 'XXL', inStock: false },
    ],
    defaultVariantId: 'h-l',
    specs: {
      material: '420 GSM 100% Organic Heavyweight Cotton',
      fit: 'Relaxed Drop-Shoulder Fit',
      printType: 'High-Density Plastisol & Embroidered Chest Patch',
      origin: 'Crafted & Screenprinted in Kampala, Uganda',
    },
    features: [
      'Commemorative "5 Years of JavaScript Kampala" back typography',
      'Dual-color braided drawstrings (JS Yellow & Obsidian Black)',
      'Hidden zippered internal stash pocket in kangaroo pouch',
      'Pre-shrunk fabric to retain shape across 100+ washes',
    ],
    imageUrl: makeSvg(`
      <!-- Hoodie Graphic -->
      <g transform="translate(250, 235) scale(0.95)">
        <path d="M-130,-120 L-60,-170 L60,-170 L130,-120 L160,-20 L115,0 L110,130 L-110,130 L-115,0 L-160,-20 Z" fill="#141414" stroke="#F7DF1E" stroke-width="3" stroke-linejoin="round"/>
        <!-- Hood curve -->
        <path d="M-55,-165 C-50,-215 50,-215 55,-165 Z" fill="#1c1c1c" stroke="#F7DF1E" stroke-width="2"/>
        <!-- Pocket -->
        <path d="M-70,40 L70,40 L55,115 L-55,115 Z" fill="#1c1c1c" stroke="rgba(247,223,30,0.4)" stroke-width="1.5"/>
        <!-- Chest Emblem -->
        <rect x="-35" y="-60" width="70" height="70" fill="#F7DF1E" rx="4"/>
        <text x="0" y="-18" fill="#000" font-family="system-ui, sans-serif" font-weight="900" font-size="26" text-anchor="middle">JS</text>
        <text x="0" y="2" fill="#000" font-family="system-ui, sans-serif" font-weight="900" font-size="9" letter-spacing="1" text-anchor="middle">KAMPALA</text>
        <!-- Yellow drawstring strings -->
        <path d="M-20,-140 Q-25,-90 -18,-50" fill="none" stroke="#F7DF1E" stroke-width="3" stroke-linecap="round"/>
        <path d="M20,-140 Q25,-90 18,-50" fill="none" stroke="#F7DF1E" stroke-width="3" stroke-linecap="round"/>
      </g>
    `),
  },
  {
    id: 'tee-luganda',
    name: 'console.log("Luganda") Classic Dev Tee',
    tagline: 'Speak Code. Speak Kampala.',
    description: 'The iconic community tee bridging software engineering with Kampala culture. Premium breathable combed cotton with sharp yellow terminal print.',
    detailedDescription: 'Our most celebrated community tee. Printed on bespoke jet-black cotton with a smooth silicone finish. Features a stylized interactive JavaScript console snippet honoring Luganda greetings and idioms.',
    category: 'apparel',
    priceUGX: 55000,
    priceUSD: 15,
    badge: 'Bestseller',
    stockCount: 28,
    variants: [
      { id: 't-s', name: 'S', inStock: true },
      { id: 't-m', name: 'M', inStock: true },
      { id: 't-l', name: 'L', inStock: true },
      { id: 't-xl', name: 'XL', inStock: true },
      { id: 't-xxl', name: 'XXL', inStock: true },
    ],
    defaultVariantId: 't-l',
    specs: {
      material: '220 GSM 100% Combed Compact Cotton',
      fit: 'Modern Tailored Dev Fit',
      printType: 'Soft-Hand Discharge Screenprint',
      origin: 'Printed in Kampala, Uganda',
    },
    features: [
      'Soft-touch, breathable water-based inks that never crack',
      'Reinforced ribbed neckband with taped shoulder seams',
      'Subtle woven JS Kampala hem tag on left sleeve',
    ],
    imageUrl: makeSvg(`
      <!-- Tee Graphic -->
      <g transform="translate(250, 240) scale(0.95)">
        <path d="M-125,-120 L-60,-150 L60,-150 L125,-120 L145,-50 L105,-40 L95,130 L-95,130 L-105,-40 L-145,-50 Z" fill="#141414" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
        <!-- Collar -->
        <path d="M-55,-145 C-30,-120 30,-120 55,-145" fill="none" stroke="#F7DF1E" stroke-width="3"/>
        <!-- Terminal code box on chest -->
        <rect x="-70" y="-70" width="140" height="90" fill="#0d0d0d" stroke="#F7DF1E" stroke-width="2" rx="4"/>
        <circle cx="-55" cy="-55" r="3" fill="#ff5f56"/>
        <circle cx="-45" cy="-55" r="3" fill="#ffbd2e"/>
        <circle cx="-35" cy="-55" r="3" fill="#27c93f"/>
        <text x="-55" y="-35" fill="#888" font-family="monospace" font-size="8">&gt; const greeting =</text>
        <text x="-55" y="-20" fill="#F7DF1E" font-family="monospace" font-size="9" font-weight="bold">"Oli Otya, Dev?";</text>
        <text x="-55" y="-5" fill="#888" font-family="monospace" font-size="8">&gt; console.log(greeting)</text>
        <text x="-55" y="10" fill="#27c93f" font-family="monospace" font-size="8">// "Bulungi!" ✨</text>
      </g>
    `),
  },
  {
    id: 'tee-buganda-road',
    name: 'Buganda Road to Production Tee',
    tagline: 'From Localhost to Buganda Road',
    description: 'A tribute to the heart of Kampala tech and the journey from debugging in a cafe to shipping to production servers.',
    detailedDescription: 'Featuring retro blueprint street-grid coordinates mixed with Git branch commands (`git checkout -b production`). Made from premium lightweight jersey cotton perfect for Kampala sunny afternoons.',
    category: 'apparel',
    priceUGX: 55000,
    priceUSD: 15,
    badge: 'Community Favorite',
    stockCount: 19,
    variants: [
      { id: 'br-s', name: 'S', inStock: true },
      { id: 'br-m', name: 'M', inStock: true },
      { id: 'br-l', name: 'L', inStock: true },
      { id: 'br-xl', name: 'XL', inStock: true },
    ],
    defaultVariantId: 'br-m',
    specs: {
      material: '100% Ring-Spun Cotton',
      fit: 'Regular Fit',
      printType: 'Precision Screenprint',
      origin: 'Kampala, Uganda',
    },
    features: [
      'Kampala landmark roadmap grid integrated into circuit traces',
      'Ultra-soft collar that holds shape',
      'Yellow accent contrast stitching on shoulders',
    ],
    imageUrl: makeSvg(`
      <!-- Buganda Road Tee Graphic -->
      <g transform="translate(250, 240) scale(0.95)">
        <path d="M-125,-120 L-60,-150 L60,-150 L125,-120 L145,-50 L105,-40 L95,130 L-95,130 L-105,-40 L-145,-50 Z" fill="#141414" stroke="#F7DF1E" stroke-width="2"/>
        <path d="M-55,-145 C-30,-120 30,-120 55,-145" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
        <!-- Git Route Diagram -->
        <circle cx="-40" cy="-30" r="7" fill="#F7DF1E"/>
        <line x1="-40" y1="-30" x2="0" y2="10" stroke="#F7DF1E" stroke-width="3"/>
        <circle cx="0" cy="10" r="7" fill="#fff"/>
        <line x1="0" y1="10" x2="40" y2="-30" stroke="#F7DF1E" stroke-width="3"/>
        <circle cx="40" cy="-30" r="7" fill="#F7DF1E"/>
        <text x="0" y="55" fill="#F7DF1E" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle">BUGANDA RD ➔ PROD</text>
        <text x="0" y="70" fill="#aaa" font-family="monospace" font-size="8" text-anchor="middle">ZERO DOWNTIME</text>
      </g>
    `),
  },
  {
    id: 'stickers-pack-10',
    name: 'Die-Cut Holographic Sticker Pack (10x)',
    tagline: '10 High-Gloss Waterproof Laptop Badges',
    description: 'Elevate your laptop lid with 10 custom holographic vinyl stickers featuring JavaScript Kampala logos, TypeScript memes, and Kampala tech culture.',
    detailedDescription: 'Includes the JS Kampala 5-Year Crest, "Oli Otya World", "Runs on Boda Boda Power", "async / await Rolex", and full-color TypeScript and React Kampala decals. Thick 6mil waterproof vinyl with scratch-resistant UV gloss finish.',
    category: 'stickers',
    priceUGX: 20000,
    priceUSD: 5,
    badge: 'Bestseller',
    stockCount: 75,
    specs: {
      material: '6mil Weatherproof Gloss Vinyl with Rainbow Holographic Sheen',
      origin: 'Printed with UV-resistant inks',
    },
    features: [
      '10 unique individual die-cut designs (no duplicates)',
      '100% waterproof, smudge-proof, and sun-resistant',
      'Leaves zero sticky residue upon removal from laptops or water bottles',
    ],
    imageUrl: makeSvg(`
      <!-- Sticker Pack Graphic -->
      <g transform="translate(250, 240)">
        <!-- Stack of stickers tilted -->
        <rect x="-70" y="-80" width="120" height="120" rx="8" fill="#181818" stroke="#F7DF1E" stroke-width="2" transform="rotate(-12)"/>
        <rect x="-60" y="-60" width="120" height="120" rx="8" fill="#F7DF1E" transform="rotate(8)"/>
        <text x="0" y="5" fill="#000" font-family="monospace" font-weight="900" font-size="28" text-anchor="middle" transform="rotate(8)">{ JS }</text>
        <text x="0" y="25" fill="#000" font-family="system-ui" font-weight="800" font-size="9" text-anchor="middle" letter-spacing="2" transform="rotate(8)">KAMPALA</text>
        <!-- Holographic sparkle elements -->
        <polygon points="60,-90 65,-80 75,-75 65,-70 60,-60 55,-70 45,-75 55,-80" fill="#fff"/>
        <polygon points="-80,70 -76,77 -69,81 -76,85 -80,92 -84,85 -91,81 -84,77" fill="#F7DF1E"/>
      </g>
    `),
  },
  {
    id: 'tote-matooke',
    name: '"Matooke & Modules" Heavy Canvas Tote',
    tagline: 'Carry Your Rig, Books & Snacks',
    description: 'Heavy-duty 14oz black canvas tote bag with reinforced handles, zip closure, and interior laptop sleeve. Printed with community pride.',
    detailedDescription: 'Constructed from sustainably sourced 14oz black cotton canvas. Sturdy enough to hold a 16-inch MacBook Pro, charger brick, mechanical keyboard, and daily market essentials without sagging.',
    category: 'accessories',
    priceUGX: 38000,
    priceUSD: 11,
    badge: 'Staff Pick',
    stockCount: 22,
    specs: {
      material: '14oz Heavy Organic Cotton Duck Canvas',
      origin: 'Kampala, Uganda',
    },
    features: [
      'Padded internal pouch fits laptops up to 16 inches',
      'Reinforced box-stitch handles with 30cm drop for comfortable shoulder carry',
      'Full top zipper keeps tech secure during transport in Kampala traffic',
    ],
    imageUrl: makeSvg(`
      <!-- Tote Bag Graphic -->
      <g transform="translate(250, 240)">
        <!-- Handles -->
        <path d="M-45,-70 C-45,-145 45,-145 45,-70" fill="none" stroke="#F7DF1E" stroke-width="6" stroke-linecap="round"/>
        <!-- Bag body -->
        <path d="M-80,-70 L80,-70 L70,110 L-70,110 Z" fill="#141414" stroke="#F7DF1E" stroke-width="3"/>
        <!-- Design on tote -->
        <rect x="-45" y="-20" width="90" height="80" fill="none" stroke="rgba(255,255,255,0.2)" stroke-dasharray="4"/>
        <text x="0" y="10" fill="#F7DF1E" font-family="monospace" font-size="11" font-weight="900" text-anchor="middle">MATOOKE &amp;</text>
        <text x="0" y="28" fill="#ffffff" font-family="monospace" font-size="11" font-weight="900" text-anchor="middle">MODULES</text>
        <text x="0" y="44" fill="#888" font-family="monospace" font-size="8" text-anchor="middle">import * from 'kla'</text>
      </g>
    `),
  },
  {
    id: 'cap-snapback',
    name: 'Structured Embroidered Dad Cap',
    tagline: 'Low-Profile Cotton Twill Hat',
    description: 'Six-panel structured cotton dad cap with 3D raised yellow JS Kampala logo embroidery and custom antique brass buckle closure.',
    detailedDescription: 'Engineered for everyday wear. Made with breathable 100% washed chino cotton twill with an unstructured low profile, curved brim, and embroidered eyelets for ventilation.',
    category: 'accessories',
    priceUGX: 45000,
    priceUSD: 12,
    badge: 'New',
    stockCount: 30,
    specs: {
      material: '100% Washed Chino Cotton Twill',
      fit: 'Adjustable One Size Fits All (Brass Buckle)',
      origin: 'Embroidered in Uganda',
    },
    features: [
      'High-density 3D raised front embroidery with crisp detail',
      'Curved brim with moisture-wicking sweatband inside',
      'Self-fabric strap with vintage brass slide buckle closure',
    ],
    imageUrl: makeSvg(`
      <!-- Cap Graphic -->
      <g transform="translate(250, 240)">
        <!-- Cap dome -->
        <path d="M-80,20 C-80,-60 80,-60 80,20 Z" fill="#141414" stroke="#F7DF1E" stroke-width="3"/>
        <!-- Bill / Visor -->
        <path d="M-85,20 C-70,55 90,55 125,15 C90,15 70,20 -85,20 Z" fill="#1b1b1b" stroke="#F7DF1E" stroke-width="2"/>
        <!-- Top button -->
        <circle cx="0" cy="-60" r="5" fill="#F7DF1E"/>
        <!-- Front Logo -->
        <rect x="-20" y="-35" width="40" height="35" fill="#F7DF1E" rx="3"/>
        <text x="0" y="-12" fill="#000" font-family="sans-serif" font-weight="900" font-size="16" text-anchor="middle">JS</text>
      </g>
    `),
  },
  {
    id: 'tumbler-500ml',
    name: 'Insulated Stainless Debugging Tumbler (500ml)',
    tagline: 'Keep Brew Hot Through All Stack Traces',
    description: 'Double-wall vacuum insulated stainless steel coffee tumbler with splash-proof lid. Keeps coffee steaming hot for 8 hours or iced tea cold for 16 hours.',
    detailedDescription: 'Whether sipping African spiced chai or bold dark roast espresso, this 500ml vacuum insulated tumbler is powder-coated in matte black with laser-etched JavaScript Kampala iconography.',
    category: 'drinkware',
    priceUGX: 65000,
    priceUSD: 18,
    badge: 'Staff Pick',
    stockCount: 16,
    specs: {
      material: '18/8 Food-Grade Kitchen Stainless Steel',
      capacity: '500ml (17 fl oz)',
      origin: 'BPA-Free / Laser Etched',
    },
    features: [
      'Double-wall vacuum insulation prevents condensation on desk',
      'Tritan shatter-proof slider lid fits stainless steel reusable straws',
      'Fits standard automotive and bicycle drink cup holders',
    ],
    imageUrl: makeSvg(`
      <!-- Tumbler Graphic -->
      <g transform="translate(250, 240)">
        <!-- Tumbler Body -->
        <path d="M-45,-80 L45,-80 L35,110 L-35,110 Z" fill="#161616" stroke="#F7DF1E" stroke-width="3"/>
        <!-- Lid -->
        <rect x="-48" y="-95" width="96" height="15" rx="3" fill="#252525" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
        <!-- Laser Etch -->
        <rect x="-25" y="-20" width="50" height="50" fill="none" stroke="#F7DF1E" stroke-width="2" stroke-dasharray="2"/>
        <text x="0" y="10" fill="#F7DF1E" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">500ml</text>
        <text x="0" y="24" fill="#888" font-family="monospace" font-size="8" text-anchor="middle">DEBUG FUEL</text>
      </g>
    `),
  },
  {
    id: 'pin-samosas',
    name: '"Syntax & Samosas" Enamel Lapel Pin',
    tagline: 'Collector Edition Metallic Pin',
    description: 'High-polish black nickel and hard yellow enamel lapel pin honoring Kampala meetup snacks and clean JavaScript code.',
    detailedDescription: 'Custom molded 1.25" hard enamel pin with gold/black nickel plating, dual rubber clutch backs for maximum backpack and jacket security, and custom backing card.',
    category: 'accessories',
    priceUGX: 18000,
    priceUSD: 5,
    badge: 'Limited Edition',
    stockCount: 45,
    specs: {
      material: 'Hard Enamel with Black Nickel Plating',
      size: '32mm (1.25 inches)',
      origin: 'Collector Edition Pin',
    },
    features: [
      'Double rubber pin clutches to prevent rotation or falling off',
      'Mounted on numbered collectible cardstock backing',
      'Smooth flush surface with polished luster',
    ],
    imageUrl: makeSvg(`
      <!-- Pin Graphic -->
      <g transform="translate(250, 240)">
        <!-- Triangular Samosa / Syntax shape -->
        <polygon points="0,-75 75,55 -75,55" fill="#141414" stroke="#F7DF1E" stroke-width="4" stroke-linejoin="round"/>
        <!-- Inner triangle -->
        <polygon points="0,-45 50,40 -50,40" fill="#F7DF1E"/>
        <text x="0" y="15" fill="#000" font-family="system-ui" font-size="18" font-weight="900" text-anchor="middle">&lt;/&gt;</text>
        <circle cx="0" cy="28" r="3" fill="#000"/>
      </g>
    `),
  },
];

export const PROMO_CODES: Record<string, number> = {
  JSKLA5: 0.10, // 10% off
  KAMPALADEV: 0.15, // 15% off
  COMMUNITY: 0.20, // 20% off
};

export const FREE_GIFT_THRESHOLD_UGX = 100000;
export const FREE_GIFT_THRESHOLD_USD = 28;

export const DELIVERY_FEES = {
  pickup_meetup: { UGX: 0, USD: 0, label: 'Free Meetup Pickup (Next Meetup)' },
  hub_village: { UGX: 3000, USD: 1, label: 'Hub Pickup (The Innovation Village / MoTIV)' },
  boda_kampala: { UGX: 7000, USD: 2, label: 'Express Boda Delivery (Kampala Metropolitan)' },
  regional_uganda: { UGX: 15000, USD: 4, label: 'Upcountry Coach Delivery (Entebbe, Jinja, Mbarara, Gulu)' },
};

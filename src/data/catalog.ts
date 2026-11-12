// Product taxonomy from source-assets/docs/Karunadu_FMCG_Master_Taxonomy.xlsx.
// Brand, product and flavour names stay in English (as printed on packs); descriptions are bilingual.
import type { Lang } from "../i18n";

export type CategorySlug =
  | "hydration-coolers"
  | "ready-to-cook"
  | "accompaniments-dairy"
  | "snacks-sweets"
  | "baking-dessert";

export type IconName =
  | "drop" | "bottle" | "bubbles" | "glass" | "bolt" | "flatbread" | "spice" | "pot"
  | "jar" | "milk" | "chips" | "sweet" | "wafer" | "cookie" | "candy" | "syrup" | "cake" | "sauce";

export interface Category {
  slug: CategorySlug;
  name: string;
  nameKn: string;
  short: string;
  shortKn: string;
  blurb: string;
  blurbKn: string;
  priority?: boolean;
  tone: "red" | "yellow" | "green" | "orange" | "plum";
  image: string;
}

export interface SubCategory {
  slug: string;
  category: CategorySlug;
  name: string;
  nameKn: string;
  icon: IconName;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: CategorySlug;
  sub: string;
  description: string;
  descriptionKn: string;
  variants: readonly string[];
  /** Image id resolved by src/lib/images.ts (generated → real photo → sub-category art). */
  image?: string;
  /** True when `image` shows the product type rather than the exact pack. */
  illustrative?: boolean;
  featured?: boolean;
}

export const categories: readonly Category[] = [
  {
    slug: "hydration-coolers",
    nameKn: "ಪ್ರೀಮಿಯಂ ಪಾನೀಯಗಳು & ಕೂಲರ್‌ಗಳು",
    shortKn: "ಪಾನೀಯಗಳು",
    blurbKn: "ಜ್ಯೂಸ್, ಕುಲ್ಕಿ ಮಾಕ್‌ಟೇಲ್, ಗೋಲಿ ಸೋಡಾ, ಮಿನರಲ್ ವಾಟರ್ ಮತ್ತು ಎನರ್ಜಿ ಡ್ರಿಂಕ್ಸ್ — ಗ್ರಾಹಕರು ಪ್ರತಿದಿನ ಕೇಳುವ, ವೇಗವಾಗಿ ಮಾರಾಟವಾಗುವ ಕೂಲರ್ ಉತ್ಪನ್ನಗಳು.",
    name: "Premium Hydration & Coolers",
    short: "Beverages",
    blurb: "Fast-moving juices, kulki mocktails, goli soda, mineral water and energy drinks — the cooler-shelf lines shoppers ask for every day.",
    priority: true,
    tone: "red",
    image: "cat-hydration-coolers",
  },
  {
    slug: "ready-to-cook",
    nameKn: "ರೆಡಿ-ಟು-ಕುಕ್ & ಅಡುಗೆಮನೆ ಅಗತ್ಯಗಳು",
    shortKn: "ಅಡುಗೆಮನೆ",
    blurbKn: "ಅರೆ-ಬೇಯಿಸಿದ ಪರೋಟ-ಚಪಾತಿ, ಶುದ್ಧ ಮಸಾಲೆ ಪುಡಿಗಳು ಮತ್ತು ಪ್ರಾದೇಶಿಕ ಮಸಾಲಾ ಮಿಶ್ರಣಗಳು — ಮನೆ ಅಡುಗೆ ಮತ್ತು ಹೋಟೆಲ್‌ಗಳಿಗೆ.",
    name: "Ready-to-Cook & Kitchen Essentials",
    short: "Kitchen",
    blurb: "Half-cooked flatbreads, pure ground spices and regional masala blends for busy home kitchens and eateries.",
    tone: "orange",
    image: "cat-ready-to-cook",
  },
  {
    slug: "accompaniments-dairy",
    nameKn: "ಸಾಂಪ್ರದಾಯಿಕ ಉಪ್ಪಿನಕಾಯಿ & ಹಾಲಿನ ಉತ್ಪನ್ನಗಳು",
    shortKn: "ಉಪ್ಪಿನಕಾಯಿ & ಡೈರಿ",
    blurbKn: "ಮನೆ ರುಚಿಯ ಉಪ್ಪಿನಕಾಯಿ, ಮಸಾಲಾ ಮಜ್ಜಿಗೆ ಮತ್ತು ಫ್ಲೇವರ್ಡ್ ಹಾಲು — ಗ್ರಾಹಕರನ್ನು ಮತ್ತೆ ಮತ್ತೆ ನಿಮ್ಮ ಅಂಗಡಿಗೆ ಕರೆತರುವ ಉತ್ಪನ್ನಗಳು.",
    name: "Traditional Accompaniments & Dairy",
    short: "Pickles & Dairy",
    blurb: "Homestyle pickles, spiced masala moru and flavoured milks that bring repeat buyers back to your counter.",
    tone: "green",
    image: "cat-accompaniments-dairy",
  },
  {
    slug: "snacks-sweets",
    nameKn: "ಸ್ನ್ಯಾಕ್ಸ್ & ಸಿಹಿ ತಿನಿಸುಗಳು",
    shortKn: "ಸ್ನ್ಯಾಕ್ಸ್",
    blurbKn: "ನಮ್ಕೀನ್, ಚಿಪ್ಸ್, ಸೋನ್ ಪಾಪ್ಡಿ, ಕ್ರೀಮ್ ವೇಫರ್, ಚಾಕೊಲೇಟ್ ಫಿಲ್ಸ್ ಮತ್ತು ಕ್ಯಾಂಡಿಗಳು — ಕೌಂಟರ್‌ನಿಂದ ಬೇಗ ಮಾರಾಟವಾಗುವ ತಿನಿಸುಗಳು.",
    name: "Snacks & Sweet Treats",
    short: "Snacks",
    blurb: "Namkeen, chips, soan papdi, cream wafers, chocolate fills and hard candies — impulse buys that move off the counter.",
    tone: "yellow",
    image: "cat-snacks-sweets",
  },
  {
    slug: "baking-dessert",
    nameKn: "ಬೇಕಿಂಗ್ & ಡೆಸರ್ಟ್ ಸಾಮಗ್ರಿಗಳು",
    shortKn: "ಬೇಕರಿ ಸಾಮಗ್ರಿ",
    blurbKn: "ಫ್ರೂಟ್ ಕ್ರಷ್, ಮಾಕ್‌ಟೇಲ್ ಸಿರಪ್, ಕೇಕ್ ಗ್ಲೇಜ್, ಫ್ರೂಟ್ ಫಿಲ್ಲಿಂಗ್ ಮತ್ತು ಡೆಸರ್ಟ್ ಟಾಪಿಂಗ್ಸ್ — ಬೇಕರಿ, ಕೆಫೆ ಮತ್ತು ಜ್ಯೂಸ್ ಬಾರ್‌ಗಳಿಗೆ.",
    name: "Baking & Dessert Ingredients",
    short: "Bakery Supplies",
    blurb: "Fruit crushes, mocktail syrups, cake glazes, fruit fillings and dessert toppings for bakeries, cafés and juice bars.",
    tone: "plum",
    image: "cat-baking-dessert",
  },
];

export const subCategories: readonly SubCategory[] = [
  { slug: "natural-juices", nameKn: "ನೈಸರ್ಗಿಕ ಜ್ಯೂಸ್ & ನೆಕ್ಟರ್", category: "hydration-coolers", name: "Natural Juices & Nectars", icon: "glass", image: "sub-natural-juices" },
  { slug: "mineral-water-soda", nameKn: "ಮಿನರಲ್ ವಾಟರ್ & ಸೋಡಾ", category: "hydration-coolers", name: "Mineral Water & Sodas", icon: "drop", image: "sub-mineral-water-soda" },
  { slug: "goli-soda-frizz", nameKn: "ಗೋಲಿ ಸೋಡಾ & ಕಾರ್ಬೊನೇಟೆಡ್ ಫ್ರಿಜ್", category: "hydration-coolers", name: "Goli Soda & Carbonated Frizz", icon: "bubbles", image: "sub-goli-soda-frizz" },
  { slug: "kulki-mocktails", nameKn: "ಕುಲ್ಕಿ ಮಾಕ್‌ಟೇಲ್ & “ಬೈಟ್ & ಸಿಪ್” ಡ್ರಿಂಕ್ಸ್", category: "hydration-coolers", name: "Kulki Mocktails & “Bite & Sip” Drinks", icon: "bottle", image: "sub-kulki-mocktails" },
  { slug: "energy-drinks", nameKn: "ಎನರ್ಜಿ ಡ್ರಿಂಕ್ಸ್", category: "hydration-coolers", name: "Energy Drinks", icon: "bolt", image: "sub-energy-drinks" },
  { slug: "half-cooked-flatbreads", nameKn: "ಅರೆ-ಬೇಯಿಸಿದ ಪರೋಟ & ಚಪಾತಿ", category: "ready-to-cook", name: "Half-Cooked Flatbreads", icon: "flatbread", image: "sub-half-cooked-flatbreads" },
  { slug: "pure-ground-spices", nameKn: "ಶುದ್ಧ ಮಸಾಲೆ ಪುಡಿಗಳು", category: "ready-to-cook", name: "Pure Ground Spices", icon: "spice", image: "sub-pure-ground-spices" },
  { slug: "blended-masalas", nameKn: "ಪ್ರಾದೇಶಿಕ ಮಸಾಲಾ ಮಿಶ್ರಣಗಳು", category: "ready-to-cook", name: "Blended Regional Masalas", icon: "pot", image: "sub-blended-masalas" },
  { slug: "homemade-pickles", nameKn: "ಮನೆ ರುಚಿಯ ಉಪ್ಪಿನಕಾಯಿ", category: "accompaniments-dairy", name: "Homemade Pickles", icon: "jar", image: "sub-homemade-pickles" },
  { slug: "buttermilk-flavoured-milk", nameKn: "ಮಸಾಲಾ ಮಜ್ಜಿಗೆ & ಫ್ಲೇವರ್ಡ್ ಹಾಲು", category: "accompaniments-dairy", name: "Spiced Buttermilk & Flavoured Milks", icon: "milk", image: "sub-buttermilk-flavoured-milk" },
  { slug: "namkeen-chips", nameKn: "ನಮ್ಕೀನ್ & ಚಿಪ್ಸ್", category: "snacks-sweets", name: "Savoury Namkeen & Chips", icon: "chips", image: "sub-namkeen-chips" },
  { slug: "traditional-mithai", nameKn: "ಸಾಂಪ್ರದಾಯಿಕ ಸಿಹಿತಿಂಡಿ", category: "snacks-sweets", name: "Traditional Mithai", icon: "sweet", image: "sub-traditional-mithai" },
  { slug: "confectionery-wafers", nameKn: "ಕನ್ಫೆಕ್ಷನರಿ & ಕ್ರೀಮ್ ವೇಫರ್", category: "snacks-sweets", name: "Confectionery & Cream Wafers", icon: "wafer", image: "sub-confectionery-wafers" },
  { slug: "baked-chocolate-fills", nameKn: "ಬೇಕ್ಡ್ ಚಾಕೊಲೇಟ್ ಫಿಲ್ಸ್", category: "snacks-sweets", name: "Baked Chocolate Fills", icon: "cookie", image: "sub-baked-chocolate-fills" },
  { slug: "hard-candies", nameKn: "ಹಾರ್ಡ್ ಕ್ಯಾಂಡಿಗಳು", category: "snacks-sweets", name: "Hard Candies", icon: "candy", image: "sub-hard-candies" },
  { slug: "fruit-crushes-syrups", nameKn: "ಫ್ರೂಟ್ ಕ್ರಷ್ & ಸಿರಪ್", category: "baking-dessert", name: "Fruit Crushes & Syrups", icon: "syrup", image: "sub-fruit-crushes-syrups" },
  { slug: "baking-glazes-fillings", nameKn: "ಬೇಕಿಂಗ್ ಗ್ಲೇಜ್ & ಫಿಲ್ಲಿಂಗ್", category: "baking-dessert", name: "Baking Glazes & Fillings", icon: "cake", image: "sub-baking-glazes-fillings" },
  { slug: "dessert-toppings", nameKn: "ಡೆಸರ್ಟ್ ಟಾಪಿಂಗ್ಸ್ & ಸಾಸ್", category: "baking-dessert", name: "Dessert Toppings & Sauces", icon: "sauce", image: "sub-dessert-toppings" },
];

export const products: readonly Product[] = [
  // ── Premium Hydration & Coolers ─────────────────────────────
  { id: "beekay-kulki", descriptionKn: "ನಿಜವಾದ “ಬೈಟ್ & ಸಿಪ್” ಅನುಭವದ ನೈಸರ್ಗಿಕ ಕುಲ್ಕಿ ಜ್ಯೂಸ್‌ಗಳು — ಕೂಲರ್ ಶೆಲ್ಫ್ ಮತ್ತು ಜ್ಯೂಸ್ ಕೌಂಟರ್‌ಗಳ ಬೇಸಿಗೆಯ ಬೆಸ್ಟ್‌ಸೆಲ್ಲರ್.", name: "Beekay Juicee Kulki Range", brand: "Beekay Juicee", category: "hydration-coolers", sub: "kulki-mocktails",
    description: "Natural kulki juices with real “bite & sip” texture — a summer bestseller for cooler shelves and juice counters.",
    variants: ["Mango Kulki", "Pineapple Kulki", "Pudina", "Imlee Blast", "Kokum", "Litchi"], image: "beekay-range", featured: true },
  { id: "beekay-mango-kulki", descriptionKn: "ಹುಳಿ-ಮಸಾಲೆ ರುಚಿಯ ಮಾವಿನ ಕುಲ್ಕಿ ಡ್ರಿಂಕ್.", name: "Beekay Mango Kulki", brand: "Beekay Juicee", category: "hydration-coolers", sub: "kulki-mocktails",
    description: "Ripe mango kulki drink with tangy masala notes.", variants: ["Standard bottle"], image: "beekay-mango-kulki" },
  { id: "beekay-pineapple-kulki", descriptionKn: "ಹುಳಿ-ಸಿಹಿ ಅನಾನಸ್ ಕುಲ್ಕಿ, ತಂಪಾದ ರುಚಿ.", name: "Beekay Pineapple Kulki", brand: "Beekay Juicee", category: "hydration-coolers", sub: "kulki-mocktails",
    description: "Sweet-sour pineapple kulki with a refreshing finish.", variants: ["Standard bottle"], image: "beekay-pineapple-kulki" },
  { id: "beekay-pudina", descriptionKn: "ಸಬ್ಜಾ ಬೀಜಗಳಿರುವ ತಂಪಾದ ಪುದೀನಾ ಡ್ರಿಂಕ್ — ಬಿಸಿಲಿನ ದಿನಗಳಿಗೆ ಸೂಕ್ತ.", name: "Beekay Pudina", brand: "Beekay Juicee", category: "hydration-coolers", sub: "kulki-mocktails",
    description: "Cooling mint drink with basil seeds — ideal for hot afternoons.", variants: ["Standard bottle"], image: "beekay-pudina" },
  { id: "beekay-kokum", descriptionKn: "ಕರಾವಳಿಯ ಸಾಂಪ್ರದಾಯಿಕ ಕೋಕಂ ಪಾನೀಯ — ಕೆಂಪು ಬಣ್ಣ, ಹುಳಿ ರುಚಿ.", name: "Beekay Kokum", brand: "Beekay Juicee", category: "hydration-coolers", sub: "kulki-mocktails",
    description: "Traditional coastal kokum cooler, ruby-red and tangy.", variants: ["Standard bottle"], image: "beekay-kokum" },
  { id: "beekay-litchi", descriptionKn: "ಮಕ್ಕಳು ಮತ್ತು ಕುಟುಂಬಗಳ ಮೆಚ್ಚಿನ ಹಗುರ ಲಿಚಿ ಡ್ರಿಂಕ್.", name: "Beekay Litchi", brand: "Beekay Juicee", category: "hydration-coolers", sub: "kulki-mocktails",
    description: "Light, floral litchi drink loved by kids and families.", variants: ["Standard bottle"], image: "beekay-litchi" },
  { id: "salisons-coco-crush", descriptionKn: "ಅಗಿಯುವ ತೆಂಗಿನ ಜೆಲ್ಲಿ ಇರುವ ನಾಟಾ ಡಿ ಕೋಕೋ “ಬೈಟ್ & ಸಿಪ್” ಡ್ರಿಂಕ್ಸ್.", name: "Salison's Coco Crush & Nato", brand: "Salison's", category: "hydration-coolers", sub: "kulki-mocktails",
    description: "Nata de coco “bite & sip” drinks with chewy coconut jelly.", variants: ["Coco Crush", "Nato"] },

  { id: "supreme-jal", descriptionKn: "ಅಂಗಡಿ, ಕಚೇರಿ ಮತ್ತು ಸಮಾರಂಭಗಳಿಗೆ ಮೂರು ಗಾತ್ರಗಳಲ್ಲಿ ಪ್ಯಾಕೇಜ್ಡ್ ಕುಡಿಯುವ ನೀರು.", name: "Supreme Jal Mineral Water", brand: "Supreme Jal", category: "hydration-coolers", sub: "mineral-water-soda",
    description: "Packaged drinking water in three counter-friendly sizes for shops, offices and events.", variants: ["1 Litre", "500 ml", "250 ml"], image: "supreme-jal-range", featured: true },
  { id: "tilo-club-soda", descriptionKn: "ಮಿಕ್ಸರ್ ಮತ್ತು ಹೋಟೆಲ್‌ಗಳಿಗೆ ಹೆಚ್ಚು ಫಿಜ್ ಇರುವ ಕ್ಲಬ್ ಸೋಡಾ.", name: "Tilo Club Soda", brand: "Tilo", category: "hydration-coolers", sub: "mineral-water-soda",
    description: "Crisp, high-fizz club soda for mixers and restaurants.", variants: ["Bottle"] },

  { id: "tusk-soft-drinks", descriptionKn: "ಪ್ಯಾಕ್‌ನಲ್ಲೇ ಕ್ಯಾಶ್‌ಬ್ಯಾಕ್ ಆಫರ್ ಇರುವ ದಿಟ್ಟ ರುಚಿಯ ಗೋಲಿ ಶೈಲಿಯ ಸಾಫ್ಟ್ ಡ್ರಿಂಕ್ಸ್ — ಮರುಖರೀದಿಗೆ ಉತ್ತೇಜನ.", name: "Tusk Premium Soft Drinks", brand: "Tusk", category: "hydration-coolers", sub: "goli-soda-frizz",
    description: "Bold-flavour goli-style soft drinks with in-pack cashback offers that drive repeat purchase.", variants: ["Blueberry", "Classic Lemon", "Orange", "Cola"], image: "tusk-range", featured: true },
  { id: "tusk-orange", descriptionKn: "ಟಸ್ಕ್ ಗೋಲಿ ಬಾಟಲಿಯಲ್ಲಿ ಉಲ್ಲಾಸದ ಕಿತ್ತಳೆ ಫಿಜ್.", name: "Tusk Orange", brand: "Tusk", category: "hydration-coolers", sub: "goli-soda-frizz",
    description: "Zesty orange fizz in the signature Tusk goli bottle.", variants: ["Standard bottle"], image: "tusk-orange" },
  { id: "tusk-classic-lemon", descriptionKn: "ಕ್ಲಾಸಿಕ್ ನಿಂಬೆ ಸೋಡಾ — ತೀಕ್ಷ್ಣ, ತಂಪು, ತಾಜಾ.", name: "Tusk Classic Lemon", brand: "Tusk", category: "hydration-coolers", sub: "goli-soda-frizz",
    description: "Classic nimbu soda — sharp, cold and refreshing.", variants: ["Standard bottle"], image: "tusk-classic-lemon" },
  { id: "tusk-blueberry", descriptionKn: "ಶೆಲ್ಫ್‌ನಲ್ಲಿ ಎದ್ದು ಕಾಣುವ ನೀಲಿ ಬ್ಲೂಬೆರಿ ಫಿಜ್.", name: "Tusk Blueberry", brand: "Tusk", category: "hydration-coolers", sub: "goli-soda-frizz",
    description: "Eye-catching blue blueberry fizz that stands out on the shelf.", variants: ["Standard bottle"], image: "tusk-blueberry" },
  { id: "salisons-frizz", descriptionKn: "ಜೀರಾದಿಂದ ಲೆಮನ್ ಸಾಲ್ಟ್‌ವರೆಗೆ ಆರು ದೇಸಿ ರುಚಿಗಳ ಗೋಲಿ ಸೋಡಾ.", name: "Salison's Frizz", brand: "Salison's", category: "hydration-coolers", sub: "goli-soda-frizz",
    description: "Goli soda in six desi flavours, from jeera to lemon salt.", variants: ["Jeera", "Lemon", "Apple", "Lemon Salt", "Orange", "Cola"], image: "prod-salisons-frizz", illustrative: true, featured: true },
  { id: "frizz-jinja", descriptionKn: "ಶುಂಠಿಯ ಖಾರದ ರುಚಿಯ ಫಿಜ್.", name: "Frizz Jinja", brand: "Salison's", category: "hydration-coolers", sub: "goli-soda-frizz",
    description: "Ginger-spiced fizz with a warming kick.", variants: ["Bottle"], image: "prod-frizz-jinja", illustrative: true },
  { id: "gulp-soda", descriptionKn: "ಹೆಚ್ಚು ಮಾರಾಟವಿರುವ ನೆರೆಹೊರೆ ಅಂಗಡಿಗಳಿಗೆ ಕೈಗೆಟುಕುವ ಸೋಡಾ.", name: "Gulp Soda", brand: "Gulp", category: "hydration-coolers", sub: "goli-soda-frizz",
    description: "Value soda for high-volume neighbourhood stores.", variants: ["Bottle"], image: "prod-gulp-soda", illustrative: true },

  { id: "salisons-squeeze", descriptionKn: "ಐದು ಜನಪ್ರಿಯ ರುಚಿಗಳಲ್ಲಿ ಹಣ್ಣಿನ ಜ್ಯೂಸ್ ಮತ್ತು ನೆಕ್ಟರ್‌ಗಳು.", name: "Salison's Squeeze Juices", brand: "Salison's", category: "hydration-coolers", sub: "natural-juices",
    description: "Fruit juices and nectars in five popular flavours.", variants: ["Mango", "Apple", "Pineapple", "Lychee", "Guava"], image: "prod-salisons-squeeze", illustrative: true },
  { id: "podaran-tilo-juices", descriptionKn: "ಕೈಗೆಟುಕುವ ಬೆಲೆಯ ದಿನನಿತ್ಯದ ಹಣ್ಣಿನ ಪಾನೀಯಗಳು.", name: "Podaran Tilo Juices", brand: "Podaran", category: "hydration-coolers", sub: "natural-juices",
    description: "Everyday fruit drinks at an easy price point.", variants: ["Assorted flavours"], image: "prod-podaran-tilo-juices", illustrative: true },
  { id: "zee-sip", descriptionKn: "ತಕ್ಷಣ ಖರೀದಿಗೆ ಸಿದ್ಧ ಹಣ್ಣಿನ ಪಾನೀಯಗಳು.", name: "Zee Sip Drinks", brand: "Zee Sip", category: "hydration-coolers", sub: "natural-juices",
    description: "Ready-to-drink fruit beverages for impulse buying.", variants: ["Assorted flavours"], image: "prod-zee-sip", illustrative: true },

  { id: "salisons-shock", descriptionKn: "ಓಡಾಟದಲ್ಲಿರುವವರಿಗೆ ವಿಟಮಿನ್‌ಗಳಿರುವ ಎನರ್ಜಿ ಡ್ರಿಂಕ್.", name: "Salison's Shock Red Rush", brand: "Salison's", category: "hydration-coolers", sub: "energy-drinks",
    description: "Energy drink with added vitamins for the on-the-go crowd.", variants: ["Can"] },

  // ── Ready-to-Cook & Kitchen Essentials ──────────────────────
  { id: "nifco-flatbreads", descriptionKn: "ಅರೆ-ಬೇಯಿಸಿದ ಪರೋಟ ಮತ್ತು ಚಪಾತಿ — ತವಾದಲ್ಲಿ ಬಿಸಿ ಮಾಡಿ, ನಿಮಿಷಗಳಲ್ಲಿ ಬಡಿಸಿ.", name: "Nifco Half-Cooked Flatbreads", brand: "Nifco", category: "ready-to-cook", sub: "half-cooked-flatbreads",
    description: "Half-cooked parotta and chapathi — heat on a tawa and serve in minutes.", variants: ["Parotta", "Chapathi"], featured: true },
  { id: "northern-spices-pure", descriptionKn: "ಘಮ ಮತ್ತು ಬಣ್ಣ ಹೆಚ್ಚಿರುವ ಶುದ್ಧ ಮಸಾಲೆ ಪುಡಿಗಳು.", name: "Northern Spices Pure Ground Spices", brand: "Northern Spices", category: "ready-to-cook", sub: "pure-ground-spices",
    description: "Single-origin ground spices with strong aroma and colour.", variants: ["Red Chilli Powder", "Turmeric Powder", "Coriander Powder", "Black Pepper Powder"] },
  { id: "northern-spices-masala", descriptionKn: "ಪ್ರಾದೇಶಿಕ ಮೆಚ್ಚಿನ ಅಡುಗೆಗಳಿಗೆ ಸಿದ್ಧ ಮಸಾಲಾ ಮಿಶ್ರಣಗಳು.", name: "Northern Spices Masala Blends", brand: "Northern Spices", category: "ready-to-cook", sub: "blended-masalas",
    description: "Ready masala blends for regional favourites.", variants: ["Sambhar", "Chhole", "Pav Bhaji", "Shahi Paneer", "Shahi Garam Masala", "Kitchen King"], featured: true },

  // ── Traditional Accompaniments & Dairy ──────────────────────
  { id: "herbala-pickles", descriptionKn: "ಸಾಂಪ್ರದಾಯಿಕ ವಿಧಾನದಲ್ಲಿ ತಯಾರಿಸಿದ ಮನೆ ರುಚಿಯ ಉಪ್ಪಿನಕಾಯಿ.", name: "Herbala Homemade Pickles", brand: "Herbala", category: "accompaniments-dairy", sub: "homemade-pickles",
    description: "Homestyle pickles made the traditional way.", variants: ["Lemon Pickle", "Green Chilli Pickle", "Mix Pickle"], featured: true },
  { id: "masala-moru", descriptionKn: "ಶುಂಠಿ, ಕರಿಬೇವು ಮತ್ತು ಹಸಿಮೆಣಸಿನ ಮಸಾಲಾ ಮಜ್ಜಿಗೆ.", name: "Masala Moru", brand: "Masala Moru", category: "accompaniments-dairy", sub: "buttermilk-flavoured-milk",
    description: "Spiced buttermilk with ginger, curry leaves and green chilli.", variants: ["Pouch", "Bottle"], image: "prod-masala-moru", illustrative: true },
  { id: "tilo-flavoured-milk", descriptionKn: "ಮಕ್ಕಳ ಮೆಚ್ಚಿನ ನಾಲ್ಕು ರುಚಿಗಳಲ್ಲಿ ತಣ್ಣನೆಯ ಫ್ಲೇವರ್ಡ್ ಹಾಲು.", name: "Tilo Flavoured Milk", brand: "Tilo", category: "accompaniments-dairy", sub: "buttermilk-flavoured-milk",
    description: "Chilled flavoured milk in four kid-favourite flavours.", variants: ["Badam", "Chocolate", "Strawberry", "Pista"], image: "prod-tilo-flavoured-milk", illustrative: true },

  // ── Snacks & Sweet Treats ───────────────────────────────────
  { id: "podaran-snacks", descriptionKn: "ಪ್ರತಿ ಕೌಂಟರ್‌ಗೂ ಕುರುಕಲು ಚಿಪ್ಸ್, ಪಫ್ಸ್, ರಿಂಗ್ಸ್ ಮತ್ತು ದಕ್ಷಿಣ ಭಾರತೀಯ ಮಿಕ್ಸ್ಚರ್‌ಗಳು.", name: "Podaran Namkeen & Chips", brand: "Podaran", category: "snacks-sweets", sub: "namkeen-chips",
    description: "Crunchy chips, puffs, rings and South Indian mixtures for every counter.", variants: ["Potato Chips", "Puffs", "Rings", "Murukku", "Sev", "Corn Mixture", "Garlic Mixture"], featured: true },
  { id: "podaran-soan", descriptionKn: "ತುಪ್ಪದ ರುಚಿಯ ಸೋನ್ ಸಿಹಿಗಳು — ಹಬ್ಬದ ಉಡುಗೊರೆಗೆ ಅಚ್ಚುಮೆಚ್ಚು.", name: "Podaran Soan Papdi & Soan Cakes", brand: "Podaran", category: "snacks-sweets", sub: "traditional-mithai",
    description: "Flaky, ghee-rich soan sweets — festival gifting staples.", variants: ["Soan Papdi", "Soan Cakes"] },
  { id: "fmb-royal-dazzle", descriptionKn: "ಡಿಸ್‌ಪ್ಲೇಗೆ ಸಿದ್ಧ ಪ್ಯಾಕ್‌ಗಳಲ್ಲಿ ಕ್ರೀಮ್ ತುಂಬಿದ ಗರಿಗರಿ ವೇಫರ್ ರೋಲ್ಸ್.", name: "FMB Royal Dazzle Wafer Rolls", brand: "FMB Royal", category: "snacks-sweets", sub: "confectionery-wafers",
    description: "Crispy cream-filled wafer rolls in display-ready packs.", variants: ["Wafer Rolls"], image: "prod-fmb-royal-dazzle", illustrative: true },
  { id: "creamyum-wafers", descriptionKn: "ಮೃದುವಾದ ಕ್ರೀಮ್ ತುಂಬಿರುವ ಸೆಂಟರ್-ಫಿಲ್ಡ್ ವೇಫರ್‌ಗಳು.", name: "Creamyum Centre-Filled Wafers", brand: "Creamyum", category: "snacks-sweets", sub: "confectionery-wafers",
    description: "Centre-filled wafers with a soft cream core.", variants: ["Assorted flavours"], image: "prod-creamyum-wafers", illustrative: true },
  { id: "lambu-jars", descriptionKn: "ಕೌಂಟರ್ ಜಾರ್‌ಗಳಲ್ಲಿ ಕನ್ಫೆಕ್ಷನರಿ — ಬಿಡಿ ಮಾರಾಟದಲ್ಲಿ ಉತ್ತಮ ಲಾಭ.", name: "Lambu Jars", brand: "Lambu", category: "snacks-sweets", sub: "confectionery-wafers",
    description: "Counter jars of confectionery — easy loose-sale margins.", variants: ["Jar"], image: "prod-lambu-jars", illustrative: true },
  { id: "podaran-chokz", descriptionKn: "ಚಾಕೊಲೇಟ್ ಮತ್ತು ಸ್ಟ್ರಾಬೆರಿ ತುಂಬಿದ ಬೇಕ್ಡ್ ಬಿಸ್ಕತ್ತುಗಳು.", name: "Podaran Chokz", brand: "Podaran", category: "snacks-sweets", sub: "baked-chocolate-fills",
    description: "Baked biscuits with molten chocolate and strawberry fills.", variants: ["Chocolate Fills", "Strawberry Fills"] },
  { id: "fmb-miamor", descriptionKn: "ಮಜವಾದ ಹೆಸರುಗಳ ದೇಸಿ ರುಚಿಯ ಹಾರ್ಡ್ ಕ್ಯಾಂಡಿಗಳು.", name: "FMB Royal Mi'Amor Candies", brand: "FMB Royal", category: "snacks-sweets", sub: "hard-candies",
    description: "Desi-flavour hard candies with bold, fun names.", variants: ["Rock Coco", "Paan Paradise", "Killer Imli"] },

  // ── Baking & Dessert Ingredients ────────────────────────────
  { id: "fudict-crushes", descriptionKn: "ಕೆಫೆ ಮತ್ತು ಜ್ಯೂಸ್ ಬಾರ್‌ಗಳಿಗೆ ಫ್ರೂಟ್ ಕ್ರಷ್ ಹಾಗೂ ಮೊಹಿತೋ & ಮಾಕ್‌ಟೇಲ್ ಸಿರಪ್‌ಗಳು.", name: "Fudict Fruit Crushes & Syrups", brand: "Fudict", category: "baking-dessert", sub: "fruit-crushes-syrups",
    description: "Fruit crushes plus mojito & mocktail syrups for cafés and juice bars.", variants: ["Fruit Crushes", "Mojito Syrups", "Mocktail Syrups"], featured: true },
  { id: "fudict-glazes", descriptionKn: "ಬೇಕರಿಗಳಿಗೆ ಮಿರರ್ ಗ್ಲೇಜ್ ಮತ್ತು 50% ನಿಜ ಹಣ್ಣಿನ ಫಿಲ್ಲಿಂಗ್‌ಗಳು.", name: "Fudict Cake Glazes & Fruit Fillings", brand: "Fudict", category: "baking-dessert", sub: "baking-glazes-fillings",
    description: "Mirror glazes and 50% real-fruit fillings for bakeries.", variants: ["Neutral Glaze", "Chocolate Glaze", "Flavour Glazes", "Real Fruit Fillings"] },
  { id: "fudict-toppings", descriptionKn: "ಸಂಡೇ, ಮಿಲ್ಕ್‌ಶೇಕ್ ಮತ್ತು ಫಲೂದಾಗೆ ಬೇಕಾದ ಸಾಸ್‌ಗಳು.", name: "Fudict Dessert Toppings & Sauces", brand: "Fudict", category: "baking-dessert", sub: "dessert-toppings",
    description: "Sauces for sundaes, shakes and falooda.", variants: ["Chocolate Sauce", "Belgium Butterscotch", "Caramel", "Rose Falooda"] },
];

export const brands = [...new Set(products.map((p) => p.brand))];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getSub(slug: string): SubCategory | undefined {
  return subCategories.find((s) => s.slug === slug);
}

export function subsOf(category: CategorySlug): SubCategory[] {
  return subCategories.filter((s) => s.category === category);
}

export function productsOf(sub: string): Product[] {
  return products.filter((p) => p.sub === sub);
}

export function productsInCategory(category: CategorySlug): Product[] {
  return products.filter((p) => p.category === category);
}

export const catName = (c: Category, lang: Lang): string => (lang === "kn" ? c.nameKn : c.name);
export const catShort = (c: Category, lang: Lang): string => (lang === "kn" ? c.shortKn : c.short);
export const catBlurb = (c: Category, lang: Lang): string => (lang === "kn" ? c.blurbKn : c.blurb);
export const subName = (s: SubCategory, lang: Lang): string => (lang === "kn" ? s.nameKn : s.name);
export const productDesc = (p: Product, lang: Lang): string => (lang === "kn" ? p.descriptionKn : p.description);

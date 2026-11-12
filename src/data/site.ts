// Single source of truth for business details. Update here and every page (both languages) follows.
import type { L, Lang } from "../i18n";

export const site = {
  name: "Karunadu Distributors",
  nameKn: "ಕರುನಾಡು ಡಿಸ್ಟ್ರಿಬ್ಯೂಟರ್ಸ್",
  tagline: { en: "Connecting brands to every store", kn: "ಪ್ರತಿ ಅಂಗಡಿಗೂ ಬ್ರ್ಯಾಂಡ್‌ಗಳ ಸಂಪರ್ಕ" } satisfies L,
  segments: { en: "Food • Beverages • FMCG", kn: "ಆಹಾರ • ಪಾನೀಯ • FMCG" } satisfies L,
  description: {
    en: "Bengaluru-based distributor of food, beverage and FMCG brands. We supply supermarkets, kirana stores and wholesalers across Bengaluru and Karnataka, and help manufacturers scale their retail reach.",
    kn: "ಬೆಂಗಳೂರು ಮೂಲದ ಆಹಾರ, ಪಾನೀಯ ಮತ್ತು FMCG ವಿತರಕರು. ಬೆಂಗಳೂರು ಹಾಗೂ ಕರ್ನಾಟಕದಾದ್ಯಂತ ಸೂಪರ್‌ಮಾರ್ಕೆಟ್, ಕಿರಾಣಿ ಅಂಗಡಿ ಮತ್ತು ಸಗಟು ವ್ಯಾಪಾರಿಗಳಿಗೆ ಪೂರೈಸುತ್ತೇವೆ; ತಯಾರಕರ ಮಾರುಕಟ್ಟೆ ವಿಸ್ತರಣೆಗೆ ನೆರವಾಗುತ್ತೇವೆ.",
  } satisfies L,
  phones: [
    { display: "+91 94832 69148", tel: "+919483269148" },
    { display: "+91 87625 70137", tel: "+918762570137" },
  ],
  whatsapp: "919483269148",
  email: "sales@karunadudistributors.com",
  address: {
    line1: { en: "Chikka Nekkundi, Varthur", kn: "ಚಿಕ್ಕ ನೆಕ್ಕುಂದಿ, ವರ್ತೂರು" } satisfies L,
    city: { en: "Bengaluru", kn: "ಬೆಂಗಳೂರು" } satisfies L,
    state: { en: "Karnataka", kn: "ಕರ್ನಾಟಕ" } satisfies L,
    pin: "560087",
    // Plain-English values for structured data and map lookups.
    streetEn: "Chikka Nekkundi, Varthur",
  },
  hours: { en: "Mon – Sat, 9:00 AM – 8:00 PM", kn: "ಸೋಮ – ಶನಿ, ಬೆಳಿಗ್ಗೆ 9:00 – ರಾತ್ರಿ 8:00" } satisfies L,
  mapsQuery: "Varthur, Bengaluru, Karnataka 560087",
  serviceAreas: {
    en: ["Whitefield & Varthur", "Marathahalli & Bellandur", "Sarjapur Road & HSR Layout", "Electronic City", "KR Puram & Mahadevapura", "Bengaluru Urban & Rural", "Statewide Karnataka network"],
    kn: ["ವೈಟ್‌ಫೀಲ್ಡ್ & ವರ್ತೂರು", "ಮಾರತ್ತಹಳ್ಳಿ & ಬೆಳ್ಳಂದೂರು", "ಸರ್ಜಾಪುರ ರಸ್ತೆ & ಎಚ್‌ಎಸ್‌ಆರ್ ಲೇಔಟ್", "ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಸಿಟಿ", "ಕೆ.ಆರ್. ಪುರಂ & ಮಹದೇವಪುರ", "ಬೆಂಗಳೂರು ನಗರ & ಗ್ರಾಮಾಂತರ", "ಕರ್ನಾಟಕದಾದ್ಯಂತ ಜಾಲ"],
  } satisfies L<string[]>,
  stats: [
    { value: { en: "500+", kn: "500+" }, label: { en: "Retail outlets served", kn: "ಸೇವೆ ಪಡೆಯುವ ಅಂಗಡಿಗಳು" } },
    { value: { en: "24–48 hr", kn: "24–48 ಗಂ." }, label: { en: "Stock replenishment", kn: "ಸ್ಟಾಕ್ ಮರುಪೂರೈಕೆ" } },
    { value: { en: "18", kn: "18" }, label: { en: "Product lines", kn: "ಉತ್ಪನ್ನ ಶ್ರೇಣಿಗಳು" } },
    { value: { en: "100%", kn: "100%" }, label: { en: "Genuine stock", kn: "ಅಸಲಿ ಸ್ಟಾಕ್" } },
  ] satisfies Array<{ value: L; label: L }>,
} as const;

export const nav = [
  { href: "/", label: { en: "Home", kn: "ಮುಖಪುಟ" } },
  { href: "/about/", label: { en: "About Us", kn: "ನಮ್ಮ ಬಗ್ಗೆ" } },
  { href: "/products/", label: { en: "Products & Brands", kn: "ಉತ್ಪನ್ನಗಳು" } },
  { href: "/retailers/", label: { en: "For Retailers", kn: "ಅಂಗಡಿಗಳಿಗೆ" } },
  { href: "/manufacturers/", label: { en: "For Manufacturers", kn: "ತಯಾರಕರಿಗೆ" } },
  { href: "/contact/", label: { en: "Contact", kn: "ಸಂಪರ್ಕಿಸಿ" } },
] as const;

export function waLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function fullAddress(lang: Lang): string {
  const a = site.address;
  return `${a.line1[lang]}, ${a.city[lang]}, ${a.state[lang]} – ${a.pin}`;
}

// Language helpers. English lives at "/", Kannada mirrors every page under "/kn/".
export const languages = { en: "English", kn: "ಕನ್ನಡ" } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = "en";

/** A value available in both languages. */
export interface L<T = string> {
  en: T;
  kn: T;
}

export function getLang(url: URL): Lang {
  return url.pathname === "/kn" || url.pathname.startsWith("/kn/") ? "kn" : "en";
}

/** Path without the language prefix, always starting and ending with "/". */
export function stripLang(pathname: string): string {
  const stripped = pathname.replace(/^\/kn(?=\/|$)/, "");
  return stripped === "" ? "/" : stripped;
}

/** Localise an internal path ("/products/" -> "/kn/products/" for Kannada). Hash/query are kept. */
export function lp(lang: Lang, path: string): string {
  return lang === defaultLang ? path : `/kn${path}`;
}

export function pick<T>(lang: Lang, value: L<T>): T {
  return value[lang];
}

/** Same page in the other language. */
export function alternatePath(url: URL, target: Lang): string {
  const base = stripLang(url.pathname);
  // The shared 404 page has no translated twin — send visitors to the home page instead.
  return lp(target, /^\/404(\.html|\/)?$/.test(base) ? "/" : base);
}

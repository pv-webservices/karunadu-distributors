import { site } from "../data/site";
import type { ClientStrings } from "../i18n/ui";

const MOBILE_RE = /^(?:\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/;

let cached: ClientStrings | null = null;
/** Language strings injected by the layout (#i18n-client). */
export function strings(): ClientStrings {
  if (cached) return cached;
  const node = document.getElementById("i18n-client");
  cached = JSON.parse(node?.textContent ?? "{}") as ClientStrings;
  return cached;
}

/** Replace {key} placeholders. */
export function fmt(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => String(values[k] ?? ""));
}

export function buildWaUrl(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

let toastTimer = 0;
export function showToast(text: string): void {
  const toast = document.querySelector<HTMLElement>("[data-toast]");
  if (!toast) return;
  toast.textContent = text;
  toast.classList.add("is-on");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-on"), 2200);
}

export function readField(form: HTMLFormElement, name: string): string {
  const field = form.elements.namedItem(name);
  if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement) {
    return field.value.trim().replace(/\s+/g, " ");
  }
  return "";
}

/** Validates required fields + Indian mobile numbers; marks invalid fields and focuses the first one. */
export function validateRequired(form: HTMLFormElement): boolean {
  const fields = Array.from(form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>("input, textarea, select"));
  let firstInvalid: HTMLElement | null = null;
  for (const field of fields) {
    const value = field.value.trim();
    let message = "";
    const t = strings();
    if (field.required && !value) message = t.required;
    else if (field.type === "tel" && value && !MOBILE_RE.test(value)) message = t.badPhone;
    else if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) message = t.badEmail;
    field.setAttribute("aria-invalid", message ? "true" : "false");
    const wrap = field.closest(".field");
    wrap?.classList.toggle("is-invalid", Boolean(message));
    let hint = wrap?.querySelector<HTMLElement>(".field__err");
    if (message && wrap && !hint) {
      hint = document.createElement("span");
      hint.className = "field__err";
      hint.id = `${field.id}-err`;
      wrap.append(hint);
      field.setAttribute("aria-describedby", hint.id);
    }
    if (hint) hint.textContent = message;
    if (message && !firstInvalid) firstInvalid = field;
  }
  firstInvalid?.focus();
  return !firstInvalid;
}

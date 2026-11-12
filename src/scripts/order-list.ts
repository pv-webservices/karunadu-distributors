// Order list: retailers collect products, then send one WhatsApp enquiry.
// State lives in localStorage (per device) and is optional — everything still works if storage is blocked.
import { buildWaUrl, showToast, readField, validateRequired, strings, fmt } from "./shared";

interface OrderItem {
  key: string;
  id: string;
  name: string;
  variant: string;
  qty: number;
}

const STORAGE_KEY = "kd-order-v1";
const MAX_QTY = 999;

function load(): OrderItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (i): i is OrderItem =>
        typeof i?.key === "string" && typeof i?.name === "string" && typeof i?.qty === "number" && i.qty > 0,
    );
  } catch {
    return [];
  }
}

function save(items: readonly OrderItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* storage unavailable — list still works for this page view */
  }
}

let items: OrderItem[] = load();

function setItems(next: OrderItem[]): void {
  items = next;
  save(items);
  render();
}

function addItem(id: string, name: string, variant: string): void {
  const key = `${id}::${variant}`;
  const existing = items.find((i) => i.key === key);
  setItems(
    existing
      ? items.map((i) => (i.key === key ? { ...i, qty: Math.min(MAX_QTY, i.qty + 1) } : i))
      : [...items, { key, id, name, variant, qty: 1 }],
  );
}

function changeQty(key: string, delta: number): void {
  setItems(
    items
      .map((i) => (i.key === key ? { ...i, qty: Math.min(MAX_QTY, i.qty + delta) } : i))
      .filter((i) => i.qty > 0),
  );
}

function el<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function renderItem(item: OrderItem): HTMLLIElement {
  const li = el("li", "oitem");
  const info = el("div");
  info.append(el("div", "oitem__name", item.name));
  if (item.variant) info.append(el("div", "oitem__variant", item.variant));

  const qty = el("div", "oitem__qty");
  const minus = el("button", undefined, "−");
  minus.type = "button";
  minus.setAttribute("aria-label", `${strings().decrease}: ${item.name}`);
  minus.addEventListener("click", () => changeQty(item.key, -1));
  const out = el("output", undefined, String(item.qty));
  out.setAttribute("aria-label", strings().cases);
  const plus = el("button", undefined, "+");
  plus.type = "button";
  plus.setAttribute("aria-label", `${strings().increase}: ${item.name}`);
  plus.addEventListener("click", () => changeQty(item.key, 1));
  qty.append(minus, out, plus);

  const remove = el("button", "oitem__remove", strings().remove);
  remove.type = "button";
  remove.addEventListener("click", () => setItems(items.filter((i) => i.key !== item.key)));

  li.append(info, qty, remove);
  return li;
}

function render(): void {
  const total = items.reduce((sum, i) => sum + i.qty, 0);
  document.querySelectorAll<HTMLElement>("[data-order-count]").forEach((badge) => {
    badge.textContent = String(items.length);
    badge.hidden = items.length === 0;
  });
  const list = document.querySelector<HTMLUListElement>("[data-order-list]");
  const empty = document.querySelector<HTMLElement>("[data-order-empty]");
  const form = document.querySelector<HTMLFormElement>("[data-order-form]");
  if (!list || !empty || !form) return;
  list.replaceChildren(...items.map(renderItem));
  empty.hidden = items.length > 0;
  form.hidden = items.length === 0;
  list.setAttribute("aria-label", fmt(strings().listSummary, { items: items.length, cases: total }));
}

function buildMessage(shop: string, area: string, note: string): string {
  const t = strings();
  const lines = items.map((i, n) => `${n + 1}. ${i.name}${i.variant ? ` — ${i.variant}` : ""} × ${i.qty} ${i.qty > 1 ? t.caseMany : t.caseOne}`);
  return [
    t.orderIntro,
    "",
    ...lines,
    "",
    `${t.shop}: ${shop}`,
    `${t.area}: ${area}`,
    note ? `${t.note}: ${note}` : "",
  ]
    .filter((l, idx, arr) => !(l === "" && idx === arr.length - 1))
    .join("\n")
    .trim();
}

export function initOrderList(): void {
  const dialog = document.querySelector<HTMLDialogElement>("#order-dialog");
  const form = document.querySelector<HTMLFormElement>("[data-order-form]");

  const open = () => {
    if (!dialog) return;
    render();
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  };

  document.querySelectorAll("[data-open-order]").forEach((btn) => btn.addEventListener("click", open));
  document.querySelector("[data-close-order]")?.addEventListener("click", () => dialog?.close());
  dialog?.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
  document.querySelector("[data-clear-order]")?.addEventListener("click", () => setItems([]));

  // Event delegation so dynamically filtered cards keep working.
  document.addEventListener("click", (e) => {
    const target = e.target instanceof Element ? e.target.closest<HTMLElement>("[data-add-order]") : null;
    if (!target) return;
    const card = target.closest<HTMLElement>("[data-product]");
    const select = card?.querySelector<HTMLSelectElement>("[data-variant]");
    const id = target.dataset.id ?? "";
    const name = target.dataset.name ?? "";
    if (!id || !name) return;
    const variant = select?.value ?? "";
    addItem(id, name, variant);
    showToast(fmt(strings().added, { item: `${name}${variant ? ` (${variant})` : ""}` }));
    target.classList.add("is-added");
    window.setTimeout(() => target.classList.remove("is-added"), 1200);
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateRequired(form)) return;
    const message = buildMessage(readField(form, "shop"), readField(form, "area"), readField(form, "note"));
    window.open(buildWaUrl(message), "_blank", "noopener");
  });

  render();
}

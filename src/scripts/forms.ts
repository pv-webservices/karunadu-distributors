// Enquiry forms -> pre-filled WhatsApp message. No data is stored or sent to any server.
import { buildWaUrl, validateRequired } from "./shared";

function fieldLabel(form: HTMLFormElement, field: Element): string {
  const explicit = field.getAttribute("data-label");
  if (explicit) return explicit;
  const label = field.id ? form.querySelector(`label[for="${field.id}"]`) : null;
  return (label?.textContent ?? field.getAttribute("name") ?? "").replace("*", "").trim();
}

export function initForms(): void {
  document.querySelectorAll<HTMLFormElement>("[data-wa-form]").forEach((form) => {
    form.addEventListener("input", (e) => {
      const t = e.target;
      if (t instanceof Element && t.closest(".field")?.classList.contains("is-invalid")) {
        t.closest(".field")?.classList.remove("is-invalid");
        t.setAttribute("aria-invalid", "false");
      }
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validateRequired(form)) return;
      const lines: string[] = [form.dataset.intro ?? "Hello Karunadu Distributors,", ""];
      form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>("input, textarea, select").forEach((field) => {
        if (field instanceof HTMLInputElement && field.type === "checkbox") {
          if (field.checked) lines.push(`• ${fieldLabel(form, field)}`);
          return;
        }
        const value = field.value.trim().replace(/\s+/g, " ");
        if (value) lines.push(`${fieldLabel(form, field)}: ${value}`);
      });
      window.open(buildWaUrl(lines.join("\n")), "_blank", "noopener");
      const done = form.querySelector<HTMLElement>("[data-form-done]");
      if (done) done.hidden = false;
    });
  });
}

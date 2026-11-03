(function () {
  "use strict";

  const config = window.AVDEX_CONFIG || {};
  const setText = (selector, value, fallback) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = value && String(value).trim() ? value : fallback;
    });
  };

  setText("[data-phone]", config.phoneDisplay, "Телефон не указан");
  setText("[data-email]", config.email, "Электронная почта не указана");
  setText("[data-store-address]", config.storeAddress, "Адрес магазина не указан");
  setText("[data-working-hours]", config.workingHours, "Режим работы не указан");
  setText("[data-legal-name]", config.legalName, "Сведения не указаны");
  setText("[data-inn]", config.inn, "Не указан");
  setText("[data-ogrn]", config.ogrn, "Не указан");
  setText("[data-legal-address]", config.legalAddress, "Не указан");

  const phoneLink = document.querySelector("[data-phone-link]");
  if (phoneLink) {
    const phone = String(config.phoneHref || "").replace(/[^+\d]/g, "");
    if (phone) {
      phoneLink.href = `tel:${phone}`;
    } else {
      phoneLink.removeAttribute("href");
      phoneLink.setAttribute("aria-disabled", "true");
      phoneLink.classList.add("is-unavailable");
    }
  }

  const emailLink = document.querySelector("[data-email-link]");
  if (emailLink) {
    const email = String(config.email || "").trim();
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailLink.href = `mailto:${email}`;
    } else {
      emailLink.removeAttribute("href");
      emailLink.setAttribute("aria-disabled", "true");
      emailLink.classList.add("is-unavailable");
    }
  }

  const year = document.getElementById("current-year");
  if (year) year.textContent = String(new Date().getFullYear());

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
      toggle.setAttribute("aria-label", isOpen ? "Открыть меню" : "Закрыть меню");
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Открыть меню");
      });
    });
  }
})();


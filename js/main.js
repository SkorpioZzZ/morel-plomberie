// Scripts du site (menu mobile, année du footer, formulaire de devis)

// Menu mobile
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    // pour les lecteurs d'écran
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// Année du pied de page
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// Formulaire de devis
const form = document.querySelector("#quote-form");

if (form) {
  const status = form.querySelector(".form-status");

  // chaque règle renvoie un message d'erreur, ou "" si le champ est ok
  const rules = {
    name: (v) => (v.trim().length >= 2 ? "" : "Indiquez votre nom."),
    phone: (v) =>
      /^(?:\+33\s?|0)[1-9](?:[\s.-]?\d{2}){4}$/.test(v.trim())
        ? ""
        : "Numéro invalide (ex. : 06 12 34 56 78).",
    email: (v) =>
      v.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
        ? ""
        : "Adresse e-mail invalide.",
    postcode: (v) => {
      if (!/^\d{5}$/.test(v.trim())) return "Code postal à 5 chiffres.";
      return /^(75|92|93|94)/.test(v.trim())
        ? ""
        : "Nous intervenons à Paris (75) et en petite couronne (92, 93, 94).";
    },
    service: (v) => (v ? "" : "Choisissez un type d'intervention."),
    message: (v) =>
      v.trim().length >= 15 ? "" : "Décrivez votre besoin en quelques mots.",
  };

  function showError(field, message) {
    const wrapper = field.closest(".field");
    const errorEl = wrapper.querySelector(".field__error");
    wrapper.classList.toggle("has-error", Boolean(message));
    field.setAttribute("aria-invalid", message ? "true" : "false");
    if (errorEl) errorEl.textContent = message;
  }

  function validateField(field) {
    const rule = rules[field.name];
    if (!rule) return true;
    const message = rule(field.value);
    showError(field, message);
    return message === "";
  }

  // on vérifie un champ quand on le quitte
  Object.keys(rules).forEach((name) => {
    const field = form.elements[name];
    field.addEventListener("blur", () => validateField(field));
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.className = "form-status";

    // honeypot rempli = robot
    if (form.elements.website.value !== "") return;

    let firstInvalid = null;
    Object.keys(rules).forEach((name) => {
      const field = form.elements[name];
      if (!validateField(field) && !firstInvalid) firstInvalid = field;
    });

    const consent = form.elements.consent;
    showError(consent, consent.checked ? "" : "Votre accord est nécessaire pour traiter la demande.");
    if (!consent.checked && !firstInvalid) firstInvalid = consent;

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    // Pas de serveur ici : si l'attribut action du form est vide, on reste en mode démo.
    // Pour un vrai client, mettre l'URL d'un service d'envoi (Formspree, Web3Forms) ou d'un script PHP.
    const endpoint = form.getAttribute("action");

    if (!endpoint) {
      status.textContent =
        "Merci, votre demande est bien prise en compte. (Site de démo, rien n'a été envoyé.)";
      status.classList.add("is-success");
      form.reset();
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(response.statusText);
      status.textContent = "Merci, votre demande a bien été envoyée. On vous rappelle sous 24h.";
      status.classList.add("is-success");
      form.reset();
    } catch {
      status.textContent = "L'envoi a échoué. Appelez-nous directement au 01 99 00 12 34.";
      status.classList.add("is-error");
    }
  });
}

/*
  Site développé par phomsay pour zaki.
  Contact Discord : @phomsay671.
  Dev web : phomsay. Admin : sauci.
  Recherche et édition : Zaki & B.
*/



(function () {
  const form = document.querySelector("[data-contact-form]");
  const status = document.querySelector("[data-contact-status]");
  const subjectSelect = document.querySelector("#contact-subject");
  const customSelect = document.querySelector("[data-contact-select]");

  if (!form) return;

  const closeSelect = () => {
    customSelect?.classList.remove("is-open");
    customSelect?.querySelector(".contact-select-toggle")?.setAttribute("aria-expanded", "false");
  };

  const setSubject = (value, text) => {
    if (!subjectSelect) return;

    const label = customSelect?.querySelector("[data-contact-select-label]");
    const items = Array.from(customSelect?.querySelectorAll(".contact-select-item") || []);

    subjectSelect.value = value;
    if (label) label.textContent = text;
    items.forEach((item) => item.classList.toggle("active", item.dataset.value === value));
    subjectSelect.dispatchEvent(new Event("change", { bubbles: true }));
    closeSelect();
  };

  if (customSelect && subjectSelect) {
    const toggle = customSelect.querySelector(".contact-select-toggle");
    const items = Array.from(customSelect.querySelectorAll(".contact-select-item"));

    toggle?.addEventListener("click", () => {
      const willOpen = !customSelect.classList.contains("is-open");
      customSelect.classList.toggle("is-open", willOpen);
      toggle.setAttribute("aria-expanded", String(willOpen));
    });

    items.forEach((item) => {
      item.addEventListener("click", () => setSubject(item.dataset.value || "", item.textContent.trim()));
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest("[data-contact-select]")) closeSelect();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeSelect();
    });
  }

  const fieldValue = (name) => {
    const field = form.elements[name];
    return field ? field.value.trim() : "";
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (subjectSelect && !subjectSelect.value) {
      if (status) {
        status.textContent = "Choisissez un sujet avant d'envoyer le message.";
      }
      customSelect?.classList.add("is-open");
      customSelect?.querySelector(".contact-select-toggle")?.setAttribute("aria-expanded", "true");
      return;
    }

    if (!form.reportValidity()) return;

    const name = fieldValue("name");
    const subject = fieldValue("subject");
    const message = fieldValue("message");

    if (status) {
      status.textContent = "Envoi du message...";
    }

    const submit = form.querySelector(".contact-submit");
    if (submit) submit.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          subject,
          message,
          page: window.location.href
        })
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.ok === false) {
        throw new Error(result.message || "Impossible d'envoyer le message pour le moment.");
      }

      form.reset();
      if (subjectSelect) setSubject("", "Choisir un sujet");
      if (status) status.textContent = result.message || "Message envoyé. Merci pour ton retour.";
    } catch (error) {
      if (status) status.textContent = error.message || "Impossible d'envoyer le message pour le moment.";
    } finally {
      if (submit) submit.disabled = false;
    }
  });
})();

const form = document.querySelector("#registration-form");
const statusMessage = document.querySelector("#form-status");
const submitButton = form.querySelector('button[type="submit"]');
const languageToggle = document.querySelector(".language-toggle");
const languageMenu = document.querySelector(".language-menu");

languageToggle.addEventListener("click", () => {
  const isExpanded = languageToggle.getAttribute("aria-expanded") === "true";
  languageToggle.setAttribute("aria-expanded", String(!isExpanded));
  languageMenu.hidden = isExpanded;
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".language")) {
    languageToggle.setAttribute("aria-expanded", "false");
    languageMenu.hidden = true;
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    languageToggle.setAttribute("aria-expanded", "false");
    languageMenu.hidden = true;
    languageToggle.focus();
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  statusMessage.textContent = "";
  statusMessage.className = "form-status";

  const formData = new FormData(form);
  const registration = Object.fromEntries(formData.entries());

  submitButton.disabled = true;
  submitButton.querySelector(".button-label").textContent = "Sending...";

  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registration)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Your registration could not be sent. Please try again.");
    }

    statusMessage.textContent = "Registration submitted successfully.";
    statusMessage.classList.add("success");
    form.reset();
  } catch (error) {
    statusMessage.textContent = error.message || "A network error occurred. Please try again.";
    statusMessage.classList.add("error");
  } finally {
    submitButton.disabled = false;
    submitButton.querySelector(".button-label").textContent = "Submit registration";
  }
});
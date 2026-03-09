const root = document.documentElement;
const year = document.querySelector("#year");
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeLabel = document.querySelector("[data-theme-label]");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const themeQuery = window.matchMedia("(prefers-color-scheme: dark)");
const storageKey = "theme-preference";

if (year) {
  year.textContent = new Date().getFullYear();
}

function getPreferredTheme() {
  return themeQuery.matches ? "dark" : "light";
}

function getStoredTheme() {
  const storedTheme = localStorage.getItem(storageKey);
  return storedTheme === "light" || storedTheme === "dark" ? storedTheme : null;
}

function applyTheme(theme, persist = false) {
  root.dataset.theme = theme;
  root.style.colorScheme = theme;

  if (themeLabel) {
    themeLabel.textContent = theme === "dark" ? "Light" : "Dark";
  }

  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
    themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
  }

  if (themeColorMeta) {
    themeColorMeta.setAttribute("content", theme === "dark" ? "#111512" : "#f5efe4");
  }

  if (persist) {
    localStorage.setItem(storageKey, theme);
  }
}

applyTheme(getStoredTheme() || root.dataset.theme || getPreferredTheme());

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme, true);
});

themeQuery.addEventListener("change", (event) => {
  if (getStoredTheme()) {
    return;
  }

  applyTheme(event.matches ? "dark" : "light");
});

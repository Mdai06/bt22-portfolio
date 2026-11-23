const root = document.documentElement;
const toggle = document.getElementById("theme");
function applyTheme(mode) {
  root.dataset.theme = mode;
  toggle.textContent = mode === "dark" ? "☀" : "☾";
  toggle.setAttribute("aria-pressed", String(mode === "dark"));
}
let mode = "light";
try {
  mode = localStorage.getItem("theme") || "light";
} catch (e) {}
applyTheme(mode);
toggle.addEventListener("click", () => {
  mode = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(mode);
  try {
    localStorage.setItem("theme", mode);
  } catch (e) {}
});
document.querySelectorAll("nav a").forEach((a) => {
  if (
    a.getAttribute("href") ===
    (location.pathname.split("/").pop() || "index.html")
  )
    a.setAttribute("aria-current", "page");
});
if ("IntersectionObserver" in window) {
  root.classList.add("js");
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.12 },
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}
const form = document.querySelector("form");
if (form && form.action.includes("YOUR_FORM_ID"))
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Cần cấu hình Formspree ID trước khi gửi biểu mẫu.");
  });

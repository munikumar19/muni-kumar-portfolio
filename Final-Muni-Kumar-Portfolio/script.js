const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
menuButton?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuButton.title = isOpen ? "Close navigation" : "Open navigation";
});
nav?.querySelectorAll("a, .theme-toggle").forEach((item, index) => item.style.setProperty("--nav-order", index));
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.setAttribute("aria-label", "Open navigation");
  if (menuButton) menuButton.title = "Open navigation";
}));


// Persistent light/dark theme toggle
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = themeToggle?.querySelector(".theme-icon");
const storedTheme = (() => {
  try { return localStorage.getItem("muni-portfolio-theme"); }
  catch { return null; }
})();
const applyTheme = (theme) => {
  document.body.dataset.theme = theme;
  const isDark = theme === "dark";
  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    themeToggle.title = isDark ? "Switch to light mode" : "Switch to dark mode";
  }
  if (themeIcon) {
    themeIcon.innerHTML = isDark
      ? '<svg viewBox="0 0 24 24" focusable="false"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>'
      : '<svg viewBox="0 0 24 24" focusable="false"><path d="M20.2 15.1A8.5 8.5 0 0 1 8.9 3.8 8.6 8.6 0 1 0 20.2 15.1Z"/></svg>';
    themeIcon.classList.remove("icon-spin");
    void themeIcon.offsetWidth;
    themeIcon.classList.add("icon-spin");
  }
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", isDark ? "#111b18" : "#f5f3ee");
};
applyTheme(storedTheme === "dark" ? "dark" : "light");
themeToggle?.addEventListener("click", () => {
  const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  try { localStorage.setItem("muni-portfolio-theme", nextTheme); } catch { /* storage may be unavailable */ }
});

// Reveal content as it enters the viewport; respect reduced-motion preferences.
const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
const revealTargets = document.querySelectorAll(
  ".hero-copy, .hero-art, .section-heading, .about-copy, .education, .skill-group, .project-card, .github-stat, .contribution-card, .contact-copy, .contact-form"
);
if ("IntersectionObserver" in window && !reduceMotion) {
  document.documentElement.classList.add("js-reveal");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -45px 0px" });

  revealTargets.forEach((element, index) => {
    element.setAttribute("data-reveal", index % 5 === 1 ? "right" : index % 5 === 3 ? "left" : "up");
    if (element.classList.contains("skill-group") || element.classList.contains("project-card")) {
      const siblings = [...element.parentElement.children];
      element.style.transitionDelay = `${Math.min(siblings.indexOf(element) * 100, 250)}ms`;
    }
    revealObserver.observe(element);
  });
}


// Slim reading-progress indicator for a subtle extra interaction.
const progressBar = document.querySelector(".scroll-progress");
let progressTicking = false;
const updateScrollProgress = () => {
  if (!progressBar || progressTicking) return;
  progressTicking = true;
  window.requestAnimationFrame(() => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progressBar.style.transform = `scaleX(${progress / 100})`;
    progressTicking = false;
  });
};
window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();

// Stagger the skill-logo entrances for a gentle cascading effect.
document.querySelectorAll(".skill-grid").forEach((grid) => {
  grid.querySelectorAll(".skill").forEach((item, index) => {
    item.style.setProperty("--skill-order", index);
  });
});

// Premium interactions: back-to-top and subtle desktop cursor.
const backToTop = document.querySelector('.back-to-top');
const updateBackToTop = () => backToTop?.classList.toggle('visible', window.scrollY > 520);
window.addEventListener('scroll', updateBackToTop, { passive: true });
updateBackToTop();
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

const cursorAura = document.querySelector('.cursor-aura');
if (cursorAura && window.matchMedia('(hover:hover) and (pointer:fine)').matches && !reduceMotion) {
  window.addEventListener('pointermove', event => {
    cursorAura.style.left = `${event.clientX}px`;
    cursorAura.style.top = `${event.clientY}px`;
    cursorAura.classList.add('active');
  }, { passive: true });
  document.querySelectorAll('a,button,summary').forEach(element => {
    element.addEventListener('pointerenter', () => cursorAura.classList.add('hovering'));
    element.addEventListener('pointerleave', () => cursorAura.classList.remove('hovering'));
  });
}

// Accessible, line-by-line typewriter headline.
(() => {
  const heading = document.querySelector(".typewriter-heading");
  if (!heading) return;
  const lines = [...heading.querySelectorAll("[data-type]")];
  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    lines.forEach(line => line.textContent = line.dataset.type);
    return;
  }
  let lineIndex = 0;
  const typeNext = () => {
    if (lineIndex >= lines.length) return;
    const line = lines[lineIndex];
    const value = line.dataset.type || "";
    let charIndex = 0;
    line.classList.add("is-typing");
    const typeChar = () => {
      line.textContent = value.slice(0, ++charIndex);
      if (charIndex < value.length) {
        window.setTimeout(typeChar, 48);
      } else {
        line.classList.remove("is-typing");
        lineIndex++;
        window.setTimeout(typeNext, 190);
      }
    };
    typeChar();
  };
  typeNext();
})();

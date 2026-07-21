
const cinematicLoader = document.querySelector(".cinematic-loader");
window.addEventListener("load", () => {
  window.setTimeout(() => cinematicLoader?.classList.add("is-hidden"), 1200);
});
const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");
const logoStage = document.querySelector(".logo-stage");
const spotlight = document.querySelector(".spotlight");

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuButton?.addEventListener("click", () => {
  const open = navLinks?.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(Boolean(open)));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks?.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.13, rootMargin: "0px 0px -60px" }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

document.querySelectorAll(".button").forEach((button) => {
  button.addEventListener("pointermove", (event) => {
    const rect = button.getBoundingClientRect();
    button.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    button.style.setProperty("--my", `${event.clientY - rect.top}px`);
  });
});

if (window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener(
    "pointermove",
    (event) => {
      spotlight?.style.setProperty("--spot-x", `${event.clientX}px`);
      spotlight?.style.setProperty("--spot-y", `${event.clientY}px`);

      if (logoStage) {
        const rect = logoStage.getBoundingClientRect();
        const x = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
        const y = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
        logoStage.style.transform =
          `rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(${window.scrollY * -0.008}px)`;
      }
    },
    { passive: true }
  );

  logoStage?.addEventListener("pointerleave", () => {
    logoStage.style.transform = "rotateY(0deg) rotateX(0deg)";
  });
}

const parallaxItems = document.querySelectorAll("[data-parallax]");
let ticking = false;

const runParallax = () => {
  const scrollY = window.scrollY;
  parallaxItems.forEach((item) => {
    const speed = Number(item.dataset.parallax || 0.08);
    item.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
  });
  ticking = false;
};

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      requestAnimationFrame(runParallax);
      ticking = true;
    }
  },
  { passive: true }
);

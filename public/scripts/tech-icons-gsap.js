const { gsap } = window;

export default function animateTechIcons() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }

  function run() {
    const icons = document.querySelectorAll(".tech-icon i");
    const labels = document.querySelectorAll(".tech-icon label");
    icons.forEach((icon, idx) => {
      icon.addEventListener("mouseenter", () => {
        icon.classList.add("colored");
        gsap.to(labels[idx], {
          opacity: 1,
          y: -5,
          duration: 0.4,
          ease: "power2.out",
        });
      });
      icon.addEventListener("mouseleave", () => {
        icon.classList.remove("colored");
        gsap.to(labels[idx], {
          opacity: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      });
    });
  }
}

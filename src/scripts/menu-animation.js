import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function animateMenuColor() {
  gsap.registerPlugin(ScrollTrigger);

  const menu = document.querySelector(".menu");
  let activeCount = 0;

  const hamburger = document.querySelector(".navbar__hamburger");
  const menuIcon = document.querySelector(".menu");
  const menuLinks = document.querySelector(".navbar__links");

  hamburger.addEventListener("click", () => {
    menuIcon.classList.toggle("open");
    menuLinks.classList.toggle("open");
  });

  document.querySelectorAll(".white-section").forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      onEnter: () => {
        activeCount++;
        menu.classList.add("menu--dark");
      },
      onLeave: () => {
        activeCount--;
        if (activeCount === 0) menu.classList.remove("menu--dark");
      },
      onEnterBack: () => {
        activeCount++;
        menu.classList.add("menu--dark");
      },
      onLeaveBack: () => {
        activeCount--;
        if (activeCount === 0) menu.classList.remove("menu--dark");
      },
    });
  });

  // Check on load if menu is over a white-section
  function checkInitialSection() {
    const sections = document.querySelectorAll(".white-section");
    const menuRect = menu.getBoundingClientRect();
    let isOverWhite = false;
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < menuRect.bottom && rect.bottom > menuRect.top) {
        isOverWhite = true;
      }
    });
    if (isOverWhite) {
      menu.classList.add("menu--dark");
      activeCount = 1;
    }
  }
  checkInitialSection();
}
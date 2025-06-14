import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("DOMContentLoaded", () => {
  const path = document.getElementById("flower-line");
  if (path) {
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    gsap.to(path, {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: ".timeline",
        start: "top-=250 top",
        end: "bottom bottom",
        scrub: 1
      },
    });
  }

  function animateText(selector, isMobile) {
    gsap.utils.toArray(selector).forEach((item) => {
      if (isMobile) {
        gsap.fromTo(
          item,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            scrollTrigger: {
              trigger: item,
              start: "top 70%",
              end: "top 40%",
              scrub: true
            },
          }
        );
      } else {
        gsap.fromTo(
          item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              end: "top 60%",
              scrub: true
            },
          }
        );
      }
    });
  }

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  // Timeline texts
  animateText(".timeline__content", isMobile);

  // Card texts
  animateText(".card__body p", isMobile);
});
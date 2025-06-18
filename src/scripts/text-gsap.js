import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function animateTexts() {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  function animateText(selector) {
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
              start: "top 80%",
              end: "top 60%",
              scrub: true,
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
              start: "top 90%",
              end: "top 80%",
              scrub: true,
            },
          }
        );
      }
    });
  }

  animateText(".timeline__content");
  animateText(".card__body p");
}
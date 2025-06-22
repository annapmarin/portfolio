const { gsap, ScrollTrigger } = window;

gsap.registerPlugin(ScrollTrigger);

export default function flowerJourney() {
  function run() {
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
          scrub: 1,
        },
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
}
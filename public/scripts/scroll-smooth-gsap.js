const { gsap, ScrollTrigger, ScrollSmoother } = window;

export default function animateScrollSmooth() {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  function run() {
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.1,
      effects: true,
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
}
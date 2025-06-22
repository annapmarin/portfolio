function animateScrollSmooth() {
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

if (window.innerWidth > 768) {
  animateScrollSmooth();
}
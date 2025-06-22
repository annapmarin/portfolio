function animateImgForm() {
  function run() {
    const img = document.querySelector(".img-form");
    if (!img) return;

    gsap.fromTo(
      img,
      {
        scale: 0.7,
        rotate: -15,
        filter: "blur(12px) brightness(1.3)",
        opacity: 0,
      },
      {
        scale: 1,
        rotate: 0,
        filter: "blur(0px) brightness(1)",
        opacity: 1,
        duration: 1.2,
        ease: "expo.out",
        delay: 0.2,
      }
    );

    img.addEventListener("mouseenter", () => {
      gsap.to(img, {
        scale: 1.07,
        rotate: 2,
        filter: "brightness(1.15) drop-shadow(0 4px 24px #ffb6c1cc)",
        duration: 0.5,
        yoyo: true,
        ease: "elastic.out(1, 0.5)",
      });
    });
    img.addEventListener("mouseleave", () => {
      gsap.to(img, {
        scale: 1,
        rotate: 0,
        filter: "brightness(1) drop-shadow(0 2px 8px #00000022)",
        duration: 0.4,
        ease: "power2.out",
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
}

animateImgForm();

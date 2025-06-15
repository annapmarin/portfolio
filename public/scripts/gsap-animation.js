function animateJourney() {
  gsap.registerPlugin(ScrollTrigger);

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
                start: "top 80%",
                end: "top 60%",
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
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
}

function animateTechIcons() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }

  function run() {
    const icons = document.querySelectorAll('.tech-icon i');
    const labels = document.querySelectorAll('.tech-icon label');
    icons.forEach((icon, idx) => {
      icon.addEventListener('mouseenter', () => {
        icon.classList.add('colored');
        gsap.to(labels[idx], {
          opacity: 1,
          y: -5,
          duration: 0.4,
          ease: "power2.out"
        });
      });
      icon.addEventListener('mouseleave', () => {
        icon.classList.remove('colored');
        gsap.to(labels[idx], {
          opacity: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.in"
        });
      });
    });
  }
}

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

function animateMenuColor() {
  gsap.registerPlugin(ScrollTrigger);

  const menu = document.querySelector('.menu');
  let activeCount = 0;

  document.querySelectorAll('.white-section').forEach(section => {
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      onEnter: () => {
        activeCount++;
        menu.classList.add('menu--dark');
      },
      onLeave: () => {
        activeCount--;
        if (activeCount === 0) menu.classList.remove('menu--dark');
      },
      onEnterBack: () => {
        activeCount++;
        menu.classList.add('menu--dark');
      },
      onLeaveBack: () => {
        activeCount--;
        if (activeCount === 0) menu.classList.remove('menu--dark');
      }
    });
  });

  // Check on load if menu is over a white-section
  function checkInitialSection() {
    const sections = document.querySelectorAll('.white-section');
    const menuRect = menu.getBoundingClientRect();
    let isOverWhite = false;
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (
        rect.top < menuRect.bottom &&
        rect.bottom > menuRect.top
      ) {
        isOverWhite = true;
      }
    });
    if (isOverWhite) {
      menu.classList.add('menu--dark');
      activeCount = 1;
    }
  }
  checkInitialSection();
}

const hamburger = document.querySelector('.navbar__hamburger');
const menuIcon = document.querySelector('.menu');
const menuLinks = document.querySelector('.navbar__links');

hamburger.addEventListener('click', () => {
  menuIcon.classList.toggle('open');
  menuLinks.classList.toggle('open');
});

if (window.innerWidth > 768) {
  animateScrollSmooth();
};
animateJourney();
animateTechIcons();
animateMenuColor();

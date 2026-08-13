/* =========================================
   PREMIUM PORTFOLIO JAVASCRIPT
========================================= */


/* =========================
   MOBILE MENU
========================= */

const menu = document.getElementById("menu");
const nav = document.querySelector("nav");

if (menu && nav) {

  menu.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", () => {
      nav.classList.remove("active");
    });

  });

}


/* =========================
   SMOOTH SCROLL
========================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

  anchor.addEventListener("click", function(e) {

    const target = document.querySelector(
      this.getAttribute("href")
    );

    if (target) {

      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }

  });

});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
  "section, .card, .project, .certs > div, .skills article"
);

const revealObserver = new IntersectionObserver(
  (entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }

    });

  },
  {
    threshold:0.12
  }
);

revealElements.forEach(element => {

  element.classList.add("reveal");
  revealObserver.observe(element);

});


/* =========================
   TYPING EFFECT
========================= */

const roleElement = document.querySelector(".hero h2");

const roles = [
  "Front-End Developer",
  "Web Developer",
  "Software Developer",
  "Creative Coder"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeRole() {

  if (!roleElement) return;

  const currentRole = roles[roleIndex];

  if (!deleting) {

    roleElement.textContent =
      currentRole.substring(0, charIndex + 1);

    charIndex++;

    if (charIndex === currentRole.length) {

      deleting = true;

      setTimeout(typeRole, 1600);

      return;
    }

  } else {

    roleElement.textContent =
      currentRole.substring(0, charIndex - 1);

    charIndex--;

    if (charIndex === 0) {

      deleting = false;
      roleIndex++;

      if (roleIndex >= roles.length) {
        roleIndex = 0;
      }

    }

  }

  setTimeout(
    typeRole,
    deleting ? 50 : 90
  );

}

if (roleElement) {
  typeRole();
}


/* =========================
   STATS COUNTER
========================= */

function countUp(element, target, decimals = 0) {

  const duration = 1400;
  const start = performance.now();

  function update(time) {

    const progress = Math.min(
      (time - start) / duration,
      1
    );

    const eased =
      1 - Math.pow(1 - progress, 3);

    const value = target * eased;

    element.textContent =
      value.toFixed(decimals);

    if (progress < 1) {
      requestAnimationFrame(update);
    }

  }

  requestAnimationFrame(update);

}


const stats = document.querySelectorAll(".stats b");

let statsAnimated = false;

if (stats.length) {

  const statsObserver = new IntersectionObserver(
    entries => {

      if (
        entries[0].isIntersecting &&
        !statsAnimated
      ) {

        statsAnimated = true;

        if (stats[0]) {
          countUp(stats[0], 8.86, 2);
        }

        if (stats[1]) {
          countUp(stats[1], 2027, 0);
        }

        statsObserver.disconnect();
      }

    },
    {
      threshold:0.5
    }
  );

  statsObserver.observe(
    stats[0].parentElement
  );

}


/* =========================
   SCROLL PROGRESS
========================= */

const progressBar =
  document.createElement("div");

progressBar.className =
  "scroll-progress";

document.body.appendChild(progressBar);

function updateProgress() {

  const scrollTop = window.scrollY;

  const height =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const progress =
    height > 0
      ? (scrollTop / height) * 100
      : 0;

  progressBar.style.width =
    progress + "%";

}

window.addEventListener(
  "scroll",
  updateProgress,
  { passive:true }
);


/* =========================
   HEADER SCROLL EFFECT
========================= */

const header =
  document.querySelector("header");

window.addEventListener(
  "scroll",
  () => {

    if (!header) return;

    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  },
  { passive:true }
);


/* =========================
   ACTIVE NAVBAR
========================= */

const sections =
  document.querySelectorAll("section[id]");

const navLinks =
  document.querySelectorAll("nav a");

const activeObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          navLinks.forEach(link => {
            link.classList.remove("active");
          });

          const activeLink =
            document.querySelector(
              `nav a[href="#${entry.target.id}"]`
            );

          if (activeLink) {
            activeLink.classList.add("active");
          }

        }

      });

    },
    {
      threshold:0.45
    }
  );

sections.forEach(section => {
  activeObserver.observe(section);
});


/* =========================
   BUTTON RIPPLE
========================= */

document.querySelectorAll(
  ".btn"
).forEach(button => {

  button.addEventListener(
    "click",
    function(e) {

      const ripple =
        document.createElement("span");

      ripple.className = "ripple";

      const rect =
        this.getBoundingClientRect();

      ripple.style.left =
        (e.clientX - rect.left) + "px";

      ripple.style.top =
        (e.clientY - rect.top) + "px";

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);

    }
  );

});


/* =========================
   SUBTLE MOUSE PARALLAX
========================= */

const visual =
  document.querySelector(".visual");

if (visual) {

  document.addEventListener(
    "mousemove",
    e => {

      if (window.innerWidth <= 800) return;

      const x =
        (window.innerWidth / 2 - e.clientX) / 50;

      const y =
        (window.innerHeight / 2 - e.clientY) / 50;

      visual.style.transform =
        `translate(${x}px, ${y}px)`;

    }
  );

}


/* =========================
   CARD TILT
========================= */

document.querySelectorAll(
  ".card, .project"
).forEach(card => {

  card.addEventListener(
    "mousemove",
    e => {

      if (window.innerWidth <= 800) return;

      const rect =
        card.getBoundingClientRect();

      const x =
        e.clientX - rect.left;

      const y =
        e.clientY - rect.top;

      const centerX =
        rect.width / 2;

      const centerY =
        rect.height / 2;

      const rotateX =
        ((y - centerY) / centerY) * -2;

      const rotateY =
        ((x - centerX) / centerX) * 2;

      card.style.transform =
        `perspective(800px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-5px)`;

    }
  );

  card.addEventListener(
    "mouseleave",
    () => {

      card.style.transform =
        "";

    }
  );

});


/* =========================
   PAGE LOAD
========================= */

window.addEventListener(
  "load",
  () => {

    document.body.classList.add(
      "loaded"
    );

    updateProgress();

  }
);

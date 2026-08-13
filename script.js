/* ===============================
   PORTFOLIO ANIMATION SCRIPT
================================ */

// Mobile Menu
const menu = document.getElementById("menu");
const nav = document.querySelector("nav");

menu.addEventListener("click", () => {
    nav.classList.toggle("active");
});

// Close mobile menu when clicking a link
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
    });
});


/* ===============================
   SCROLL REVEAL ANIMATION
================================ */

const revealElements = document.querySelectorAll(
    "section, .card, article, .project, .certs > div, .pills i"
);

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
    revealObserver.observe(element);
});


/* ===============================
   TYPING EFFECT
================================ */

const roles = [
    "Front-End Developer",
    "Web Developer",
    "Software Developer",
    "Creative Coder"
];

const roleElement = document.querySelector(".hero h2");

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typingEffect() {

    if (!roleElement) return;

    const currentRole = roles[roleIndex];

    if (!deleting) {

        roleElement.textContent =
            currentRole.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentRole.length) {

            deleting = true;

            setTimeout(typingEffect, 1800);

            return;
        }

    } else {

        roleElement.textContent =
            currentRole.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            roleIndex++;

            if (roleIndex >= roles.length) {
                roleIndex = 0;
            }
        }
    }

    setTimeout(
        typingEffect,
        deleting ? 55 : 95
    );
}

typingEffect();


/* ===============================
   STATS COUNTER
================================ */

function animateCounter(element, target, suffix = "") {

    let current = 0;

    const duration = 1200;
    const steps = 50;
    const increment = target / steps;

    const timer = setInterval(() => {

        current += increment;

        if (current >= target) {

            current = target;
            clearInterval(timer);

        }

        element.childNodes[0].textContent =
            suffix === "CGPA"
                ? current.toFixed(2) + " "
                : Math.floor(current) + " ";

    }, duration / steps);
}


const stats = document.querySelectorAll(".stats b");

let statsStarted = false;

const statsObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting && !statsStarted) {

                statsStarted = true;

                if (stats[0]) {
                    animateCounter(
                        stats[0],
                        8.86,
                        "CGPA"
                    );
                }

                if (stats[1]) {
                    animateCounter(
                        stats[1],
                        2027
                    );
                }

            }

        });

    },
    {
        threshold: 0.7
    }
);

if (stats.length) {
    statsObserver.observe(stats[0].parentElement);
}


/* ===============================
   SMOOTH SCROLL
================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

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


/* ===============================
   ACTIVE NAVIGATION
================================ */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

const sectionObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

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
        threshold: 0.45
    }
);

sections.forEach(section => {
    sectionObserver.observe(section);
});


/* ===============================
   BUTTON RIPPLE EFFECT
================================ */

document.querySelectorAll(".btn, .social-btn").forEach(button => {

    button.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        ripple.classList.add("ripple");

        const rect = this.getBoundingClientRect();

        ripple.style.left =
            (e.clientX - rect.left) + "px";

        ripple.style.top =
            (e.clientY - rect.top) + "px";

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);

    });

});


/* ===============================
   MOUSE PARALLAX HERO
================================ */

const visual = document.querySelector(".visual");

document.addEventListener("mousemove", (e) => {

    if (!visual) return;

    const x =
        (window.innerWidth / 2 - e.clientX) / 40;

    const y =
        (window.innerHeight / 2 - e.clientY) / 40;

    visual.style.transform =
        `translate(${x}px, ${y}px)`;

});


/* ===============================
   SCROLL PROGRESS BAR
================================ */

const progressBar = document.createElement("div");

progressBar.className = "scroll-progress";

document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        (scrollTop / documentHeight) * 100;

    progressBar.style.width =
        progress + "%";

});


/* ===============================
   PAGE LOAD ANIMATION
================================ */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

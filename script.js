(() => {
  "use strict";

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const header = $("#siteHeader");
  const nav = $("#primaryNav");
  const menuToggle = $(".menu-toggle");
  const navScrim = $("#navScrim");
  const progressBar = $("#scrollProgress");
  const backToTop = $("#backToTop");
  const year = $("#currentYear");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  /* Mobile navigation */
  let navCloseTimer;

  const setNavigation = (open) => {
    if (!header || !menuToggle) return;
    clearTimeout(navCloseTimer);
    header.classList.toggle("nav-open", open);
    document.body.classList.toggle("nav-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");

    if (!navScrim) return;
    if (open) {
      navScrim.hidden = false;
      requestAnimationFrame(() => navScrim.classList.add("is-visible"));
    } else {
      navScrim.classList.remove("is-visible");
      navCloseTimer = window.setTimeout(() => {
        if (!header.classList.contains("nav-open")) navScrim.hidden = true;
      }, 300);
    }
  };

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      setNavigation(!header.classList.contains("nav-open"));
    });
  }

  if (navScrim) {
    navScrim.addEventListener("click", () => setNavigation(false));
  }

  $$(".primary-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      if (header && header.classList.contains("nav-open")) setNavigation(false);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header && header.classList.contains("nav-open")) {
      setNavigation(false);
      menuToggle?.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980 && header && header.classList.contains("nav-open")) {
      setNavigation(false);
    }
  });

  /* Active navigation and page chrome */
  const navLinks = $$(".nav-link");
  const navSectionIds = ["home", "about", "courses", "placement", "contact"];
  const navSections = navSectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  let scrollTicking = false;

  const updateActiveNav = () => {
    if (!navSections.length) return;
    const marker = window.scrollY + (header?.offsetHeight || 0) + 100;
    let current = "home";

    navSections.forEach((section) => {
      if (marker >= section.offsetTop) current = section.id;
    });

    const atBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom) current = "contact";

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${current}`;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const updatePageChrome = () => {
    const scrollTop = window.scrollY;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(scrollTop / scrollable, 1) : 0;

    header?.classList.toggle("is-scrolled", scrollTop > 12);

    if (progressBar) {
      progressBar.style.transform = `scaleX(${progress})`;
    }

    backToTop?.classList.toggle("is-visible", scrollTop > 650);
    updateActiveNav();
    scrollTicking = false;
  };

  const requestPageChromeUpdate = () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(updatePageChrome);
  };

  window.addEventListener("scroll", requestPageChromeUpdate, { passive: true });
  window.addEventListener("resize", requestPageChromeUpdate);
  window.addEventListener("load", updatePageChrome);
  updatePageChrome();

  backToTop?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  });

  /* Scroll reveals */
  const revealItems = $$(".reveal");

  $$(".hero-copy").forEach((parent) => {
    $$(".reveal", parent).forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${Math.min(index * 0.055, 0.28)}s`);
    });
  });

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -36px 0px" },
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  /* Course filtering */
  const filterButtons = $$(".filter-btn");
  const courseCards = $$(".course-card");
  const courseCount = $("#courseCount");

  const filterCourses = (filter) => {
    let visibleCount = 0;

    courseCards.forEach((card) => {
      const matches = filter === "all" || card.dataset.category === filter;
      card.hidden = !matches;
      if (matches) {
        visibleCount += 1;
        card.classList.add("is-visible");
      }
    });

    filterButtons.forEach((button) => {
      const isActive = button.dataset.filter === filter;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    if (courseCount) {
      courseCount.textContent = `${visibleCount} career track${visibleCount === 1 ? "" : "s"}`;
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => filterCourses(button.dataset.filter || "all"));
  });

  if (courseCount) {
    courseCount.textContent = `${courseCards.length} career tracks`;
  }

  /* Course enquiry shortcut */
  const enquiryForm = $("#enquiryForm");
  const courseSelect = $("#courseSelect");
  const formStatus = $("#formStatus");
  const enquiryCard = $(".enquiry-card");

  $$("[data-course]").forEach((link) => {
    link.addEventListener("click", () => {
      const course = link.dataset.course;
      if (!course || !courseSelect) return;

      const option = Array.from(courseSelect.options).find(
        (item) => item.textContent.trim() === course,
      );

      if (option) {
        courseSelect.value = option.value;
      }

      if (formStatus) {
        formStatus.textContent = `${course} selected. Share your details below to continue on WhatsApp.`;
      }

      if (enquiryCard) {
        enquiryCard.classList.remove("is-targeted");
        requestAnimationFrame(() => enquiryCard.classList.add("is-targeted"));
      }
    });
  });

  /* Enquiry form: hands off to WhatsApp so the static site needs no backend */
  if (enquiryForm) {
    enquiryForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!enquiryForm.reportValidity()) return;

      const data = new FormData(enquiryForm);
      const name = String(data.get("name") || "").trim();
      const phone = String(data.get("phone") || "").trim();
      const email = String(data.get("email") || "").trim();
      const course = String(data.get("course") || "").trim();
      const message = String(data.get("message") || "").trim();

      const lines = [
        "Hello Zenmith Radiance, I would like to enquire about a course.",
        "",
        `Name: ${name}`,
        `Phone: ${phone}`,
        email ? `Email: ${email}` : "",
        `Course: ${course}`,
        message ? `Message: ${message}` : "",
      ].filter((line) => line !== "");

      const url = `https://wa.me/919600169790?text=${encodeURIComponent(lines.join("\n"))}`;
      window.open(url, "_blank", "noopener,noreferrer");

      if (formStatus) {
        formStatus.textContent =
          "WhatsApp should open in a new tab. If it does not, call or WhatsApp +91 96001 69790.";
      }
    });

    enquiryForm.addEventListener("input", (event) => {
      const target = event.target;
      if (target instanceof HTMLElement) {
        target.removeAttribute("aria-invalid");
      }
    });
  }

  /* Accordion: keep one answer open at a time */
  const faqItems = $$(".faq-item");
  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      faqItems.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });

  /* Metric count-up */
  const counters = $$("[data-count]");

  if (counters.length) {
    const setCounter = (element) => {
      const target = Number(element.dataset.count);
      if (!Number.isFinite(target)) return;

      if (prefersReducedMotion) {
        element.textContent = String(target);
        return;
      }

      const duration = 1150;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = String(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    if (!("IntersectionObserver" in window)) {
      counters.forEach(setCounter);
    } else {
      const counterObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            setCounter(entry.target);
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.55 },
      );

      counters.forEach((counter) => counterObserver.observe(counter));
    }
  }
})();

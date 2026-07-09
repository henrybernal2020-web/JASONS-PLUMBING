/* Clem's Plumbing Services — interactions */
(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- sticky header state ---------- */
  var header = document.getElementById("header");
  var onScrollHeader = function () {
    header.classList.toggle("is-stuck", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- mobile menu ---------- */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("mobileMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- copper pipe scroll progress (signature) ---------- */
  var pipeFill = document.getElementById("pipeFill");
  var pipeDrop = document.getElementById("pipeDrop");
  var onScrollPipe = function () {
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    if (pipeFill) pipeFill.style.height = pct + "%";
    if (pipeDrop) pipeDrop.style.top = pct + "%";
  };
  window.addEventListener("scroll", onScrollPipe, { passive: true });
  window.addEventListener("resize", onScrollPipe);
  onScrollPipe();

  /* ---------- scroll reveals ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in-view"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // stagger siblings that enter together
          var delay = (entry.target.dataset.revealIndex || 0) * 70;
          entry.target.style.transitionDelay = delay + "ms";
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    // assign stagger indexes within each parent
    var byParent = new Map();
    reveals.forEach(function (el) {
      var p = el.parentElement;
      var i = byParent.get(p) || 0;
      el.dataset.revealIndex = i;
      byParent.set(p, i + 1);
      io.observe(el);
    });
  }

  /* ---------- animated counters ---------- */
  var counters = document.querySelectorAll(".stat-num");
  var animateCount = function (el) {
    // Static text stats (no data-count) are left exactly as authored.
    if (el.dataset.count == null) return;
    var raw = el.dataset.count;
    var target = parseFloat(raw) || 0;
    var decimals = raw.indexOf(".") > -1 ? 1 : 0;
    var fmt = function (n) {
      return n.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    };
    if (reducedMotion) { el.textContent = fmt(target); return; }
    var duration = 1400;
    var start = null;
    var step = function (ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- review marquee: duplicate track for seamless loop ---------- */
  var marquee = document.querySelector("[data-marquee]");
  if (marquee && !reducedMotion) {
    var track = marquee.querySelector(".marquee-track");
    var clone = track.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    marquee.appendChild(clone);
  }

  /* ---------- quote form (demo submit) ---------- */
  var form = document.getElementById("quoteForm");
  var success = document.getElementById("formSuccess");
  if (form && success) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      form.hidden = true;
      var head = document.querySelector(".quote-card-head");
      if (head) head.hidden = true;
      success.hidden = false;
    });
  }

  /* ---------- FAQ: close others when one opens ---------- */
  var faqs = document.querySelectorAll(".faq-item");
  faqs.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (item.open) {
        faqs.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      }
    });
  });
})();

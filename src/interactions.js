export function initMagnetic(reducedMotion) {
  if (reducedMotion) return;
  const items = document.querySelectorAll(".magnetic");
  items.forEach((el) => {
    const strength = 0.28;
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    });
    el.addEventListener("pointerleave", () => {
      el.style.transform = "";
    });
  });
}

export function initTilt(reducedMotion) {
  if (reducedMotion) return;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  document.querySelectorAll(".project").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rotX = (0.5 - py) * 8;
      const rotY = (px - 0.5) * 10;
      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
      card.style.setProperty("--mx", `${px * 100}%`);
      card.style.setProperty("--my", `${py * 100}%`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}

export function initTilePhysics(reducedMotion) {
  const wrap = document.getElementById("stack-tiles");
  if (!wrap) return;
  const tiles = Array.from(wrap.querySelectorAll(".tile"));
  if (!tiles.length) return;
  if (reducedMotion) return;

  const state = tiles.map((el) => ({ el, x: 0, y: 0, vx: 0, vy: 0, bx: 0, by: 0 }));
  let mouseX = -9999;
  let mouseY = -9999;
  let active = true;

  function measure() {
    const cr = wrap.getBoundingClientRect();
    const sx = window.scrollX;
    const sy = window.scrollY;
    state.forEach((s) => {
      s.bx = cr.left + sx + s.el.offsetLeft + s.el.offsetWidth / 2;
      s.by = cr.top + sy + s.el.offsetTop + s.el.offsetHeight / 2;
      s.x = 0;
      s.y = 0;
      s.vx = 0;
      s.vy = 0;
      s.el.style.transform = "";
    });
  }

  window.addEventListener("resize", measure);
  const io = new IntersectionObserver(([e]) => (active = e.isIntersecting), { threshold: 0.05 });
  io.observe(wrap);

  window.addEventListener(
    "pointermove",
    (e) => {
      mouseX = e.clientX + window.scrollX;
      mouseY = e.clientY + window.scrollY;
    },
    { passive: true }
  );

  const RADIUS = 140;
  const FORCE = 26;
  const SPRING = 0.12;
  const DAMP = 0.82;

  function frame() {
    requestAnimationFrame(frame);
    if (!active) return;
    for (const s of state) {
      const dx = s.bx + s.x - mouseX;
      const dy = s.by + s.y - mouseY;
      const dist = Math.hypot(dx, dy) || 0.001;
      if (dist < RADIUS) {
        const f = (1 - dist / RADIUS) * FORCE;
        s.vx += (dx / dist) * f * 0.06;
        s.vy += (dy / dist) * f * 0.06;
      }
      s.vx += -s.x * SPRING;
      s.vy += -s.y * SPRING;
      s.vx *= DAMP;
      s.vy *= DAMP;
      s.x += s.vx;
      s.y += s.vy;
      if (Math.abs(s.x) < 0.01 && Math.abs(s.y) < 0.01) {
        s.x = 0;
        s.y = 0;
      }
      s.el.style.transform = `translate(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px)`;
    }
  }

  setTimeout(() => {
    measure();
    frame();
  }, 200);
}

export function initHeader() {
  const topbar = document.querySelector(".topbar");
  if (!topbar) return;
  const onScroll = () => topbar.classList.toggle("is-scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

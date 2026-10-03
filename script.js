/* ============================================
   Lumière NYC — script.js
   Nav, Gallery coverflow, Lightbox, Reviews,
   Floating widget, Booking form
   ============================================ */

/* ---------------- DATA ---------------- */
const GALLERY = [
  { src: "https://n1s1.hsmedia.ru/1d/c8/cb/1dc8cbbbf3f3deb3239d0c9509ce84e1/728x910_1_47dd6b875935d48ad7ddeb8f0287fbb8%401080x1350_0xA7rccfpZ_7632516096458611502.jpg.webp", alt: "Glossy nude Russian manicure", cat: "Nails" },
  { src: "https://tvazteca.brightspotcdn.com/dims4/default/e97bda2/2147483647/strip/true/crop/1920x1080%2B0%2B0/resize/1280x720%21/format/webp/quality/90/?url=http%3A%2F%2Ftv-azteca-brightspot.s3.amazonaws.com%2F7d%2F60%2F6877bf5f4e3f86ce0adac9117aa9%2Fideas-de-manicura-rusa-que-alargan-y-estilizan-los-dedos.jpg", alt: "Soft pink nail art with gold detail", cat: "Nails" },
  { src: "https://russianmanicure.com/assets/gallery/1/22.jpg", alt: "Clean glossy nude nails", cat: "Nails" },
  { src: "https://www.newbeauty.com/wp-content/uploads/2024/02/IMG_3203.jpg", alt: "Delicate floral nail art", cat: "Nails" },
  { src: "https://jbeuropeannails.com/cdn/shop/files/IMG_9849.jpg?v=1766547081&width=1600", alt: "Minimal French nail design", cat: "Nails" },
  { src: "https://trendyuniverse.com/wp-content/uploads/2024/03/nude-russian-manicure-1076x1200.jpg", alt: "Classic glossy Russian manicure", cat: "Nails" }
];

const REVIEWS = [
  { q: "My first time here. I had Melania for my nails and Bela did my pedicure. Amazing experience! They pay so much attention to detail and take their time — and they actually take care of your nails. Everyone is so polite and kind. Love it here!", a: "Liz F." },
  { q: "Melania was absolutely fantastic! She has great attention to detail and I love the way my nails turned out.", a: "Claire L." },
  { q: "It was my first time being here and I loved it. Alina took care of my nails and she did a great job. I wanted my nails sharp and square with simple white color. I highly recommend it.", a: "Faa T." },
  { q: "Once you come here there is no going back to the corner nail salon. The technicians are true artists — from classic manicures to intricate nail art and luxe treatments. If you want the best nails in the city, this is the place.", a: "Anya M." }
];

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---------------- NAVBAR ---------------- */
function initNav() {
  const toggle = $("#navToggle");
  const menu = $("#mobileMenu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    toggle.innerHTML = menu.classList.contains("open")
      ? '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/></svg>'
      : '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round"/></svg>';
  });

  $$("#mobileMenu a").forEach(a =>
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      toggle.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round"/></svg>';
    })
  );
}

/* ---------------- GALLERY COVERFLOW ---------------- */
function initGallery() {
  const track = $("#coverflow");
  const dotsBox = $("#galleryDots");
  const counter = $("#galleryCounter");
  if (!track) return;

  let index = 0;
  let timer = null;
  const items = GALLERY;

  const bp = () => (innerWidth < 640 ? "sm" : innerWidth < 1024 ? "md" : "lg");

  function render() {
    const b = bp();
    const neighbours = b === "sm" ? 0 : b === "lg" ? 2 : 1;
    const spread = b === "sm" ? 0 : b === "md" ? 55 : 58;
    const rotate = b === "sm" ? 0 : b === "md" ? -16 : -22;
    const total = items.length;

    track.innerHTML = "";
    items.forEach((item, i) => {
      let d = i - index;
      if (d > total / 2) d -= total;
      if (d < -total / 2) d += total;
      const abs = Math.abs(d);
      if (abs > neighbours) return;

      const active = d === 0;
      const scale = active ? 1 : abs === 1 ? (b === "sm" ? 0.78 : 0.82) : 0.66;

      const el = document.createElement("button");
      el.className = "slide" + (active ? " active" : "");
      el.setAttribute("aria-label", active ? "Open image" : "Go to image");
      el.style.transform = b === "sm" ? "translate(-50%,-50%)" : `translate(-50%,-50%) translateX(${d * spread}%) scale(${scale}) rotateY(${d * rotate}deg)`;
      el.style.zIndex = String(10 - abs);
      el.style.opacity = abs > 1 ? "0.3" : abs === 1 && b === "sm" ? "0.55" : "1";
      el.style.filter = active ? "none" : "blur(1.5px) saturate(.8)";

      el.innerHTML = `
        <img src="${item.src}" alt="${item.alt}" loading="lazy">
        <span class="veil"></span>
        <span class="ring"></span>
        <div class="slide-caption">
          <span class="slide-cat">Nail Work</span>
          <h4>${item.alt}</h4>
          <span class="slide-hint">Tap to enlarge
            <svg viewBox="0 0 24 24"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke-linecap="round"/></svg>
          </span>
        </div>`;

      el.addEventListener("click", () => (active ? openLightbox(i) : (index = i, render(), syncDots())));
      track.appendChild(el);
    });

    syncDots();
    if (counter) counter.textContent = `${index + 1} / ${total}`;
  }

  function renderDots() {
    if (!dotsBox) return;
    dotsBox.innerHTML = "";
    items.forEach((_, i) => {
      const d = document.createElement("button");
      d.className = "dot" + (i === index ? " active" : "");
      d.setAttribute("aria-label", `Go to image ${i + 1}`);
      d.addEventListener("click", () => { index = i; render(); });
      dotsBox.appendChild(d);
    });
  }

  function syncDots() {
    if (!dotsBox) return;
    $$(".dot", dotsBox).forEach((d, i) => d.classList.toggle("active", i === index));
  }

  const go = dir => { index = (index + dir + items.length) % items.length; render(); };

  const start = () => { stop(); timer = setInterval(() => go(1), 4000); };
  const stop = () => timer && clearInterval(timer);

  $("#galPrev")?.addEventListener("click", () => go(-1));
  $("#galNext")?.addEventListener("click", () => go(1));

  track.addEventListener("mouseenter", stop);
  track.addEventListener("mouseleave", start);

  // touch swipe
  let tx = null, ty = null;
  track.addEventListener("touchstart", e => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  track.addEventListener("touchend", e => {
    if (tx === null) return;
    const dx = e.changedTouches[0].clientX - tx;
    const dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
    tx = ty = null;
  }, { passive: true });
  let rt;
  addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(render, 150); });

  /* ---- lightbox ---- */
  const lb = $("#lightbox");
  const lbImg = $("#lbImg");
  const lbCap = $("#lbCaption");
  let lbIndex = 0;

  function openLightbox(i) {
    lbIndex = i; stop();
    updateLb(); lb.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lb.classList.remove("open");
    document.body.style.overflow = "";
    start();
  }
  function updateLb() {
    const it = items[lbIndex];
    lbImg.src = it.src; lbImg.alt = it.alt;
    lbCap.textContent = `${it.alt} · ${lbIndex + 1} / ${items.length}`;
  }
  function lbGo(dir) { lbIndex = (lbIndex + dir + items.length) % items.length; updateLb(); }

  $("#lbClose")?.addEventListener("click", closeLightbox);
  $("#lbPrev")?.addEventListener("click", e => { e.stopPropagation(); lbGo(-1); });
  $("#lbNext")?.addEventListener("click", e => { e.stopPropagation(); lbGo(1); });
  lb?.addEventListener("click", e => { if (e.target === lb) closeLightbox(); });

  addEventListener("keydown", e => {
    if (!lb?.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") lbGo(-1);
    if (e.key === "ArrowRight") lbGo(1);
  });

  // lightbox swipe
  let lx = null;
  lb?.addEventListener("touchstart", e => { lx = e.touches[0].clientX; }, { passive: true });
  lb?.addEventListener("touchend", e => {
    if (lx === null) return;
    const dx = e.changedTouches[0].clientX - lx;
    if (Math.abs(dx) > 45) lbGo(dx < 0 ? 1 : -1);
    lx = null;
  }, { passive: true });

  start();
}

/* ---------------- REVIEWS ---------------- */
function initReviews() {
  const row = $("#reviewRow");
  const dotsBox = $("#reviewDots");
  const count = $("#reviewCount");
  if (!row) return;

  let i = 0, t = null;

  row.innerHTML = REVIEWS.map(r => `
    <div class="review">
      <div class="stars">★ ★ ★ ★ ★</div>
      <q>${r.q}</q>
      <p class="who">— ${r.a}</p>
    </div>`).join("");

  dotsBox.innerHTML = REVIEWS.map((_, k) =>
    `<button class="dot${k === 0 ? " active" : ""}" data-i="${k}" aria-label="Review ${k + 1}"></button>`
  ).join("");

  const update = () => {
    row.style.transform = `translateX(-${i * 100}%)`;
    $$(".dot", dotsBox).forEach((d, k) => d.classList.toggle("active", k === i));
    if (count) count.textContent = `Slide ${i + 1} of ${REVIEWS.length}`;
  };
  const go = d => { i = (i + d + REVIEWS.length) % REVIEWS.length; update(); };
  const start = () => { stop(); t = setInterval(() => go(1), 6000); };
  const stop = () => t && clearInterval(t);

  $("#revPrev")?.addEventListener("click", () => go(-1));
  $("#revNext")?.addEventListener("click", () => go(1));
  $$(".dot", dotsBox).forEach(d => d.addEventListener("click", () => { i = +d.dataset.i; update(); }));

  const wrap = $("#reviews");
  wrap?.addEventListener("mouseenter", stop);
  wrap?.addEventListener("mouseleave", start);

  update(); start();
}

/* ---------------- BOOKING FORM ---------------- */
function initForm() {
  const form = $("#bookingForm");
  const msg = $("#formMsg");
  const submit = $("#formSubmit");
  if (!form) return;

  form.addEventListener("submit", async e => {
    e.preventDefault();
    msg.textContent = "";
    msg.className = "form-msg";
    submit.disabled = true;
    submit.textContent = "Sending…";

    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok) {
        msg.textContent = data.error || "Something went wrong.";
        msg.className = "form-msg err";
      } else {
        msg.textContent = "Thank you! Your appointment request has been received. We will confirm shortly.";
        msg.className = "form-msg ok";
        form.reset();
      }
    } catch {
      msg.textContent = "Network error. Please try again.";
      msg.className = "form-msg err";
    } finally {
      submit.disabled = false;
      submit.textContent = "Request Appointment";
    }
  });
}

/* ---------------- YEAR + BOOT ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();
  initNav();
  initGallery();
  initReviews();
  initForm();
});

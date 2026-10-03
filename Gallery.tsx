"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type GalleryItem = {
  src: string;
  alt: string;
  pinterest: string;
};

// Gallery intentionally contains nail-work photos only.
const ITEMS: GalleryItem[] = [
  { src: "https://n1s1.hsmedia.ru/1d/c8/cb/1dc8cbbbf3f3deb3239d0c9509ce84e1/728x910_1_47dd6b875935d48ad7ddeb8f0287fbb8%401080x1350_0xA7rccfpZ_7632516096458611502.jpg.webp", alt: "Glossy nude Russian manicure", pinterest: "https://www.pinterest.com/search/pins/?q=russian%20manicure%20nude%20nails" },
  { src: "https://tvazteca.brightspotcdn.com/dims4/default/e97bda2/2147483647/strip/true/crop/1920x1080%2B0%2B0/resize/1280x720%21/format/webp/quality/90/?url=http%3A%2F%2Ftv-azteca-brightspot.s3.amazonaws.com%2F7d%2F60%2F6877bf5f4e3f86ce0adac9117aa9%2Fideas-de-manicura-rusa-que-alargan-y-estilizan-los-dedos.jpg", alt: "Soft pink nail art with gold detail", pinterest: "https://www.pinterest.com/search/pins/?q=elegant%20nail%20art" },
  { src: "https://russianmanicure.com/assets/gallery/1/22.jpg", alt: "Clean glossy nude nails", pinterest: "https://www.pinterest.com/search/pins/?q=clean%20nude%20nails" },
  { src: "https://www.newbeauty.com/wp-content/uploads/2024/02/IMG_3203.jpg", alt: "Delicate floral nail art", pinterest: "https://www.pinterest.com/search/pins/?q=floral%20nail%20art" },
  { src: "https://jbeuropeannails.com/cdn/shop/files/IMG_9849.jpg?v=1766547081&width=1600", alt: "Minimal French nail design", pinterest: "https://www.pinterest.com/search/pins/?q=minimal%20french%20nails" },
  { src: "https://trendyuniverse.com/wp-content/uploads/2024/03/nude-russian-manicure-1076x1200.jpg", alt: "Classic glossy Russian manicure", pinterest: "https://www.pinterest.com/search/pins/?q=classic%20russian%20manicure" },
];

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const touchX = useRef<number | null>(null);
  const touchY = useRef<number | null>(null);

  const visible = ITEMS;
  const total = ITEMS.length;

  // Keep the mobile layout as a single centered card. Desktop may show neighbors.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia("(max-width: 639px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const neighbours = isMobile ? 0 : 2;
  const spread = isMobile ? 0 : 58;
  const rotate = isMobile ? 0 : -22;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + total) % total),
    [total]
  );

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
    touchY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null || touchY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    const dy = e.changedTouches[0].clientY - touchY.current;
    // only treat as swipe when mostly horizontal
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      go(dx < 0 ? 1 : -1);
    }
    touchX.current = null;
    touchY.current = null;
  };

  const stop = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const start = useCallback(() => {
    stop();
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 4000);
  }, [stop, total]);

  useEffect(() => {
    if (lightbox === null) start();
    return stop;
  }, [start, stop, lightbox]);

  // lightbox keyboard
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") setLightbox((i) => (i === null ? null : (i - 1 + total) % total));
      if (e.key === "ArrowRight") setLightbox((i) => (i === null ? null : (i + 1) % total));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, total]);

  // offset relative position for 3D coverflow
  const offsetOf = (i: number) => {
    let d = i - index;
    if (d > total / 2) d -= total;
    if (d < -total / 2) d += total;
    return d;
  };

  return (
    <div>
      {/* coverflow carousel */}
      <div
        className="relative w-full max-w-full overflow-clip h-[440px] sm:h-[480px] md:h-[540px] lg:h-[580px] select-none touch-pan-y"
        onMouseEnter={stop}
        onMouseLeave={start}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ perspective: isMobile ? "none" : "1600px" }}
      >
        {visible.map((item, i) => {
          const d = offsetOf(i);
          const abs = Math.abs(d);
          if (abs > neighbours) return null;

          const isActive = d === 0;
          const scale = isActive ? 1 : abs === 1 ? (isMobile ? 0.78 : 0.82) : 0.66;

          return (
            <button
              key={item.src}
              onClick={() => (isActive ? setLightbox(i) : setIndex(i))}
              aria-label={isActive ? "Open image" : "Go to image"}
              className="absolute top-1/2 left-1/2 rounded-3xl sm:rounded-[28px] overflow-hidden transition-all duration-700 ease-out"
              style={{
                width: isMobile ? "min(78vw, 310px)" : "clamp(190px, 62vw, 380px)",
                height: isMobile ? "min(68vh, 430px)" : "clamp(280px, 86vw, 520px)",
                maxHeight: "calc(100% - 24px)",
                transform: isMobile
                  ? "translate(-50%, -50%)"
                  : `translate(-50%, -50%) translateX(${d * spread}%) scale(${scale}) rotateY(${d * rotate}deg)`,
                zIndex: 10 - abs,
                opacity: abs > 1 ? 0.3 : abs === 1 && isMobile ? 0.55 : 1,
                filter: isActive ? "none" : "blur(1.5px) saturate(0.8)",
                boxShadow: isActive
                  ? "0 30px 70px -20px rgba(74,21,51,0.55)"
                  : "0 16px 40px -20px rgba(74,21,51,0.4)",
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading={isActive ? "eager" : "lazy"}
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />

              {/* aesthetic gradient veil */}
              <div
                className={`absolute inset-0 transition ${
                  isActive
                    ? "bg-gradient-to-t from-black/90 via-black/20 to-transparent"
                    : "bg-black/30"
                }`}
              />

              {/* inner glow border */}
              <div className="absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/30" />

              {isActive && (
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-6 text-left">
                  <span className="inline-block mb-1.5 sm:mb-2 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white bg-gradient-to-r from-black/70 to-black/20 backdrop-blur px-2.5 sm:px-3 py-1 rounded-full">
                    Nail Work
                  </span>
                  <p className="font-serif text-white text-sm sm:text-base md:text-lg leading-snug line-clamp-2">
                    {item.alt}
                  </p>
                  <a
                    href={item.pinterest}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="mt-2 sm:mt-3 inline-flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#D9A7E0]"
                  >
                    Pinterest inspiration
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 5h5v5M19 5l-9 9" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" strokeLinecap="round" />
                    </svg>
                  </a>
                  <span className="mt-2 flex items-center gap-1.5 text-[9px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/80">
                    Tap to enlarge
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" />
                    </svg>
                  </span>
                </div>
              )}
            </button>
          );
        })}

        {/* arrows */}
        <button
          aria-label="Previous"
          onClick={() => go(-1)}
          className="absolute z-20 top-1/2 -translate-y-1/2 left-1 sm:left-3 md:left-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-card text-[#4A1533] flex items-center justify-center hover:bg-[#4A1533] hover:text-white transition shadow-lg"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          aria-label="Next"
          onClick={() => go(1)}
          className="absolute z-20 top-1/2 -translate-y-1/2 right-1 sm:right-3 md:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-card text-[#4A1533] flex items-center justify-center hover:bg-[#4A1533] hover:text-white transition shadow-lg"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* swipe hint on mobile */}
        <div className="sm:hidden absolute bottom-1 left-1/2 -translate-x-1/2 z-20 text-[9px] uppercase tracking-[0.2em] text-[#6B1F45]/70 flex items-center gap-1.5">
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M5 12l4-4M5 12l4 4M19 12l-4-4M19 12l-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Swipe
        </div>
      </div>

      {/* dots + counter */}
      <div className="mt-6 sm:mt-10 flex flex-col items-center gap-3">
        <div className="flex justify-center gap-1.5 sm:gap-2 flex-wrap max-w-full px-4">
          {visible.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to image ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 sm:h-2 rounded-full transition-all ${
                i === index
                  ? "w-6 sm:w-8 bg-gradient-to-r from-[#4A1533] to-[#9D4B8F]"
                  : "w-1.5 sm:w-2 bg-[#D9A7E0]"
              }`}
            />
          ))}
        </div>
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#6B1F45]/70">
          {index + 1} / {total}
        </p>
      </div>

      {/* lightbox */}
      {lightbox !== null && visible[lightbox] && (
        <div
          className="fixed inset-0 z-[60] bg-[#2c0d20]/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            aria-label="Close"
            onClick={() => setLightbox(null)}
            className="absolute top-3 right-3 sm:top-5 sm:right-5 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition z-10"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>

          <button
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i === null ? null : (i - 1 + total) % total));
            }}
            className="absolute left-2 sm:left-4 md:left-8 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition z-10"
          >
            <svg className="w-5 h-5 sm:w-[22px] sm:h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i === null ? null : (i + 1) % total));
            }}
            className="absolute right-2 sm:right-4 md:right-8 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition z-10"
          >
            <svg className="w-5 h-5 sm:w-[22px] sm:h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <figure
            className="relative w-full max-w-3xl px-12 sm:px-16"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 45) {
                setLightbox((i) =>
                  i === null ? null : (i + (dx < 0 ? 1 : -1) + total) % total
                );
              }
              touchX.current = null;
              touchY.current = null;
            }}
          >
            <div className="relative w-full h-[60vh] sm:h-[65vh] md:h-[70vh] rounded-xl sm:rounded-2xl overflow-hidden ring-1 ring-[#D9A7E0]/40">
              <Image
                src={visible[lightbox].src}
                alt={visible[lightbox].alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
            <figcaption className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-[#F5E6F7]/85 px-2">
              {visible[lightbox].alt}
              <span className="block sm:inline sm:before:content-['_·_']">
                {lightbox + 1} / {total}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}

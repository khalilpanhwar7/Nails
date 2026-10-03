"use client";

import { useEffect, useRef, useState } from "react";

const REVIEWS = [
  {
    quote:
      "My first time here. I had Melania for my nails and Bela did my pedicure. Amazing experience! They pay so much attention to detail and take their time — and they actually take care of your nails. Everyone is so polite and kind. Great customer service. Love it here!",
    author: "Liz F.",
  },
  {
    quote:
      "Melania was absolutely fantastic! She has great attention to detail and I love the way my nails turned out.",
    author: "Claire L.",
  },
  {
    quote:
      "It was my first time being here and I loved it. Alina took care of my nails and she did a great job. I wanted my nails sharp and square with simple white color. I highly recommend it.",
    author: "Faa T.",
  },
  {
    quote:
      "Once you come here there is no going back to the corner nail salon. The technicians are true artists — from classic manicures to intricate nail art and luxe treatments. The attention to detail is unmatched. If you want the best nails in the city, this is the place.",
    author: "Anya M.",
  },
];

export default function ReviewsCarousel() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    stop();
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % REVIEWS.length);
    }, 6000);
  };
  const stop = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prev = () => setIndex((i) => (i - 1 + REVIEWS.length) % REVIEWS.length);
  const next = () => setIndex((i) => (i + 1) % REVIEWS.length);

  return (
    <div
      className="relative max-w-4xl mx-auto"
      onMouseEnter={stop}
      onMouseLeave={start}
    >
      <p className="text-center text-xs uppercase tracking-[0.3em] text-neutral-500 mb-6">
        Slide {index + 1} of {REVIEWS.length}
      </p>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {REVIEWS.map((r, i) => (
            <div key={i} className="min-w-full px-6 md:px-16">
              <div className="text-center">
                <div className="text-[#9D4B8F] text-2xl mb-6">★ ★ ★ ★ ★</div>
                <p className="font-serif text-xl md:text-2xl leading-relaxed text-neutral-800 italic">
                  &ldquo;{r.quote}&rdquo;
                </p>
                <p className="mt-6 text-sm uppercase tracking-[0.25em] text-[#9D4B8F]">
                  — {r.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* arrows */}
      <button
        aria-label="Previous review"
        onClick={prev}
        className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-4 w-11 h-11 rounded-full glass-card text-[#4A1533] shadow-lg hover:bg-[#4A1533] hover:text-white transition flex items-center justify-center"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        aria-label="Next review"
        onClick={next}
        className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-4 w-11 h-11 rounded-full glass-card text-[#4A1533] shadow-lg hover:bg-[#4A1533] hover:text-white transition flex items-center justify-center"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* dots */}
      <div className="mt-8 flex justify-center gap-2">
        {REVIEWS.map((_, i) => (
          <button
            key={i}
            aria-label={`Show review ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-8 bg-gradient-to-r from-[#4A1533] to-[#9D4B8F]" : "w-2 bg-[#D9A7E0]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

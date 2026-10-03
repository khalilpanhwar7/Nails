import Image from "next/image";
import Navbar from "@/components/Navbar";
import BookingForm from "@/components/BookingForm";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import Gallery from "@/components/Gallery";
import FloatingContact from "@/components/FloatingContact";

const SERVICES = [
  {
    title: "Russian Gel Manicure",
    price: "$100",
    description: "Luxurious and elegant manicure experience.",
    image:
      "https://images.pexels.com/photos/6135696/pexels-photo-6135696.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=640",
    badge: null as string | null,
  },
  {
    title: "Hard Gel Manicure",
    price: "$140",
    description: "Strong and lasting nail treatment.",
    image:
      "https://images.pexels.com/photos/5484948/pexels-photo-5484948.png?auto=compress&cs=tinysrgb&fit=crop&h=800&w=640",
    badge: "Popular",
  },
  {
    title: "Russian Gel Pedicure",
    price: "$100",
    description: "High-quality Russian gel pedicure service.",
    image:
      "https://images.pexels.com/photos/7755554/pexels-photo-7755554.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=640",
    badge: null,
  },
  {
    title: "4 Hands Service",
    price: "$240",
    description: "Manicure and pedicure by two technicians.",
    image:
      "https://images.pexels.com/photos/7755218/pexels-photo-7755218.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=640",
    badge: null,
  },
];

const HOURS = [
  { day: "Monday", short: "Mon", time: "10:00 AM – 08:00 PM" },
  { day: "Tuesday", short: "Tue", time: "10:00 AM – 08:00 PM" },
  { day: "Wednesday", short: "Wed", time: "10:00 AM – 08:00 PM" },
  { day: "Thursday", short: "Thu", time: "10:00 AM – 08:00 PM" },
  { day: "Friday", short: "Fri", time: "10:00 AM – 08:00 PM" },
  { day: "Saturday", short: "Sat", time: "10:00 AM – 07:00 PM" },
  { day: "Sunday", short: "Sun", time: "10:00 AM – 07:00 PM" },
];

export default function Home() {
  return (
    <div id="top">
      <Navbar />
      <FloatingContact />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.pexels.com/photos/5484946/pexels-photo-5484946.png?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=2000"
            alt="Luxury manicure at Lumière NYC"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#4A1533]/85 via-[#4A1533]/50 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-28 md:py-40">
          <div className="max-w-2xl text-white">
            <p className="uppercase tracking-[0.35em] text-sm text-[#F5E6F7] mb-6">
              New York City · Established 2018
            </p>
            <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-6">
              The Art of Polished Perfection.
            </h1>
            <p className="text-lg md:text-xl text-[#F5E6F7]/90 mb-10 leading-relaxed">
              A boutique nail atelier in the heart of Manhattan. Master
              technicians. Meticulous detail. Nails that speak elegance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#book"
                className="inline-flex items-center justify-center rounded-full bg-[#111111] text-white px-8 py-4 tracking-wide font-medium border border-[#111111] shadow-lg hover:bg-[#2a2a2a] hover:border-[#2a2a2a] transition"
              >
                Book an Appointment
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-full border border-white/60 text-white px-8 py-4 tracking-wide hover:bg-white/10 transition"
              >
                View Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl shadow-[#4A1533]/30 ring-1 ring-[#D9A7E0]/50 animate-floaty">
            <Image
              src="https://images.pexels.com/photos/6135680/pexels-photo-6135680.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1000"
              alt="Nail artist at work"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="uppercase tracking-[0.35em] text-sm text-[#9D4B8F] mb-4">
              About the Studio
            </p>
            <h2 className="font-serif text-4xl md:text-5xl gradient-text mb-6 leading-tight">
              Where quiet luxury meets flawless craftsmanship.
            </h2>
            <p className="text-neutral-700 text-lg leading-relaxed mb-5">
              Lumière NYC was founded on a single belief: your nails deserve the
              same care as a bespoke garment. Our technicians train in the
              Russian dry manicure method — a slow, precise technique that
              respects the natural nail and delivers an unmatched finish.
            </p>
            <p className="text-neutral-700 text-lg leading-relaxed mb-8">
              From clean girl minimalism to intricate custom art, every visit is
              a private, unhurried ritual designed around you.
            </p>
            <div className="grid grid-cols-3 gap-6 border-t border-neutral-200 pt-8">
              <div>
                <div className="font-serif text-3xl text-[#4A1533]">7+</div>
                <div className="text-xs uppercase tracking-widest text-neutral-500 mt-1">
                  Years in NYC
                </div>
              </div>
              <div>
                <div className="font-serif text-3xl text-[#4A1533]">12k+</div>
                <div className="text-xs uppercase tracking-widest text-neutral-500 mt-1">
                  Happy Clients
                </div>
              </div>
              <div>
                <div className="font-serif text-3xl text-[#4A1533]">100%</div>
                <div className="text-xs uppercase tracking-widest text-neutral-500 mt-1">
                  Sanitized Tools
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 md:py-32 bg-white/70">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[0.35em] text-sm text-[#9D4B8F] mb-4">
              Our Menu
            </p>
            <h2 className="font-serif text-4xl md:text-5xl gradient-text">
              Choose Your Nail Care Package
            </h2>
            <p className="mt-4 text-neutral-600 max-w-2xl mx-auto">
              A curated selection of signature treatments — each performed with
              premium products and unwavering attention to detail.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="group relative glass-card rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-[#9D4B8F]/25 hover:-translate-y-1 transition duration-500"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-700"
                  />
                  {s.badge && (
                    <span className="absolute top-4 left-4 bg-[#111111] text-white text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full">
                      {s.badge}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-serif text-xl text-[#4A1533]">
                      {s.title}
                    </h3>
                    <span className="text-[#9D4B8F] font-medium">{s.price}</span>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <a
              href="#book"
              className="inline-flex items-center justify-center rounded-full bg-[#111111] text-white px-8 py-3.5 tracking-wide hover:bg-[#2a2a2a] hover:shadow-xl hover:scale-[1.03] transition duration-300"
            >
              Reserve Your Seat
            </a>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-16 sm:py-24 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <p className="uppercase tracking-[0.25em] sm:tracking-[0.35em] text-xs sm:text-sm text-[#9D4B8F] mb-3 sm:mb-4">
              Our Work
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl gradient-text">
              The Gallery
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto px-2">
              A glimpse into the sets we create every day — from timeless nudes
              to bold, sculpted nail art. Tap any image to view it larger.
            </p>
          </div>

          <Gallery />

          <div className="text-center mt-14">
            <a
              href="#book"
              className="inline-flex items-center justify-center rounded-full bg-[#111111] text-white px-8 py-3.5 tracking-wide hover:bg-[#2a2a2a] hover:shadow-xl hover:scale-[1.03] transition duration-300"
            >
              Book This Look
            </a>
          </div>
        </div>
      </section>

      {/* HOURS */}
      <section id="hours" className="py-24 md:py-32 bg-white/70">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="uppercase tracking-[0.35em] text-sm text-[#9D4B8F] mb-4">
              Visit Us
            </p>
            <h2 className="font-serif text-4xl md:text-5xl gradient-text mb-6 leading-tight">
              Hours
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-6">
              Walk-ins welcome when availability allows — but appointments are
              always guaranteed. We recommend booking at least a week in advance
              for weekend visits.
            </p>
            <div className="inline-flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Open Now
            </div>
          </div>

          <div className="glass-card rounded-2xl shadow-xl shadow-[#9D4B8F]/10 divide-y divide-[#D9A7E0]/40 overflow-hidden">
            {HOURS.map((h) => (
              <div
                key={h.day}
                className="flex items-center justify-between px-6 py-4"
              >
                <div>
                  <div className="font-serif text-lg text-[#4A1533]">
                    {h.day}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-neutral-400">
                    {h.short}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-neutral-700 text-sm">{h.time}</div>
                  <div className="text-[11px] text-emerald-600 uppercase tracking-widest">
                    Open now
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS / CAROUSEL */}
      <section id="testimonials" className="py-24 md:py-32 bg-white/70">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="uppercase tracking-[0.35em] text-sm text-[#9D4B8F] mb-4">
              Client Stories
            </p>
            <h2 className="font-serif text-4xl md:text-5xl gradient-text">
              NYC Top Nail Experts
            </h2>
          </div>
          <ReviewsCarousel />
        </div>
      </section>

      {/* BOOKING / CONTACT */}
      <section id="book" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
          <div>
            <p className="uppercase tracking-[0.35em] text-sm text-[#9D4B8F] mb-4">
              Reservations
            </p>
            <h2 className="font-serif text-4xl md:text-5xl gradient-text mb-6 leading-tight">
              Reach Out to Our Team
            </h2>
            <p className="text-neutral-700 text-lg leading-relaxed mb-10">
              Fill out the form to request an appointment. A member of our team
              will confirm your booking within 24 hours.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#4A1533] text-white flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-neutral-500 mb-1">
                    Location
                  </div>
                  <div className="text-neutral-800">
                    124 Prince Street, SoHo, New York, NY 10012
                  </div>
                </div>
              </div>

              <a href="tel:+12125550184" className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-[#4A1533] text-white flex items-center justify-center shrink-0 group-hover:bg-[#9D4B8F] transition">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M5 4h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A17 17 0 013 6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-neutral-500 mb-1">
                    Phone
                  </div>
                  <div className="text-neutral-800 group-hover:text-[#9D4B8F] transition">
                    (212) 555-0184
                  </div>
                </div>
              </a>

              <a href="mailto:hello@lumierenyc.com" className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-[#4A1533] text-white flex items-center justify-center shrink-0 group-hover:bg-[#9D4B8F] transition">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-neutral-500 mb-1">
                    Email
                  </div>
                  <div className="text-neutral-800 group-hover:text-[#9D4B8F] transition">
                    hello@lumierenyc.com
                  </div>
                </div>
              </a>

              <div className="pt-4 flex items-center gap-3">
                <a
                  href="https://wa.me/12125550184"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-full text-sm hover:opacity-90 transition"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
                  </svg>
                  WhatsApp
                </a>
                <a
                  href="https://instagram.com/nycpolished"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white flex items-center justify-center hover:scale-105 transition"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a
                  href="https://tiktok.com/@nycpolished"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:scale-105 transition"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-8 md:p-10 shadow-2xl shadow-[#9D4B8F]/15">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* LOCATION / GOOGLE MAP */}
      <section id="location" className="bg-white/70">
        <div className="max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-12 text-center">
          <p className="uppercase tracking-[0.35em] text-sm text-[#9D4B8F] mb-4">
            Find Us
          </p>
          <h2 className="font-serif text-4xl md:text-5xl gradient-text mb-4">
            Our Location
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto mb-8">
            Nestled in the cobblestoned streets of SoHo. Convenient to the N,
            R, and 6 trains at Prince Street.
          </p>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=124+Prince+Street+New+York+NY+10012"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#111111] text-white px-6 py-3 tracking-wide hover:bg-[#2a2a2a] hover:shadow-xl hover:scale-[1.03] transition duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            Get Directions
          </a>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-24 md:pb-32">
          <div className="relative mx-auto w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] md:w-[540px] md:h-[540px]">
            {/* soft outer glow */}
            <div className="absolute -inset-16 rounded-full bg-gradient-to-tr from-[#D9A7E0]/35 via-[#9D4B8F]/20 to-transparent blur-3xl" />

            {/* rotating dashed outline */}
            <div className="absolute -inset-14 rounded-full border-2 border-dashed border-[#9D4B8F]/35 animate-spin-slow" />

            {/* decorative rings */}
            <div className="absolute -inset-9 rounded-full border border-[#D9A7E0]/60" />
            <div className="absolute -inset-4 rounded-full border-2 border-[#9D4B8F]/40" />

            {/* gradient outline ring wrapper */}
            <div className="absolute inset-0 rounded-full p-[6px] bg-gradient-to-br from-[#4A1533] via-[#9D4B8F] to-[#D9A7E0] shadow-[0_35px_80px_-25px_rgba(74,21,51,0.65)]">
              <div className="w-full h-full rounded-full p-[5px] bg-white">
                <div className="w-full h-full rounded-full overflow-hidden ring-1 ring-[#D9A7E0]">
                  <iframe
                    title="Lumière NYC Location"
                    src="https://www.google.com/maps?q=124+Prince+Street+New+York+NY+10012&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    className="w-full h-full scale-[1.02]"
                  />
                </div>
              </div>
            </div>

            {/* little orbiting dots */}
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#9D4B8F] ring-4 ring-white shadow-lg" />
            <span className="absolute top-1/2 -right-3 -translate-y-1/2 w-3 h-3 rounded-full bg-[#D9A7E0] ring-4 ring-white shadow" />
            <span className="absolute top-1/2 -left-3 -translate-y-1/2 w-3 h-3 rounded-full bg-[#D9A7E0] ring-4 ring-white shadow" />

            {/* floating address pill */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-[#111111] text-white text-xs sm:text-sm px-6 py-3 rounded-full shadow-2xl whitespace-nowrap ring-4 ring-white">
              📍 124 Prince St, SoHo, NY
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gradient-to-br from-[#4A1533] via-[#6B1F45] to-[#3a0f28] text-[#F5E6F7]">
        <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="font-serif text-2xl mb-3">
              Lumière <span className="text-[#D9A7E0]">NYC</span>
            </div>
            <p className="text-sm text-[#F5E6F7]/80 leading-relaxed max-w-md">
              A boutique nail atelier committed to elevated craft, hygiene, and
              hospitality in the heart of Manhattan.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://instagram.com/nycpolished"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-[#4A1533] transition"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://tiktok.com/@nycpolished"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-[#4A1533] transition"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
              <a
                href="https://wa.me/12125550184"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-[#4A1533] transition"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest mb-4 text-[#D9A7E0]">
              Explore
            </div>
            <ul className="space-y-2 text-sm">
              <li><a href="#services" className="hover:text-white">Services</a></li>
              <li><a href="#gallery" className="hover:text-white">Gallery</a></li>
              <li><a href="#about" className="hover:text-white">About</a></li>
              <li><a href="#hours" className="hover:text-white">Hours</a></li>
              <li><a href="#book" className="hover:text-white">Book</a></li>
              <li><a href="#location" className="hover:text-white">Location</a></li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest mb-4 text-[#D9A7E0]">
              Contact
            </div>
            <ul className="space-y-2 text-sm text-[#F5E6F7]/90">
              <li>124 Prince Street, SoHo</li>
              <li>New York, NY 10012</li>
              <li><a href="tel:+12125550184" className="hover:text-white">(212) 555-0184</a></li>
              <li><a href="mailto:hello@lumierenyc.com" className="hover:text-white">hello@lumierenyc.com</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-6 text-xs text-[#F5E6F7]/70 flex flex-col sm:flex-row justify-between gap-2">
            <p>© {new Date().getFullYear()} Lumière NYC. All rights reserved.</p>
            <p className="flex items-center gap-4">
              <a
                href="/site/index.html"
                className="underline decoration-[#D9A7E0]/60 underline-offset-4 hover:text-white"
              >
                Static HTML version
              </a>
              <span>Crafted with care in New York.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

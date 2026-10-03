"use client";

import { useState } from "react";

const SERVICES = [
  "Russian Gel Manicure — $100",
  "Hard Gel Manicure — $140",
  "Russian Gel Pedicure — $100",
  "4 Hands Service — $240",
  "Classic Manicure — $60",
  "Nail Art (custom)",
];

type Status = "idle" | "submitting" | "success" | "error";

export default function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      preferredDate: formData.get("preferredDate"),
      notes: formData.get("notes"),
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data?.error ?? "Something went wrong.");
        return;
      }

      setStatus("success");
      setMessage(
        "Thank you! Your appointment request has been received. We will confirm shortly."
      );
      e.currentTarget.reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="md:col-span-1">
        <label className="block text-xs uppercase tracking-widest text-[#6B1F45] mb-2">
          Full Name *
        </label>
        <input
          name="name"
          required
          className="w-full border border-[#D9A7E0]/70 bg-white/80 rounded-xl px-4 py-3 focus:outline-none focus:border-[#9D4B8F] focus:ring-4 focus:ring-[#D9A7E0]/30 transition"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest text-[#6B1F45] mb-2">
          Email *
        </label>
        <input
          name="email"
          type="email"
          required
          className="w-full border border-[#D9A7E0]/70 bg-white/80 rounded-xl px-4 py-3 focus:outline-none focus:border-[#9D4B8F] focus:ring-4 focus:ring-[#D9A7E0]/30 transition"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest text-[#6B1F45] mb-2">
          Phone *
        </label>
        <input
          name="phone"
          type="tel"
          required
          className="w-full border border-[#D9A7E0]/70 bg-white/80 rounded-xl px-4 py-3 focus:outline-none focus:border-[#9D4B8F] focus:ring-4 focus:ring-[#D9A7E0]/30 transition"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest text-[#6B1F45] mb-2">
          Preferred Date & Time *
        </label>
        <input
          name="preferredDate"
          type="datetime-local"
          required
          className="w-full border border-[#D9A7E0]/70 bg-white/80 rounded-xl px-4 py-3 focus:outline-none focus:border-[#9D4B8F] focus:ring-4 focus:ring-[#D9A7E0]/30 transition"
        />
      </div>

      <div className="md:col-span-2">
        <label className="block text-xs uppercase tracking-widest text-[#6B1F45] mb-2">
          Service *
        </label>
        <select
          name="service"
          required
          defaultValue=""
          className="w-full border border-[#D9A7E0]/70 bg-white/80 rounded-xl px-4 py-3 focus:outline-none focus:border-[#9D4B8F] focus:ring-4 focus:ring-[#D9A7E0]/30 transition"
        >
          <option value="" disabled>
            Select a service
          </option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="md:col-span-2">
        <label className="block text-xs uppercase tracking-widest text-[#6B1F45] mb-2">
          Notes
        </label>
        <textarea
          name="notes"
          rows={4}
          className="w-full border border-[#D9A7E0]/70 bg-white/80 rounded-xl px-4 py-3 focus:outline-none focus:border-[#9D4B8F] focus:ring-4 focus:ring-[#D9A7E0]/30 transition"
          placeholder="Any preferences, allergies, or nail art ideas?"
        />
      </div>

      <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center rounded-full bg-[#111111] text-white px-8 py-3.5 tracking-wide hover:bg-[#2a2a2a] hover:shadow-xl hover:scale-[1.03] transition duration-300 disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Request Appointment"}
        </button>
        {message && (
          <p
            className={`text-sm ${
              status === "success" ? "text-emerald-700" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </form>
  );
}

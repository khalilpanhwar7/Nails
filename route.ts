import { NextResponse } from "next/server";
import { db } from "@/db";
import { bookings } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, preferredDate, notes } = body ?? {};

    if (!name || !email || !phone || !service || !preferredDate) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const [inserted] = await db
      .insert(bookings)
      .values({
        name: String(name).slice(0, 200),
        email: String(email).slice(0, 200),
        phone: String(phone).slice(0, 50),
        service: String(service).slice(0, 200),
        preferredDate: String(preferredDate).slice(0, 100),
        notes: notes ? String(notes).slice(0, 1000) : null,
      })
      .returning();

    return NextResponse.json({ ok: true, booking: inserted });
  } catch (error) {
    console.error("Failed to create booking", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

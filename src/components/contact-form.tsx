"use client";

import { type FormEvent } from "react";

export function ContactForm({ officeEmail }: { officeEmail: string }) {
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const subject = String(data.get("subject") ?? "Enquiry").trim();
    const message = String(data.get("message") ?? "").trim();
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      "",
      message,
    ]
      .filter((line) => line !== null)
      .join("\n");
    const href = `mailto:${officeEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  }

  return (
    <form
      id="message"
      className="rounded-[22px] border border-[var(--color-border)] bg-[var(--color-cream)] px-[34px] py-9"
      onSubmit={onSubmit}
    >
      <h2 className="text-[30px] leading-[1.15]">Send us a message</h2>
      <p className="mt-2.5 text-base leading-[1.68] text-[var(--color-ink-muted)]">
        This opens your email app addressed to the office. We'll come back to
        you within one school day.
      </p>
      <div className="mt-[26px] flex flex-col gap-[18px]">
        <label className="block">
          <span className="block text-[14px] font-semibold text-[var(--color-ink)]">
            Your name
          </span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            className="mt-[7px] min-h-12 w-full rounded-xl border border-[#D6CCBA] bg-[var(--color-surface)] px-4 py-3 text-base text-[var(--color-heading)]"
          />
        </label>
        <label className="block">
          <span className="block text-[14px] font-semibold text-[var(--color-ink)]">
            Email
          </span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className="mt-[7px] min-h-12 w-full rounded-xl border border-[#D6CCBA] bg-[var(--color-surface)] px-4 py-3 text-base text-[var(--color-heading)]"
          />
        </label>
        <label className="block">
          <span className="block text-[14px] font-semibold text-[var(--color-ink)]">
            Phone{" "}
            <span className="font-normal text-[var(--color-faint)]">(optional)</span>
          </span>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            className="mt-[7px] min-h-12 w-full rounded-xl border border-[#D6CCBA] bg-[var(--color-surface)] px-4 py-3 text-base text-[var(--color-heading)]"
          />
        </label>
        <label className="block">
          <span className="block text-[14px] font-semibold text-[var(--color-ink)]">
            What's this about?
          </span>
          <select
            name="subject"
            className="mt-[7px] min-h-12 w-full rounded-xl border border-[#D6CCBA] bg-[var(--color-surface)] px-4 py-3 text-base text-[var(--color-heading)]"
            defaultValue="Enrolment enquiry"
          >
            <option>Enrolment enquiry</option>
            <option>Book a school tour</option>
            <option>Accounts & fees</option>
            <option>Something about my child</option>
            <option>Something else</option>
          </select>
        </label>
        <label className="block">
          <span className="block text-[14px] font-semibold text-[var(--color-ink)]">
            Message
          </span>
          <textarea
            name="message"
            required
            rows={5}
            className="mt-[7px] w-full resize-y rounded-xl border border-[#D6CCBA] bg-[var(--color-surface)] px-4 py-3 text-base text-[var(--color-heading)]"
          />
        </label>
        <button type="submit" className="btn-brand min-h-[52px] justify-center">
          Open email to send
        </button>
      </div>
    </form>
  );
}

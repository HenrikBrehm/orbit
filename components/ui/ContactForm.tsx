"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site.config";

type FormStatus = "idle" | "sending" | "sent" | "error";

/**
 * Contact form posting to /api/contact. If the server has no
 * RESEND_API_KEY it responds with a mailto fallback, which we open so
 * the message is never lost.
 */
export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result: { ok: boolean; fallback?: string } = await res.json();

      if (!res.ok || !result.ok) {
        setStatus("error");
        return;
      }

      if (result.fallback) {
        // No email service configured on the server — hand off to the
        // visitor's mail client with everything prefilled.
        window.location.href = result.fallback;
      }
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const inputClasses =
    "w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted focus:border-accent";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-muted text-xs tracking-wide uppercase">Name</span>
          <input name="name" required maxLength={120} placeholder="Jane Doe" className={inputClasses} />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-muted text-xs tracking-wide uppercase">Email</span>
          <input
            name="email"
            type="email"
            required
            maxLength={200}
            placeholder="jane@studio.com"
            className={inputClasses}
          />
        </label>
      </div>
      <label className="flex flex-col gap-2">
        <span className="text-muted text-xs tracking-wide uppercase">Message</span>
        <textarea
          name="message"
          required
          maxLength={5000}
          rows={5}
          placeholder="Tell me about your project…"
          className={`${inputClasses} resize-y`}
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-accent text-accent-contrast mt-2 rounded-full px-7 py-3.5 text-sm font-medium transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>

      <p aria-live="polite" className="min-h-5 text-sm">
        {status === "sent" ? (
          <span className="text-accent">Thanks — your message is on its way.</span>
        ) : null}
        {status === "error" ? (
          <span className="text-red-400">
            Something went wrong. Email me directly at{" "}
            <a className="underline" href={`mailto:${siteConfig.contact.email}`}>
              {siteConfig.contact.email}
            </a>
            .
          </span>
        ) : null}
      </p>
    </form>
  );
}

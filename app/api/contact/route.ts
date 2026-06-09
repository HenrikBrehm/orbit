import { NextResponse } from "next/server";
import { z } from "zod";
import { siteConfig } from "@/config/site.config";

const submissionSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  message: z.string().min(1).max(5000),
});

/**
 * Contact endpoint.
 * - With RESEND_API_KEY set: sends the message via Resend.
 * - Without a key: logs the submission server-side and returns a mailto
 *   fallback URL so the visitor's mail client takes over. The form works
 *   either way — see SETUP.md.
 */
export async function POST(request: Request) {
  let parsed: z.infer<typeof submissionSchema>;
  try {
    parsed = submissionSchema.parse(await request.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid submission" }, { status: 400 });
  }

  const { contact } = siteConfig;
  const to = contact.form.toEmail ?? contact.email;
  const subject = `${contact.form.subjectPrefix} ${parsed.name}`;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.info(
      `[contact] RESEND_API_KEY not set — falling back to mailto. Submission from ${parsed.name} <${parsed.email}>: ${parsed.message}`,
    );
    const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `${parsed.message}\n\n— ${parsed.name} (${parsed.email})`,
    )}`;
    return NextResponse.json({ ok: true, fallback: mailto });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: contact.form.fromEmail,
      to,
      replyTo: parsed.email,
      subject,
      text: `${parsed.message}\n\n— ${parsed.name} (${parsed.email})`,
    });
    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ ok: false, error: "Send failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Unexpected error:", error);
    return NextResponse.json({ ok: false, error: "Send failed" }, { status: 500 });
  }
}

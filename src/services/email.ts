import nodemailer from "nodemailer";

type MailPayload = {
  to: string;
  subject: string;
  html: string;
};

export async function sendMail(payload: MailPayload) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.info("[email:preview]", payload.subject, payload.to);
    return { preview: true };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  return transporter.sendMail({
    from: process.env.SMTP_FROM ?? "CareerDock <no-reply@careerdock.ai>",
    ...payload
  });
}

import nodemailer from "nodemailer";

type Mail = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

export type MailResult = { sent: true; preview: boolean } | { sent: false };

function createTransport() {
  const host = process.env.SMTP_HOST;
  if (!host) return null;
  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
  });
}

export async function sendMail(mail: Mail): Promise<MailResult> {
  const from = process.env.MAIL_FROM ?? "Kasa <no-reply@kasa.local>";
  const transport = createTransport();

  if (!transport) {
    if (process.env.NODE_ENV === "production") {
      console.error("[mail] SMTP_HOST non configuré : email non envoyé à", mail.to);
      return { sent: false };
    }
    console.info(`[mail] SMTP non configuré, aperçu de l'email :\nÀ : ${mail.to}\nObjet : ${mail.subject}\n\n${mail.text}`);
    return { sent: true, preview: true };
  }

  try {
    await transport.sendMail({ from, ...mail });
    return { sent: true, preview: false };
  } catch (error) {
    console.error("[mail] Échec de l'envoi à", mail.to, error);
    return { sent: false };
  }
}

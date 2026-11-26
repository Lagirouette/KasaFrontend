/**
 * Envoi d'emails par SMTP avec nodemailer.
 * @module lib/mailer
 */
import nodemailer from "nodemailer";

/** Contenu d'un email à envoyer. */
type Mail = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

/** Résultat d'un envoi : `preview` vaut `true` quand l'email a seulement été affiché dans la console. */
export type MailResult = { sent: true; preview: boolean } | { sent: false };

/**
 * Crée le transport SMTP à partir des variables d'environnement `SMTP_*`.
 *
 * @returns Le transport nodemailer, ou `null` si `SMTP_HOST` n'est pas défini.
 */
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

/**
 * Envoie un email avec l'expéditeur défini dans `MAIL_FROM`.
 *
 * Sans configuration SMTP, l'email est affiché dans la console en développement et n'est pas envoyé en production.
 *
 * @param mail Destinataire, objet, texte et HTML de l'email.
 * @returns Le résultat de l'envoi. La fonction ne lève jamais d'erreur.
 */
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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function registrationConfirmationEmail({ firstName, siteUrl }: { firstName: string; siteUrl: string }) {
  const name = escapeHtml(firstName);
  const url = escapeHtml(siteUrl);
  const privacyUrl = `${url}/conditions-generales#donnees-personnelles`;

  return {
    subject: "Bienvenue sur Kasa : votre inscription est confirmée",
    text: [
      `Bonjour ${firstName},`,
      "",
      "Votre compte Kasa a bien été créé. Vous pouvez dès maintenant découvrir nos logements, les ajouter à vos favoris et contacter les hôtes.",
      "",
      `Découvrir les logements : ${siteUrl}`,
      "",
      "Vous recevez cet email car un compte a été créé avec cette adresse. Si vous n'êtes pas à l'origine de cette inscription, répondez à ce message et nous supprimerons le compte.",
      `Vos données et vos droits : ${siteUrl}/conditions-generales#donnees-personnelles`,
      "",
      "L'équipe Kasa",
    ].join("\n"),
    html: `<!doctype html>
<html lang="fr">
  <body style="margin:0;background:#fff9f7;font-family:Arial,Helvetica,sans-serif;color:#1f1f1f">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:32px 16px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:10px">
            <tr>
              <td style="padding:32px">
                <p style="margin:0 0 24px;font-size:28px;font-weight:bold;color:#e3532e">Kasa</p>
                <h1 style="margin:0 0 16px;font-size:22px;color:#99331a">Bienvenue ${name} !</h1>
                <p style="margin:0 0 16px;font-size:15px;line-height:1.5">Votre compte Kasa a bien été créé. Vous pouvez dès maintenant découvrir nos logements, les ajouter à vos favoris et contacter les hôtes.</p>
                <p style="margin:24px 0">
                  <a href="${url}" style="display:inline-block;background:#99331a;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:14px">Découvrir les logements</a>
                </p>
                <p style="margin:0;font-size:12px;line-height:1.5;color:#5f6672">Vous recevez cet email car un compte a été créé avec cette adresse. Si vous n'êtes pas à l'origine de cette inscription, répondez à ce message et nous supprimerons le compte. <a href="${privacyUrl}" style="color:#99331a">Vos données et vos droits</a>.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
  };
}

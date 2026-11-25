import type { Metadata } from "next";
import Card from "@/components/ui/Card";
import PageHeading from "@/components/ui/PageHeading";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Conditions générales et données personnelles",
  description: "Conditions générales d'utilisation de Kasa et informations sur le traitement de vos données personnelles.",
};

const SECTION = "flex flex-col gap-3 text-sm leading-relaxed";
const TITLE = "text-primary text-lg font-semibold";

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-[800px] px-4 pt-8 pb-16 md:pt-16">
      <PageHeading title="Conditions générales d'utilisation">
        <p>Dernière mise à jour : novembre 2026</p>
      </PageHeading>

      <Card className="mt-10 flex flex-col gap-10">
        <section aria-labelledby="objet" className={SECTION}>
          <h2 id="objet" className={TITLE}>
            1. Objet
          </h2>
          <p>
            Les présentes conditions encadrent l&apos;utilisation du site Kasa, plateforme de mise en relation entre
            voyageurs et particuliers proposant leur logement à la location.
          </p>
        </section>

        <section aria-labelledby="compte" className={SECTION}>
          <h2 id="compte" className={TITLE}>
            2. Votre compte
          </h2>
          <p>
            La création d&apos;un compte est gratuite. Vous vous engagez à fournir des informations exactes et à garder
            votre mot de passe confidentiel. Vous pouvez supprimer votre compte à tout moment sur simple demande.
          </p>
        </section>

        <section aria-labelledby="donnees-personnelles" className={SECTION}>
          <h2 id="donnees-personnelles" className={`${TITLE} scroll-mt-6`}>
            3. Données personnelles
          </h2>
          <p>
            Kasa traite vos données dans le respect du Règlement général sur la protection des données (RGPD) et de la
            loi Informatique et Libertés.
          </p>

          <h3 className="font-semibold">Données collectées</h3>
          <ul className="list-disc space-y-1 pl-5">
            <li>À l&apos;inscription : nom, prénom, adresse email et mot de passe.</li>
            <li>Le mot de passe n&apos;est jamais stocké en clair : il est chiffré (hachage) avant d&apos;être enregistré.</li>
            <li>
              Vos favoris restent dans votre navigateur (stockage local) : ils ne sont pas envoyés sur nos serveurs.
            </li>
          </ul>

          <h3 className="font-semibold">Pourquoi et sur quelle base</h3>
          <p>
            Ces données servent uniquement à créer et gérer votre compte, à vous connecter et à vous envoyer les emails
            liés à votre compte (confirmation d&apos;inscription). Ce traitement est nécessaire à l&apos;exécution du
            service que vous demandez. Aucune donnée n&apos;est vendue ni utilisée à des fins publicitaires.
          </p>

          <h3 className="font-semibold">Durée de conservation</h3>
          <p>
            Vos données sont conservées tant que votre compte est actif, puis supprimées au plus tard 3 ans après votre
            dernière connexion, ou dès que vous demandez la suppression de votre compte.
          </p>

          <h3 className="font-semibold">Cookies</h3>
          <p>
            Kasa utilise un seul cookie, strictement nécessaire, pour maintenir votre connexion. Il n&apos;y a aucun
            cookie publicitaire ni de mesure d&apos;audience : aucun consentement n&apos;est donc demandé.
          </p>

          <h3 className="font-semibold">Vos droits</h3>
          <p>
            Vous pouvez à tout moment accéder à vos données, les rectifier, les supprimer, demander leur portabilité ou
            vous opposer à leur traitement en écrivant à{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline underline-offset-2">
              {CONTACT_EMAIL}
            </a>
            . Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL
            (cnil.fr).
          </p>
        </section>
      </Card>
    </div>
  );
}

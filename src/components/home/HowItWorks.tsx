/**
 * Section « Comment ça marche ? » de la page d'accueil.
 * @module components/home/HowItWorks
 */
import Card from "@/components/ui/Card";

/** Étapes affichées dans la section. */
const STEPS = [
  {
    title: "Recherchez",
    text: "Entrez votre destination, vos dates et laissez Kasa faire le reste.",
  },
  {
    title: "Réservez",
    text: "Profitez d'une plateforme sécurisée et de profils d'hôtes vérifiés.",
  },
  {
    title: "Vivez l'expérience",
    text: "Installez-vous, profitez de votre séjour, et sentez-vous chez vous, partout.",
  },
];

/** Présente les étapes pour réserver un logement sur Kasa. */
export default function HowItWorks() {
  return (
    <Card as="section" aria-labelledby="how-it-works" className="py-10 text-center sm:px-14">
      <h2 id="how-it-works" className="text-xl font-semibold">
        Comment ça marche ?
      </h2>
      <p className="mx-auto mt-3 max-w-[460px] text-sm">
        Que vous partiez pour un week-end improvisé, des vacances en famille ou un voyage professionnel, Kasa vous
        aide à trouver un lieu qui vous ressemble.
      </p>

      <ol className="mt-8 grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
        {STEPS.map((step) => (
          <li key={step.title} className="bg-primary-dark min-h-[150px] rounded-[5px] p-4 text-white sm:min-h-[110px]">
            <h3 className="font-medium">{step.title}</h3>
            <p className="mt-3 text-xs leading-relaxed">{step.text}</p>
          </li>
        ))}
      </ol>
    </Card>
  );
}

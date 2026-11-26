/**
 * Insertion de données structurées dans la page.
 * @module components/seo/JsonLd
 */
/**
 * Insère des données structurées schema.org dans une balise `script` JSON-LD.
 *
 * Les caractères `<` sont échappés pour empêcher la fermeture de la balise.
 *
 * @param props Propriétés du composant.
 * @param props.data Objet ou liste d'objets schema.org.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

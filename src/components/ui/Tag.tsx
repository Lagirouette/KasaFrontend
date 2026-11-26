/**
 * Étiquettes d'équipement ou de catégorie.
 * @module components/ui/Tag
 */
/**
 * Étiquette simple.
 *
 * @param props Propriétés du composant.
 * @param props.children Texte de l'étiquette.
 */
export default function Tag({ children }: { children: React.ReactNode }) {
  return <span className="bg-chip inline-flex h-7 items-center rounded-[5px] px-3 text-xs">{children}</span>;
}

/**
 * Liste d'étiquettes.
 *
 * @param props Propriétés du composant.
 * @param props.items Textes des étiquettes.
 * @param props.label Nom accessible de la liste.
 */
export function TagList({ items, label }: { items: string[]; label?: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}

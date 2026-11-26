/**
 * Section repliable.
 * @module components/ui/Collapse
 */
"use client";

import { useId, useState } from "react";
import { ChevronDownIcon } from "@/components/icons";

/** Propriétés de {@link Collapse}. */
type Props = {
  /** Titre de la section, affiché dans le bouton. */
  title: string;
  /** Contenu de la section. */
  children: React.ReactNode;
  /** `true` pour ouvrir la section au chargement, valeur par défaut. */
  defaultOpen?: boolean;
};

/**
 * Section qui s'ouvre et se ferme avec une animation.
 *
 * L'état est annoncé avec `aria-expanded`, et le contenu fermé est rendu inerte.
 */
export default function Collapse({ title, children, defaultOpen = true }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <section className="border-line border-t pt-4 first:border-t-0 first:pt-0">
      <h2>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={contentId}
          className="hover:text-primary flex w-full items-center justify-between gap-4 rounded-[5px] py-1 text-left text-sm font-medium transition-colors"
        >
          {title}
          <ChevronDownIcon
            className={`size-4 transition-transform duration-300 ease-out ${open ? "rotate-180" : "rotate-0"}`}
          />
        </button>
      </h2>
      <div
        id={contentId}
        role="region"
        aria-label={title}
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-3 pb-1">{children}</div>
        </div>
      </div>
    </section>
  );
}

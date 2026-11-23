"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { ADD_PROPERTY_LINK, ICON_LINKS, MAIN_LINKS } from "./nav";

const LINKS = [...MAIN_LINKS, ADD_PROPERTY_LINK, ...ICON_LINKS];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        className="p-1"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Navigation principale"
          className="bg-surface border-line absolute inset-x-0 top-14 z-20 border-t shadow-md"
        >
          <ul className="flex flex-col py-2">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="hover:bg-background block px-4 py-3 text-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}

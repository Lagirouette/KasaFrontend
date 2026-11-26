/**
 * Pied de page du site.
 * @module components/layout/Footer
 */
import { LogoMark } from "@/components/Logo";

/** Pied de page avec le logo et les mentions de copyright. */
export default function Footer() {
  return (
    <footer className="bg-surface mt-auto">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-8">
        <LogoMark className="text-brand w-8" />
        <p lang="en" className="text-xs">
          © 2025 Kasa. All rights reserved
        </p>
      </div>
    </footer>
  );
}

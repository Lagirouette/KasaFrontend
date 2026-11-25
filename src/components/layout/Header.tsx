import Link from "next/link";
import Logo, { LogoMark } from "@/components/Logo";
import { HeartIcon, MessageIcon } from "@/components/icons";
import MobileMenu from "./MobileMenu";
import { ADD_PROPERTY_LINK, ICON_LINKS, MAIN_LINKS } from "./nav";

export default function Header() {
  return (
    <header className="relative md:px-4 md:pt-6">
      <div className="bg-surface mx-auto hidden h-14 max-w-[680px] grid-cols-[1fr_auto_1fr] items-center gap-6 rounded-[10px] px-8 md:grid">
        <nav aria-label="Navigation principale" className="flex gap-6 text-sm">
          {MAIN_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/">
          <span aria-hidden>
            <Logo className="text-brand w-[96px]" />
          </span>
          <span className="sr-only">Kasa, accueil</span>
        </Link>

        <div className="flex items-center justify-end gap-4 text-sm">
          <Link href={ADD_PROPERTY_LINK.href} className="text-primary whitespace-nowrap hover:underline">
            {ADD_PROPERTY_LINK.label}
          </Link>
          <div className="text-primary flex items-center gap-1">
            {ICON_LINKS.map((link, i) => (
              <span key={link.href} className="flex items-center gap-1">
                {i > 0 && <span aria-hidden className="bg-line h-4 w-px" />}
                <Link href={link.href} aria-label={link.label} className="p-1">
                  {link.icon === "heart" ? <HeartIcon outline /> : <MessageIcon />}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-surface flex h-14 items-center justify-between px-4 md:hidden">
        <Link href="/" aria-label="Kasa, accueil">
          <LogoMark className="text-brand w-7" />
        </Link>
        <MobileMenu />
      </div>
    </header>
  );
}

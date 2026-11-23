import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Kasa", template: "%s | Kasa" },
  description:
    "Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux, sélectionnés avec soin par nos hôtes.",
};

/** Mise en page commune à toutes les pages : header, contenu, footer. */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning : certaines extensions de navigateur ajoutent des attributs
    // sur <html> avant l'hydratation. Ne masque que les écarts d'attributs de cette balise.
    <html lang="fr" suppressHydrationWarning className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#contenu"
          className="bg-primary sr-only z-50 rounded-[5px] px-4 py-2 text-sm text-white focus:not-sr-only focus:absolute focus:top-2 focus:left-2"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="contenu" className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

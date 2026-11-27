/**
 * Layout racine de l'application.
 * @module app/layout
 */
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

/** Police Inter, chargée par Next.js. */
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap", preload: false });

/** Métadonnées par défaut de toutes les pages. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} : locations d'appartements et de maisons entre particuliers`, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: { card: "summary_large_image" },
};

/** Couleur du thème du navigateur. */
export const viewport: Viewport = {
  themeColor: "#fff9f7",
};

/** Structure commune des pages : lien d'évitement, en-tête, contenu principal et pied de page, dans le fournisseur des favoris. */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#contenu"
          className="bg-primary sr-only z-50 rounded-[5px] px-4 py-2 text-sm text-white focus:not-sr-only focus:absolute focus:top-2 focus:left-2"
        >
          Aller au contenu
        </a>
        <FavoritesProvider>
          <Header />
          <main id="contenu" tabIndex={-1} className="flex flex-1 flex-col">
            {children}
          </main>
          <Footer />
        </FavoritesProvider>
      </body>
    </html>
  );
}

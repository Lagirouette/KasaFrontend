"use client"; // Les error boundaries sont forcément des Client Components

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ErrorView from "@/components/ui/ErrorView";

export default function RootError({ error, retry }: { error: unknown; retry: () => void }) {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <ErrorView error={error} retry={retry} />
      </main>
      <Footer />
    </>
  );
}

"use client";

import ErrorView from "@/components/ui/ErrorView";

export default function RootError({ error, retry }: { error: unknown; retry: () => void }) {
  return <ErrorView error={error} retry={retry} />;
}

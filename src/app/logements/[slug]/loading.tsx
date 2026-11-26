/**
 * Chargement de la page d'un logement.
 * @module app/logements/[slug]/loading
 */
/** Squelette affiché pendant le chargement d'un logement. */
export default function PropertyLoading() {
  return (
    <div
      role="status"
      aria-label="Chargement du logement"
      className="mx-auto w-full max-w-[508px] px-4 pt-6 pb-16 md:max-w-[1000px] md:pt-16"
    >
      <div className="bg-line h-8 w-40 animate-pulse rounded-[5px]" />
      <div className="mt-4 grid items-start gap-4 md:mt-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="flex flex-col gap-4">
          <div className="grid gap-2 md:grid-cols-2">
            <div className="bg-line aspect-[4/3.6] animate-pulse rounded-[10px] md:aspect-[7/8]" />
            <div className="grid grid-cols-4 gap-2 md:grid-cols-2 md:grid-rows-2">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="bg-line aspect-square animate-pulse rounded-[10px] md:aspect-auto" />
              ))}
            </div>
          </div>
          <div className="bg-surface space-y-3 rounded-[10px] p-6">
            <div className="bg-line h-5 w-1/2 animate-pulse rounded" />
            <div className="bg-line h-3 w-1/3 animate-pulse rounded" />
            <div className="bg-line mt-6 h-3 w-full animate-pulse rounded" />
            <div className="bg-line h-3 w-5/6 animate-pulse rounded" />
          </div>
        </div>
        <div className="bg-surface h-[200px] animate-pulse rounded-[10px]" />
      </div>
    </div>
  );
}

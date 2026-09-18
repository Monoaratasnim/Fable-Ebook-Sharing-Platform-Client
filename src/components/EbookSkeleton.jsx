export default function EbookSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-line bg-glass backdrop-blur-md">

      <div className="h-52 bg-gradient-to-br from-soft via-panel to-soft sm:h-60" />

      <div className="p-4">
        <div className="h-4 w-3/4 rounded bg-soft" />

        <div className="mt-3 h-3 w-1/2 rounded bg-soft" />

        <div className="mt-6 flex justify-between">
          <div className="h-5 w-16 rounded bg-soft" />

          <div className="h-8 w-20 rounded bg-soft" />
        </div>
      </div>
    </div>
  );
}
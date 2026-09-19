export default function EbookSkeleton() {
  return (
    <div className="flex h-full w-full flex-col animate-pulse overflow-hidden rounded-2xl border border-line bg-glass backdrop-blur-md">

      <div className="aspect-[4/3] w-full shrink-0 bg-gradient-to-br from-soft via-panel to-soft" />

      <div className="flex flex-1 flex-col p-4">
        <div className="h-4 w-3/4 rounded bg-soft" />

        <div className="mt-3 h-3 w-1/2 rounded bg-soft" />

        <div className="mt-auto flex justify-between pt-4">
          <div className="h-5 w-16 rounded bg-soft" />

          <div className="h-8 w-20 rounded bg-soft" />
        </div>
      </div>
    </div>
  );
}
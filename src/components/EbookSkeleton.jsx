export default function EbookSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-md">

      <div className="h-52 bg-gradient-to-br from-slate-800/80 to-slate-900 sm:h-60" />

      <div className="p-4">
        <div className="h-4 w-3/4 rounded bg-slate-800" />

        <div className="mt-3 h-3 w-1/2 rounded bg-slate-800" />

        <div className="mt-6 flex justify-between">
          <div className="h-5 w-16 rounded bg-slate-800" />

          <div className="h-8 w-20 rounded bg-slate-800" />
        </div>
      </div>
    </div>
  );
}
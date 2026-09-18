"use client";

export default function DashboardLoading() {
  return (
    <div>
      <div className="flex justify-center py-24">
        <div className="h-14 w-14 border-[5px] border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    </div>
  );
}
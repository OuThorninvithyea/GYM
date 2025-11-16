"use client";

export default function LoadingSpinner({
  message = "Loading...",
}: {
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="spinner" />
      <p className="text-gray-400">{message}</p>
    </div>
  );
}

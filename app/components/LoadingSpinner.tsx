export default function LoadingSpinner({ message = "読み込み中..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="loading loading-spinner loading-lg text-primary"></div>
      <p className="mt-4 text-gray-600">{message}</p>
    </div>
  );
}
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | StockForge AI",
  description: "Privacy Policy for StockForge AI",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="text-2xl font-bold text-slate-900">Privacy Policy</h1>
        <p className="mt-4 text-slate-600">
          This is a placeholder. Replace with your actual Privacy Policy content.
        </p>
        <p className="mt-6">
          <Link href="/login" className="text-sky-600 hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </main>
  );
}

import Link from "next/link";
import "./globals.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6">
          <header className="flex h-16 items-center justify-between border-b border-slate-200">
            <Link href="/" className="text-lg font-semibold">
              Mediebibliotek
            </Link>

            <nav className="flex gap-5 text-sm text-slate-600">
              <Link href="/books" className="hover:text-slate-900">
                Bøker
              </Link>
              <Link href="/movies" className="hover:text-slate-900">
                Filmer
              </Link>
            </nav>
          </header>

          <main className="flex-1 py-8">{children}</main>
        </div>
      </body>
    </html>
  );
}

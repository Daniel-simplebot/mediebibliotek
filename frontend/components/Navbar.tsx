"use client";

import Link from "next/link"

export function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 px-6">
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
  )
}

import { BOOKS_API_URL } from "@/lib/constants"
import { Book, BookStatus } from "@/types/book"
import { AddBookDialog } from "@/components/AddBookDialog"
import { DeleteBookButton } from "@/components/DeleteBookButton"
import Image from "next/image"

export default async function BooksPage() {
  const response = await fetch(BOOKS_API_URL, {
    next: { tags: ["books"] },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch books")
  }

  const books: Book[] = await response.json()

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl">Oversikt over bøker</h1>
      <div className="mb-4 flex justify-end">
        <AddBookDialog />
      </div>
      {books.length === 0 ? (
        <p className="text-center text-gray-600">Ingen bøker lagt til</p>
      ) : (
        <ul className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book, index) => (
            <li
              key={book.id}
              className="w-full max-w-xs overflow-hidden rounded-lg border p-3 shadow-sm transition-transform duration-100 hover:scale-105 hover:border-2"
            >
              <div className="flex items-center gap-3">
                <div>
                  <h2 className="text-xl leading-tight font-bold tracking-tight text-white">
                    {book.title}
                  </h2>

                  <p className="mt-2 text-sm text-gray-300">{book.author}</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full border border-gray-700 bg-gray-800 px-2.5 py-1 text-xs font-medium text-gray-300">
                      {book.isOwned ? "Eier" : "Ønskeliste"}
                    </span>

                    <span className="rounded-full border border-red-900/60 bg-red-950/40 px-2.5 py-1 text-xs font-medium text-red-300">
                      <BookStatus book={book} />
                    </span>
                  </div>
                </div>
                <div className="relative ml-auto h-30 w-20 flex-none overflow-hidden">
                  {book.thumbnail?.startsWith("http") ? (
                    <Image
                      src={book.thumbnail}
                      alt={`Omslag for ${book.title}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gray-800 p-2 text-center text-xs text-gray-400">
                      Omslag mangler
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-3 flex items-center gap-4">
                <DeleteBookButton id={book.id} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

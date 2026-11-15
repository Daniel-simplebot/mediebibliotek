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
          {books.map((book) => (
            <li
              key={book.id}
              className="w-full max-w-xs overflow-hidden rounded-lg border p-3 shadow-sm transition-transform duration-100 hover:scale-105 hover:border-2"
            >
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold">{book.title}</h2>
                  <p className="mt-1 text-gray-600">Forfatter: {book.author}</p>
                  <p className="mt-1 text-gray-600">
                    {book.isOwned ? "Eier" : "Eier ikke"}
                  </p>
                  <p className="mt-1 text-gray-600">
                    <BookStatus book={book} />
                  </p>
                </div>

                <div className="relative ml-auto h-32 w-20 shrink-0 overflow-hidden">
                  <Image
                    src={book.thumbnail}
                    alt="Omslag"
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
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

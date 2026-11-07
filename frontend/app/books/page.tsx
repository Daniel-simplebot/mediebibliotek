import { BOOKS_API_URL } from "@/lib/constants";
import type { Book } from "@/types/book";

export default async function BooksPage() {
  const reponse = await fetch(BOOKS_API_URL)
  
  if (!reponse.ok) {
      throw new Error("Failed to fetch books");
    }
  const books: Book[] = await reponse.json();
  
  return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-center text-3xl font-bold">Bøker</h1>
  
        {books.length === 0 ? (
          <p className="text-center text-gray-600">Ingen bøker lagt til</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <li key={book.id} className="rounded-lg border p-4 shadow-sm transition-transform duration-100 hover:border-2 hover:border-white-500 hover:scale-105 overflow-hidden">
                <h2 className="text-xl font-semibold">{book.title}</h2>
                <p className="mt-1 text-gray-600">Forfatter: {book.author}</p>
                <p className="mt-3 text-sm">
                  {book.isOwned ? "Eier" : "Eier ikke"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </main>
    );
  }
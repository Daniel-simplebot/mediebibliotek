import { BOOKS_API_URL } from "@/lib/constants";
import type { Book } from "@/types/book";
import { DeleteBookButton } from "@/components/DeleteBookButton";
import { EditBookButton } from "@/components/EditBookButton";
import { BookStatus } from "@/types/book";
import AddBookButton from "@/components/AddBookButton";

export default async function BooksPage() {
  const response = await fetch(BOOKS_API_URL, {
    next: { tags: ["books"] },
  });
  
  if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
  const books: Book[] = await response.json();
  
  return (
      <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl">Oversikt over bøker</h1>
      <div className="mb-4 flex justify-end">
        <AddBookButton />
      </div>
  
        {books.length === 0 ? (
          <p className="text-center text-gray-600">Ingen bøker lagt til</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <li key={book.id} className="rounded-lg border p-4 shadow-sm transition-transform duration-100 hover:border-2 hover:border-white-500 hover:scale-105 overflow-hidden">
                <h2 className="text-xl font-semibold">{book.title}</h2>
                <p className="mt-1 text-gray-600">Forfatter: {book.author}</p>
                <p className="mt-1 text-gray-600">
                  {book.isOwned ? "Eier" : "Eier ikke"}
                </p>
                <p className="mt-1 text-gray-600"><BookStatus book={book} /></p>
                <div className="mt-4 flex items-center gap-4">
                  <EditBookButton id={book.id} />
                  <DeleteBookButton id={book.id} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    );
  }
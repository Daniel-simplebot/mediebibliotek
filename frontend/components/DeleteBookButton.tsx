"use client";
import { deleteBook } from "@/modules/books/actions";

export function DeleteBookButton({ id }: { id: number }) {
  
  return (
    <button onClick={() => deleteBook(id)}
      className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
          Slett bok
        </button>
    );
}
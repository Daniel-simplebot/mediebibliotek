"use client";
import { editBook } from "@/modules/books/actions";

export function EditBookButton({ id }: { id: number }) {
  
  return (
    <button onClick={() => editBook(id)}
      className="bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded">
          Rediger bok
        </button>
    );
}
"use client";

import { addBook } from "@/modules/books/actions";
import { useState } from "react";
import { BookSearchResult } from "@/types/book";
import BookSearch from "./BookSearch";

export default function AddBookButton() {
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookSearchResult | null>(null);

  async function handleSave() {
    if (!selectedBook) return;

    await addBook(selectedBook);
    setSelectedBook(null);
    setShowModal(false);
  }

  return (
    <>
      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        type="button"
        onClick={() => setShowModal(true)}
      >
        + Legg til bok
      </button>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => {
            setShowModal(false);
            setSelectedBook(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="w-full max-w-sm rounded-lg border border-neutral-700 bg-neutral-950 p-5 text-neutral-100 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="modal-title" className="mb-4 text-sm font-semibold">
              Legg til bok
            </h2>

            <BookSearch
              selectedBook={selectedBook}
              onSelect={setSelectedBook}
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="border border-neutral-700 px-3 py-2 text-xs text-neutral-300 hover:bg-neutral-800 rounded"
              >
                Avbryt
              </button>
              <button
                type="button"
                disabled={!selectedBook}
                onClick={handleSave}
                className="border border-green-500 px-3 py-2 text-xs text-green-300 hover:bg-green-950 rounded disabled:opacity-40 disabled:hover:bg-transparent"
              >
                Lagre
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
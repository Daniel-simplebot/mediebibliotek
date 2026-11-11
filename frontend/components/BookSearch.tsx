'use client';

import { startTransition, useActionState, useRef, useState } from 'react';
import { searchBooks, type SearchState } from '@/modules/books/actions';
import { BookSearchResult } from '@/types/book';

const initialState: SearchState = {
  message: '',
  books: [],
};

type BookSearchProps = {
  selectedBook: BookSearchResult | null;
  onSelect: (book: BookSearchResult) => void;
};

export default function BookSearch({
  selectedBook,
  onSelect,
}: BookSearchProps) {
  const [state, dispatch, isPending] = useActionState(
    searchBooks,
    initialState,
  );

  const [isWaiting, setIsWaiting] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (timer.current) clearTimeout(timer.current);

    const form = event.currentTarget.form;
    if (!form) return;

    const formData = new FormData(form);

    setIsWaiting(true);

    timer.current = setTimeout(() => {
      setIsWaiting(false);

      startTransition(() => {
        dispatch(formData);
      });
    }, 400);
  }

  return (
    <form action={dispatch} className="max-w-md space-y-3">

      <input
        id="searchQuery"
        name="searchQuery"
        type="search"
        placeholder="Skriv inn bok tittel eller forfatter..."
        autoComplete="off"
        onChange={handleChange}
        className="w-full rounded border p-2"
      />

      {(isWaiting || isPending) && <p>Søker…</p>}

      {state.message && !isWaiting && !isPending && (
        <p>{state.message}</p>
      )}

      <div className="space-y-3">
        {state.books.map((book) => {
          const isSelected = selectedBook?.id === book.id;
      
          return (
            <button
              key={book.id}
              type="button"
              onClick={() => onSelect(book)}
              className={`flex w-full gap-3 rounded-md border p-3 text-left ${
                isSelected ? 'border-green-500 bg-green-950' : 'border-gray-500'
              }`}
            >
              {book.thumbnail && (
                <img
                  src={book.thumbnail}
                  alt={`Omslag: ${book.title}`}
                  width={60}
                  height={90}
                  className="h-auto w-15 rounded object-cover"
                />
              )}
      
              <span>
                <span className="block"><strong>Tittel:</strong> {book.title}</span>
                <span className="block">
                  <strong>Forfatter:</strong>{' '}
                  {book.authors.join(', ') || 'Ukjent forfatter'}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </form>
  );
}

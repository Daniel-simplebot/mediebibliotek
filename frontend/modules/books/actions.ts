"use server";
import { BOOKS_API_URL } from "@/lib/constants";
import { BookSearchResult } from "@/types/book";
import { updateTag } from "next/cache";

export async function deleteBook(id: number) {
  const response = await fetch(`${BOOKS_API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Could not delete book");
  }
  
  updateTag("books")
}

export async function editBook(id: number) {
  const response = await fetch(`${BOOKS_API_URL}/${id}`, {
    method: "PUT",
  });

  if (!response.ok) {
    throw new Error("Could not edit book");
  }
  
  updateTag("books")
}

/*export async function searchBooks(q: string): Promise<BookSearchResult[]> {
  const res = await fetch(`${BOOKS_API_URL}/search?q=${encodeURIComponent(q)}`);
  if (!res.ok) throw new Error("Klarte ikke søke etter bøker");
  return res.json();
}*/

export async function addBook(book: BookSearchResult) {
  const res = await fetch(BOOKS_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: book.title,
      author: book.authors.join(", "),
    }),
  });
  updateTag("books")
  if (!res.ok) throw new Error("Klarte ikke lagre boken");
  return res.json();
}

export type SearchState = {
  message: string;
  books: BookSearchResult[];
};

export async function searchBooks(
  _prevState: SearchState,
  formData: FormData,
): Promise<SearchState> {
  const value = formData.get('searchQuery');
  const searchQuery = typeof value === 'string' ? value.trim() : '';

  if (!searchQuery) {
    return {
      message: 'Legg inn tittel eller forfatter for å søke',
      books: [],
    };
  }

  if (searchQuery.length < 3) {
    return {
      message: 'For mange resultater, skriv mer spesifikt',
      books: [],
    };
  }

  try {
    const params = new URLSearchParams({ searchQuery });
    const response = await fetch(`${BOOKS_API_URL}/search?${params}`);

    if (!response.ok) {
      console.error(
        'Books API-feil:',
        response.status,
        await response.text(),
      );

      return {
        message: 'Kunne ikke hente søkeresultater',
        books: [],
      };
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      return {
        message: 'Søketjenesten returnerte et ugyldig svar',
        books: [],
      };
    }

    const books = data as BookSearchResult[];

    return {
      message: books.length === 0 ? 'Fant ingen bøker' : '',
      books,
    };
  } catch (error) {
    console.error('Boksøk feilet:', error);

    return {
      message: 'Søk feilet, prøv igjen senere.',
      books: [],
    };
  }
}
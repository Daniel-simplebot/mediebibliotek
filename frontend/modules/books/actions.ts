"use server"

import { BOOKS_API_URL } from "@/lib/constants"
import { BookSearchResult } from "@/types/book"
import { updateTag } from "next/cache"

export async function searchBooks(input: string) {
  const searchQuery = input.trim()

  if (searchQuery.length < 3) {
    return { message: "Skriv minst 3 tegn", books: [] }
  }
  try {
    const params = new URLSearchParams({ searchQuery })
    const response = await fetch(`${BOOKS_API_URL}/search?${params}`)

    if (!response.ok) {
      console.error("Books API-feil:", response.status, await response.text())

      return {
        message: "Kunne ikke hente søkeresultater",
        books: [],
      }
    }

    const data: unknown = await response.json()

    if (!Array.isArray(data)) {
      return {
        message: "Søketjenesten returnerte et ugyldig svar",
        books: [],
      }
    }

    const books = data as BookSearchResult[]

    return {
      message: books.length === 0 ? "Fant ingen bøker" : "",
      books,
    }
  } catch (error) {
    console.error("Boksøk feilet:", error)

    return {
      message: "Søk feilet, prøv igjen senere.",
      books: [],
    }
  }
}

export async function addBook(book: BookSearchResult) {
  const res = await fetch(BOOKS_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: book.title,
      author: book.authors.join(", "),
      thumbnail: book.thumbnail ,
    }),
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(`Klarte ikke lagre boken: ${res.status} ${error}`)
  }

  updateTag("books")
  return res.json()
}

export async function deleteBook(id: number) {
  const res = await fetch(`${BOOKS_API_URL}/${id}`, {
    method: "DELETE",
  })
  
  if (!res.ok) {
    const error = await res.text()
    throw new Error(`Klarte ikke å slette boka: ${res.status} ${error}`)
  }

  updateTag("books")
}

"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { addBook, searchBooks } from "@/modules/books/actions"
import { BookSearchResult } from "@/types/book"

export function AddBookDialog() {
  const [query, setQuery] = useState("")
  const [message, setMessage] = useState("")
  const [open, setOpen] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<BookSearchResult[]>([])
  const [selectedBook, setSelectedBook] = useState<BookSearchResult | null>(
    null
  )

  useEffect(() => {
    const value = query.trim()

    if (!value) return

    const timer = setTimeout(async () => {
      setIsSearching(true)
      try {
        const data = await searchBooks(value)
        setResults(data.books)
        setMessage(data.message)
      } catch (error) {
        console.error(error)
        setMessage("Kunne ikke søke etter bøker.")
      } finally {
        setIsSearching(false)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [query])

  function handleSearch(value: string) {
    setQuery(value)

    if (!value.trim()) {
      setResults([])
      setMessage("")
      setIsSearching(false)
    }
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)

    if (!nextOpen) {
      setQuery("")
      setSelectedBook(null)
      setResults([])
    }
  }

  async function handleSave() {
    if (!selectedBook) return

    await addBook(selectedBook)
    setOpen(false)
    setQuery("")
    setSelectedBook(null)
    setResults([])
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={<Button>+ Legg til bok</Button>}
        className="rounded-lg border border-blue-500 bg-transparent px-4 py-2 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white"
      />
      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={(event) => {
            event.preventDefault()
            handleSave()
          }}
        >
          <DialogHeader>
            <DialogTitle>Legg til bok</DialogTitle>
            <DialogDescription>Søk og legg til ønsket bok</DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field className="mt-4">
              {isSearching && (
                <p className="text-sm text-muted-foreground">Søker...</p>
              )}            
              <Input
                id="name-1"
                name="name"
                placeholder="Skriv inn tittel eller forfatter"
                value={query}
                onChange={(event) => handleSearch(event.target.value)}
              />
              {message && (
                <p className="text-sm text-muted-foreground">{message}</p>
              )}
              <div className="max-h-64 space-y-2 overflow-y-auto">
                {results.map((book) => (
                  <div
                    key={book.id}
                    onClick={() =>
                      setSelectedBook((current) =>
                        current?.id === book.id ? null : book
                      )
                    }
                    className={
                      selectedBook?.id === book.id
                        ? "flex items-center gap-3 rounded border border-green-600 p-2"
                        : "flex items-center gap-3 rounded border p-2"
                    }
                  >
                    {book.thumbnail && (
                      <div className="relative h-16 w-11 overflow-hidden">
                        <Image
                          src={book.thumbnail}
                          alt="Omslag"
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{book.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {book.authors?.join(", ") || "Ukjent forfatter"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button type="button">Avbryt</Button>} />
            <Button
              disabled={selectedBook === null}
              type="submit"
              className="rounded-lg border border-green-500 bg-transparent px-4 py-2 font-semibold text-green-700 hover:border-transparent hover:bg-green-500 hover:text-white"
            >
              Lagre
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

"use client"
import { deleteBook } from "@/modules/books/actions"
import { Button } from "@/components/ui/button"

export function DeleteBookButton({ id }: { id: number }) {
  return (
    <Button
      onClick={() => deleteBook(id)}
      className="rounded-lg border border-red-500 bg-transparent px-4 py-2 font-semibold text-red-700 hover:border-transparent hover:bg-red-500 hover:text-white"
    >
      Slett bok
    </Button>
  )
}

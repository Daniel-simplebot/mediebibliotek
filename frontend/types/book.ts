type Status = 0 | 1 | 2;

export type Book = {
  id: number;
  title: string;
  author: string;
  isOwned: boolean;
  status: Status;
};

export type BookSearchResult = {
  id: string;
  title: string;
  authors: string[];
  thumbnail: string | null;
};

const statusLabels: Record<Status, string> = {
  0: "Ikke begynt å lese",
  1: "Lesing pågår",
  2: "Fullført bok",
};

export function BookStatus({ book }: { book: Book }) {
  return statusLabels[book.status];
}
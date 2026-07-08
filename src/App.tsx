import { useEffect, useState, useMemo } from "react";
import { GrainFilter } from "../src/components/Filters";
import { BookResponse } from "./models/book-response";
import { ApiService } from "./services/api-service";
import Card from "./components/Card";
import Error from "./components/Error";
import { Spinner } from "flowbite-react";
import { PiPlusBold } from "react-icons/pi";
import { lazy } from "react";

interface AppProps {
  searchQuery: string;
  searchCategory: "title" | "author" | "description";
}

// Modal import
const Modal = lazy(() => import("./components/Modal"));

export default function App({ searchQuery, searchCategory }: AppProps) {
  const [books, setBooks] = useState<Array<BookResponse>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Filters the books based on the search query and category
  const displayedBooks = useMemo(() => {
    if (!searchQuery) return books;
    const q = searchQuery.toLowerCase();
    return books.filter((book) =>
      book[searchCategory].toLowerCase().includes(q),
    );
  }, [books, searchQuery, searchCategory]);

  // Fetches the books from the API
  useEffect(() => {
    async function getBooks() {
      try {
        setIsLoading(true);
        const response = await ApiService.getBooks();
        if (response?.data) {
          setBooks(response.data);
        } else {
          setError("Error - Cannot get any books :(");
        }
      } catch (error) {
        console.error(error);
        setError("An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    }

    getBooks();
  }, []);

  // Handles saving a book (either creating or updating) and updates the state accordingly
  const handleSave = (updated: BookResponse) => {
    setBooks((prev) => {
      const exists = prev.some((b) => b.id === updated.id);
      return exists
        ? prev.map((b) => (b.id === updated.id ? updated : b))
        : [...prev, updated];
    });
  };

  // Handles deleting a book and updates the state accordingly
  const handleDelete = (id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  // Render the component based on the loading state
  if (isLoading)
    return (
      <div className="from-cream via-cream-100 to-cream-300 relative min-h-screen w-full bg-linear-to-b p-4 text-center">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
    );

  // Render the component based on the error state
  if (error)
    return (
      <div className="from-cream via-cream-100 to-cream-300 relative min-h-screen w-full bg-linear-to-b p-4 text-center">
        <Error message={error} isServerSide={true} />
      </div>
    );

  return (
    <div className="from-cream via-cream-100 to-cream-300 relative min-h-screen w-full bg-linear-to-b p-4">
      <GrainFilter />
      <h1 className="text-h1 text-center">Private library project</h1>
      <p className="text-meta text-center">
        This site is made for HackerU's React project requirements
      </p>

      {/* Displayed books */}
      {displayedBooks.length === 0 ? (
        <Error message="No results found" />
      ) : (
        <div className="grid grid-cols-1 gap-16 p-16 md:grid-cols-3 lg:grid-cols-4">
          {displayedBooks.map((book) => (
            <Card
              key={book.id}
              title={book.title}
              author={book.author}
              description={book.description}
              coverImage={book.coverImage}
              isFavorite={book.isFavorite}
              id={book.id}
              onSave={handleSave}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Create Book Button */}
      <button
        onClick={() => setIsCreateOpen(true)}
        className="bg-rust/30 hover:bg-rust-300/30 fixed bottom-2 left-2 z-40 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg"
      >
        <PiPlusBold className="text-2xl" />
      </button>

      {isCreateOpen && (
        <Modal onClose={() => setIsCreateOpen(false)} onSave={handleSave} />
      )}
    </div>
  );
}

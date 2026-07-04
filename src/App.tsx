import { useState } from "react";
import { GrainFilter } from "../src/components/Filters";

import { BookResponse } from "./models/book-response";
import Card from "./components/Card";

interface AppProps {
  searchQuery: string;
}

export default function App({ searchQuery }: AppProps) {
  const cardTest = {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description:
      "A young girl in the Depression-era South watches her father defend a Black man falsely accused of rape, learning hard lessons about justice and morality.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg",
    isFavorite: true,
    id: 1,
  };
  const [books, setBooks] = useState<Array<BookResponse>>([]);
  // searches for books where the Title includes the searchQuery, for example: query:"pot" title:"harry POTter"
  const filtered = (books: BookResponse[]) => {
    books.filter((book: BookResponse) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  };

  return (
    <div className="from-cream via-cream-100 to-cream-300 relative min-h-screen w-full bg-linear-to-b p-4">
      <GrainFilter />
      <h1 className="text-h1 text-center">Welcome to the library</h1>
      <p className="text-meta text-center">
        This site is made for HackerU's React project requirements
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          title={cardTest.title}
          author={cardTest.author}
          description={cardTest.description}
          coverImage={cardTest.coverImage}
          isFavorite={cardTest.isFavorite}
          id={cardTest.id}
        />
      </div>
    </div>
  );
}

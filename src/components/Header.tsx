import { IoBookOutline } from "react-icons/io5";
import { IoLogoGithub } from "react-icons/io";
import { IoLogoLinkedin } from "react-icons/io5";
import { GrainFilter } from "../components/Filters";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  searchCategory: "title" | "author" | "description";
  setSearchCategory: (value: "title" | "author" | "description") => void;
}

// Header hosts a Search bar for the library
export default function Header({
  searchQuery,
  setSearchQuery,
  searchCategory,
  setSearchCategory,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-5 mx-auto w-full">
      <GrainFilter />
      
      <div className="flex gap-2 bg-stone-50 p-2">
        {/* Search category dropdown */}
        <select
          value={searchCategory}
          onChange={(e) =>
            setSearchCategory(e.target.value as typeof searchCategory)
          }
          className="text-header relative w-fit appearance-none border-none bg-transparent text-center outline-none hover:cursor-pointer hover:font-bold"
        >
          <option value="title" className="bg-stone-200">
            Title
          </option>
          <option value="author" className="bg-stone-200">
            Author
          </option>
          <option value="description" className="bg-stone-200">
            Description
          </option>
        </select>

        <IoBookOutline className="text-stone mr-4 text-[24px]" />
        
        {/* Search input */}
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Search..."
          className="text-header placeholder-stone relative w-full border-none bg-transparent outline-none"
        />

        {/* Social links */}
        <a
          href="https://github.com/Daniel-Ingber"
          className="text-header text-xl duration-300 hover:scale-130"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IoLogoGithub />
        </a>
        <a
          href="#"
          className="text-header text-xl duration-300 hover:scale-130"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IoLogoLinkedin />
        </a>
      </div>
    </header>
  );
}

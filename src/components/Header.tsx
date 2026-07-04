import { IoBookOutline } from "react-icons/io5";
import { IoLogoGithub } from "react-icons/io";
import { IoLogoLinkedin } from "react-icons/io5";
import { GrainFilter } from "../components/Filters";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export default function Header({ searchQuery, setSearchQuery }: HeaderProps) {
  return (
    <header className="sticky top-0 z-99 mx-auto w-full">
      <GrainFilter />
      <div className="flex gap-2 bg-stone-50 p-2">
        <IoBookOutline className="text-stone" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Search..."
          className="text-header placeholder-stone relative w-full border-none bg-transparent outline-none"
        />
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

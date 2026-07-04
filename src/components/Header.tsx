import { IoBookOutline } from "react-icons/io5";
import { IoLogoGithub } from "react-icons/io";
import { GrainFilter } from "../components/Filters";
export default function Header() {
  return (
    <header className="sticky top-0 z-99 mx-auto w-full">
      <GrainFilter />
      <div className="flex gap-2 bg-stone-50 p-2">
        <IoBookOutline className="text-stone" />
        <input
          type="text"
          placeholder="Search..."
          className="text-header placeholder-stone relative w-full border-none bg-transparent outline-none"
        />
        <a
          href="https://github.com/Daniel-Ingber"
          className="text-header text-xl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IoLogoGithub />
        </a>
      </div>
    </header>
  );
}

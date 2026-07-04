import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";

interface CardProps {
  id: number;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  isFavorite: boolean;
}

export default function Card({
  id,
  title,
  author,
  description,
  coverImage,
  isFavorite,
}: CardProps) {
  return (
    <div className="from-paper via-paper-100 to-paper-300 flex flex-col overflow-hidden rounded-lg border border-stone bg-gradient-to-b shadow-sm z-1">
      <img
        src={coverImage}
        alt={`image of the book: ${title}`}
        className="w-full aspect-square object-cover"
      />
      <div className="flex flex-col gap-1 px-4 pt-3">
        <h2 className="text-h2">{title}</h2>
        <h3 className="text-h3 text-gray-500">{author}</h3>
        <p className="text-description line-clamp-3">{description}</p>
      </div>
      <div className="mt-auto flex items-center justify-between px-4 py-3">
        <button>
          {isFavorite ? (
            <IoIosHeart className="text-2xl text-rust hover:text-rust-300" />
          ) : (
            <IoIosHeartEmpty className="text-2xl text-ink-100 hover:text-ink-300" />
          )}
        </button>
        <div className="flex items-center gap-3">
          <button>
            <MdOutlineEdit className="text-2xl text-ink-100 hover:text-ink-300" />
          </button>
          <button>
            <IoTrashOutline className="text-2xl text-ink hover:text-rust-300" />
          </button>
        </div>
      </div>
    </div>
  );
}

import { lazy, useState } from "react";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { BookRequest } from "../models/book-request";
import { BookResponse } from "../models/book-response";
import { ApiService } from "../services/api-service";

const Modal = lazy(() => import("./Modal"));

interface CardProps {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  isFavorite: boolean;
  onSave: (book: BookResponse) => void;
  onDelete: (id: string) => void;
}

export default function Card({
  id,
  title,
  author,
  description,
  coverImage,
  isFavorite,
  onSave,
  onDelete,
}: CardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [favorite, setFavorite] = useState(isFavorite);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const switchFavorite = async () => {
    const next = !favorite;
    setFavorite(next);
    const book: BookRequest = {
      title,
      author,
      description,
      coverImage,
      isFavorite: next,
    };
    await ApiService.editBook(id, book);
  };

  const deleteBook = async () => {
    setIsDeleting(true);
    await ApiService.deleteBook(id);
    setIsDeleting(false);
    setShowConfirm(false);
    onDelete(id);
  };

  return (
    <div className="from-paper via-paper-100 to-paper-300 border-stone flex flex-col overflow-hidden rounded-lg border bg-gradient-to-b shadow-sm duration-150 hover:shadow-xl">
      <img
        src={coverImage}
        alt={`image of the book: ${title}`}
        className="aspect-square w-full object-cover"
      />
      <div className="flex flex-col gap-1 px-4 pt-3">
        <h2 className="text-h2">{title}</h2>
        <h3 className="text-h3 text-gray-500">{author}</h3>
        <p className="text-description line-clamp-3">{description}</p>
      </div>
      <div className="mt-auto flex items-center justify-between px-4 py-3">
        <button onClick={switchFavorite}>
          {favorite ? (
            <IoIosHeart className="text-rust hover:text-rust-300 text-2xl" />
          ) : (
            <IoIosHeartEmpty className="text-ink-100 hover:text-stone text-2xl" />
          )}
        </button>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsOpen(true)}>
            <MdOutlineEdit className="text-ink-100 hover:text-stone text-2xl" />
          </button>
          <button onClick={() => setShowConfirm(true)}>
            <IoTrashOutline className="text-ink hover:text-rust-300 text-2xl" />
          </button>
        </div>
      </div>

      {isOpen && (
        <Modal
          id={id}
          title={title}
          author={author}
          description={description}
          coverImage={coverImage}
          isFavorite={favorite}
          onClose={() => setIsOpen(false)}
          onSave={onSave}
        />
      )}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-paper flex w-full max-w-sm flex-col gap-4 rounded-lg p-6">
            <p>Delete "{title}"?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button onClick={deleteBook} disabled={isDeleting}>
                {isDeleting ? "Deleting..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

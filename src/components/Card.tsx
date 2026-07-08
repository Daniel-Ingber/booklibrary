import { lazy, useState } from "react";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { BookRequest } from "../models/book-request";
import { BookResponse } from "../models/book-response";
import { ApiService } from "../services/api-service";
import { AnimatePresence, motion } from "motion/react";

// Modal import
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

  // Switches the favorite status of the book and updates it in the backend
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

  // Deletes the book from the backend and calls the onDelete callback
  const deleteBook = async () => {
    setIsDeleting(true);
    await ApiService.deleteBook(id);
    setIsDeleting(false);
    setShowConfirm(false);
    onDelete(id);
  };

  return (
    <div className="from-paper via-paper-100 to-paper-300 border-stone flex flex-col overflow-hidden rounded-lg border bg-gradient-to-b shadow-sm duration-150 hover:shadow-xl">
      {/* Book cover image */}
      <img
        src={coverImage}
        alt={`image of the book: ${title}`}
        className="aspect-square w-full object-cover"
      />

      {/* Book details */}
      <div className="flex flex-col gap-1 px-4 pt-3">
        <h2 className="text-h2">{title}</h2>
        <h3 className="text-h3 text-gray-500">{author}</h3>
        <p className="text-description line-clamp-3">{description}</p>
      </div>

      {/* Action buttons */}
      <div className="mt-auto flex items-center justify-between px-4 py-3">
        <button
          onClick={switchFavorite}
          className="relative h-6 w-6 overflow-hidden"
        >
          <AnimatePresence initial={false}>
            <motion.span
              key={favorite ? "filled" : "empty"}
              initial={{
                clipPath: "polygon(-40% 140%, -20% 140%, 60% -40%, 40% -40%)",
              }}
              animate={{
                clipPath: "polygon(-40% 140%, 200% 140%, 280% -40%, 40% -40%)",
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              {favorite ? (
                <IoIosHeart className="text-rust hover:text-rust-300 text-2xl" />
              ) : (
                <IoIosHeartEmpty className="text-ink-100 hover:text-stone text-2xl" />
              )}
            </motion.span>
          </AnimatePresence>
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

      {/* Modal for editing the book */}
      <AnimatePresence>
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
      </AnimatePresence>

      {/* Confirmation modal for deleting the book */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-paper flex w-full max-w-sm flex-col gap-4 rounded-lg p-6"
            >
              <p className="text-eyebrow text-xs md:text-xl lg:text-2xl">
                Delete "{title}"?
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowConfirm(false)}
                  disabled={isDeleting}
                  className="bg-paper border-stone text-meta rounded border px-2 py-1 hover:bg-stone-200 hover:font-bold"
                >
                  <span>Cancel</span>
                </button>
                <button
                  className="bg-paper border-stone text-meta rounded border px-2 py-1 hover:bg-stone-200 hover:font-bold"
                  onClick={deleteBook}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Confirm"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

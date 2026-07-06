import { useState } from "react";
import { motion } from "motion/react";
import { ApiService } from "../services/api-service";
import { BookResponse } from "../models/book-response";

interface ModalProps {
  id?: string;
  title?: string;
  author?: string;
  description?: string;
  coverImage?: string;
  isFavorite?: boolean;
  onClose: () => void;
  onSave: (book: BookResponse) => void;
}

// Modal used for creating and editing books
export default function Modal({
  id,
  title = "",
  author = "",
  description = "",
  coverImage = "",
  isFavorite = false,
  onClose,
  onSave,
}: ModalProps) {
  const [formTitle, setFormTitle] = useState(title);
  const [formAuthor, setFormAuthor] = useState(author);
  const [formDescription, setFormDescription] = useState(description);
  const [formCoverImage, setFormCoverImage] = useState(coverImage);
  const [formIsFavorite, setFormIsFavorite] = useState(isFavorite);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const request = {
      title: formTitle,
      author: formAuthor,
      description: formDescription,
      coverImage: formCoverImage,
      isFavorite: formIsFavorite,
    };

    if (id !== undefined) {
      await ApiService.editBook(id, request);
      onSave({ id, ...request });
    } else {
      const response = await ApiService.createBook(request);
      onSave(response.data);
    }
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-99 flex items-center justify-center bg-black/20"
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="bg-paper flex w-full flex-col gap-3 rounded-lg p-6 md:max-w-sm md:text-xs lg:max-w-lg lg:text-[1rem]"
      >
        <label className="text-eyebrow flex flex-col gap-1">
          Title
          <input
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className="border-stone text-meta rounded border px-2 py-1"
          />
        </label>

        <label className="text-eyebrow flex flex-col gap-1">
          Author
          <input
            value={formAuthor}
            onChange={(e) => setFormAuthor(e.target.value)}
            className="border-stone text-meta rounded border px-2 py-1"
          />
        </label>

        <label className="text-eyebrow flex flex-col gap-1">
          Description
          <textarea
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            className="border-stone text-meta h-20 rounded border px-2 py-1"
          />
        </label>

        <label className="text-eyebrow flex flex-col gap-1">
          Cover Image URL
          <input
            value={formCoverImage}
            onChange={(e) => setFormCoverImage(e.target.value)}
            className="border-stone text-meta rounded border px-2 py-1"
          />
        </label>

        <label className="text-eyebrow flex cursor-pointer items-center gap-2">
          <div className="relative h-5 w-5">
            <input
              type="checkbox"
              checked={formIsFavorite}
              onChange={(e) => setFormIsFavorite(e.target.checked)}
              className="peer absolute inset-0 z-10 cursor-pointer opacity-0"
            />
            <motion.div
              className="border-stone absolute inset-0 rounded border"
              initial={false}
              animate={{
                backgroundColor: formIsFavorite
                  ? "var(--color-rust)"
                  : "rgba(0,0,0,0)",
                borderColor: formIsFavorite
                  ? "var(--color-rust)"
                  : "var(--color-stone)",
              }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            />
            <motion.svg
              viewBox="0 0 24 24"
              className="pointer-events-none absolute inset-0 h-5 w-5"
              initial={false}
            >
              <motion.path
                d="M5 13l4 4L19 7"
                fill="none"
                stroke="white"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: formIsFavorite ? 1 : 0,
                  opacity: formIsFavorite ? 1 : 0,
                }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              />
            </motion.svg>
          </div>
          Favorite
        </label>

        <div className="mt-2 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-paper border-stone text-meta rounded border px-2 py-1 hover:bg-stone-200 hover:font-bold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-paper border-stone text-meta rounded border px-2 py-1 hover:bg-stone-200 hover:font-bold"
          >
            Save
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}

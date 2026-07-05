import { useState } from "react";
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
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-99">
      <form
        onSubmit={handleSubmit}
        className="bg-paper flex w-full lg:max-w-lg md:max-w-sm md:text-xs lg:text-[1rem] flex-col gap-3 rounded-lg p-6"
      >
        <label className="flex flex-col gap-1 text-eyebrow">
          Title
          <input
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className="border-stone rounded border px-2 py-1 text-meta"
          />
        </label>

        <label className="flex flex-col gap-1 text-eyebrow">
          Author
          <input
            value={formAuthor}
            onChange={(e) => setFormAuthor(e.target.value)}
            className="border-stone rounded border px-2 py-1 text-meta"
          />
        </label>

        <label className="flex flex-col gap-1 text-eyebrow">
          Description
          <textarea
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            className="border-stone rounded border px-2 py-1 text-meta h-20"
          />
        </label>

        <label className="flex flex-col gap-1 text-eyebrow">
          Cover Image URL
          <input
            value={formCoverImage}
            onChange={(e) => setFormCoverImage(e.target.value)}
            className="border-stone rounded border px-2 py-1 text-meta"
          />
        </label>

        <label className="flex items-center gap-2 text-eyebrow">
          <input
            type="checkbox"
            checked={formIsFavorite}
            onChange={(e) => setFormIsFavorite(e.target.checked)}
          />
          Favorite
        </label>

        <div className="mt-2 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="bg-paper border-stone rounded border px-2 py-1 text-meta hover:bg-stone-200 hover:font-bold">
            Cancel
          </button>
          <button type="submit" className="bg-paper border-stone rounded border px-2 py-1 text-meta hover:bg-stone-200 hover:font-bold">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

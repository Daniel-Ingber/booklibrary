import { useState } from "react";
import { motion } from "motion/react";
import { ApiService } from "../services/api-service";
import { BookResponse } from "../models/book-response";
import { toast } from "react-toastify";

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

interface FormErrors {
  title?: string;
  author?: string;
  description?: string;
  coverImage?: string;
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
  const [errors, setErrors] = useState<FormErrors>({});
  const [imageStatus, setImageStatus] = useState<
    "idle" | "loading" | "loaded" | "error"
  >("idle");

  // URL check
  const isValidUrl = (value: string) => {
    try {
      const parsed = new URL(value);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      return false;
    }
  };

  // Updates coverImage
  const handleCoverImageChange = (value: string) => {
    setFormCoverImage(value);
    if (!value) {
      setImageStatus("idle");
      return;
    }
    if (!isValidUrl(value)) {
      setImageStatus("idle");
      return;
    }
    setImageStatus("loading");
  };

  // Form validation
  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formTitle.trim()) newErrors.title = "Title is required";
    if (!formAuthor.trim()) newErrors.author = "Author is required";
    if (!formDescription.trim())
      newErrors.description = "Description is required";
    if (!formCoverImage.trim()) {
      newErrors.coverImage = "Cover image URL is required";
    } else if (!isValidUrl(formCoverImage)) {
      newErrors.coverImage = "Enter a valid http(s) URL";
    } else if (imageStatus === "error") {
      newErrors.coverImage = "Image failed to load";
    }
    return newErrors;
  };

  // On form submit, validate the form and if valid, send a request to the API to create or edit the book. If successful, call onSave with the new book data and close the modal. If there's an error, show a toast message.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const request = {
      title: formTitle,
      author: formAuthor,
      description: formDescription,
      coverImage: formCoverImage,
      isFavorite: formIsFavorite,
    };

    try {
      if (id !== undefined) {
        await ApiService.editBook(id, request);
        // await ApiService.sendError(); // for testing purposes
        onSave({ id, ...request });
      } else {
        const response = await ApiService.createBook(request);
        onSave(response.data);
      }
      onClose();
    } catch (err) {
      // if it fails sends a toast message, if the request has an id it means it was an edit request, otherwise it was a create request and the message should be different
      toast.error(
        id !== undefined ? "Failed to update book" : "Failed to create book",
      );
      console.error(err);
    }
  };

  return (
    // Background fade in and out, modal scale and fade in and out
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
        {/* Title field */}
        <label className="text-eyebrow flex flex-col gap-1">
          <span className="form-necessary">Title</span>
          <input
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className="border-stone text-meta rounded border px-2 py-1"
          />
          {errors.title && <span className="text-error">{errors.title}</span>}
        </label>

        {/* Author field */}
        <label className="text-eyebrow flex flex-col gap-1">
          <span className="form-necessary">Author</span>
          <input
            value={formAuthor}
            onChange={(e) => setFormAuthor(e.target.value)}
            className="border-stone text-meta rounded border px-2 py-1"
          />
          {errors.author && <span className="text-error">{errors.author}</span>}
        </label>

        {/* Description field */}
        <label className="text-eyebrow flex flex-col gap-1">
          <span className="form-necessary">Description</span>
          <textarea
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            className="border-stone text-meta h-20 rounded border px-2 py-1"
          />
          {errors.description && (
            <span className="text-error">{errors.description}</span>
          )}
        </label>

        {/* Cover image */}
        <label className="text-eyebrow flex flex-col gap-1">
          <span className="form-necessary">Cover Image URL</span>
          <div className="flex items-center gap-2">
            <input
              value={formCoverImage}
              onChange={(e) => handleCoverImageChange(e.target.value)}
              className="border-stone text-meta flex-1 rounded border px-2 py-1"
            />
            {/* Cover image preview */}
            {formCoverImage && isValidUrl(formCoverImage) && (
              <img
                src={formCoverImage}
                alt="cover preview"
                className="h-10 w-10 rounded border object-cover"
                style={{ display: imageStatus === "loaded" ? "block" : "none" }}
                onLoad={() => setImageStatus("loaded")}
                onError={() => setImageStatus("error")}
              />
            )}
            {/* Placeholder for cover image */}
            {imageStatus !== "loaded" ||
            !formCoverImage ||
            !isValidUrl(formCoverImage) ? (
              <div className="h-10 w-10 rounded border bg-stone-200 object-cover" />
            ) : null}
          </div>
          {errors.coverImage && (
            <span className="text-error">{errors.coverImage}</span>
          )}
        </label>

        {/* Favorite field */}
        {id === undefined && (<label className="text-eyebrow flex cursor-pointer items-center gap-2">
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
            {/* Checkmark animation */}
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
        </label>)}

        {/* Buttons */}
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

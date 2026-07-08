interface ErrorProps {
  isServerSide?: boolean;
  message?: string;
}

import noResultsImg from "../assets/no-results.png";

// Customized empty state component for displaying error messages
export default function ErrorMessage({ message, isServerSide }: ErrorProps) {
  return (
    <>
      <div className="mt-12 mb-12 flex flex-col items-center">
        <img
          src={noResultsImg}
          alt="API Error"
          className="w-[50vw] max-w-105 self-center opacity-25"
        />
      </div>
      <p className="text-error text-rust-300 opacity-50">
        {isServerSide ? "ERROR IS SERVER SIDE" : ""}
      </p>
      <p className="text-error mt-2 text-center text-2xl">{message}</p>
    </>
  );
}

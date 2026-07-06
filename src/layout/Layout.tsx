import Header from "../components/Header";
import Footer from "../components/Footer";
import App from "../App";
import { useState } from "react";

// Layout wraps and unifies all the components, aswell as providing the search query and category state to the Header and App components.
export default function Layout() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState(
    "title" as "title" | "author" | "description",
  );
  return (
    <>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchCategory={searchCategory}
        setSearchCategory={setSearchCategory}
      />
      <main className="flex-1">
        <App searchQuery={searchQuery} searchCategory={searchCategory} />
      </main>
      <Footer />
    </>
  );
}

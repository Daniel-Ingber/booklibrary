import Header from "../components/Header";
import Footer from "../components/Footer";
import App from "../App";
import { useState } from "react";

export default function Layout() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="flex-1">
        <App searchQuery={searchQuery} />
      </main>
      <Footer />
    </>
  );
}

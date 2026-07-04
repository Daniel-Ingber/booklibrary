import { GrainFilter } from "../src/components/Filters";
export default function App() {
  return (
    <div className="from-cream via-cream-100 to-cream-300 relative min-h-screen w-full bg-linear-to-b p-4">
      <GrainFilter />
      <h1 className="text-h1 text-center">Welcome to the library</h1>
      <p className="text-meta text-center">This site is made for HackerU's React project requirements</p>
    </div>
  );
}

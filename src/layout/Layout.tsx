import Header from "../components/Header";
import Footer from "../components/Footer";
import { PropsWithChildren } from "react";
export default function Layout(props: PropsWithChildren) {
  const { children } = props;
  return (
    <div>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

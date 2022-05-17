import NestedNavbar from "./nested-navbar";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <>
      <NestedNavbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

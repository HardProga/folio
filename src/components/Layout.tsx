import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="pt-14">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

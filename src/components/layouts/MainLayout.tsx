import { Outlet } from "react-router-dom";
import TopBar from "../TopBar";
import Footer from "../Footer";

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
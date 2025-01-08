import { ReactNode } from "react";
import TopBar from "../TopBar";
import Footer from "../Footer";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};
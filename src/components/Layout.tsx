import { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
  noPaddingTop?: boolean;
}

const Layout = ({ children, noPaddingTop = false }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <Navbar />
      <main className={`flex-1 w-full ${noPaddingTop ? "" : "pt-20 sm:pt-24"}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;

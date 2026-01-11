import { Link, useLocation } from "react-router-dom";
import { Leaf } from "lucide-react";
import logo from "../assets/logo.jpeg";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 ">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logo}
              alt={"logo"}
              className="w-[15%] object-contain rounded-xl 
              "
            />
          </Link>

          <div className="flex items-center gap-8 bg-white/50 backdrop-blur-lg border-b border-border p-6 rounded-xl shadow-lg">
            <Link
              to="/"
              className={`lg:text-lg text-sm font-medium transition-colors  ${
                isActive("/") ? "text-primary" : "text-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`lg:text-lg text-sm font-medium transition-colors hover:text-primary ${
                isActive("/about") ? "text-primary" : "text-foreground"
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`lg:text-lg text-sm font-medium transition-colors hover:text-primary ${
                isActive("/contact") ? "text-primary " : "text-foreground"
              }`}
            >
              Contact
            </Link>
            <Link
              to="/articles"
              className={`lg:text-lg text-sm font-medium transition-colors hover:text-primary ${
                isActive("/articles") ? "text-primary " : "text-foreground"
              }`}
            >
              Articles
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

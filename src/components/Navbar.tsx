import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.jpeg";
import { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const isHome = location.pathname === "/";
  const isTransparent = isHome && !scrolled && !isMobileMenuOpen;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/gallery", label: "Gallery" },
    { path: "/about", label: "About" },
    { path: "/articles", label: "Articles" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-black/25 backdrop-blur-sm border-b border-white/10 py-2 sm:py-2.5"
          : "bg-white/95 backdrop-blur-md shadow-sm border-b border-green-100/60 py-2 sm:py-2.5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative bg-white/95 backdrop-blur-sm rounded-xl p-1 shadow-sm border border-black/5 flex items-center justify-center">
              <img
                src={logo}
                alt="Asquare Hydroponics"
                className="h-9 sm:h-11 md:h-12 w-auto object-contain rounded-lg"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive(link.path)
                    ? "text-white bg-gradient-to-r from-green-600 to-emerald-600 shadow-md"
                    : isTransparent
                    ? "text-white/90 hover:text-white hover:bg-white/15"
                    : "text-foreground hover:text-green-700 hover:bg-green-50/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl transition-all duration-300 ${
              isTransparent
                ? "bg-white/15 text-white border border-white/20 hover:bg-white/25"
                : "bg-white text-foreground border border-green-100 shadow-sm hover:bg-green-50"
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 bg-white/95 backdrop-blur-xl border border-green-100 rounded-2xl shadow-xl p-3 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? "text-white bg-gradient-to-r from-green-600 to-emerald-600"
                    : "text-foreground hover:text-green-600 hover:bg-green-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/", label: "THE ENGINE" },
    { to: "/services", label: "THE BLUEPRINTS" },
    { to: "/works", label: "PRODUCTION" },
    { to: "/about", label: "THE ARCHITECT" }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link 
          to="/" 
          className="font-mono text-lg font-bold tracking-widest text-lime hover:text-white transition-colors duration-300"
          data-cursor="CORE"
        >
          RISHIL SHAH
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-mono text-xs tracking-wider">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`hover:text-lime transition-colors duration-300 ${
                location.pathname === link.to ? "text-lime" : "text-muted-foreground"
              }`}
              data-cursor="GO"
            >
              {link.label}
            </Link>
          ))}
          
          {/* Active status button */}
          <Link to="/contact">
            <button 
              className="bg-lime text-black font-bold px-5 py-2.5 rounded-none border border-lime hover:bg-transparent hover:text-lime transition-all duration-300 text-[10px] tracking-widest"
              data-cursor="HIRE"
            >
              CAPACITY: AVAILABLE
            </button>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button 
          className="md:hidden text-foreground hover:text-lime transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Links overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-background border-b border-border py-8 flex flex-col items-center gap-6 font-mono text-sm tracking-widest">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={location.pathname === link.to ? "text-lime" : "text-muted-foreground"}
            >
              {link.label}
            </Link>
          ))}
          <Link 
            to="/contact" 
            onClick={() => setIsOpen(false)}
            className="w-4/5 text-center bg-lime text-black font-bold py-3 border border-lime"
          >
            CAPACITY: AVAILABLE
          </Link>
        </div>
      )}
    </nav>
  );
}

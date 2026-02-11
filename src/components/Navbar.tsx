// components/Navbar.tsx
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className=" z-50 bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-black" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-white font-semibold text-lg">Splitly</span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
            Product
          </Link>
          <button className="flex items-center gap-1 text-gray-300 hover:text-white text-sm font-medium transition-colors">
            Resources
            <ChevronDown className="w-4 h-4" />
          </button>
          <Link href="#" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
            Contact
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <Link href="#" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
            Login
          </Link>
          <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
            Try for free
          </button>
        </div>
      </div>
    </nav>
  );
}
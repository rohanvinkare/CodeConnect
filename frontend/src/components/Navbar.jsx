


import { Link, useLocation } from "react-router";
import { BookOpenIcon, LayoutDashboardIcon, SparklesIcon } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";

function Navbar() {
  const location = useLocation();
  const isActive = (p) => location.pathname === p;

  return (
    <nav className="backdrop-blur-xl bg-[#060A12]/70 border-b border-[#1A2433] shadow-[0_4px_20px_rgba(0,0,0,0.5)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link
          to="/"
          className="group flex items-center gap-3 hover:scale-[1.06] transition-all"
        >
          <div className="size-10 rounded-xl bg-[#0B1019] border border-[#1D2433] shadow-[0_0_12px_rgba(0,140,255,0.25)] flex items-center justify-center">
            <SparklesIcon className="size-6 text-blue-200" />
          </div>

          <div className="flex flex-col">
            <span className="font-black text-xl bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent tracking-wide">
              CodeConnect
            </span>
            <span className="text-xs text-neutral-500">Code Together</span>
          </div>
        </Link>

        {/* LINKS */}
        <div className="flex items-center gap-2">
          
          <Link
            to="/problems"
            className={`px-4 py-2.5 rounded-lg transition-all ${
              isActive("/problems")
                ? "bg-[#0D1320] border border-blue-400/40 text-blue-200 shadow-[0_0_10px_rgba(0,120,255,0.3)]"
                : "text-neutral-400 hover:text-white hover:bg-[#0C111A]"
            }`}
          >
            <div className="flex items-center gap-x-2.5">
              <BookOpenIcon className="size-4" />
              <span className="hidden sm:inline font-medium">Problems</span>
            </div>
          </Link>

          <Link
            to="/dashboard"
            className={`px-4 py-2.5 rounded-lg transition-all ${
              isActive("/dashboard")
                ? "bg-[#0D1320] border border-blue-400/40 text-blue-200 shadow-[0_0_10px_rgba(0,120,255,0.3)]"
                : "text-neutral-400 hover:text-white hover:bg-[#0C111A]"
            }`}
          >
            <div className="flex items-center gap-x-2.5">
              <LayoutDashboardIcon className="size-4" />
              <span className="hidden sm:inline font-medium">Dashboard</span>
            </div>
          </Link>

          <div className="ml-3">
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


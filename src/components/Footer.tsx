import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { BrainCog, Github, Twitter, Mail, Instagram } from "lucide-react";

function Footer() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <footer
      className={
        "w-full border-t relative z-30 " +
        (isHome
          ? "border-white/20 bg-black/20 backdrop-blur-sm"
          : "border-white/10 bg-gradient-to-t from-background/70 to-background/20 backdrop-blur-md supports-[backdrop-filter]:bg-background/50")
      }
    >
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Desktop: 3 column layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mb-6">
          {/* Left: Logo + Tagline */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 cursor-pointer">
              <BrainCog className="w-6 h-6 text-indigo-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 transition-all duration-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)">
                QuickMind
              </span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Sharpen your mind with QuickMind. Test your knowledge and
              challenge yourself with fun quizzes.
            </p>
          </div>

          {/* Middle: Quick Links */}
          <div className="space-y-3 flex flex-col items-center">
            <h3 className="text-white/90 font-semibold text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <div className="space-y-2">
              <NavLink
                to="/"
                className="block text-white/80 hover:text-white transition-colors text-sm"
              >
                Home
              </NavLink>
              <NavLink
                to="/history"
                className="block text-white/80 hover:text-white transition-colors text-sm"
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/leaderboard"
                className="block text-white/80 hover:text-white transition-colors text-sm"
              >
                Leaderboard
              </NavLink>
              <NavLink
                to="/about"
                className="block text-white/80 hover:text-white transition-colors text-sm"
              >
                About
              </NavLink>
            </div>
          </div>

          {/* Right: Connect */}
          <div className="space-y-3">
            <h3 className="text-white/90 text-center mr-[107px] font-semibold text-sm uppercase tracking-wider">
              Connect
            </h3>
            <div className="flex gap-3 justify-center">
              <a
                href="#"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-200"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-200"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Mobile: Single column layout (stacked) */}
        <div className="md:hidden space-y-6 mb-6">
          {/* Logo + Tagline */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2">
              <BrainCog className="w-6 h-6 text-indigo-400" />
              <span className="text-xl font-bold text-white/90">QuickMind</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed max-w-sm mx-auto">
              Sharpen your mind with QuickMind. Test your knowledge and
              challenge yourself with fun quizzes.
            </p>
          </div>

          {/* Links - Stacked */}
          <div className="space-y-3">
            <h3 className="text-white/90 font-semibold text-sm uppercase tracking-wider text-center">
              Quick Links
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <NavLink
                to="/"
                className="text-white/80 hover:text-white transition-colors text-sm"
              >
                Home
              </NavLink>
              <NavLink
                to="/history"
                className="text-white/80 hover:text-white transition-colors text-sm"
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/leaderboard"
                className="text-white/80 hover:text-white transition-colors text-sm"
              >
                Leaderboard
              </NavLink>
              <NavLink
                to="/about"
                className="text-white/80 hover:text-white transition-colors text-sm"
              >
                About
              </NavLink>
            </div>
          </div>

          {/* Social Icons - Small size */}
          <div className="space-y-3">
            <h3 className="text-white/90 font-semibold text-sm uppercase tracking-wider text-center">
              Connect
            </h3>
            <div className="flex justify-center gap-2">
              <a
                href="#"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-200"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-200"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-white/80 text-xs sm:text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
            © {new Date().getFullYear()} QuickMind. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

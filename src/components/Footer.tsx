import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <footer
      className={
        "w-full border-t shadow-inner " +
        (isHome
          ? "border-white/10 bg-gradient-to-t from-black/30 to-black/10 backdrop-blur-lg supports-[backdrop-filter]:bg-black/20"
          : "border-white/10 bg-gradient-to-t from-background/70 to-background/10 backdrop-blur-md supports-[backdrop-filter]:bg-background/40")
      }
    >
      <div className="max-w-6xl mx-auto p-3 sm:p-4 text-center text-xs sm:text-sm text-muted-foreground">
        © {new Date().getFullYear()} QuickMind. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

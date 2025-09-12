import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button 
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="ml-1 p-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md text-white font-semibold hover:bg-white/20 hover:border-white/30 transition-all duration-200"
    >
      {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
    </button>
  );
}

export default ModeToggle;

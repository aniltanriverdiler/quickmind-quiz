import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button 
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="ml-1 p-2 border border-border rounded-xl bg-muted text-foreground hover:bg-muted/80 transition-all duration-200"
    >
      {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
    </button>
  );
}

export default ModeToggle;

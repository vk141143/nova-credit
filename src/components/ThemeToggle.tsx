import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-muted-foreground transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 text-muted-foreground transition-transform duration-300 hover:-rotate-12" />
      )}
    </Button>
  );
}

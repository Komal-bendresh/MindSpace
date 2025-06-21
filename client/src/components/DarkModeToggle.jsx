import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const enabled = storedTheme === "dark" || (!storedTheme && prefersDark);
    setIsDark(enabled);
    document.documentElement.classList.toggle("dark", enabled);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", !isDark);
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-zinc-800 hover:scale-105 transition-all"
    >
      {isDark ? <Sun className="text-yellow-400 w-5 h-5" /> : <Moon className="text-gray-800 w-5 h-5" />}
    </button>
  );
};

export default DarkModeToggle;

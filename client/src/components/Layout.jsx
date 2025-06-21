import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const enabled = storedTheme === "dark" || (!storedTheme && prefersDark);

    setIsDark(enabled);
    document.documentElement.classList.toggle("dark", enabled);
  }, []);

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="pt-16 min-h-screen flex flex-col justify-between bg-white dark:bg-zinc-950 text-black dark:text-white">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

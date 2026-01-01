import { cn } from "lib/utils";
import { useEffect, useState } from "react";

const themes = ["light", "dark", "system"] as const;
type THEMES = (typeof themes)[number];

export default () => {
  const [active, setActive] = useState<THEMES>(
    globalThis.localStorage?.getItem("theme") as THEMES,
  );
  useEffect(() => {
    switch (active) {
      case "light":
      case "dark":
        localStorage.setItem("theme", active);
        break;
      case "system":
        localStorage.removeItem("theme");
        break;
    }
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches),
    );
  }, [active]);

  return (
    <ul className="absolute end-0 z-30 flex gap-1 p-1">
      {themes.map((theme) => (
        <li key={theme} className="last-of-type:ms-1">
          <button
            className={cn(
              "rounded-xs p-1",
              active === theme
                ? "bg-accent text-accent-foreground"
                : "bg-secondary text-secondary-foreground",
            )}
            data-theme={theme}
            onClick={() => {
              setActive(theme);
            }}
          >
            {theme}
          </button>
        </li>
      ))}
    </ul>
  );
};

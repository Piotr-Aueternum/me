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
    <>
      <button
        id="popover-toggler"
        className="bg-accent absolute end-0 m-2 rounded-sm p-1.5"
        commandfor="theme-popover"
        command="toggle-popover"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            fill="none"
            d="M12 2v2m2.837 12.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715M16 12a4 4 0 0 0-4-4m7-3l-1.256 1.256M20 12h2"
          />
        </svg>
      </button>
      <div
        popover=""
        anchor="popover-toggler"
        id="theme-popover"
        className="bg-popover text-popover-foreground start-auto end-6 top-13"
      >
        <ul className="flex flex-wrap gap-1 p-1">
          {themes.map((theme) => (
            <li
              key={theme}
              className="flex-1 last-of-type:mt-1 last-of-type:flex-1/2"
            >
              <button
                className={cn(
                  "w-full rounded-xs p-1",
                  active === theme
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-secondary-foreground",
                )}
                commandfor="theme-popover"
                command="hide-popover"
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
      </div>
    </>
  );
};

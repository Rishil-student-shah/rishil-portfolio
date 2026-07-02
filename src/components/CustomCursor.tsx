import { useEffect, useState, useRef } from "react";

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [hasHoverSupport, setHasHoverSupport] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover)");
    setHasHoverSupport(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setHasHoverSupport(e.matches);
    mediaQuery.addEventListener("change", handler);

    const onMouseMove = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      cursorRef.current.style.left = `${e.clientX}px`;
      cursorRef.current.style.top = `${e.clientY}px`;
    };

    const onMouseOver = (e: MouseEvent) => {
      const targetElement = e.target as HTMLElement;
      if (targetElement && typeof targetElement.closest === "function") {
        const target = targetElement.closest("[data-cursor]");
        if (target) {
          setIsHovered(true);
          setCursorText(target.getAttribute("data-cursor") || "");
          return;
        }
      }
      setIsHovered(false);
      setCursorText("");
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);

    return () => {
      mediaQuery.removeEventListener("change", handler);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  if (!hasHoverSupport) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor fixed top-0 left-0 pointer-events-none hidden md:flex items-center justify-center text-center select-none ${
        isHovered ? "hovered" : ""
      }`}
    >
      {isHovered && <span className="text-[9px] text-lime uppercase tracking-wider font-mono">{cursorText}</span>}
    </div>
  );
};

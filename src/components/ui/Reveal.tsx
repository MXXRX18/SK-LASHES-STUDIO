"use client";
import { useEffect, useRef } from "react";
export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const focused = element.contains(document.activeElement);
        if (media.matches || focused || entry.isIntersecting) element.classList.add("is-visible");
        else if (entry.intersectionRatio === 0) element.classList.remove("is-visible");
      });
    }, { threshold: [0, 0.06], rootMargin: "0px" });
    element.classList.add("reveal-ready");
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) element.classList.add("is-visible");
    observer.observe(element);
    const revealFocus = () => element.classList.add("is-visible");
    const motionChange = () => { if (media.matches) element.classList.add("is-visible"); };
    element.addEventListener("focusin", revealFocus);
    media.addEventListener("change", motionChange);
    return () => { observer.disconnect(); element.removeEventListener("focusin", revealFocus); media.removeEventListener("change", motionChange); };
  }, []);
  return <div ref={ref} className={"reveal " + className}>{children}</div>;
}

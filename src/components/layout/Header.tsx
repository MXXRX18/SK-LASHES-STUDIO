"use client";
import { useEffect, useRef, useState } from "react";
import { Brand } from "./Brand";
import { BookingLink } from "../ui/BookingLink";
const links = [["Inicio", "#inicio"], ["Servicios", "#servicios"], ["Galería", "#galeria"], ["Agenda", "#agenda"], ["Ubicación", "#ubicacion"]];
export function Header() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); button.current?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  return <header className="header">
    <Brand />
    <nav id="primary-nav" className={"nav " + (open ? "nav-open" : "")} aria-label="Principal">
      {links.map(([text, href]) => <a href={href} key={href} onClick={() => setOpen(false)}>{text}</a>)}
    </nav>
    <div className="header-actions">
      <BookingLink className="button-small" />
      <button ref={button} className={"menu-toggle " + (open ? "open" : "")} type="button" aria-expanded={open} aria-controls="primary-nav" onClick={() => {
        setOpen(!open);
        if (!open) requestAnimationFrame(() => document.querySelector<HTMLAnchorElement>("#primary-nav a")?.focus());
      }}>
        <span /><span /><span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
      </button>
    </div>
  </header>;
}

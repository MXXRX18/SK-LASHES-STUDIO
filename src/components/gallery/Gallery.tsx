"use client";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { gallery } from "@/data/gallery";
import { Photo } from "../ui/Photo";
import { Arrow } from "../ui/Arrow";

// Adaptación del carrusel suministrado: misma posición circular, escala, blur y opacidad.
export function Gallery() {
  const [active, setActive] = useState(0);
  const [wrapped, setWrapped] = useState<number | null>(null);
  const activeRef = useRef(0);
  const locked = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const frames = useRef<number[]>([]);
  const touch = useRef({ x: 0, y: 0 });
  const lastSwipe = useRef(-Infinity);
  const total = gallery.length;
  const relative = (i: number, current: number) => {
    let position = (i - current + total) % total;
    if (position > Math.floor(total / 2)) position -= total;
    return position;
  };
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); frames.current.forEach(cancelAnimationFrame); }, []);
  function change(direction: number) {
    if (locked.current) return;
    const old = activeRef.current;
    const next = (old + direction + total) % total;
    const wrapIndex = gallery.findIndex((_, i) => Math.abs(relative(i, old) - relative(i, next)) > 1);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    locked.current = true;
    // Only the outermost slide wraps. Hide its reposition for two frames, not 820 ms.
    setWrapped(wrapIndex);
    activeRef.current = next;
    setActive(next);
    frames.current = [requestAnimationFrame(() => {
      frames.current.push(requestAnimationFrame(() => setWrapped(null)));
    })];
    timer.current = setTimeout(() => { locked.current = false; }, reduced ? 0 : 820);
  }
  return <div className="gallery-component">
    <div className="carrusel-h lista" aria-label="Galería de inspiración: usa las flechas para cambiar de imagen" aria-roledescription="carrusel" role="region" tabIndex={0}
      onKeyDown={e => { if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); change(e.key === "ArrowRight" ? 1 : -1); } }}
      onTouchStart={e => { touch.current = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY }; }}
      onTouchEnd={e => {
        const dx = touch.current.x - e.changedTouches[0].clientX;
        const dy = touch.current.y - e.changedTouches[0].clientY;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) { lastSwipe.current = e.timeStamp; change(dx > 0 ? 1 : -1); }
      }}>
      {gallery.map((photo, i) => {
        const position = relative(i, active);
        const distance = Math.abs(position);
        const style = {
          "--x": position * 65 + "%", "--escala": distance === 0 ? 1 : distance === 1 ? .85 : .70,
          "--opacidad": distance === 0 ? 1 : distance === 1 ? .65 : .18,
          "--desenfoque": (distance === 0 ? 0 : distance === 1 ? 3 : 8) + "px",
          "--profundidad": total - distance,
        } as CSSProperties;
        return <div key={photo.src} style={style} className={"carrusel-h__foto " + (distance > 1 ? "is-outer " : "") + (wrapped === i ? "salto" : "")}
          role="group" aria-roledescription="diapositiva" aria-label={(i + 1) + " de " + total + ": " + photo.title}
          aria-hidden={distance !== 0} aria-current={distance === 0 ? "true" : undefined}
          onClick={e => { if (e.timeStamp - lastSwipe.current > 500 && distance === 1) change(position); }}>
          <Photo src={photo.src} alt={photo.alt} width={1600} height={900} />
        </div>;
      })}
    </div>
    <div className="gallery-bar">
      <div className="gallery-caption" aria-live="polite" aria-atomic="true">
        <span className="eyebrow">{gallery[active].tag}</span><p>{gallery[active].title}</p>
      </div>
      <div className="carrusel-h__controles">
        <span className="gallery-count"><span>{String(active + 1).padStart(2, "0")}</span> / {String(total).padStart(2, "0")}</span>
        <button className="carrusel-h__flecha anterior" type="button" aria-label="Fotografía anterior" onClick={() => change(-1)}><Arrow /></button>
        <button className="carrusel-h__flecha siguiente" type="button" aria-label="Fotografía siguiente" onClick={() => change(1)}><Arrow /></button>
      </div>
    </div>
    <p className="gallery-note">Imágenes editoriales de inspiración · No son resultados de clientas.</p>
  </div>;
}

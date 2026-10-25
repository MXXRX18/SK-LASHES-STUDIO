"use client";
import { useEffect, useRef, useState } from "react";
export function Photo({ src, alt, priority = false, className = "", width = 1536, height = 1024 }: {
  src: string; alt: string; priority?: boolean; className?: string; width?: number; height?: number;
}) {
  const ref = useRef<HTMLImageElement>(null);
  const [status, setStatus] = useState<"loading" | "loaded" | "fallback" | "error">("loading");
  useEffect(() => {
    const image = ref.current;
    const timer = window.setTimeout(() => setStatus(value => value === "loading" ? "fallback" : value), 1800);
    if (image?.complete) {
      queueMicrotask(() => setStatus(image.naturalWidth ? "loaded" : "error"));
    }
    return () => window.clearTimeout(timer);
  }, [src]);
  return <span className={"photo " + className} data-state={status}>
    {status !== "error" && <img ref={ref} src={src.startsWith("/") ? `/SK-LASHES-STUDIO${src}` : src} alt={alt} width={width} height={height}
      loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async"
      onLoad={() => setStatus("loaded")} onError={() => setStatus("error")} />}
    {status === "error" && <span className="photo-fallback" role="img" aria-label={alt + ". Imagen no disponible."}>SK<span>LASHES STUDIO</span></span>}
  </span>;
}

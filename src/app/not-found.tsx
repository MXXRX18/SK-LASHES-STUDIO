import { Brand } from "@/components/layout/Brand";
import Link from "next/link";
export default function NotFound() {
  return <main id="contenido" className="not-found"><Brand /><span className="eyebrow">404 / PÁGINA NO ENCONTRADA</span><h1>Volvamos<br /><em>al estudio.</em></h1><Link className="button" href="/">Ir al inicio <span aria-hidden="true">↗</span></Link></main>;
}

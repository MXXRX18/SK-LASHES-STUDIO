import { site } from "@/config/site";
import { Brand } from "./Brand";
import { Arrow } from "../ui/Arrow";
export function Footer() {
  return <footer className="footer">
    <Brand />
    <p>El detalle está en tu mirada.</p>
    <a href={"https://wa.me/" + site.phone} target="_blank" rel="noopener noreferrer" className="footer-contact">
      {site.displayPhone}<Arrow diagonal /><span className="sr-only"> WhatsApp, abre otra pestaña</span>
    </a>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} SK Lashes Studio</span><span>Con cita previa · Hecho para tu mirada</span></div>
  </footer>;
}

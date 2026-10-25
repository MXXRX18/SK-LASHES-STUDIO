import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/motion.css";
export const metadata: Metadata = {
  title: { default: "SK Lashes Studio — El detalle está en tu mirada", template: "%s | SK Lashes Studio" },
  description: "Diseño de pestañas con atención personalizada. Descubre nuestros servicios y solicita tu cita por WhatsApp en SK Lashes Studio.",
  openGraph: { title: "SK Lashes Studio", description: "El detalle está en tu mirada. Diseño de pestañas con atención personalizada.", locale: "es_MX", type: "website" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><head><meta name="theme-color" content="#100d10" /></head><body>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>{children}
  </body></html>;
}

import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "@/components/layout/Brand";
import { Photo } from "@/components/ui/Photo";
import { Arrow } from "@/components/ui/Arrow";
import { BookingForm } from "@/components/booking/BookingForm";
import { site } from "@/config/site";
export const metadata: Metadata = { title: "Agenda una cita", description: "Elige de uno a cinco servicios y tu día de preferencia. Solicita tu cita por WhatsApp; el estudio confirma disponibilidad." };
export default function BookingPage() {
  return <main className="agenda-page" id="contenido">
    <aside className="agenda-visual">
      <Photo src="/images/gallery/gallery-4.webp" alt="Retrato editorial con ojos cerrados y pestañas delicadas" priority width={1672} height={941} />
      <div className="agenda-visual-shade" />
      <div className="agenda-brand"><Brand /></div>
      <div className="agenda-quote"><span className="eyebrow">SK LASHES STUDIO</span><p>Un momento<br /><em>para ti.</em></p><span>El detalle está en tu mirada.</span></div>
    </aside>
    <div className="agenda-content">
      <Link href="/" prefetch={false} className="agenda-back"><Arrow /> Volver al estudio</Link>
      <div className="agenda-heading"><span className="eyebrow">CON CITA PREVIA</span><h1>Agenda <em>tu cita.</em></h1><p>Cuéntanos qué tienes en mente.<br />Nosotras nos encargamos de los detalles.</p></div>
      <BookingForm />
      <div className="agenda-footer"><span>SK LASHES STUDIO</span><span>{site.displayPhone}</span></div>
    </div>
  </main>;
}

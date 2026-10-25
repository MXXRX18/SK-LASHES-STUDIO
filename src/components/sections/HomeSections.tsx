import { services, serviceGroups, priceLabel } from "@/data/services";
import { site } from "@/config/site";
import { BookingLink } from "../ui/BookingLink";
import { Reveal } from "../ui/Reveal";
import { Photo } from "../ui/Photo";
import { Arrow } from "../ui/Arrow";
import { Gallery } from "../gallery/Gallery";

export function Hero() {
  return <section id="inicio" className="hero" aria-labelledby="hero-title">
    <div className="hero-image"><Photo src="/images/hero/editorial.webp" alt="Retrato editorial de una mirada con pestañas definidas, iluminada sobre un fondo oscuro" priority /></div>
    <div className="hero-shade" />
    <div className="hero-content">
      <p className="eyebrow hero-label"><span /> SK LASHES STUDIO</p>
      <h1 id="hero-title">El detalle está<br />en tu <em>mirada.</em></h1>
      <p className="hero-description">Diseño de pestañas con<br />atención personalizada.</p>
      <div className="hero-actions"><BookingLink /><a href="#servicios" className="text-link">Ver servicios <Arrow /></a></div>
    </div>
    <div className="hero-bottom"><span>UNA EXPRESIÓN MUY TUYA.</span><a href="#servicios">DESCUBRE EL ESTUDIO <span aria-hidden="true">↓</span></a></div>
  </section>;
}
export function Services() {
  return <section id="servicios" className="services-section section-pad" aria-labelledby="services-title">
    <div className="section-kicker"><span className="eyebrow">01 / SERVICIOS</span><span className="eyebrow muted">EL ARTE DEL DETALLE</span></div>
    <div className="services-layout">
      <Reveal className="services-intro">
        <h2 id="services-title">Tu mirada.<br /><em>A tu manera.</em></h2>
        <p>Encuentra el diseño que va contigo.</p>
        <div className="service-portrait"><Photo src="/images/gallery/gallery-4.webp" alt="Retrato editorial de inspiración con pestañas delicadas" width={1600} height={900} /><span className="image-caption">SK / INSPIRACIÓN</span></div>
        <p className="service-footnote">Trabajamos con cita previa.</p>
      </Reveal>
      <div className="service-catalogue">
        {serviceGroups.map(group => <Reveal key={group.id} className="service-group">
          <h3><span>{group.title}</span><span className="group-number">{group.number}</span></h3>
          <ul>{services.filter(s => s.group === group.id).map(s => <li className="service-row" key={s.id}>
            <div><span className="service-name">{s.name}</span>{s.price === null && <small>Según el porcentaje que haga falta.</small>}</div>
            <span className={"service-price " + (s.price === null ? "variable-price" : "")}>{priceLabel(s)}</span>
          </li>)}</ul>
        </Reveal>)}
        <div className="payment-note"><span>MEDIOS DE PAGO</span><p>Efectivo, depósito y transferencia.</p></div>
      </div>
    </div>
  </section>;
}
export function GallerySection() {
  return <section id="galeria" className="gallery-section" aria-labelledby="gallery-title">
    <Reveal className="gallery-heading section-pad-x">
      <span className="eyebrow">02 / INSPIRACIÓN</span>
      <div><h2 id="gallery-title">Todo está en<br /><em>los detalles.</em></h2><p>Una mirada más de cerca.</p></div>
    </Reveal>
    <Reveal><Gallery /></Reveal>
  </section>;
}
export function BookingSection() {
  return <section id="agenda" className="booking-section section-pad" aria-labelledby="booking-title">
    <Reveal className="booking-invitation">
      <span className="eyebrow">03 / UN MOMENTO PARA TI</span>
      <h2 id="booking-title">Tu próxima<br /><em>mirada empieza aquí.</em></h2>
      <p>Elige tu diseño. Nosotras cuidamos el detalle.</p>
      <BookingLink>Agenda una cita</BookingLink>
      <small>Solicitud por WhatsApp · Confirmación personalizada</small>
    </Reveal>
    <span className="booking-mark" aria-hidden="true">SK</span>
  </section>;
}
export function LocationSection() {
  return <section id="ubicacion" className="location-section section-pad" aria-labelledby="location-title">
    <Reveal className="location-heading">
      <div><span className="eyebrow">04 / EL ESTUDIO</span><h2 id="location-title">Encuéntranos.</h2></div>
      <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-link">Cómo llegar <Arrow diagonal /><span className="sr-only"> (Google Maps, abre otra pestaña)</span></a>
    </Reveal>
    <Reveal className="map-wrap">
      {site.mapsEmbedUrl ? <iframe src={site.mapsEmbedUrl} title="Ubicación compartida de SK Lashes Studio en Google Maps" width="1200" height="450" loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> :
        <div className="map-fallback"><p>Visítanos con cita previa.</p><a className="button" href={site.mapsUrl} target="_blank" rel="noopener noreferrer">Ver ubicación en Google Maps <Arrow diagonal /></a></div>}
    </Reveal>
    <div className="location-meta"><span>TE ESPERAMOS CON CITA PREVIA</span><a href={"https://wa.me/" + site.phone} target="_blank" rel="noopener noreferrer">{site.displayPhone}<span className="sr-only"> WhatsApp, abre otra pestaña</span></a></div>
  </section>;
}

"use client";
import { useEffect, useRef, useState } from "react";
import { services, fullServiceName, priceLabel } from "@/data/services";
import { site } from "@/config/site";
import { Booking, BookingErrors, buildWhatsAppUrl, localDateValue, validateBooking, validPhone } from "@/lib/whatsapp";
import { Arrow } from "../ui/Arrow";

export function BookingForm() {
  const [data, setData] = useState<Booking>({ firstName: "", lastName: "", selected: [], date: "" });
  const [errors, setErrors] = useState<BookingErrors>({});
  const [today, setToday] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const phoneReady = validPhone(site.phone);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setToday(localDateValue()));
    return () => cancelAnimationFrame(frame);
  }, []);
  function setField(key: "firstName" | "lastName" | "date", value: string) {
    setData(previous => ({ ...previous, [key]: value }));
    setErrors(previous => ({ ...previous, [key]: undefined }));
  }
  function toggleService(id: string) {
    setData(previous => ({
      ...previous,
      selected: previous.selected.includes(id) ? previous.selected.filter(s => s !== id) :
        previous.selected.length < 5 ? [...previous.selected, id] : previous.selected,
    }));
    setErrors(previous => ({ ...previous, selected: undefined }));
  }
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validateBooking(data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const firstKey = Object.keys(nextErrors)[0];
      const selector = firstKey === "selected" ? 'input[name="services"]' : '[name="' + firstKey + '"]';
      form.current?.querySelector<HTMLElement>(selector)?.focus();
      return;
    }
    // Explicit user action only. WhatsApp prepares the message; the user still sends it.
    window.location.assign(buildWhatsAppUrl(data));
  }
  return <form ref={form} className="booking-form" noValidate onSubmit={submit}>
    <div className="form-section">
      <p className="form-label">01 / TUS DATOS</p>
      <div className="name-fields">
        <div className="field">
          <label htmlFor="firstName">Primer nombre</label>
          <input id="firstName" name="firstName" autoComplete="given-name" placeholder="Tu nombre" required maxLength={80}
            value={data.firstName} onChange={e => setField("firstName", e.target.value)} aria-invalid={!!errors.firstName} aria-describedby={errors.firstName ? "firstName-error" : undefined} />
          {errors.firstName && <span id="firstName-error" className="field-error" role="alert">{errors.firstName}</span>}
        </div>
        <div className="field">
          <label htmlFor="lastName">Primer apellido</label>
          <input id="lastName" name="lastName" autoComplete="family-name" placeholder="Tu apellido" required maxLength={80}
            value={data.lastName} onChange={e => setField("lastName", e.target.value)} aria-invalid={!!errors.lastName} aria-describedby={errors.lastName ? "lastName-error" : undefined} />
          {errors.lastName && <span id="lastName-error" className="field-error" role="alert">{errors.lastName}</span>}
        </div>
      </div>
    </div>
    <fieldset className="form-section service-fieldset" aria-describedby={"service-help" + (errors.selected ? " service-error" : "")}>
      <legend className="form-label">02 / TU DISEÑO</legend>
      <div className="service-select-heading"><p id="service-help">Elige de 1 a 5 servicios.</p><span aria-live="polite" className="selection-count">{data.selected.length} de 5 seleccionados</span></div>
      <div className="service-options">
        {services.map(service => {
          const checked = data.selected.includes(service.id);
          return <label key={service.id} className={"service-option " + (checked ? "selected" : "")}>
            <input type="checkbox" name="services" value={service.id} checked={checked}
              disabled={!checked && data.selected.length >= 5} onChange={() => toggleService(service.id)} />
            <span className="checkbox-visual" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="m3 8 3 3 7-7" /></svg></span>
            <span className="option-name">{fullServiceName(service)}</span><span className="option-price">{priceLabel(service)}</span>
          </label>;
        })}
      </div>
      <p className="retouch-note">Retoque: precio según el porcentaje que haga falta.</p>
      {data.selected.length === 5 && <p className="selection-help">Para elegir otro servicio, desmarca uno de los seleccionados.</p>}
      {errors.selected && <span id="service-error" className="field-error" role="alert">{errors.selected}</span>}
    </fieldset>
    <div className="form-section field">
      <label className="form-label" htmlFor="date">03 / DÍA DE PREFERENCIA</label>
      <input type="date" id="date" name="date" required min={today} value={data.date}
        onFocus={() => setToday(localDateValue())} onChange={e => setField("date", e.target.value)}
        aria-invalid={!!errors.date} aria-describedby={"date-help" + (errors.date ? " date-error" : "")} />
      <p id="date-help" className="field-help">Confirmaremos contigo la disponibilidad y el horario.</p>
      {errors.date && <span id="date-error" className="field-error" role="alert">{errors.date}</span>}
    </div>
    <div className="form-submit">
      <p>Tu solicitud está sujeta a disponibilidad.<br />Confirmaremos tu cita por WhatsApp.</p>
      <button type="submit" className="button" disabled={!phoneReady}>Continuar en WhatsApp <Arrow diagonal /></button>
      {!phoneReady && <p role="status" className="field-error">El contacto está pendiente de configuración.</p>}
      {errors.phone && <p role="alert" className="field-error">{errors.phone}</p>}
      <small>Se abrirá un mensaje con tus datos. Tú decides cuándo enviarlo.</small>
    </div>
  </form>;
}

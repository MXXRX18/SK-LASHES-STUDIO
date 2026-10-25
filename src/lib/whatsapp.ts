import { services, fullServiceName, priceLabel } from "../data/services";
import { site } from "../config/site";

export type Booking = { firstName: string; lastName: string; selected: string[]; date: string };
export type BookingErrors = Partial<Record<keyof Booking | "phone", string>>;
export const cleanName = (s: string) => s.trim().replace(/\s+/g, " ");
export function localDateValue(date = new Date()): string {
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
}
export function parseLocalDate(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day, 12);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
  return date;
}
export const validPhone = (phone: string) => /^[1-9]\d{7,14}$/.test(phone);
export function validateBooking(data: Booking, now = new Date(), phone = site.phone): BookingErrors {
  const errors: BookingErrors = {};
  if (!cleanName(data.firstName) || cleanName(data.firstName).length > 80) errors.firstName = "Escribe tu primer nombre (máximo 80 caracteres).";
  if (!cleanName(data.lastName) || cleanName(data.lastName).length > 80) errors.lastName = "Escribe tu primer apellido (máximo 80 caracteres).";
  if (data.selected.length < 1 || data.selected.length > 5 || new Set(data.selected).size !== data.selected.length ||
    data.selected.some(id => !services.some(service => service.id === id))) {
    errors.selected = "Elige entre 1 y 5 servicios diferentes.";
  }
  if (!parseLocalDate(data.date) || data.date < localDateValue(now)) errors.date = "Elige hoy o una fecha posterior.";
  if (!validPhone(phone)) errors.phone = "El contacto está temporalmente pendiente de configuración.";
  return errors;
}
export function buildWhatsAppMessage(data: Booking): string {
  const date = parseLocalDate(data.date);
  if (!date) throw new Error("Fecha inválida");
  const selected = data.selected.map(id => services.find(service => service.id === id));
  if (selected.some(service => !service)) throw new Error("Servicio inválido");
  const serviceLines = selected.map(service => {
    if (!service) return "";
    const price = service.price === null ? "precio por confirmar según el porcentaje que haga falta" : priceLabel(service);
    return "- " + fullServiceName(service) + " — " + price;
  });
  return [
    "Hola, SK Lashes Studio. Me gustaría solicitar una cita.", "",
    "Nombre: " + cleanName(data.firstName) + " " + cleanName(data.lastName),
    "Servicios solicitados:", ...serviceLines,
    "Día de preferencia: " + new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "long", year: "numeric" }).format(date), "",
    "Quedo pendiente de que me confirmen disponibilidad y horario. Entiendo que mi cita aún no está confirmada.",
  ].join("\n");
}
export function buildWhatsAppUrl(data: Booking, now = new Date(), phone = site.phone): string {
  if (Object.keys(validateBooking(data, now, phone)).length) throw new Error("Solicitud inválida");
  return "https://wa.me/" + phone + "?text=" + encodeURIComponent(buildWhatsAppMessage(data));
}

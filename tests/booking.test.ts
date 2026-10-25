import { test } from "node:test";
import assert from "node:assert/strict";
import { services } from "../src/data/services";
import { Booking, buildWhatsAppUrl, buildWhatsAppMessage, parseLocalDate, localDateValue, validateBooking } from "../src/lib/whatsapp";
const now = new Date(2026, 9, 24, 13);
const valid: Booking = { firstName: "  María  José ", lastName: "O'Neill-Peña", selected: ["clasicas"], date: "2026-10-26" };
test("permite uno y cinco servicios, rechaza cero, seis, duplicados e IDs ajenos", () => {
  assert.deepEqual(validateBooking(valid, now), {});
  assert.deepEqual(validateBooking({ ...valid, selected: services.slice(0, 5).map(s => s.id) }, now), {});
  for (const selected of [[], services.slice(0, 6).map(s => s.id), ["clasicas", "clasicas"], ["inexistente"]]) {
    assert.ok(validateBooking({ ...valid, selected }, now).selected);
  }
});
test("rechaza campos vacíos y conserva nombres válidos con acentos y apóstrofos", () => {
  assert.ok(validateBooking({ ...valid, firstName: "  " }, now).firstName);
  assert.ok(validateBooking({ ...valid, lastName: "" }, now).lastName);
  assert.match(buildWhatsAppMessage(valid), /Nombre: María José O'Neill-Peña/);
});
test("valida día real, permite hoy y rechaza ayer o fechas imposibles", () => {
  assert.ok(validateBooking({ ...valid, date: "2026-10-23" }, now).date);
  assert.equal(validateBooking({ ...valid, date: "2026-10-24" }, now).date, undefined);
  for (const date of ["2026-02-30", "2026-13-01", "", "malformed"]) {
    assert.ok(validateBooking({ ...valid, date }, now).date);
    assert.equal(parseLocalDate(date), null);
  }
  assert.equal(parseLocalDate("2028-02-29")?.getDate(), 29);
});
test("formatea la fecha local elegida sin desplazarla por UTC", () => {
  assert.equal(localDateValue(new Date(2026, 9, 24, 23, 59)), "2026-10-24");
  assert.match(buildWhatsAppMessage(valid), /26 de octubre de 2026/);
});
test("WhatsApp recibe el número, caracteres, saltos y todos los servicios exactos", () => {
  const url = new URL(buildWhatsAppUrl({ ...valid, selected: ["5d", "retoque", "color"] }, now));
  assert.equal(url.origin + url.pathname, "https://wa.me/529993403892");
  const message = url.searchParams.get("text")!;
  assert.match(message, /Tecnológicas — 5D — \$670/);
  assert.match(message, /Extra color — \$90/);
  assert.match(message, /Retoque — precio por confirmar según el porcentaje/);
  assert.match(message, /\n\nNombre:/);
  assert.match(message, /mi cita aún no está confirmada/);
  assert.doesNotMatch(message, /Retoque — \$0|Total:/);
});
test("no construye destinatarios inválidos ni solicitudes incompletas", () => {
  for (const phone of ["", "ABC", "+52 999 340 3892"]) {
    assert.ok(validateBooking(valid, now, phone).phone);
    assert.throws(() => buildWhatsAppUrl(valid, now, phone));
  }
  assert.throws(() => buildWhatsAppUrl({ ...valid, selected: [] }, now));
});

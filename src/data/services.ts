export type Service = { id: string; name: string; price: number | null; group: "esencia" | "tecnologicas" | "detalles" };
export const services: Service[] = [
  { id: "clasicas", name: "Clásicas", price: 500, group: "esencia" },
  { id: "rimel", name: "Efecto rímel", price: 580, group: "esencia" },
  { id: "hawaianas", name: "Hawaianas 2D", price: 600, group: "esencia" },
  { id: "brasilenas", name: "Brasileñas 3D", price: 600, group: "esencia" },
  { id: "egipcias", name: "Egipcias 4D", price: 650, group: "esencia" },
  { id: "5d", name: "5D", price: 670, group: "tecnologicas" },
  { id: "kim-k", name: "Kim K", price: 700, group: "tecnologicas" },
  { id: "wispy", name: "Wispy", price: 720, group: "tecnologicas" },
  { id: "foxi", name: "Foxi", price: 750, group: "tecnologicas" },
  { id: "color", name: "Extra color", price: 90, group: "detalles" },
  { id: "eyeliner", name: "Eyeliner", price: 720, group: "detalles" },
  { id: "retiro", name: "Retiro", price: 200, group: "detalles" },
  { id: "retoque", name: "Retoque", price: null, group: "detalles" },
];
export const serviceGroups = [
  { id: "esencia", title: "Esencia", number: "01" },
  { id: "tecnologicas", title: "Tecnológicas", number: "02" },
  { id: "detalles", title: "Detalles & cuidado", number: "03" },
] as const;
export const priceLabel = (s: Service) => s.price === null ? "Por confirmar" : "$" + s.price;
export const fullServiceName = (s: Service) => s.group === "tecnologicas" ? "Tecnológicas — " + s.name : s.name;

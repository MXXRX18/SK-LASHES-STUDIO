import { site } from "@/config/site";
import { Arrow } from "./Arrow";
export function BookingLink({ children = "Agendar cita", className = "" }: { children?: React.ReactNode; className?: string }) {
  return <a className={"button " + className} href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
    {children}<Arrow diagonal /><span className="sr-only"> (abre en una nueva pestaña)</span>
  </a>;
}

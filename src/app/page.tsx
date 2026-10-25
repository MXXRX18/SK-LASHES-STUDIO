import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero, Services, GallerySection, BookingSection, LocationSection } from "@/components/sections/HomeSections";
export default function Home() {
  return <><Header /><main id="contenido"><Hero /><Services /><GallerySection /><BookingSection /><LocationSection /></main><Footer /></>;
}

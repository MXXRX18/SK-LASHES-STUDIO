import Link from "next/link";
export function Brand() {
  return <Link href="/" prefetch={false} className="brand" aria-label="SK Lashes Studio — Inicio">
    <span className="brand-monogram">SK<span className="brand-dot">.</span></span>
    <span className="brand-name">LASHES<br />STUDIO</span>
  </Link>;
}

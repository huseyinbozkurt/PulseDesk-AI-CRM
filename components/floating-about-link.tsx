"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function FloatingAboutLink() {
  const pathname = usePathname();

  if (pathname === "/about") {
    return null;
  }

  return (
    <Link
      className="floating-about-link"
      href="/about"
      aria-label="About Huseyin"
      title="About Huseyin"
    >
      <span className="floating-about-icon" aria-hidden="true">
        i
      </span>
    </Link>
  );
}

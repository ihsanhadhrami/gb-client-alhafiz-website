import type { SVGProps } from "react";

/**
 * lucide-react dropped brand/logo icons — these small inline marks fill that gap
 * for the handful of social platforms the footer links to.
 */

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M15 4h-2a4 4 0 0 0-4 4v3H7v4h2v7h4v-7h3l1-4h-4V8a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function TiktokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.5 3c.4 2.1 1.8 3.6 4 4v2.9a7 7 0 0 1-4-1.3v6.4a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v3a2.7 2.7 0 1 0 1.9 2.6V3z" />
    </svg>
  );
}

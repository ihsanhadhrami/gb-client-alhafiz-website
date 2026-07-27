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

export function ThreadsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.1 11.1a7.6 7.6 0 0 0-.3-.13c-.17-3.17-1.9-4.98-4.8-5h-.04c-1.74 0-3.18.74-4.07 2.09l1.6 1.1c.66-1 1.7-1.21 2.47-1.21h.03c.95.006 1.67.28 2.14.81.35.39.58.93.69 1.6a12.6 12.6 0 0 0-2.75-.13c-2.76.16-4.54 1.77-4.42 4.01.06 1.14.63 2.12 1.6 2.76.82.54 1.87.8 2.97.74 1.45-.08 2.58-.63 3.39-1.63.6-.75.99-1.73 1.16-2.97.7.42 1.21.96 1.5 1.61.48 1.1.51 2.9-.99 4.36-1.31 1.29-2.89 1.85-5.28 1.86-2.65-.02-4.65-.85-5.95-2.47C4.83 16.9 4.2 14.71 4.18 12c.02-2.71.65-4.9 1.87-6.51C7.35 3.87 9.35 3.04 12 3.02c2.67.02 4.7.86 6.05 2.49.66.8 1.16 1.81 1.49 2.99l1.86-.5c-.4-1.45-1.03-2.7-1.88-3.73C17.8 2.2 15.36 1.2 12.01 1.18h-.01C8.65 1.2 6.24 2.2 4.63 4.16 3.2 5.9 2.46 8.32 2.44 11.99v.02c.02 3.67.76 6.09 2.19 7.83C6.24 21.8 8.65 22.8 12 22.82h.01c2.98-.02 5.08-.8 6.8-2.5 2.26-2.21 2.19-4.99 1.45-6.69-.53-1.22-1.55-2.21-2.95-2.87.02-.08.04-.16.05-.24l-.26.58zm-4.6 5.36c-1.25.07-2.54-.48-2.6-1.65-.05-.87.62-1.84 2.73-1.96.24-.014.48-.02.71-.02.77 0 1.48.075 2.13.22-.24 3-1.73 3.36-2.87 3.41z" />
    </svg>
  );
}

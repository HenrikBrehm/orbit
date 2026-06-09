import type { ServiceIcon, SocialPlatform } from "@/config/schema";

type IconProps = { className?: string };

/**
 * Icon set bundled with the template (24×24, stroke = currentColor).
 * Service cards pick by `icon` id; socials by `platform`.
 */
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export const SERVICE_ICONS: Record<ServiceIcon, (props: IconProps) => React.ReactElement> = {
  cube: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M12 2.5 21 7.5v9l-9 5-9-5v-9l9-5Z" />
      <path d="M3 7.5l9 5 9-5M12 12.5v9" />
    </svg>
  ),
  wand: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="m14 7 3 3L7 20l-3-3L14 7Z" />
      <path d="M17.5 2.5v3M19 4h-3M21.5 8.5v2M22.5 9.5h-2" />
    </svg>
  ),
  rocket: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M12 16c-2 0-4-2-4-4 0-4 2-8.5 4-9.5C14 3.5 16 8 16 12c0 2-2 4-4 4Z" />
      <path d="M8 13l-3 2 2 1M16 13l3 2-2 1M12 16v5M12 8.5h.01" />
    </svg>
  ),
  grid: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </svg>
  ),
  pen: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M4 20l1.5-5L17 3.5a2.1 2.1 0 0 1 3 3L8.5 18 4 20Z" />
      <path d="M13.5 6.5l3 3" />
    </svg>
  ),
  code: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16" />
    </svg>
  ),
  camera: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M3.5 8.5A1.5 1.5 0 0 1 5 7h2l1.5-2.5h7L17 7h2a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 19 19H5a1.5 1.5 0 0 1-1.5-1.5v-9Z" />
      <circle cx="12" cy="12.5" r="3.5" />
    </svg>
  ),
  layers: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5M3 17.5 12 22l9-4.5" />
    </svg>
  ),
  sphere: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <circle cx="12" cy="12" r="8.5" />
      <ellipse cx="12" cy="12" rx="8.5" ry="3.5" />
    </svg>
  ),
  spark: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
    </svg>
  ),
};

export const SOCIAL_ICONS: Record<SocialPlatform, (props: IconProps) => React.ReactElement> = {
  x: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17.7 3H21l-7.3 8.4L22.2 21h-6.7l-5.3-6.2L4.2 21H1l7.8-9L1.8 3h6.9l4.8 5.7L17.7 3Zm-1.2 16h1.9L6.7 4.9H4.6L16.5 19Z" />
    </svg>
  ),
  instagram: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  ),
  github: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.16 19.5c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  ),
  linkedin: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21h-4V9Z" />
    </svg>
  ),
  dribbble: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M6 5.5c3.5 3 8 9 9.5 14.5M20.2 9.5c-5 1.5-10.5 1-14.5-.5M3.6 13.7c4.5-.5 9.5 1 12.9 5.3" />
    </svg>
  ),
  behance: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M8.84 6.5c.86 0 1.6.08 2.23.25.63.16 1.16.4 1.6.73.43.32.76.74.98 1.24.22.5.33 1.1.33 1.78 0 .77-.17 1.4-.52 1.92-.35.5-.86.92-1.55 1.24.94.27 1.64.75 2.1 1.43.46.68.7 1.5.7 2.46 0 .78-.15 1.45-.45 2.02a3.9 3.9 0 0 1-1.2 1.4c-.51.36-1.1.63-1.75.8-.65.17-1.33.26-2.04.26H2V6.5h6.84Zm-.41 4.94c.7 0 1.28-.17 1.74-.5.45-.33.67-.87.67-1.62 0-.42-.08-.76-.23-1.03a1.7 1.7 0 0 0-.62-.63 2.6 2.6 0 0 0-.9-.3 6.05 6.05 0 0 0-1.08-.09H5v4.17h3.43Zm.17 5.2c.4 0 .78-.04 1.13-.12.36-.08.67-.21.94-.4.27-.18.48-.43.64-.74.16-.32.23-.72.23-1.2 0-.96-.27-1.64-.8-2.05-.55-.4-1.26-.6-2.16-.6H5v5.1h3.6ZM16.1 8.04h5.7v1.4h-5.7v-1.4Zm3 11.62c.74 0 1.38-.19 1.92-.56.54-.38.87-.77 1-1.19h2.62a4.95 4.95 0 0 1-1.93 2.79c-.46.32-.98.56-1.55.72-.57.17-1.18.25-1.84.25a6.5 6.5 0 0 1-2.4-.43 5 5 0 0 1-1.83-1.22 5.4 5.4 0 0 1-1.16-1.88 7.04 7.04 0 0 1-.4-2.42c0-.84.14-1.63.42-2.36a5.6 5.6 0 0 1 1.19-1.9 5.5 5.5 0 0 1 1.83-1.26c.71-.3 1.49-.46 2.35-.46.92 0 1.73.18 2.42.54.69.36 1.26.84 1.7 1.44a6 6 0 0 1 .95 2.06c.2.77.26 1.58.2 2.42h-7.8c0 .85.29 1.66.81 2.18.52.51 1.27.78 2.5.78Zm1.72-6.7c-.42-.46-1.12-.71-1.97-.71-.56 0-1.02.1-1.39.28a2.8 2.8 0 0 0-.88.7c-.22.28-.37.57-.46.88-.08.3-.13.57-.15.8h5.62c-.08-.88-.36-1.5-.77-1.95Z" />
    </svg>
  ),
  youtube: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M23 12s0-3.85-.49-5.7a2.9 2.9 0 0 0-2.06-2.05C18.6 3.75 12 3.75 12 3.75s-6.6 0-8.45.5A2.9 2.9 0 0 0 1.49 6.3C1 8.15 1 12 1 12s0 3.85.49 5.7a2.9 2.9 0 0 0 2.06 2.05c1.85.5 8.45.5 8.45.5s6.6 0 8.45-.5a2.9 2.9 0 0 0 2.06-2.05C23 15.85 23 12 23 12ZM9.75 8.5l5.75 3.5-5.75 3.5v-7Z" />
    </svg>
  ),
  vimeo: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M22.4 7.42c-.1 2.14-1.6 5.07-4.5 8.8-3 3.88-5.55 5.83-7.63 5.83-1.29 0-2.38-1.19-3.27-3.57l-1.79-6.55C4.55 9.55 3.84 8.36 3.07 8.36c-.17 0-.75.35-1.76 1.05L.25 8.05a338 338 0 0 0 3.27-2.92C5 3.84 6.1 3.16 6.8 3.1c1.66-.16 2.68.97 3.06 3.4.41 2.62.7 4.25.85 4.89.48 2.16 1 3.24 1.58 3.24.45 0 1.12-.7 2.01-2.1.9-1.41 1.38-2.48 1.44-3.22.13-1.21-.35-1.82-1.44-1.82-.51 0-1.04.12-1.58.35 1.05-3.43 3.05-5.1 6.01-5 2.2.06 3.23 1.49 3.1 4.27l-.02.31Z" />
    </svg>
  ),
  email: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  website: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.5 2.3 3.8 5.2 3.8 8.5s-1.3 6.2-3.8 8.5c-2.5-2.3-3.8-5.2-3.8-8.5s1.3-6.2 3.8-8.5Z" />
    </svg>
  ),
};

import { siteConfigSchema, type SiteConfig } from "./schema";

/**
 * ════════════════════════════════════════════════════════════════════════
 *  ORBIT — SITE CONFIGURATION
 *  This file is the single source of truth for everything visual:
 *  branding, colors, fonts, copy, projects, services, socials, SEO and
 *  the 3D hero scene. Change values here — the whole site follows.
 *
 *  Docs: README.md · Customization recipes: skill/recipes/
 * ════════════════════════════════════════════════════════════════════════
 */
const config: SiteConfig = {
  brand: {
    name: "Nova Marlowe",
    tagline: "3D art direction & motion for brands that move.",
    logo: {
      image: null, // e.g. "/logo.svg" — null renders a text logo
      text: "NOVA®",
    },
  },

  theme: {
    defaultMode: "dark",
    allowModeToggle: true,
    colors: {
      dark: {
        background: "#07070B",
        surface: "#111118",
        text: "#F5F4F8",
        muted: "#9C9AAD",
        accent: "#6C50F7", // WCAG AA (5.07:1) with white CTA text
        accentContrast: "#FFFFFF",
        border: "rgba(245, 244, 248, 0.09)",
      },
      light: {
        background: "#F7F6FB",
        surface: "#FFFFFF",
        text: "#16131F",
        muted: "#5D5A6E",
        accent: "#6248E5",
        accentContrast: "#FFFFFF",
        border: "rgba(22, 19, 31, 0.10)",
      },
    },
    fonts: {
      heading: "space-grotesk",
      body: "inter",
    },
    radius: "1.25rem",
  },

  hero: {
    badge: "Booking projects for Q4 2026",
    headline: "I build worlds that sell ideas.",
    subheadline:
      "Nova Marlowe — 3D artist & motion designer crafting interactive brand moments, product films and real-time web experiences.",
    ctas: [
      { label: "View work", href: "#work", variant: "primary" },
      { label: "Get in touch", href: "#contact", variant: "ghost" },
    ],
    model: {
      path: null, // swap in your own: "/models/your-model.glb"
      scale: 1,
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      spinSpeed: 0.12,
      float: { enabled: true, amplitude: 0.18, speed: 0.6 },
      material: {
        override: true,
        color: "#16161f",
        metalness: 0.92,
        roughness: 0.18,
        emissive: "#7B61FF",
        emissiveIntensity: 2.4,
      },
    },
    environment: { preset: "city", intensity: 0.65, hdri: null },
    lights: {
      ambient: 0.35,
      key: { color: "#ffffff", intensity: 2.2, position: [4, 6, 6] },
      rim: { color: "#7B61FF", intensity: 3.0, position: [-6, 2, -6] },
    },
    camera: { position: [0, 0.3, 7], fov: 38 },
    postprocessing: {
      bloom: { enabled: true, intensity: 0.85, luminanceThreshold: 0.9 },
      vignette: { enabled: true, darkness: 0.78 },
    },
    particles: { enabled: true, count: 500, size: 0.02, color: null },
    scroll: { rotate: 4.2, cameraDolly: 1.8, fade: true },
    poster: null, // e.g. "/poster.webp" — shown on low-power devices
  },

  sections: [
    {
      type: "about",
      id: "about",
      label: "About",
      eyebrow: "About",
      title: "Designing at the edge of dimension and story.",
      paragraphs: [
        "I'm Nova — a 3D artist and motion designer based in Berlin. For eight years I've helped ambitious brands turn abstract ideas into tangible, moving worlds: launch films, interactive product showcases and real-time experiences that people remember.",
        "My work lives where craft meets engineering. I design in Cinema 4D and Blender, animate with intent, and ship to the web with WebGL — so the final piece is never a static render, but something you can touch.",
      ],
      portrait: null, // e.g. "/portrait.jpg"
      stats: [
        { value: "8+", label: "Years in 3D & motion" },
        { value: "60+", label: "Projects shipped" },
        { value: "12", label: "Industry awards" },
      ],
      skills: [
        "3D Art Direction",
        "Motion Design",
        "WebGL / Three.js",
        "Product Visualization",
        "Brand Films",
        "Real-time Rendering",
      ],
    },
    {
      type: "work",
      id: "work",
      label: "Work",
      eyebrow: "Selected Work",
      title: "Projects with gravity.",
      intro: "A selection of launches, films and experiments from the last few orbits.",
    },
    {
      type: "services",
      id: "services",
      label: "Services",
      eyebrow: "Services",
      title: "What I can do for you.",
      intro: "From a single hero visual to a full interactive launch — engagements that fit the mission.",
    },
    {
      type: "contact",
      id: "contact",
      label: "Contact",
      eyebrow: "Contact",
      title: "Let's make something unreal.",
      blurb:
        "Tell me about your product, your timeline and the feeling you're after. I'll reply within 48 hours.",
    },
  ],

  projects: [
    {
      slug: "lumen-headphones",
      title: "LUMEN — Headphone Launch",
      category: "Product Film",
      year: "2026",
      description:
        "A zero-gravity product film and interactive 360° configurator for LUMEN's flagship ANC headphones.",
      image: null,
      palette: ["#7B61FF", "#1B1535"],
      tags: ["3D", "Product Film", "WebGL"],
      link: null,
      wide: true,
    },
    {
      slug: "aether-sneaker",
      title: "AETHER Running Shoe",
      category: "Interactive 3D",
      year: "2025",
      description:
        "Exploded-view storytelling for a carbon-plated racer — every layer scrolls apart in real time.",
      image: null,
      palette: ["#FF5C87", "#2B0E1E"],
      tags: ["WebGL", "Scrollytelling"],
      link: null,
      wide: false,
    },
    {
      slug: "polar-ev",
      title: "POLAR EV Reveal",
      category: "Brand Film",
      year: "2025",
      description:
        "Cinematic reveal film for an electric off-roader, rendered entirely in-engine at 4K.",
      image: null,
      palette: ["#41D1FF", "#0A2230"],
      tags: ["Motion", "Automotive"],
      link: null,
      wide: false,
    },
    {
      slug: "flux-typeface",
      title: "FLUX Variable Type",
      category: "Experiment",
      year: "2024",
      description:
        "A variable typeface that bends through 3D space, driven by audio input. Webby honoree.",
      image: null,
      palette: ["#FFB23E", "#2E1C04"],
      tags: ["Type", "Creative Code"],
      link: null,
      wide: false,
    },
    {
      slug: "orbit-watch",
      title: "ORBIT Watch Faces",
      category: "Product Visualization",
      year: "2024",
      description:
        "A collection of kinetic watch faces visualized as macro renders with physically-correct glass.",
      image: null,
      palette: ["#5EF2C4", "#06281E"],
      tags: ["3D", "Lookdev"],
      link: null,
      wide: false,
    },
    {
      slug: "neon-district",
      title: "Neon District",
      category: "Personal",
      year: "2023",
      description:
        "A love letter to night cities — a fully explorable diorama built for the browser.",
      image: null,
      palette: ["#C45CFF", "#160B26"],
      tags: ["WebGL", "World Building"],
      link: null,
      wide: true,
    },
  ],

  services: [
    {
      title: "3D Art Direction",
      description:
        "Concept, lookdev and a visual system for your launch — from moodboard to final frame.",
      icon: "cube",
    },
    {
      title: "Interactive Experiences",
      description:
        "Award-grade WebGL scenes, configurators and scrollytelling shipped as production code.",
      icon: "sphere",
    },
    {
      title: "Motion & Brand Films",
      description: "Product films and idents with physically-based rendering and sound design.",
      icon: "rocket",
    },
    {
      title: "Product Visualization",
      description: "Photoreal stills and animations that replace photography — and outperform it.",
      icon: "camera",
    },
  ],

  socials: [
    { platform: "x", url: "https://x.com/your-handle", label: null },
    { platform: "instagram", url: "https://instagram.com/your-handle", label: null },
    { platform: "dribbble", url: "https://dribbble.com/your-handle", label: null },
    { platform: "linkedin", url: "https://linkedin.com/in/your-handle", label: null },
  ],

  contact: {
    email: "hello@novamarlowe.com",
    availability: "Currently booking for Q4 2026",
    form: {
      enabled: true,
      toEmail: null,
      fromEmail: "Portfolio <onboarding@resend.dev>",
      subjectPrefix: "[Portfolio]",
    },
  },

  seo: {
    title: "Nova Marlowe — 3D Artist & Motion Designer",
    description:
      "Portfolio of Nova Marlowe: 3D art direction, interactive WebGL experiences and motion design for brands that move.",
    keywords: ["3D artist", "motion designer", "WebGL", "portfolio", "art direction"],
    url: null,
    ogImage: null,
  },
};

/**
 * Validated at module load — a typo in the config fails fast with a
 * readable error instead of silently breaking the scene.
 */
export const siteConfig: SiteConfig = siteConfigSchema.parse(config);

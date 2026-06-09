import { z } from "zod";

/**
 * ORBIT site configuration schema.
 *
 * `site.config.ts` is validated against this schema at startup. Every visual
 * aspect of the site — branding, colors, copy, projects, the 3D hero scene —
 * is driven by that single file. If you are customizing the template you
 * should rarely need to touch anything outside `config/site.config.ts`.
 */

/** [x, y, z] world-space tuple. */
export const vec3Schema = z.tuple([z.number(), z.number(), z.number()]);

/** Color tokens for one theme mode. Any valid CSS color works. */
export const colorTokensSchema = z.object({
  /** Page background. */
  background: z.string(),
  /** Card / panel background, one step above `background`. */
  surface: z.string(),
  /** Primary text color. */
  text: z.string(),
  /** Secondary / dimmed text. */
  muted: z.string(),
  /** Brand accent — buttons, highlights, 3D emissive glow. */
  accent: z.string(),
  /** Text color used on top of `accent` surfaces. */
  accentContrast: z.string(),
  /** Hairline borders and dividers. */
  border: z.string(),
});

/** Fonts bundled with the template (self-hosted via next/font). */
export const fontIdSchema = z.enum(["inter", "space-grotesk", "sora", "manrope", "syne"]);

export const themeSchema = z.object({
  /** Mode the site loads in. */
  defaultMode: z.enum(["dark", "light"]),
  /** Show the dark/light toggle in the navigation. */
  allowModeToggle: z.boolean(),
  colors: z.object({
    dark: colorTokensSchema,
    light: colorTokensSchema,
  }),
  fonts: z.object({
    heading: fontIdSchema,
    body: fontIdSchema,
  }),
  /** Corner radius for cards and buttons (any CSS length). */
  radius: z.string(),
});

export const brandSchema = z.object({
  /** Site / studio / person name. Used for the logo and copyright. */
  name: z.string(),
  /** Short positioning line shown in the footer. */
  tagline: z.string(),
  logo: z.object({
    /** Path to a logo image under /public, or null for a text logo. */
    image: z.string().nullable(),
    /** Text logo override; null falls back to `brand.name`. */
    text: z.string().nullable(),
  }),
});

/** drei <Environment> presets — control reflections on the hero model. */
export const environmentPresetSchema = z.enum([
  "city",
  "studio",
  "sunset",
  "dawn",
  "night",
  "warehouse",
  "forest",
  "apartment",
  "park",
  "lobby",
]);

export const heroModelSchema = z.object({
  /**
   * Path to a .glb under /public (e.g. "/models/my-model.glb").
   * null renders the built-in procedural ORBIT showpiece.
   * Draco-compressed GLBs are supported out of the box.
   */
  path: z.string().nullable(),
  scale: z.number(),
  position: vec3Schema,
  /** Initial rotation in radians. */
  rotation: vec3Schema,
  /** Idle spin around Y in radians/second. 0 disables. */
  spinSpeed: z.number(),
  float: z.object({
    enabled: z.boolean(),
    /** Vertical bob amplitude in world units. */
    amplitude: z.number(),
    speed: z.number(),
  }),
  material: z.object({
    /**
     * When true, every mesh in the GLB gets the PBR material below —
     * useful to instantly rebrand any model. When false the GLB's own
     * materials are kept.
     */
    override: z.boolean(),
    color: z.string(),
    metalness: z.number(),
    roughness: z.number(),
    emissive: z.string(),
    /** >1 pushes the emissive into bloom. */
    emissiveIntensity: z.number(),
  }),
});

export const heroSchema = z.object({
  /** Small pill above the headline; null hides it. */
  badge: z.string().nullable(),
  headline: z.string(),
  subheadline: z.string(),
  ctas: z
    .array(
      z.object({
        label: z.string(),
        /** Anchor ("#work") or external URL. */
        href: z.string(),
        variant: z.enum(["primary", "ghost"]),
      }),
    )
    .max(2),
  model: heroModelSchema,
  environment: z.object({
    /** Procedural light-rig look (no HDR downloads — works offline). */
    preset: environmentPresetSchema,
    intensity: z.number(),
    /** Optional real HDRI under /public (e.g. "/hdri/studio.hdr") — overrides preset. */
    hdri: z.string().nullable(),
  }),
  lights: z.object({
    ambient: z.number(),
    key: z.object({ color: z.string(), intensity: z.number(), position: vec3Schema }),
    rim: z.object({ color: z.string(), intensity: z.number(), position: vec3Schema }),
  }),
  camera: z.object({
    position: vec3Schema,
    fov: z.number(),
  }),
  postprocessing: z.object({
    bloom: z.object({
      enabled: z.boolean(),
      intensity: z.number(),
      /** Only pixels brighter than this bloom. ~0.9 with emissive ≥ 2. */
      luminanceThreshold: z.number(),
    }),
    vignette: z.object({ enabled: z.boolean(), darkness: z.number() }),
  }),
  particles: z.object({
    enabled: z.boolean(),
    count: z.number().int().min(0),
    size: z.number(),
    /** null inherits the theme accent color. */
    color: z.string().nullable(),
  }),
  /** Scroll choreography while the hero pins. */
  scroll: z.object({
    /** Extra model rotation (radians) accumulated over the hero scroll. */
    rotate: z.number(),
    /** How far the camera dollies in over the hero scroll (world units). */
    cameraDolly: z.number(),
    /** Fade the hero copy out while scrolling. */
    fade: z.boolean(),
  }),
  /**
   * Static poster image shown instead of the 3D scene on low-power /
   * reduced-motion devices. null falls back to a CSS gradient poster.
   */
  poster: z.string().nullable(),
});

const sectionBaseShape = {
  /** Anchor id — also used for nav links. Must be unique. */
  id: z.string(),
  /** Label shown in the navigation. */
  label: z.string(),
  /** Small uppercase line above the section title. */
  eyebrow: z.string(),
  title: z.string(),
};

export const aboutSectionSchema = z.object({
  ...sectionBaseShape,
  type: z.literal("about"),
  paragraphs: z.array(z.string()),
  /** Portrait image under /public; null renders an abstract panel. */
  portrait: z.string().nullable(),
  stats: z.array(z.object({ value: z.string(), label: z.string() })),
  skills: z.array(z.string()),
});

export const workSectionSchema = z.object({
  ...sectionBaseShape,
  type: z.literal("work"),
  intro: z.string().nullable(),
});

export const servicesSectionSchema = z.object({
  ...sectionBaseShape,
  type: z.literal("services"),
  intro: z.string().nullable(),
});

export const contactSectionSchema = z.object({
  ...sectionBaseShape,
  type: z.literal("contact"),
  blurb: z.string(),
});

/**
 * Sections render in array order. Reorder, remove or re-title them here —
 * the navigation follows automatically.
 */
export const sectionSchema = z.discriminatedUnion("type", [
  aboutSectionSchema,
  workSectionSchema,
  servicesSectionSchema,
  contactSectionSchema,
]);

export const projectSchema = z.object({
  /** Unique kebab-case id. */
  slug: z.string(),
  title: z.string(),
  category: z.string(),
  year: z.string(),
  description: z.string(),
  /**
   * Cover image under /public (16:10 or wider recommended).
   * null generates an abstract cover from `palette`.
   */
  image: z.string().nullable(),
  /** Two CSS colors for the generated cover gradient (used when image is null). */
  palette: z.tuple([z.string(), z.string()]),
  tags: z.array(z.string()),
  /** External case-study link; null disables the link. */
  link: z.string().nullable(),
  /** Wide cards span two grid columns on desktop. */
  wide: z.boolean(),
});

/** Icons bundled with the template for service cards. */
export const serviceIconSchema = z.enum([
  "cube",
  "wand",
  "rocket",
  "grid",
  "pen",
  "code",
  "camera",
  "layers",
  "sphere",
  "spark",
]);

export const serviceSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: serviceIconSchema,
});

export const socialPlatformSchema = z.enum([
  "x",
  "instagram",
  "github",
  "linkedin",
  "dribbble",
  "behance",
  "youtube",
  "vimeo",
  "email",
  "website",
]);

export const socialSchema = z.object({
  platform: socialPlatformSchema,
  url: z.string(),
  /** Accessible label; null falls back to the platform name. */
  label: z.string().nullable(),
});

export const contactConfigSchema = z.object({
  /** Public email — used for the mailto fallback and shown in the section. */
  email: z.string(),
  /** e.g. "Booking projects for Q4 2026" — null hides the line. */
  availability: z.string().nullable(),
  form: z.object({
    /** Render the contact form. When false only the email link shows. */
    enabled: z.boolean(),
    /** Where submissions go. null falls back to `contact.email`. */
    toEmail: z.string().nullable(),
    /** Verified Resend sender, e.g. "Portfolio <hello@yourdomain.com>". */
    fromEmail: z.string(),
    subjectPrefix: z.string(),
  }),
});

export const seoSchema = z.object({
  title: z.string(),
  description: z.string(),
  keywords: z.array(z.string()),
  /** Canonical production URL; null until deployed. */
  url: z.string().nullable(),
  /** Open Graph image under /public; null uses the generated default. */
  ogImage: z.string().nullable(),
});

export const siteConfigSchema = z.object({
  brand: brandSchema,
  theme: themeSchema,
  hero: heroSchema,
  sections: z.array(sectionSchema),
  projects: z.array(projectSchema),
  services: z.array(serviceSchema),
  socials: z.array(socialSchema),
  contact: contactConfigSchema,
  seo: seoSchema,
});

export type Vec3 = z.infer<typeof vec3Schema>;
export type ColorTokens = z.infer<typeof colorTokensSchema>;
export type FontId = z.infer<typeof fontIdSchema>;
export type Theme = z.infer<typeof themeSchema>;
export type Brand = z.infer<typeof brandSchema>;
export type EnvironmentPreset = z.infer<typeof environmentPresetSchema>;
export type HeroModel = z.infer<typeof heroModelSchema>;
export type Hero = z.infer<typeof heroSchema>;
export type Section = z.infer<typeof sectionSchema>;
export type AboutSection = z.infer<typeof aboutSectionSchema>;
export type WorkSection = z.infer<typeof workSectionSchema>;
export type ServicesSection = z.infer<typeof servicesSectionSchema>;
export type ContactSection = z.infer<typeof contactSectionSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Service = z.infer<typeof serviceSchema>;
export type ServiceIcon = z.infer<typeof serviceIconSchema>;
export type Social = z.infer<typeof socialSchema>;
export type SocialPlatform = z.infer<typeof socialPlatformSchema>;
export type ContactConfig = z.infer<typeof contactConfigSchema>;
export type Seo = z.infer<typeof seoSchema>;
export type SiteConfig = z.infer<typeof siteConfigSchema>;

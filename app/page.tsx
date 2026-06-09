import { siteConfig } from "@/config/site.config";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-bold tracking-tight">{siteConfig.brand.name}</h1>
      <p className="text-muted">{siteConfig.brand.tagline}</p>
    </main>
  );
}

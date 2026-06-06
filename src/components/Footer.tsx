import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-center text-xs text-[#9a9590] md:flex-row md:text-left">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. {siteConfig.region}.
        </p>
        <p>Shot on iPhone. Edited in South part of India.</p>
      </div>
    </footer>
  );
}

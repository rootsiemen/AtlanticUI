import React from "react";
import {
  SiFramer,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { LogoMarquee } from "@/components/ui/logo-marquee";

const brands = [
  { icon: SiReact, label: "React" },
  { icon: SiNextdotjs, label: "Next.js" },
  { icon: SiTypescript, label: "TypeScript" },
  { icon: SiTailwindcss, label: "Tailwind CSS" },
  { icon: SiFramer, label: "Framer Motion" },
  { icon: SiVercel, label: "Vercel" },
];

const partnerLogos = [
  { src: "https://cdn.simpleicons.org/react/9CA3AF", alt: "React" },
  { src: "https://cdn.simpleicons.org/nextdotjs/9CA3AF", alt: "Next.js" },
  { src: "https://cdn.simpleicons.org/typescript/9CA3AF", alt: "TypeScript" },
  { src: "https://cdn.simpleicons.org/tailwindcss/9CA3AF", alt: "Tailwind CSS" },
  { src: "https://cdn.simpleicons.org/framer/9CA3AF", alt: "Framer" },
  { src: "https://cdn.simpleicons.org/vercel/9CA3AF", alt: "Vercel" },
];

export function LogoMarqueeDemo() {
  return (
    <div className="w-full space-y-8 py-6">
      <LogoMarquee
        ariaLabel="Featured technologies"
        speed={28}
        pauseOnHover
        gap="3.5rem"
        items={brands.map(({ icon: Icon, label }) => (
          <span key={label} className="flex items-center gap-2.5 text-neutral-400">
            <Icon className="h-7 w-7" aria-hidden="true" />
            <span className="text-sm font-semibold tracking-wide">{label}</span>
          </span>
        ))}
      />
      <LogoMarquee
        ariaLabel="Partner logos scrolling right"
        speed={45}
        direction="right"
        pauseOnHover
        gap="3.5rem"
        items={partnerLogos}
      />
    </div>
  );
}

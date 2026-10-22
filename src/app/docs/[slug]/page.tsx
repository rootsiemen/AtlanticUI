import { notFound } from "next/navigation";
import { ComponentPreview } from "@/components/website/component-preview";

// Components & Demos
import { Spotlight } from "@/components/ui/spotlight";
import { BentoGridDemo } from "@/components/demos/bento-grid-demo";
import { StackedGalleryDemo } from "@/components/demos/stacked-gallery-demo";
import { ExpandableNavbarDemo } from "@/components/demos/expandable-navbar-demo";
import { MorphingDropdownDemo } from "@/components/demos/morphing-dropdown-demo";
import { LogoMarqueeDemo } from "@/components/demos/logo-marquee-demo";
import { morphingDropdownCode } from "@/lib/code-snippets";

// Snippets
import {
  spotlightCode,
  bentoGridCode,
  stackedGalleryCode,
  expandableNavbarCode,
  logoMarqueeCode,
} from "@/lib/code-snippets";

interface DocPageProps {
  params: Promise<{ slug: string }>;
}

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params;

  if (slug === "spotlight") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Spotlight Card</h1>
          <p className="text-neutral-400 text-sm mt-2">
            A card component with an interactive radial light gradient that tracks the user's cursor.
          </p>
        </div>
        <ComponentPreview code={spotlightCode}>
          <Spotlight className="max-w-md text-center">
            <h3 className="text-xl font-semibold text-white">Interactive Spotlight</h3>
            <p className="mt-2 text-sm text-neutral-400">
              Hover over this card to see a radial gradient light effect follow your mouse.
            </p>
          </Spotlight>
        </ComponentPreview>
      </div>
    );
  }

  if (slug === "bento-grid") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Bento Grid</h1>
          <p className="text-neutral-400 text-sm mt-2">
            An animated feature grid with dynamic column spans and Framer Motion lift effects.
          </p>
        </div>
        <ComponentPreview code={bentoGridCode}>
          <BentoGridDemo />
        </ComponentPreview>
      </div>
    );
  }

  if (slug === "stacked-gallery") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Stacked Card Gallery</h1>
          <p className="text-neutral-400 text-sm mt-2">
            An interactive stacked photo gallery with thumbnail rotation triggers.
          </p>
        </div>
        <ComponentPreview code={stackedGalleryCode}>
          <StackedGalleryDemo />
        </ComponentPreview>
      </div>
    );
  }

  if (slug === "expandable-navbar") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Expandable Navbar</h1>
          <p className="text-neutral-400 text-sm mt-2">
            A floating navigation pill that expands into a full feature flyout menu.
          </p>
        </div>
        <ComponentPreview code={expandableNavbarCode}>
          <ExpandableNavbarDemo />
        </ComponentPreview>
      </div>
    );
  }


  if (slug === "morphing-dropdown") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Morphing Dropdown</h1>
          <p className="text-neutral-400 text-sm mt-2">
            A Stripe-style navigation menu with dynamic background morphing and horizontal slide transitions.
          </p>
        </div>
        <ComponentPreview code={morphingDropdownCode}>
          <MorphingDropdownDemo />
        </ComponentPreview>
      </div>
    );
  }

  if (slug === "logo-marquee") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Logo Marquee</h1>
          <p className="text-neutral-400 text-sm mt-2">
            A seamless infinite-looping logo marquee with configurable speed, direction, hover-pause and edge fades.
          </p>
        </div>
        <ComponentPreview code={logoMarqueeCode}>
          <LogoMarqueeDemo />
        </ComponentPreview>
      </div>
    );
  }

  notFound();
}

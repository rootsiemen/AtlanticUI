"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface LogoMarqueeItem {
  /** Image URL of the logo. */
  src: string;
  /** Accessible name of the logo (used as the image alt text). */
  alt: string;
  /** Optional link wrapped around the logo. */
  href?: string;
}

export interface LogoMarqueeProps {
  /** Logos to scroll — image descriptors or fully custom nodes. */
  items: LogoMarqueeItem[] | React.ReactNode[];
  /** Seconds for one full loop. Defaults to 30. */
  speed?: number;
  /** Scroll direction. Defaults to "left". */
  direction?: "left" | "right";
  /** Pause the animation while the pointer hovers over it. Defaults to true. */
  pauseOnHover?: boolean;
  /** Gap between logos (any CSS length). Defaults to "3rem". */
  gap?: string;
  /** Fade the left/right edges with a CSS mask. Defaults to true. */
  fadeEdges?: boolean;
  className?: string;
  /** Extra classes applied to each rendered <img>. */
  itemClassName?: string;
  /** Accessible label for the marquee region. Defaults to "Logo marquee". */
  ariaLabel?: string;
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 dark:focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

function isLogoItem(item: unknown): item is LogoMarqueeItem {
  return (
    typeof item === "object" &&
    item !== null &&
    !React.isValidElement(item) &&
    typeof (item as LogoMarqueeItem).src === "string"
  );
}

export const LogoMarquee = ({
  items,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
  gap = "3rem",
  fadeEdges = true,
  className,
  itemClassName,
  ariaLabel = "Logo marquee",
}: LogoMarqueeProps) => {
  if (items.length === 0) return null;

  const renderItem = (item: LogoMarqueeItem | React.ReactNode, key: string) => {
    if (isLogoItem(item)) {
      const img = (
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          draggable={false}
          className={cn("h-8 w-auto select-none object-contain", itemClassName)}
        />
      );
      return (
        <div key={key} className="shrink-0" style={{ marginRight: gap }}>
          {item.href ? (
            <a href={item.href} className={cn("inline-flex rounded", focusRing)}>
              {img}
            </a>
          ) : (
            img
          )}
        </div>
      );
    }
    return (
      <div key={key} className="shrink-0" style={{ marginRight: gap }}>
        {item}
      </div>
    );
  };

  return (
    <div
      role="region"
      aria-label={ariaLabel}
      className={cn(
        "relative w-full overflow-hidden",
        fadeEdges &&
          "[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        className
      )}
    >
      {/* The track renders the item list twice; translating it by -50%
          creates a seamless infinite loop with no visible seam. */}
      <div
        className={cn(
          "flex w-max animate-marquee",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          animationDuration: speed + "s",
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 items-center">
          {items.map((item, index) => renderItem(item, "a-" + index))}
        </div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {items.map((item, index) => renderItem(item, "b-" + index))}
        </div>
      </div>
    </div>
  );
};

export const spotlightCode = `"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const Spotlight = ({
  children,
  className = "",
  fill = "rgba(255, 255, 255, 0.15)",
}: {
  children?: React.ReactNode;
  className?: string;
  fill?: string;
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 p-8 transition-colors duration-300",
        className
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: \`radial-gradient(600px circle at \${position.x}px \${position.y}px, \${fill}, transparent 40%)\`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};`;

export const bentoGridCode = `"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-400">
          {description}
        </div>
      </div>
    </motion.div>
  );
};`;

export const stackedGalleryCode = `"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  id: number | string;
  title: string;
  image: string;
}

export const StackedCardGallery = ({
  items,
  title = "In the Spotlight",
  subtitle = "MEDIA",
  description = "Glimpses from our events, workshops, mentorship sessions, and startup milestones.",
  buttonText = "GET IN TOUCH",
}: {
  items: GalleryItem[];
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
}) => {
  const [cards, setCards] = useState(items);
  const [activeId, setActiveId] = useState<number | string>(items[0]?.id);

  const handleCardClick = (id: number | string) => {
    setActiveId(id);
    setCards((prev) => {
      const index = prev.findIndex((c) => c.id === id);
      if (index === -1) return prev;
      const copy = [...prev];
      const [selected] = copy.splice(index, 1);
      copy.push(selected);
      return copy;
    });
  };

  return (
    <div className="w-full bg-black text-white p-8 md:p-12 rounded-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div className="space-y-6">
          {subtitle && (
            <div className="flex items-center space-x-2 text-xs tracking-widest text-orange-500 uppercase font-mono">
              <span className="w-4 h-[1px] bg-orange-500 inline-block" />
              <span>{subtitle}</span>
            </div>
          )}
          <h2 className="text-4xl md:text-5xl font-serif font-bold">
            {title.split(" ")[0]} <span className="italic font-normal text-orange-500">{title.split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed max-w-lg">{description}</p>
          {buttonText && (
            <button className="bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs px-6 py-3 rounded-md uppercase">
              {buttonText}
            </button>
          )}
        </div>
        <div className="relative h-80 w-full flex items-center justify-center">
          <div className="relative w-64 h-80">
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                animate={{
                  rotate: (index - (cards.length - 1)) * -6,
                  x: (index - (cards.length - 1)) * -12,
                  zIndex: index,
                }}
                className="absolute inset-0 cursor-pointer rounded-2xl overflow-hidden border-2 border-white/10"
              >
                <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};`;


export const expandableNavbarCode = `"use client";

import React, { useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface NavMenuItem {
  title: string;
  subtitle?: string;
  href: string;
  icon?: string;
}

export interface NavSocialLink {
  label: string;
  href: string;
}

export const ExpandableNavbar = ({
  brandLogo = <span className="text-xl font-bold italic">AtlanticUI</span>,
  menuItems,
  socialLinks = [],
  className,
}: {
  brandLogo?: React.ReactNode;
  menuItems: NavMenuItem[];
  socialLinks?: NavSocialLink[];
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  return (
    <motion.nav
      onKeyDown={(event) => {
        if (event.key === "Escape" && isOpen) {
          event.preventDefault();
          event.stopPropagation();
          setIsOpen(false);
          toggleRef.current?.focus();
        }
      }}
      layout
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "relative overflow-hidden rounded-2xl bg-neutral-200/90 dark:bg-neutral-900/90 p-3 backdrop-blur-md border border-black/5 dark:border-white/10 text-neutral-900 dark:text-neutral-100 shadow-xl",
        isOpen ? "w-full max-w-md" : "w-auto max-w-fit",
        className
      )}
    >
      <motion.div layout="position" className="flex items-center justify-between gap-6 px-2">
        <div>{brandLogo}</div>
        {!isOpen && (
          <div className="hidden sm:flex items-center space-x-4 text-xs font-medium">
            {menuItems.map((item, idx) => (
              <a key={idx} href={item.href}>{item.title}</a>
            ))}
          </div>
        )}
        <button
          ref={toggleRef}
          type="button"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          aria-controls={isOpen ? panelId : undefined}
          onClick={() => setIsOpen((open) => !open)}
          className="flex items-center space-x-1 rounded-lg bg-neutral-300 dark:bg-neutral-800 px-3 py-1.5 text-xs font-semibold"
        >
          <span>{isOpen ? "Close" : ""}</span>
          <span aria-hidden="true">:</span>
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={panelId}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-2 pt-2 border-t border-black/5 dark:border-white/10"
          >
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="flex items-center justify-between rounded-xl p-2.5 hover:bg-black/5 dark:hover:bg-white/5"
              >
                <div className="flex items-center space-x-3">
                  {item.icon && <img src={item.icon} alt={item.title} className="h-10 w-10 rounded-xl object-cover" />}
                  <span className="font-medium text-sm">{item.title}</span>
                </div>
                {hoveredIndex === index && (
                  <span className="text-xs text-neutral-500 font-mono">{item.subtitle || "Explore"}</span>
                )}
              </a>
            ))}
            {socialLinks.length > 0 && (
              <div className="pt-3 px-2 flex flex-col space-y-1 border-t border-black/5 dark:border-white/10">
                {socialLinks.map((s, idx) => (
                  <a key={idx} href={s.href} className="text-xs font-mono text-neutral-500">{s.label}</a>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};`;


export const morphingDropdownCode = `"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface DropdownSection {
  id: string;
  label: string;
  content: React.ReactNode;
}

export function MorphingDropdownNav({
  brandLogo = <span className="text-lg font-bold text-white">Atlantic</span>,
  sections,
  actions,
  className,
}: {
  brandLogo?: React.ReactNode;
  sections: DropdownSection[];
  actions?: React.ReactNode;
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  const activeSection = sections.find((s) => s.id === activeTab);

  const handleTabHover = (id: string) => {
    const currentIndex = sections.findIndex((s) => s.id === id);
    if (prevIndex !== null && currentIndex !== prevIndex) {
      setDirection(currentIndex > prevIndex ? "right" : "left");
    }
    setPrevIndex(currentIndex);
    setActiveTab(id);
  };

  return (
    <nav
      onMouseLeave={() => {
        setActiveTab(null);
        setPrevIndex(null);
      }}
      className={cn(
        "relative z-50 flex items-center justify-between rounded-2xl border border-neutral-800 bg-neutral-950/80 px-6 py-3 text-white backdrop-blur-md shadow-xl",
        className
      )}
    >
      <div className="flex items-center space-x-2">{brandLogo}</div>

      <div className="flex items-center space-x-1">
        {sections.map((section) => (
          <button
            key={section.id}
            onMouseEnter={() => handleTabHover(section.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
              activeTab === section.id
                ? "text-white bg-neutral-900"
                : "text-neutral-400 hover:text-neutral-200"
            )}
          >
            {section.label}
          </button>
        ))}
      </div>

      <div className="flex items-center space-x-3">{actions}</div>

      <AnimatePresence>
        {activeSection && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
          >
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/95 p-6 shadow-2xl backdrop-blur-xl text-neutral-200"
            >
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: direction === "right" ? 15 : -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction === "right" ? -15 : 15 }}
                transition={{ duration: 0.18 }}
              >
                {activeSection.content}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}`;


export const logoMarqueeCode = `"use client";

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
};`;

"use client";

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

interface ExpandableNavbarProps {
  brandLogo?: React.ReactNode;
  menuItems: NavMenuItem[];
  socialLinks?: NavSocialLink[];
  className?: string;
}

// Shared, clearly visible keyboard focus indicator.
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 dark:focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-200 dark:focus-visible:ring-offset-neutral-900";

export const ExpandableNavbar = ({
  brandLogo = <span className="text-xl font-bold italic tracking-tighter">AtlanticUI</span>,
  menuItems,
  socialLinks = [],
  className,
}: ExpandableNavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const panelId = useId();

  const focusItem = (index: number) => {
    itemRefs.current[index]?.focus();
  };

  // Arrow-key roving focus across the expanded panel's menu links.
  const handlePanelKeyDown = (event: React.KeyboardEvent) => {
    const count = menuItems.length;
    if (count === 0) return;

    const activeIndex = itemRefs.current.findIndex(
      (el) => el === document.activeElement
    );

    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusItem(activeIndex === -1 ? 0 : (activeIndex + 1) % count);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      focusItem(activeIndex === -1 ? count - 1 : (activeIndex - 1 + count) % count);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusItem(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusItem(count - 1);
    }
  };

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
        "relative mx-auto w-full max-w-sm md:max-w-md overflow-hidden rounded-2xl bg-neutral-200/90 dark:bg-neutral-900/90 p-3 backdrop-blur-md border border-black/5 dark:border-white/10 text-neutral-900 dark:text-neutral-100 shadow-xl",
        isOpen ? "max-w-md" : "max-w-fit",
        className
      )}
    >
      {/* Top Bar Header */}
      <motion.div layout="position" className="flex items-center justify-between gap-6 px-2">
        <div className="flex items-center space-x-3">{brandLogo}</div>

        {/* Collapsed Inline Links */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="hidden sm:flex items-center space-x-4 text-xs font-medium text-neutral-700 dark:text-neutral-300"
          >
            {menuItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className={cn(
                  "rounded hover:text-black dark:hover:text-white transition-colors",
                  focusRing
                )}
              >
                {item.title}
              </a>
            ))}
          </motion.div>
        )}

        {/* Morphing Toggle Button */}
        <button
          ref={toggleRef}
          type="button"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((open) => !open)}
          className={cn(
            "flex items-center space-x-1.5 rounded-lg bg-neutral-300/60 dark:bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition",
            focusRing
          )}
        >
          <span>{isOpen ? "Close" : ""}</span>
          <span aria-hidden="true" className="font-bold">:</span>
        </button>
      </motion.div>

      {/* Expanded Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-label="Expanded navigation"
            onKeyDown={handlePanelKeyDown}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-4 space-y-2 pt-2 border-t border-black/5 dark:border-white/10"
          >
            {/* Feature Cards List */}
            <div className="space-y-1">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  href={item.href}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={cn(
                    "group relative flex items-center justify-between rounded-xl p-2.5 transition duration-150 hover:bg-black/5 dark:hover:bg-white/5",
                    focusRing
                  )}
                >
                  <div className="flex items-center space-x-3">
                    {item.icon ? (
                      <img
                        src={item.icon}
                        alt={item.title}
                        className="h-10 w-10 rounded-xl object-cover shadow-sm"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-300 dark:bg-neutral-800 font-bold text-sm">
                        {item.title[0]}
                      </div>
                    )}
                    <span className="font-medium text-sm text-neutral-800 dark:text-neutral-200">
                      {item.title}
                    </span>
                  </div>

                  {/* Contextual Subtitle on Hover (decorative until visible) */}
                  <motion.span
                    initial={{ opacity: 0, x: -5 }}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      x: hoveredIndex === index ? 0 : -5,
                    }}
                    aria-hidden={hoveredIndex !== index}
                    className="text-xs text-neutral-500 dark:text-neutral-400 font-mono"
                  >
                    {item.subtitle || "Explore"}
                  </motion.span>
                </a>
              ))}
            </div>

            {/* Footer Social / Extra Links */}
            {socialLinks.length > 0 && (
              <div className="pt-3 px-2 flex flex-col space-y-1 border-t border-black/5 dark:border-white/10">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    className={cn(
                      "rounded text-xs font-mono text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors",
                      focusRing
                    )}
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

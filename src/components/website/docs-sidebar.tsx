"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface DocNavItem {
  title: string;
  slug: string;
  isNew?: boolean;
}

export interface DocNavGroup {
  category: string;
  items: DocNavItem[];
}

const docNavigation: DocNavGroup[] = [
  {
    category: "Getting Started",
    items: [
      { title: "Introduction", slug: "introduction" },
      { title: "Installation", slug: "installation" },
    ],
  },
  {
    category: "Components",
    items: [
      { title: "Spotlight Card", slug: "spotlight" },
      { title: "Bento Grid", slug: "bento-grid" },
      { title: "Stacked Card Gallery", slug: "stacked-gallery" },
      { title: "Expandable Navbar", slug: "expandable-navbar", isNew: true },
      { title: "Morphing Dropdown", slug: "morphing-dropdown", isNew: true },
      { title: "Logo Marquee", slug: "logo-marquee", isNew: true },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r border-neutral-800 bg-black min-h-[calc(100vh-4rem)] p-6 hidden md:block">
      <div className="space-y-8">
        {docNavigation.map((group, idx) => (
          <div key={idx} className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">
              {group.category}
            </h4>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const href = `/docs/${item.slug}`;
                const isActive = pathname === href;

                return (
                  <li key={item.slug}>
                    <Link
                      href={href}
                      className={cn(
                        "flex items-center justify-between text-sm py-1.5 px-3 rounded-md transition-colors duration-150",
                        isActive
                          ? "bg-neutral-800 text-white font-medium"
                          : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                      )}
                    >
                      <span>{item.title}</span>
                      {item.isNew && (
                        <span className="text-[10px] bg-orange-500/20 text-orange-400 border border-orange-500/30 px-1.5 py-0.5 rounded font-mono">
                          NEW
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}

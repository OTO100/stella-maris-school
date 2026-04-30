"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { BrandMark } from "@/components/brand-mark";
import type {
  NavLink,
  ResolvedLink,
  ResolvedNavPrimaryItem,
} from "@/lib/nav-href";

export type { NavLink, ResolvedNavPrimaryItem };

function NavLeaf({
  item,
  className,
  onNavigate,
}: {
  item: ResolvedLink;
  className: string;
  onNavigate?: () => void;
}) {
  if (item.useAnchor) {
    return (
      <a
        href={item.href}
        {...(item.openInNewTab
          ? { target: "_blank", rel: "noreferrer noopener" }
          : {})}
        className={className}
        onClick={onNavigate}
      >
        {item.label}
      </a>
    );
  }
  return (
    <Link href={item.href} className={className} onClick={onNavigate}>
      {item.label}
    </Link>
  );
}

function DesktopPrimaryNav({
  items,
}: {
  items: ResolvedNavPrimaryItem[];
}) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const groupRefs = useRef<Map<string, HTMLLIElement>>(new Map());
  const baseId = useId();

  const setGroupRef = (key: string, el: HTMLLIElement | null) => {
    if (el) groupRefs.current.set(key, el);
    else groupRefs.current.delete(key);
  };

  useEffect(() => {
    if (!openKey) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenKey(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openKey]);

  useEffect(() => {
    if (!openKey) return;
    const onMouseDown = (e: MouseEvent) => {
      const el = groupRefs.current.get(openKey);
      if (el && !el.contains(e.target as Node)) setOpenKey(null);
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [openKey]);

  const linkClass =
    "rounded-lg px-2 py-1.5 text-[0.8125rem] font-medium text-[var(--color-cream)]/90 transition hover:bg-white/10 hover:text-[var(--color-cream)] lg:px-2.5 lg:text-sm";

  return (
    <ul className="flex items-center justify-end gap-x-0">
      {items.map((node) => {
        if (node.kind === "simple") {
          return (
            <li key={node.key}>
              <NavLeaf
                item={node.link}
                className={`inline-flex ${linkClass}`}
              />
            </li>
          );
        }

        const panelId = `${baseId}-panel-${node.key}`;
        const buttonId = `${baseId}-btn-${node.key}`;
        const isOpen = openKey === node.key;

        return (
          <li
            key={node.key}
            ref={(el) => setGroupRef(node.key, el)}
            className="relative"
          >
            <button
              type="button"
              id={buttonId}
              className={`inline-flex items-center gap-0.5 ${linkClass}`}
              aria-expanded={isOpen}
              aria-haspopup="menu"
              aria-controls={panelId}
              onClick={() => setOpenKey(isOpen ? null : node.key)}
            >
              {node.groupLabel}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`shrink-0 transition ${isOpen ? "rotate-180" : ""}`}
                aria-hidden
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {isOpen ? (
              <ul
                id={panelId}
                role="menu"
                aria-labelledby={buttonId}
                className="absolute right-0 z-50 mt-1 min-w-[12rem] rounded-lg border border-white/15 bg-[var(--color-brand-muted)] py-2 shadow-xl ring-1 ring-black/15"
              >
                {node.landing ? (
                  <li role="none" className="block">
                    <NavLeaf
                      item={node.landing}
                      className="block px-4 py-2.5 text-left text-[0.8125rem] font-medium text-[var(--color-cream)] hover:bg-white/10"
                    />
                  </li>
                ) : null}
                {node.children.map((child) => (
                  <li key={`${node.key}-${child.href}-${child.label}`} role="none">
                    <NavLeaf
                      item={child}
                      className="block px-4 py-2.5 text-left text-[0.8125rem] font-medium text-[var(--color-cream)] hover:bg-white/10"
                    />
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

function MobilePrimaryNav({
  items,
  onNavigate,
}: {
  items: ResolvedNavPrimaryItem[];
  onNavigate: () => void;
}) {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const linkClass =
    "block rounded-xl px-3 py-3 text-base font-medium text-[var(--color-cream)] hover:bg-white/10";
  const subClass =
    "block rounded-lg py-2 pl-5 pr-3 text-sm font-medium text-[var(--color-cream)]/95 hover:bg-white/10";

  return (
    <ul className="flex flex-col gap-1">
      {items.map((node) => {
        if (node.kind === "simple") {
          return (
            <li key={node.key}>
              <NavLeaf
                item={node.link}
                className={linkClass}
                onNavigate={onNavigate}
              />
            </li>
          );
        }

        const expanded = openSection === node.key;
        return (
          <li key={node.key} className="flex flex-col">
            <button
              type="button"
              className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-base font-medium text-[var(--color-cream)] hover:bg-white/10 ${expanded ? "bg-white/5" : ""}`}
              aria-expanded={expanded}
              onClick={() =>
                setOpenSection(expanded ? null : node.key)
              }
            >
              {node.groupLabel}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`shrink-0 transition ${expanded ? "rotate-180" : ""}`}
                aria-hidden
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {expanded ? (
              <ul className="mt-1 flex flex-col gap-0 border-l border-white/20 pl-2">
                {node.landing ? (
                  <li>
                    <NavLeaf
                      item={node.landing}
                      className={subClass}
                      onNavigate={onNavigate}
                    />
                  </li>
                ) : null}
                {node.children.map((child) => (
                  <li key={`${node.key}-m-${child.href}-${child.label}`}>
                    <NavLeaf
                      item={child}
                      className={subClass}
                      onNavigate={onNavigate}
                    />
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

export function SiteHeader({
  schoolName,
  primaryNav,
  absenceUrl,
}: {
  schoolName: string;
  primaryNav: ResolvedNavPrimaryItem[];
  absenceUrl?: string | null;
}) {
  const [open, setOpen] = useState(false);
  const closeMobile = useCallback(() => setOpen(false), []);

  return (
    <header className="sticky top-0 z-40 border-b border-white/15 bg-[var(--color-brand)] shadow-[0_2px_12px_-4px_rgb(0_0_0_/0.25)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          aria-label={`${schoolName} — Home`}
          className="group shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cream)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-brand)]"
        >
          <BrandMark
            priority
            className="h-10 w-auto max-w-[min(100%,14rem)] shrink-0 transition group-hover:scale-[1.02]"
          />
        </Link>
        <div className="hidden min-w-0 flex-1 items-center justify-end gap-1 lg:flex xl:gap-2">
          <nav
            className="flex flex-1 justify-end overflow-visible"
            aria-label="Primary"
          >
            <DesktopPrimaryNav items={primaryNav} />
          </nav>
          {absenceUrl ? (
            <a
              href={absenceUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="ml-1 inline-flex shrink-0 rounded-full border border-[var(--color-cream)]/45 bg-transparent px-3 py-2 text-[0.8125rem] font-semibold text-[var(--color-cream)] transition hover:bg-white/12 lg:ml-2 lg:px-4 lg:text-sm"
            >
              Report absence
            </a>
          ) : null}
          <Link
            href="/enrolment"
            className="ml-1 inline-flex shrink-0 rounded-full bg-[var(--color-gold)] px-3 py-2 text-[0.8125rem] font-semibold text-[var(--color-heading)] shadow-md transition hover:bg-[var(--color-cream)] lg:ml-2 lg:px-4 lg:text-sm"
          >
            Enrol now
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex rounded-xl p-2.5 text-[var(--color-cream)] ring-1 ring-white/35 transition hover:bg-white/10 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            {open ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-white/15 bg-[var(--color-brand-muted)] px-4 py-4 lg:hidden"
          aria-label="Mobile primary"
        >
          <MobilePrimaryNav items={primaryNav} onNavigate={closeMobile} />
          {absenceUrl ? (
            <div className="mt-4 border-t border-white/10 pt-4">
              <a
                href={absenceUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="block rounded-xl border border-[var(--color-cream)]/45 bg-transparent px-3 py-3 text-center text-base font-semibold text-[var(--color-cream)] hover:bg-white/10"
                onClick={closeMobile}
              >
                Report absence
              </a>
            </div>
          ) : null}
          <div className="mt-2">
            <Link
              href="/enrolment"
              className="block rounded-xl bg-[var(--color-gold)] px-3 py-3 text-center text-base font-semibold text-[var(--color-heading)] hover:bg-[var(--color-cream)]"
              onClick={closeMobile}
            >
              Enrol now
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

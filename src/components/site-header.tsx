"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";

import { BrandMark } from "@/components/brand-mark";
import type { ResolvedLink, ResolvedNavPrimaryItem } from "@/lib/nav-href";

export type SiteHeaderLinks = {
  phone?: string | null;
  email?: string | null;
  heroAppUrl?: string | null;
  newsletterUrl?: string | null;
  termDatesUrl?: string | null;
};

function NavLeaf({
  item,
  className,
  onNavigate,
  onMouseEnter,
  children,
  ...rest
}: {
  item: ResolvedLink;
  className: string;
  onNavigate?: () => void;
  onMouseEnter?: () => void;
  children?: ReactNode;
  id?: string;
  "aria-expanded"?: boolean;
  "aria-haspopup"?: "menu";
  "aria-controls"?: string;
}) {
  const extra = item.openInNewTab
    ? { target: "_blank" as const, rel: "noreferrer noopener" }
    : {};
  if (item.useAnchor) {
    return (
      <a
        href={item.href}
        {...extra}
        {...rest}
        className={className}
        onClick={onNavigate}
        onMouseEnter={onMouseEnter}
      >
        {item.label}
        {children}
      </a>
    );
  }
  return (
    <Link
      href={item.href}
      {...rest}
      className={className}
      onClick={onNavigate}
      onMouseEnter={onMouseEnter}
    >
      {item.label}
      {children}
    </Link>
  );
}

function groupLandingLink(node: Extract<ResolvedNavPrimaryItem, { kind: "group" }>): ResolvedLink | null {
  if (node.landing) {
    return { ...node.landing, label: node.groupLabel };
  }
  if (node.groupLabel === "Our School") {
    return {
      href: "/about",
      label: node.groupLabel,
      useAnchor: false,
      openInNewTab: false,
    };
  }
  if (node.groupLabel === "Our Community") {
    return {
      href: "/community",
      label: node.groupLabel,
      useAnchor: false,
      openInNewTab: false,
    };
  }
  return null;
}

const GROUP_INTRO: Record<
  string,
  { eyebrow: string; title: string; body: string }
> = {
  "Our School": {
    eyebrow: "Our School",
    title: "A Catholic primary school in Silverdale",
    body: "Years 1–6, state integrated, co-educational — founded on the Marian Values.",
  },
  "Our Community": {
    eyebrow: "Our Community",
    title: "Staff, board and whānau",
    body: "The people who make Stella Maris, and how our school is governed.",
  },
};

function splitColumns(items: ResolvedLink[]) {
  const mid = Math.ceil(items.length / 2);
  return [items.slice(0, mid), items.slice(mid)] as const;
}

function DesktopPrimaryNav({
  items,
  openKey,
  onOpenKeyChange,
  onPanelEnter,
}: {
  items: ResolvedNavPrimaryItem[];
  openKey: string | null;
  onOpenKeyChange: (key: string | null) => void;
  onPanelEnter?: () => void;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const baseId = useId();

  useEffect(() => {
    if (!openKey) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenKeyChange(null);
        const trigger = barRef.current?.querySelector<HTMLElement>(
          `#${CSS.escape(`${baseId}-btn-${openKey}`)}`,
        );
        trigger?.focus();
        return;
      }
      if (e.key !== "Tab" || !barRef.current) return;
      const panel = barRef.current.querySelector<HTMLElement>(
        `#${CSS.escape(`${baseId}-panel-${openKey}`)}`,
      );
      const trigger = barRef.current.querySelector<HTMLElement>(
        `#${CSS.escape(`${baseId}-btn-${openKey}`)}`,
      );
      const focusable = [
        trigger,
        ...Array.from(
          panel?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ??
            [],
        ),
      ].filter((el): el is HTMLElement => Boolean(el));
      if (focusable.length < 2) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openKey, baseId, onOpenKeyChange]);

  const navItemClass =
    "inline-flex items-center gap-[5px] whitespace-nowrap rounded-lg px-3 py-[9px] text-[15px] font-medium text-[#292524] transition-[background,color] duration-[180ms] ease hover:bg-[#F0EBE3] hover:text-[var(--color-brand)]";

  return (
    <div ref={barRef} className="flex min-w-0 flex-1 items-center justify-end">
      <nav aria-label="Primary" className="flex min-w-0 items-center justify-end gap-0.5">
        {items.map((node) => {
          if (node.kind === "simple") {
            return (
              <NavLeaf
                key={node.key}
                item={node.link}
                className={navItemClass}
                onMouseEnter={() => onOpenKeyChange(null)}
              />
            );
          }

          const panelId = `${baseId}-panel-${node.key}`;
          const buttonId = `${baseId}-btn-${node.key}`;
          const isOpen = openKey === node.key;
          const intro = GROUP_INTRO[node.groupLabel];
          const [colA, colB] = splitColumns(node.children);
          const itemClass =
            "block rounded-lg px-3 py-[9px] text-[15px] font-medium text-[#292524] hover:bg-[#F0EBE3] hover:text-[var(--color-brand)]";
          const landingLink = groupLandingLink(node);
          const chevron = (
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              aria-hidden
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          );

          return (
            <div key={node.key}>
              {landingLink ? (
                <NavLeaf
                  item={landingLink}
                  className={navItemClass}
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-haspopup="menu"
                  aria-controls={panelId}
                  onMouseEnter={() => onOpenKeyChange(node.key)}
                  onNavigate={() => onOpenKeyChange(null)}
                >
                  {chevron}
                </NavLeaf>
              ) : (
                <button
                  type="button"
                  id={buttonId}
                  className={navItemClass}
                  aria-expanded={isOpen}
                  aria-haspopup="menu"
                  aria-controls={panelId}
                  onClick={() => onOpenKeyChange(isOpen ? null : node.key)}
                  onMouseEnter={() => onOpenKeyChange(node.key)}
                >
                  {node.groupLabel}
                  {chevron}
                </button>
              )}
              {isOpen ? (
                <div
                  id={panelId}
                  role="menu"
                  aria-labelledby={buttonId}
                  className="absolute top-full left-6 right-6 z-50 pt-2"
                  onMouseEnter={onPanelEnter}
                >
                  <div className="grid grid-cols-[1.1fr_1fr_1fr] gap-8 rounded-b-[18px] border border-[var(--color-border)] border-t-[3px] border-t-[var(--color-gold)] bg-[var(--color-surface)] px-[30px] py-7 shadow-[0_24px_48px_-16px_rgba(108,20,44,.22)]">
                    <div>
                      {intro ? (
                        <>
                          <p className="text-[11.5px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
                            {intro.eyebrow}
                          </p>
                          <h3 className="mt-2.5 text-[22px] leading-[1.25] text-[var(--color-heading)]">
                            {intro.title}
                          </h3>
                          <p className="mt-2.5 text-[14.5px] leading-[1.6] text-[var(--color-ink-muted)]">
                            {intro.body}
                          </p>
                        </>
                      ) : (
                        <p className="text-[11.5px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
                          {node.groupLabel}
                        </p>
                      )}
                      {node.landing ? (
                        <NavLeaf
                          item={node.landing}
                          className="mt-3.5 inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-hover)]"
                          onNavigate={() => onOpenKeyChange(null)}
                        />
                      ) : null}
                    </div>
                    <ul className="flex flex-col gap-px">
                      {colA.map((child) => (
                        <li key={`${node.key}-${child.href}-${child.label}`}>
                          <NavLeaf
                            item={child}
                            className={itemClass}
                            onNavigate={() => onOpenKeyChange(null)}
                          />
                        </li>
                      ))}
                    </ul>
                    <ul className="flex flex-col gap-px">
                      {colB.map((child) => (
                        <li key={`${node.key}-${child.href}-${child.label}`}>
                          <NavLeaf
                            item={child}
                            className={itemClass}
                            onNavigate={() => onOpenKeyChange(null)}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>
    </div>
  );
}

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function SiteHeader({
  schoolName,
  primaryNav,
  links,
}: {
  schoolName: string;
  primaryNav: ResolvedNavPrimaryItem[];
  links?: SiteHeaderLinks;
}) {
  const [open, setOpen] = useState(false);
  const [desktopOpenKey, setDesktopOpenKey] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeMobile = useCallback(() => setOpen(false), []);
  const cancelCloseDesktop = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);
  const scheduleCloseDesktop = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      closeTimer.current = null;
      setDesktopOpenKey(null);
    }, 180);
  }, []);
  const setDesktopOpenKeyNow = useCallback((key: string | null) => {
    cancelCloseDesktop();
    setDesktopOpenKey(key);
  }, [cancelCloseDesktop]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);
  const phone = links?.phone?.trim() || "09 427 9189";
  const email = links?.email?.trim() || "achieve@stellamaris.school.nz";

  const utilityLinkClass =
    "text-[rgba(250,248,245,.82)] transition-colors hover:text-[#FAF8F5]";

  const mobileLink =
    "flex min-h-[52px] items-center rounded-[10px] px-3.5 py-3 text-[17px] font-semibold text-[#292524] hover:bg-[#F0EBE3]";
  const mobileSub =
    "flex min-h-[52px] items-center rounded-[10px] py-3 pr-3.5 pl-7 text-base font-medium text-[var(--color-ink-muted)] hover:bg-[#F0EBE3]";

  return (
    <>
      <a
        href="#main"
        className="absolute top-0 left-[-9999px] z-60 rounded-br-[10px] bg-[var(--color-brand)] px-5 py-3 text-[15px] font-semibold text-[var(--color-cream)] focus:left-0"
      >
        Skip to main content
      </a>
      <div className="bg-[var(--color-brand-muted)] text-[13px] text-[rgba(250,248,245,.82)]">
        <div className="page-wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-2">
          <div className="flex flex-wrap items-center gap-5">
            <a href={telHref(phone)} className={`${utilityLinkClass} inline-flex items-center gap-[7px]`}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
              </svg>
              {phone}
            </a>
            <a href={`mailto:${email}`} className={`${utilityLinkClass} inline-flex items-center gap-[7px]`}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m2 7 10 6 10-6" />
              </svg>
              {email}
            </a>
          </div>
          <div className="hidden items-center gap-[18px] min-[721px]:flex">
            <Link href="/absences" className={utilityLinkClass}>
              Report an absence
            </Link>
            {links?.heroAppUrl ? (
              <a href={links.heroAppUrl} className={utilityLinkClass} target="_blank" rel="noreferrer noopener">
                Hero app
              </a>
            ) : null}
            {links?.newsletterUrl ? (
              <a href={links.newsletterUrl} className={utilityLinkClass} target="_blank" rel="noreferrer noopener">
                Newsletters
              </a>
            ) : null}
            {links?.termDatesUrl ? (
              <a href={links.termDatesUrl} className={utilityLinkClass} target="_blank" rel="noreferrer noopener">
                Term dates
              </a>
            ) : null}
          </div>
        </div>
      </div>
      <header
        className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[rgba(255,252,247,.96)] shadow-[0_1px_0_rgba(108,20,44,.04)] backdrop-blur-[10px]"
        onMouseEnter={cancelCloseDesktop}
        onMouseLeave={scheduleCloseDesktop}
      >
        <div className="page-wrap relative flex items-center justify-between gap-4 py-[22px]">
          <Link href="/" aria-label={`${schoolName} — Home`} className="block shrink-0">
            <BrandMark priority className="h-[62px] w-auto" />
          </Link>
          <div className="hidden min-w-0 flex-1 items-center justify-end gap-2.5 min-[941px]:flex">
            <DesktopPrimaryNav
              items={primaryNav}
              openKey={desktopOpenKey}
              onOpenKeyChange={setDesktopOpenKeyNow}
              onPanelEnter={cancelCloseDesktop}
            />
            <Link
              href="/enrolment"
              className="shrink-0 rounded-full bg-[var(--color-brand)] px-5 py-2.5 text-[14px] font-semibold text-[var(--color-cream)] hover:bg-[var(--color-brand-hover)] hover:text-[var(--color-cream)]"
            >
              Enrol now
            </Link>
          </div>
          <div className="flex items-center gap-2.5 min-[941px]:hidden">
            <Link
              href="/enrolment"
              className="hidden rounded-full bg-[var(--color-brand)] px-5 py-2.5 text-[14px] font-semibold text-[var(--color-cream)] hover:bg-[var(--color-brand-hover)] hover:text-[var(--color-cream)] min-[560px]:inline-flex"
            >
              Enrol now
            </Link>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-[10px] border border-[var(--color-border)]"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6C142C" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                {open ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {open ? (
          <div
            id="mobile-nav"
            className="max-h-[70vh] overflow-y-auto border-t border-[var(--color-border)] bg-[var(--color-surface)] min-[941px]:hidden"
          >
            <div className="flex flex-col gap-0.5 px-6 pt-3.5 pb-5.5">
              {primaryNav.map((node) => {
                if (node.kind === "simple") {
                  return (
                    <NavLeaf
                      key={node.key}
                      item={node.link}
                      className={mobileLink}
                      onNavigate={closeMobile}
                    />
                  );
                }
                const landingLink = groupLandingLink(node);
                return (
                  <div key={node.key}>
                    {landingLink ? (
                      <NavLeaf
                        item={landingLink}
                        className={mobileLink}
                        onNavigate={closeMobile}
                      />
                    ) : (
                      <p className={mobileLink}>{node.groupLabel}</p>
                    )}
                    {node.children.map((child) => (
                      <NavLeaf
                        key={`${node.key}-${child.href}-${child.label}`}
                        item={child}
                        className={mobileSub}
                        onNavigate={closeMobile}
                      />
                    ))}
                  </div>
                );
              })}
              <div className="mt-3.5 grid grid-cols-2 gap-2.5">
                <Link
                  href="/absences"
                  className="flex min-h-[52px] items-center justify-center rounded-full border border-[var(--color-border)] px-4 py-3 text-[15px] font-semibold text-[var(--color-heading)] hover:border-[rgb(172_151_63/0.6)]"
                  onClick={closeMobile}
                >
                  Report absence
                </Link>
                <Link
                  href="/enrolment"
                  className="flex min-h-[52px] items-center justify-center rounded-full bg-[var(--color-brand)] px-4 py-3 text-[15px] font-semibold text-[var(--color-cream)] hover:bg-[var(--color-brand-hover)] hover:text-[var(--color-cream)]"
                  onClick={closeMobile}
                >
                  Enrol now
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </header>
    </>
  );
}

"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

export type SiteAlertProps = {
  severity: "info" | "warning" | "critical" | null;
  title: string | null;
  message: string | null;
  linkLabel: string | null;
  linkUrl: string | null;
  dismissKey: string;
};

const DISMISS_EVENT = "stella-maris-alert-dismiss";

const severityStyles = {
  info: "bg-[var(--color-brand)] text-[var(--color-cream)]",
  warning: "bg-amber-700 text-white",
  critical: "bg-red-800 text-white",
} as const;

function storageKey(dismissKey: string) {
  return `stella-maris-alert-${dismissKey}`;
}

function readDismissed(dismissKey: string) {
  try {
    return localStorage.getItem(storageKey(dismissKey)) === "1";
  } catch {
    return false;
  }
}

function subscribeDismiss(callback: () => void) {
  const handler = () => callback();
  window.addEventListener(DISMISS_EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(DISMISS_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

export function SiteAlert(props: SiteAlertProps) {
  const { severity, title, message, linkLabel, linkUrl, dismissKey } = props;

  const dismissed = useSyncExternalStore(
    subscribeDismiss,
    () => readDismissed(dismissKey),
    () => false,
  );

  if (!title && !message) return null;
  if (dismissed) return null;

  const level = severity && severity in severityStyles ? severity : "info";
  const barClass = severityStyles[level];

  function dismiss() {
    try {
      localStorage.setItem(storageKey(dismissKey), "1");
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event(DISMISS_EVENT));
  }

  return (
    <div
      role="region"
      aria-label="Important notice"
      className={`${barClass} relative z-50 px-4 py-3 text-sm shadow-md`}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="min-w-0 flex-1 pr-8 sm:pr-0">
          {title ? <p className="font-semibold">{title}</p> : null}
          {message ? (
            <p className="mt-1 whitespace-pre-wrap opacity-95">{message}</p>
          ) : null}
          {linkLabel && linkUrl ? (
            <p className="mt-2">
              <Link
                href={linkUrl}
                className="font-medium underline underline-offset-2 hover:opacity-90"
              >
                {linkLabel}
              </Link>
            </p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-3 top-3 shrink-0 rounded-md px-2 py-1 text-xs font-medium opacity-90 ring-1 ring-white/30 hover:bg-white/10 sm:static sm:self-center"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}

export type SiteSettingsAlertFields = {
  alertEnabled?: boolean | null;
  alertTitle?: string | null;
  alertMessage?: string | null;
  alertStart?: string | null;
  alertEnd?: string | null;
};

export function isSiteAlertActive(settings: SiteSettingsAlertFields) {
  if (!settings.alertEnabled) return false;
  if (!settings.alertTitle?.trim() && !settings.alertMessage?.trim()) {
    return false;
  }
  const now = Date.now();
  if (settings.alertStart && new Date(settings.alertStart).getTime() > now) {
    return false;
  }
  if (settings.alertEnd && new Date(settings.alertEnd).getTime() < now) {
    return false;
  }
  return true;
}

export function siteAlertDismissKey(settings: SiteSettingsAlertFields) {
  return [
    settings.alertTitle ?? "",
    settings.alertMessage ?? "",
    settings.alertEnd ?? "",
  ]
    .join("¦")
    .slice(0, 240);
}

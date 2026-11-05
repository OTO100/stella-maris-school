export const HERO_APP_STORE_FALLBACK =
  "https://apps.apple.com/nz/app/hero-by-linc-ed/id1470011260";
export const HERO_PLAY_STORE_FALLBACK =
  "https://play.google.com/store/apps/details?id=com.linced.hero";
export const KINDO_DESCRIPTION_FALLBACK = "PTFA payments, orders and lunches";
export const ABSENCE_EMAIL_FALLBACK = "absences@stellamaris.school.nz";
export const PTFA_EMAIL_FALLBACK = "stellaptfa@stellamaris.school.nz";
export const BOARD_EMAIL_FALLBACK = "BOT@stellamaris.school.nz";

type Settings = Record<string, unknown> | null | undefined;

export function heroStoreLinks(settings: Settings) {
  return {
    appStore: (settings?.heroAppStoreUrl as string | undefined) || HERO_APP_STORE_FALLBACK,
    playStore: (settings?.heroPlayStoreUrl as string | undefined) || HERO_PLAY_STORE_FALLBACK,
  };
}

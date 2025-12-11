import "server-only";

export async function getDictionary(locale: string) {
  return import(`../locales/${locale}/common.json`).then((m) => m.default);
}

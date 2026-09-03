export function formatEuro(value: number, locale = 'de-DE'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
}

export function formatNumber(value: number, locale = 'de-DE'): string {
  return new Intl.NumberFormat(locale).format(value);
}

export function formatZehntelsatz(value: number, locale = 'de-DE'): string {
  return value % 1 === 0 ? `${value}/10` : `${value.toLocaleString(locale)}/10`;
}

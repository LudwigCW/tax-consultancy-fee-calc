import { getTableAFee, getTableBFee } from '../data/feeTables';

export interface CalculatorInputs {
  umsatz: number;
  bilanzsumme: number;
  gewerbeertrag: number;
  zuVersteuerndesEinkommen: number;
}

export interface Zehntelsaetze {
  jahresabschluss: number;
  umsatzsteuer: number;
  koerperschaftsteuer: number;
  gewerbesteuer: number;
}

export interface FeeLineItem {
  id: keyof Zehntelsaetze;
  gegenstandswert: number;
  volleGebuehr: number;
  zehntelsatz: number;
  gebuehr: number;
  auslagen: number;
  netto: number;
}

export interface FeeSummary {
  items: FeeLineItem[];
  nettoHonorar: number;
  auslagenGesamt: number;
  nettoGesamt: number;
  ust: number;
  bruttoGesamt: number;
}

const MIN_JAHRESABSCHLUSS = 30_000;
const MIN_STEUERERKLAERUNG = 8_000;
const AUSLAGEN_RATE = 0.2;
const AUSLAGEN_MAX = 20;
const VAT_RATE = 0.19;

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function calculateAuslagen(gebuehr: number): number {
  return Math.min(round2(gebuehr * AUSLAGEN_RATE), AUSLAGEN_MAX);
}

export function calculateFees(
  inputs: CalculatorInputs,
  zehntelsaetze: Zehntelsaetze,
): FeeSummary {
  const jahresabschlussGegenstandswert = Math.max(
    MIN_JAHRESABSCHLUSS,
    (inputs.bilanzsumme + inputs.umsatz) / 2,
  );

  const umsatzsteuerGegenstandswert = Math.max(
    MIN_STEUERERKLAERUNG,
    inputs.umsatz * 0.1,
  );

  const koerperschaftsteuerGegenstandswert = Math.max(
    MIN_STEUERERKLAERUNG,
    inputs.zuVersteuerndesEinkommen,
  );

  const gewerbesteuerGegenstandswert = Math.max(
    MIN_STEUERERKLAERUNG,
    inputs.gewerbeertrag,
  );

  const definitions: Array<{
    id: keyof Zehntelsaetze;
    gegenstandswert: number;
    volleGebuehr: number;
    zehntelsatz: number;
  }> = [
    {
      id: 'jahresabschluss',
      gegenstandswert: jahresabschlussGegenstandswert,
      volleGebuehr: getTableBFee(jahresabschlussGegenstandswert),
      zehntelsatz: zehntelsaetze.jahresabschluss,
    },
    {
      id: 'umsatzsteuer',
      gegenstandswert: umsatzsteuerGegenstandswert,
      volleGebuehr: getTableAFee(umsatzsteuerGegenstandswert),
      zehntelsatz: zehntelsaetze.umsatzsteuer,
    },
    {
      id: 'koerperschaftsteuer',
      gegenstandswert: koerperschaftsteuerGegenstandswert,
      volleGebuehr: getTableAFee(koerperschaftsteuerGegenstandswert),
      zehntelsatz: zehntelsaetze.koerperschaftsteuer,
    },
    {
      id: 'gewerbesteuer',
      gegenstandswert: gewerbesteuerGegenstandswert,
      volleGebuehr: getTableAFee(gewerbesteuerGegenstandswert),
      zehntelsatz: zehntelsaetze.gewerbesteuer,
    },
  ];

  const items: FeeLineItem[] = definitions.map((entry) => {
    const gebuehr = round2(entry.volleGebuehr * (entry.zehntelsatz / 10));
    const auslagen = calculateAuslagen(gebuehr);
    return {
      ...entry,
      gebuehr,
      auslagen,
      netto: round2(gebuehr + auslagen),
    };
  });

  const nettoHonorar = round2(items.reduce((sum, item) => sum + item.gebuehr, 0));
  const auslagenGesamt = round2(items.reduce((sum, item) => sum + item.auslagen, 0));
  const nettoGesamt = round2(nettoHonorar + auslagenGesamt);
  const ust = round2(nettoGesamt * VAT_RATE);
  const bruttoGesamt = round2(nettoGesamt + ust);

  return {
    items,
    nettoHonorar,
    auslagenGesamt,
    nettoGesamt,
    ust,
    bruttoGesamt,
  };
}

export const DEFAULT_ZEHNTELSAETZE: Zehntelsaetze = {
  jahresabschluss: 25,
  umsatzsteuer: 4.5,
  koerperschaftsteuer: 5,
  gewerbesteuer: 3.5,
};

export const ZEHNTEL_RANGES: Record<keyof Zehntelsaetze, { min: number; max: number }> = {
  jahresabschluss: { min: 10, max: 40 },
  umsatzsteuer: { min: 1, max: 8 },
  koerperschaftsteuer: { min: 2, max: 8 },
  gewerbesteuer: { min: 1, max: 6 },
};

export const EXAMPLE_INPUTS: CalculatorInputs = {
  umsatz: 240_000,
  bilanzsumme: 120_000,
  gewerbeertrag: 12_000,
  zuVersteuerndesEinkommen: 12_000,
};

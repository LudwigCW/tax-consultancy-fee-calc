export interface TableRow {
  threshold: number;
  fee: number;
}

/** StBVV 2025 – Tabelle A (Beratungstabelle) */
export const TABLE_A: TableRow[] = [
  { threshold: 300, fee: 31 },
  { threshold: 600, fee: 56 },
  { threshold: 900, fee: 81 },
  { threshold: 1200, fee: 106 },
  { threshold: 1500, fee: 130 },
  { threshold: 2000, fee: 166 },
  { threshold: 2500, fee: 200 },
  { threshold: 3000, fee: 235 },
  { threshold: 3500, fee: 270 },
  { threshold: 4000, fee: 305 },
  { threshold: 4500, fee: 340 },
  { threshold: 5000, fee: 375 },
  { threshold: 6000, fee: 422 },
  { threshold: 7000, fee: 467 },
  { threshold: 8000, fee: 514 },
  { threshold: 9000, fee: 560 },
  { threshold: 10000, fee: 605 },
  { threshold: 13000, fee: 655 },
  { threshold: 16000, fee: 705 },
  { threshold: 19000, fee: 755 },
  { threshold: 22000, fee: 805 },
  { threshold: 25000, fee: 854 },
  { threshold: 30000, fee: 946 },
  { threshold: 35000, fee: 1036 },
  { threshold: 40000, fee: 1125 },
  { threshold: 45000, fee: 1215 },
  { threshold: 50000, fee: 1304 },
  { threshold: 65000, fee: 1399 },
  { threshold: 80000, fee: 1496 },
  { threshold: 95000, fee: 1592 },
  { threshold: 110000, fee: 1689 },
  { threshold: 125000, fee: 1784 },
  { threshold: 140000, fee: 1879 },
  { threshold: 155000, fee: 1976 },
  { threshold: 170000, fee: 2071 },
  { threshold: 185000, fee: 2168 },
  { threshold: 200000, fee: 2264 },
  { threshold: 230000, fee: 2412 },
  { threshold: 260000, fee: 2559 },
  { threshold: 290000, fee: 2705 },
  { threshold: 320000, fee: 2859 },
  { threshold: 350000, fee: 2926 },
  { threshold: 380000, fee: 2990 },
  { threshold: 410000, fee: 3055 },
  { threshold: 440000, fee: 3115 },
  { threshold: 470000, fee: 3175 },
  { threshold: 500000, fee: 3234 },
  { threshold: 550000, fee: 3320 },
  { threshold: 600000, fee: 3404 },
];

/** StBVV 2025 – Tabelle B (Abschlusstabelle) */
export const TABLE_B: TableRow[] = [
  { threshold: 3000, fee: 49 },
  { threshold: 3500, fee: 57 },
  { threshold: 4000, fee: 68 },
  { threshold: 4500, fee: 76 },
  { threshold: 5000, fee: 86 },
  { threshold: 6000, fee: 96 },
  { threshold: 7000, fee: 105 },
  { threshold: 8000, fee: 116 },
  { threshold: 9000, fee: 121 },
  { threshold: 10000, fee: 127 },
  { threshold: 12500, fee: 134 },
  { threshold: 15000, fee: 151 },
  { threshold: 17500, fee: 166 },
  { threshold: 20000, fee: 178 },
  { threshold: 22500, fee: 191 },
  { threshold: 25000, fee: 201 },
  { threshold: 37500, fee: 215 },
  { threshold: 50000, fee: 263 },
  { threshold: 62500, fee: 303 },
  { threshold: 75000, fee: 338 },
  { threshold: 87500, fee: 353 },
  { threshold: 100000, fee: 369 },
  { threshold: 125000, fee: 423 },
  { threshold: 150000, fee: 471 },
  { threshold: 175000, fee: 512 },
  { threshold: 200000, fee: 548 },
  { threshold: 225000, fee: 582 },
  { threshold: 250000, fee: 613 },
  { threshold: 300000, fee: 641 },
  { threshold: 350000, fee: 696 },
  { threshold: 400000, fee: 746 },
  { threshold: 450000, fee: 791 },
  { threshold: 500000, fee: 832 },
  { threshold: 625000, fee: 871 },
  { threshold: 750000, fee: 968 },
  { threshold: 875000, fee: 1050 },
  { threshold: 1000000, fee: 1126 },
  { threshold: 1250000, fee: 1194 },
  { threshold: 1500000, fee: 1324 },
  { threshold: 1750000, fee: 1438 },
  { threshold: 2000000, fee: 1542 },
  { threshold: 2250000, fee: 1635 },
  { threshold: 2500000, fee: 1718 },
  { threshold: 3000000, fee: 1797 },
  { threshold: 3500000, fee: 1951 },
  { threshold: 4000000, fee: 2089 },
  { threshold: 4500000, fee: 2214 },
  { threshold: 5000000, fee: 2328 },
  { threshold: 7500000, fee: 2720 },
  { threshold: 10000000, fee: 3162 },
  { threshold: 12500000, fee: 3520 },
  { threshold: 15000000, fee: 3819 },
  { threshold: 17500000, fee: 4074 },
  { threshold: 20000000, fee: 4293 },
  { threshold: 22500000, fee: 4573 },
  { threshold: 25000000, fee: 4831 },
  { threshold: 30000000, fee: 5315 },
  { threshold: 35000000, fee: 5759 },
  { threshold: 40000000, fee: 6172 },
  { threshold: 45000000, fee: 6558 },
  { threshold: 50000000, fee: 6923 },
];

function startedUnits(amount: number, unitSize: number): number {
  if (amount <= 0) return 0;
  return Math.ceil(amount / unitSize);
}

function lookupBaseFee(value: number, table: TableRow[]): number {
  for (const row of table) {
    if (value <= row.threshold) {
      return row.fee;
    }
  }

  const lastRow = table[table.length - 1];
  return lastRow.fee;
}

/** Volle Gebühr (10/10) nach Tabelle A – § 13 StBVV (nächsthöhere Stufe) */
export function getTableAFee(gegenstandswert: number): number {
  const cappedValue = Math.max(0, gegenstandswert);

  if (cappedValue <= TABLE_A[TABLE_A.length - 1].threshold) {
    return lookupBaseFee(cappedValue, TABLE_A);
  }

  let fee = TABLE_A[TABLE_A.length - 1].fee;
  let remaining = cappedValue - 600_000;

  if (remaining > 0) {
    const upTo5M = Math.min(remaining, 4_400_000);
    fee += startedUnits(upTo5M, 50_000) * 149;
    remaining -= upTo5M;
  }

  if (remaining > 0) {
    const upTo25M = Math.min(remaining, 20_000_000);
    fee += startedUnits(upTo25M, 50_000) * 112;
    remaining -= upTo25M;
  }

  if (remaining > 0) {
    fee += startedUnits(remaining, 50_000) * 88;
  }

  return fee;
}

/** Volle Gebühr (10/10) nach Tabelle B – § 13 StBVV (nächsthöhere Stufe) */
export function getTableBFee(gegenstandswert: number): number {
  const cappedValue = Math.max(0, gegenstandswert);

  if (cappedValue <= TABLE_B[TABLE_B.length - 1].threshold) {
    return lookupBaseFee(cappedValue, TABLE_B);
  }

  let fee = TABLE_B[TABLE_B.length - 1].fee;
  let remaining = cappedValue - 50_000_000;

  if (remaining > 0) {
    const upTo125M = Math.min(remaining, 75_000_000);
    fee += startedUnits(upTo125M, 5_000_000) * 273;
    remaining -= upTo125M;
  }

  if (remaining > 0) {
    const upTo250M = Math.min(remaining, 125_000_000);
    fee += startedUnits(upTo250M, 12_500_000) * 477;
    remaining -= upTo250M;
  }

  if (remaining > 0) {
    fee += startedUnits(remaining, 25_000_000) * 681;
  }

  return fee;
}

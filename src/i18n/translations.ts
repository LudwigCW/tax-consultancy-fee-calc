import type { Zehntelsaetze } from '../lib/calculateFees';

export type Language = 'de' | 'zh';

export interface TranslationKeys {
  meta: {
    title: string;
    description: string;
  };
  language: {
    de: string;
    zh: string;
    switchLabel: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    text: string;
    loadExample: string;
  };
  sections: {
    companyData: string;
    zehntelsaetze: {
      title: string;
      intro: string;
      resetDefaults: string;
    };
    results: string;
    howItWorks: string;
  };
  inputs: {
    umsatz: { label: string; hint: string };
    bilanzsumme: { label: string; hint: string };
    gewerbeertrag: { label: string; hint: string };
    zuVersteuerndesEinkommen: { label: string; hint: string };
  };
  services: Record<keyof Zehntelsaetze, string>;
  zehntelRanges: Record<
    keyof Zehntelsaetze,
    { label: string; hint: string }
  >;
  table: {
    service: string;
    gegenstandswert: string;
    volleGebuehr: string;
    zehntelsatz: string;
    gebuehr: string;
    auslagen: string;
    netto: string;
  };
  summary: {
    nettoHonorar: string;
    auslagenGesamt: string;
    nettoGesamt: string;
    ust: string;
    bruttoGesamt: string;
    effectiveCost: string;
  };
  steps: Array<{ title: string; text: string }>;
  disclaimer: string;
}

export const translations: Record<Language, TranslationKeys> = {
  de: {
    meta: {
      title: 'StBVV Gebührenrechner',
      description:
        'Online-Rechner für Steuerberatergebühren nach StBVV 2025 – Jahresabschluss, Umsatzsteuer, Körperschaftsteuer und Gewerbesteuer.',
    },
    language: {
      de: 'Deutsch',
      zh: '中文',
      switchLabel: 'Sprache',
    },
    hero: {
      eyebrow: 'StBVV 2025 · Gebührenrechner',
      title: 'Steuerberatergebühren berechnen',
      text: 'Berechnung nach der Steuerberatervergütungsverordnung für Jahresabschluss, Umsatzsteuer-, Körperschaftsteuer- und Gewerbesteuererklärung.',
      loadExample: 'Beispiel laden',
    },
    sections: {
      companyData: 'Unternehmensdaten',
      zehntelsaetze: {
        title: 'Zehntelsätze',
        intro:
          'Der Steuerberater wählt innerhalb des gesetzlichen Rahmens den Satz nach Aufwand, Schwierigkeit und Haftungsrisiko. Voreingestellt sind die branchenüblichen Mittelgebühren.',
        resetDefaults: 'Standard-Zehntelsätze',
      },
      results: 'Ergebnis',
      howItWorks: 'So wird gerechnet',
    },
    inputs: {
      umsatz: {
        label: 'Umsatz (Jahresleistung)',
        hint: 'Für USt-Gegenstandswert: 10 % des Umsatzes (mind. 8.000 €)',
      },
      bilanzsumme: {
        label: 'Bilanzsumme',
        hint: 'Für Jahresabschluss: Mittel aus Bilanzsumme und Umsatz (mind. 30.000 €)',
      },
      gewerbeertrag: {
        label: 'Gewerbeertrag',
        hint: 'Gegenstandswert Gewerbesteuer (mind. 8.000 €)',
      },
      zuVersteuerndesEinkommen: {
        label: 'Zu versteuerndes Einkommen',
        hint: 'Gegenstandswert Körperschaftsteuer (mind. 8.000 €)',
      },
    },
    services: {
      jahresabschluss: 'Jahresabschluss (Bilanz/GuV)',
      umsatzsteuer: 'Umsatzsteuererklärung',
      koerperschaftsteuer: 'Körperschaftsteuererklärung',
      gewerbesteuer: 'Gewerbesteuererklärung',
    },
    zehntelRanges: {
      jahresabschluss: {
        label: 'Jahresabschluss',
        hint: 'Gesetzlicher Rahmen: 10/10 bis 40/10 · Mittelgebühr: 25/10',
      },
      umsatzsteuer: {
        label: 'Umsatzsteuererklärung',
        hint: 'Gesetzlicher Rahmen: 1/10 bis 8/10 · Mittelgebühr: 4,5/10',
      },
      koerperschaftsteuer: {
        label: 'Körperschaftsteuererklärung',
        hint: 'Gesetzlicher Rahmen: 2/10 bis 8/10 · Mittelgebühr: 5/10',
      },
      gewerbesteuer: {
        label: 'Gewerbesteuererklärung',
        hint: 'Gesetzlicher Rahmen: 1/10 bis 6/10 · Mittelgebühr: 3,5/10',
      },
    },
    table: {
      service: 'Leistung',
      gegenstandswert: 'Gegenstandswert',
      volleGebuehr: 'Tabellenwert (10/10)',
      zehntelsatz: 'Zehntelsatz',
      gebuehr: 'Gebühr',
      auslagen: 'Auslagen',
      netto: 'Netto',
    },
    summary: {
      nettoHonorar: 'Netto-Honorar',
      auslagenGesamt: 'Auslagenpauschale gesamt',
      nettoGesamt: 'Netto gesamt',
      ust: 'Umsatzsteuer (19 %)',
      bruttoGesamt: 'Brutto-Rechnungsbetrag',
      effectiveCost: 'Effektive Kosten nach Vorsteuerabzug',
    },
    steps: [
      {
        title: 'Gegenstandswert ermitteln',
        text: 'Jahresabschluss: Mittel aus Bilanzsumme und Umsatz (min. 30.000 €). USt: 10 % des Umsatzes. KSt und GewSt: Einkommen bzw. Gewerbeertrag (jeweils min. 8.000 €).',
      },
      {
        title: 'Volle Gebühr ablesen',
        text: 'Steuererklärungen nach Tabelle A, Jahresabschluss nach Tabelle B (StBVV 2025). Liegt der Wert zwischen zwei Stufen, gilt die nächsthöhere Stufe (§ 13 StBVV).',
      },
      {
        title: 'Mit Zehntelsatz multiplizieren',
        text: 'Honorar = volle Gebühr × gewählter Zehntelsatz ÷ 10.',
      },
      {
        title: 'Auslagen & USt addieren',
        text: 'Auslagenpauschale: 20 % der Gebühr, max. 20 € pro Angelegenheit. Anschließend 19 % Umsatzsteuer auf die Netto-Summe.',
      },
    ],
    disclaimer:
      'Hinweis: Dieser Rechner dient der Orientierung. Die verbindliche Gebühr richtet sich nach der individuellen Mandatssituation und der Abrechnung durch den Steuerberater.',
  },
  zh: {
    meta: {
      title: 'StBVV 费用计算器',
      description:
        '根据德国《税务顾问报酬条例》(StBVV 2025) 在线计算税务顾问费用——年的报表、增值税、企业所得税和营业税。',
    },
    language: {
      de: 'Deutsch',
      zh: '中文',
      switchLabel: '语言',
    },
    hero: {
      eyebrow: 'StBVV 2025 · 费用计算器',
      title: '计算税务顾问费用',
      text: '依据《税务顾问报酬条例》(StBVV) 计算年的报表、增值税申报、企业所得税申报和营业税申报的费用。',
      loadExample: '加载示例',
    },
    sections: {
      companyData: '企业数据',
      zehntelsaetze: {
        title: '十分率',
        intro:
          '税务顾问在法定范围内根据工作量、复杂程度和责任风险选择费率。默认设置为行业常用的中等费用率。',
        resetDefaults: '恢复默认十分率',
      },
      results: '计算结果',
      howItWorks: '计算方式',
    },
    inputs: {
      umsatz: {
        label: '营业额（年度业绩）',
        hint: '增值税标的额：营业额的 10%（最低 8.000 €）',
      },
      bilanzsumme: {
        label: '资产负债表总额',
        hint: '年的报表标的额：资产负债表总额与营业额的平均值（最低 30.000 €）',
      },
      gewerbeertrag: {
        label: '营业收益',
        hint: '营业税标的额（最低 8.000 €）',
      },
      zuVersteuerndesEinkommen: {
        label: '应税收入',
        hint: '企业所得税标的额（最低 8.000 €）',
      },
    },
    services: {
      jahresabschluss: '年的报表（资产负债表/损益表）',
      umsatzsteuer: '增值税申报',
      koerperschaftsteuer: '企业所得税申报',
      gewerbesteuer: '营业税申报',
    },
    zehntelRanges: {
      jahresabschluss: {
        label: '年的报表',
        hint: '法定范围：10/10 至 40/10 · 中等费用：25/10',
      },
      umsatzsteuer: {
        label: '增值税申报',
        hint: '法定范围：1/10 至 8/10 · 中等费用：4,5/10',
      },
      koerperschaftsteuer: {
        label: '企业所得税申报',
        hint: '法定范围：2/10 至 8/10 · 中等费用：5/10',
      },
      gewerbesteuer: {
        label: '营业税申报',
        hint: '法定范围：1/10 至 6/10 · 中等费用：3,5/10',
      },
    },
    table: {
      service: '服务项目',
      gegenstandswert: '标的额',
      volleGebuehr: '表格值 (10/10)',
      zehntelsatz: '十分率',
      gebuehr: '费用',
      auslagen: '代垫费用',
      netto: '净额',
    },
    summary: {
      nettoHonorar: '净报酬',
      auslagenGesamt: '代垫费用合计',
      nettoGesamt: '净额合计',
      ust: '增值税 (19 %)',
      bruttoGesamt: '含税发票总额',
      effectiveCost: '抵扣进项税后实际成本',
    },
    steps: [
      {
        title: '确定标的额',
        text: '年的报表：资产负债表总额与营业额的平均值（最低 30.000 €）。增值税：营业额的 10%。企业所得税和营业税：分别为应税收入和营业收益（各最低 8.000 €）。',
      },
      {
        title: '查表确定全额费用',
        text: '税务申报适用 A 表，年的报表适用 B 表（StBVV 2025）。若标的额介于两档之间，适用较高一档（§ 13 StBVV）。',
      },
      {
        title: '乘以十分率',
        text: '报酬 = 全额费用 × 所选十分率 ÷ 10。',
      },
      {
        title: '加上代垫费用和增值税',
        text: '代垫费用：费用的 20%，每项最高 20 €。随后在净额基础上加 19% 增值税。',
      },
    ],
    disclaimer:
      '提示：本计算器仅供参考。最终费用取决于具体委托情况以及税务顾问的实际账单。',
  },
};

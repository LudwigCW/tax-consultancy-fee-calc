import { useEffect, useMemo, useState } from 'react';
import { CurrencyInput } from './components/CurrencyInput';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { ZehntelSlider } from './components/ZehntelSlider';
import { useLanguage } from './i18n/LanguageProvider';
import {
  calculateFees,
  DEFAULT_ZEHNTELSAETZE,
  EXAMPLE_INPUTS,
  ZEHNTEL_RANGES,
  type CalculatorInputs,
  type Zehntelsaetze,
} from './lib/calculateFees';
import { formatEuro, formatZehntelsatz } from './utils/format';
import './App.css';

function App() {
  const { language, setLanguage, t, locale } = useLanguage();
  const [inputs, setInputs] = useState<CalculatorInputs>(EXAMPLE_INPUTS);
  const [zehntelsaetze, setZehntelsaetze] = useState<Zehntelsaetze>(DEFAULT_ZEHNTELSAETZE);

  const summary = useMemo(
    () => calculateFees(inputs, zehntelsaetze),
    [inputs, zehntelsaetze],
  );

  useEffect(() => {
    document.title = t.meta.title;
  }, [t.meta.title]);

  const updateInput = <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) => {
    setInputs((current) => ({ ...current, [key]: value }));
  };

  const updateZehntel = <K extends keyof Zehntelsaetze>(key: K, value: number) => {
    setZehntelsaetze((current) => ({ ...current, [key]: value }));
  };

  const loadExample = () => {
    setInputs(EXAMPLE_INPUTS);
    setZehntelsaetze(DEFAULT_ZEHNTELSAETZE);
  };

  const resetZehntelsaetze = () => {
    setZehntelsaetze(DEFAULT_ZEHNTELSAETZE);
  };

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1>{t.hero.title}</h1>
          <p className="hero-text">{t.hero.text}</p>
        </div>
        <div className="hero-actions">
          <LanguageSwitcher
            language={language}
            onChange={setLanguage}
            label={t.language.switchLabel}
            deLabel={t.language.de}
            zhLabel={t.language.zh}
          />
          <button type="button" className="secondary-button" onClick={loadExample}>
            {t.hero.loadExample}
          </button>
        </div>
      </header>

      <main className="layout">
        <section className="panel">
          <h2>{t.sections.companyData}</h2>
          <div className="field-grid">
            <CurrencyInput
              id="umsatz"
              label={t.inputs.umsatz.label}
              value={inputs.umsatz}
              locale={locale}
              onChange={(value) => updateInput('umsatz', value)}
              hint={t.inputs.umsatz.hint}
            />
            <CurrencyInput
              id="bilanzsumme"
              label={t.inputs.bilanzsumme.label}
              value={inputs.bilanzsumme}
              locale={locale}
              onChange={(value) => updateInput('bilanzsumme', value)}
              hint={t.inputs.bilanzsumme.hint}
            />
            <CurrencyInput
              id="gewerbeertrag"
              label={t.inputs.gewerbeertrag.label}
              value={inputs.gewerbeertrag}
              locale={locale}
              onChange={(value) => updateInput('gewerbeertrag', value)}
              hint={t.inputs.gewerbeertrag.hint}
            />
            <CurrencyInput
              id="zvE"
              label={t.inputs.zuVersteuerndesEinkommen.label}
              value={inputs.zuVersteuerndesEinkommen}
              locale={locale}
              onChange={(value) => updateInput('zuVersteuerndesEinkommen', value)}
              hint={t.inputs.zuVersteuerndesEinkommen.hint}
            />
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h2>{t.sections.zehntelsaetze.title}</h2>
            <button type="button" className="secondary-button" onClick={resetZehntelsaetze}>
              {t.sections.zehntelsaetze.resetDefaults}
            </button>
          </div>
          <p className="panel-intro">{t.sections.zehntelsaetze.intro}</p>
          <div className="zehntel-grid">
            {(Object.keys(ZEHNTEL_RANGES) as Array<keyof Zehntelsaetze>).map((key) => {
              const range = ZEHNTEL_RANGES[key];
              const labels = t.zehntelRanges[key];
              return (
                <ZehntelSlider
                  key={key}
                  id={key}
                  label={labels.label}
                  hint={labels.hint}
                  min={range.min}
                  max={range.max}
                  value={zehntelsaetze[key]}
                  locale={locale}
                  onChange={(value) => updateZehntel(key, value)}
                />
              );
            })}
          </div>
        </section>

        <section className="panel results-panel">
          <h2>{t.sections.results}</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{t.table.service}</th>
                  <th>{t.table.gegenstandswert}</th>
                  <th>{t.table.volleGebuehr}</th>
                  <th>{t.table.zehntelsatz}</th>
                  <th>{t.table.gebuehr}</th>
                  <th>{t.table.auslagen}</th>
                  <th>{t.table.netto}</th>
                </tr>
              </thead>
              <tbody>
                {summary.items.map((item) => (
                  <tr key={item.id}>
                    <td>{t.services[item.id]}</td>
                    <td>{formatEuro(item.gegenstandswert, locale)}</td>
                    <td>{formatEuro(item.volleGebuehr, locale)}</td>
                    <td>{formatZehntelsatz(item.zehntelsatz, locale)}</td>
                    <td>{formatEuro(item.gebuehr, locale)}</td>
                    <td>{formatEuro(item.auslagen, locale)}</td>
                    <td>{formatEuro(item.netto, locale)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="summary-grid">
            <div className="summary-card">
              <span>{t.summary.nettoHonorar}</span>
              <strong>{formatEuro(summary.nettoHonorar, locale)}</strong>
            </div>
            <div className="summary-card">
              <span>{t.summary.auslagenGesamt}</span>
              <strong>{formatEuro(summary.auslagenGesamt, locale)}</strong>
            </div>
            <div className="summary-card">
              <span>{t.summary.nettoGesamt}</span>
              <strong>{formatEuro(summary.nettoGesamt, locale)}</strong>
            </div>
            <div className="summary-card">
              <span>{t.summary.ust}</span>
              <strong>{formatEuro(summary.ust, locale)}</strong>
            </div>
            <div className="summary-card highlight">
              <span>{t.summary.bruttoGesamt}</span>
              <strong>{formatEuro(summary.bruttoGesamt, locale)}</strong>
            </div>
            <div className="summary-card muted">
              <span>{t.summary.effectiveCost}</span>
              <strong>{formatEuro(summary.nettoGesamt, locale)}</strong>
            </div>
          </div>
        </section>

        <section className="panel info-panel">
          <h2>{t.sections.howItWorks}</h2>
          <ol className="steps">
            {t.steps.map((step) => (
              <li key={step.title}>
                <strong>{step.title}</strong>
                <span>{step.text}</span>
              </li>
            ))}
          </ol>
          <p className="disclaimer">{t.disclaimer}</p>
        </section>
      </main>
    </div>
  );
}

export default App;

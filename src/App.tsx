import { useMemo, useState } from 'react';
import { CurrencyInput } from './components/CurrencyInput';
import { ZehntelSlider } from './components/ZehntelSlider';
import {
  calculateFees,
  DEFAULT_ZEHNTELSAETZE,
  EXAMPLE_INPUTS,
  ZEHNTEL_RANGES,
  type CalculatorInputs,
  type Zehntelsaetze,
} from './lib/calculateFees';
import { formatEuro, formatNumber } from './utils/format';
import './App.css';

function App() {
  const [inputs, setInputs] = useState<CalculatorInputs>(EXAMPLE_INPUTS);
  const [zehntelsaetze, setZehntelsaetze] = useState<Zehntelsaetze>(DEFAULT_ZEHNTELSAETZE);

  const summary = useMemo(
    () => calculateFees(inputs, zehntelsaetze),
    [inputs, zehntelsaetze],
  );

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

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">StBVV 2025 · Gebührenrechner</p>
          <h1>Steuerberatergebühren berechnen</h1>
          <p className="hero-text">
            Berechnung nach der Steuerberatervergütungsverordnung für Jahresabschluss,
            Umsatzsteuer-, Körperschaftsteuer- und Gewerbesteuererklärung.
          </p>
        </div>
        <button type="button" className="secondary-button" onClick={loadExample}>
          Beispiel laden
        </button>
      </header>

      <main className="layout">
        <section className="panel">
          <h2>Unternehmensdaten</h2>
          <div className="field-grid">
            <CurrencyInput
              id="umsatz"
              label="Umsatz (Jahresleistung)"
              value={inputs.umsatz}
              onChange={(value) => updateInput('umsatz', value)}
              hint="Für USt-Gegenstandswert: 10 % des Umsatzes (mind. 8.000 €)"
            />
            <CurrencyInput
              id="bilanzsumme"
              label="Bilanzsumme"
              value={inputs.bilanzsumme}
              onChange={(value) => updateInput('bilanzsumme', value)}
              hint="Für Jahresabschluss: Mittel aus Bilanzsumme und Umsatz (mind. 30.000 €)"
            />
            <CurrencyInput
              id="gewerbeertrag"
              label="Gewerbeertrag"
              value={inputs.gewerbeertrag}
              onChange={(value) => updateInput('gewerbeertrag', value)}
              hint="Gegenstandswert Gewerbesteuer (mind. 8.000 €)"
            />
            <CurrencyInput
              id="zvE"
              label="Zu versteuerndes Einkommen"
              value={inputs.zuVersteuerndesEinkommen}
              onChange={(value) => updateInput('zuVersteuerndesEinkommen', value)}
              hint="Gegenstandswert Körperschaftsteuer (mind. 8.000 €)"
            />
          </div>
        </section>

        <section className="panel">
          <h2>Zehntelsätze</h2>
          <p className="panel-intro">
            Der Steuerberater wählt innerhalb des gesetzlichen Rahmens den Satz nach Aufwand,
            Schwierigkeit und Haftungsrisiko. Voreingestellt sind die branchenüblichen Mittelgebühren.
          </p>
          <div className="zehntel-grid">
            {(Object.keys(ZEHNTEL_RANGES) as Array<keyof Zehntelsaetze>).map((key) => {
              const range = ZEHNTEL_RANGES[key];
              return (
                <ZehntelSlider
                  key={key}
                  id={key}
                  label={range.label}
                  hint={range.hint}
                  min={range.min}
                  max={range.max}
                  value={zehntelsaetze[key]}
                  onChange={(value) => updateZehntel(key, value)}
                />
              );
            })}
          </div>
        </section>

        <section className="panel results-panel">
          <h2>Ergebnis</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Leistung</th>
                  <th>Gegenstandswert</th>
                  <th>Tabellenwert (10/10)</th>
                  <th>Zehntelsatz</th>
                  <th>Gebühr</th>
                  <th>Auslagen</th>
                  <th>Netto</th>
                </tr>
              </thead>
              <tbody>
                {summary.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.label}</td>
                    <td>{formatEuro(item.gegenstandswert)}</td>
                    <td>{formatEuro(item.volleGebuehr)}</td>
                    <td>
                      {item.zehntelsatz % 1 === 0
                        ? `${item.zehntelsatz}/10`
                        : `${item.zehntelsatz.toLocaleString('de-DE')}/10`}
                    </td>
                    <td>{formatEuro(item.gebuehr)}</td>
                    <td>{formatEuro(item.auslagen)}</td>
                    <td>{formatEuro(item.netto)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="summary-grid">
            <div className="summary-card">
              <span>Netto-Honorar</span>
              <strong>{formatEuro(summary.nettoHonorar)}</strong>
            </div>
            <div className="summary-card">
              <span>Auslagenpauschale gesamt</span>
              <strong>{formatEuro(summary.auslagenGesamt)}</strong>
            </div>
            <div className="summary-card">
              <span>Netto gesamt</span>
              <strong>{formatEuro(summary.nettoGesamt)}</strong>
            </div>
            <div className="summary-card">
              <span>Umsatzsteuer (19 %)</span>
              <strong>{formatEuro(summary.ust)}</strong>
            </div>
            <div className="summary-card highlight">
              <span>Brutto-Rechnungsbetrag</span>
              <strong>{formatEuro(summary.bruttoGesamt)}</strong>
            </div>
            <div className="summary-card muted">
              <span>Effektive Kosten nach Vorsteuerabzug</span>
              <strong>{formatEuro(summary.nettoGesamt)}</strong>
            </div>
          </div>
        </section>

        <section className="panel info-panel">
          <h2>So wird gerechnet</h2>
          <ol className="steps">
            <li>
              <strong>Gegenstandswert ermitteln</strong>
              <span>
                Jahresabschluss: Mittel aus Bilanzsumme und Umsatz (min. {formatNumber(30_000)} €).
                USt: 10 % des Umsatzes. KSt und GewSt: Einkommen bzw. Gewerbeertrag (jeweils min.{' '}
                {formatNumber(8_000)} €).
              </span>
            </li>
            <li>
              <strong>Volle Gebühr ablesen</strong>
              <span>
                Steuererklärungen nach Tabelle A, Jahresabschluss nach Tabelle B (StBVV 2025).
                Liegt der Wert zwischen zwei Stufen, gilt die nächsthöhere Stufe (§ 13 StBVV).
              </span>
            </li>
            <li>
              <strong>Mit Zehntelsatz multiplizieren</strong>
              <span>Honorar = volle Gebühr × gewählter Zehntelsatz ÷ 10.</span>
            </li>
            <li>
              <strong>Auslagen & USt addieren</strong>
              <span>
                Auslagenpauschale: 20 % der Gebühr, max. 20 € pro Angelegenheit. Anschließend 19 %
                Umsatzsteuer auf die Netto-Summe.
              </span>
            </li>
          </ol>
          <p className="disclaimer">
            Hinweis: Dieser Rechner dient der Orientierung. Die verbindliche Gebühr richtet sich nach
            der individuellen Mandatssituation und der Abrechnung durch den Steuerberater.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;

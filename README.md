# StBVV Gebührenrechner

Online-Rechner zur Berechnung von Steuerberatergebühren nach der Steuerberatervergütungsverordnung (StBVV 2025).

Berechnet werden die Gebühren für:

- Jahresabschluss (Bilanz/GuV) – Tabelle B
- Umsatzsteuererklärung – Tabelle A
- Körperschaftsteuererklärung – Tabelle A
- Gewerbesteuererklärung – Tabelle A

## Eingaben

1. Umsatz
2. Bilanzsumme
3. Gewerbeertrag
4. Zu versteuerndes Einkommen
5. Zehntelsätze für jede Leistung (gesetzliche Rahmen voreingestellt mit Mittelgebühren)

## Entwicklung

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deployment auf Render

1. Repository auf GitHub/GitLab pushen
2. In Render: **New → Static Site**
3. Build Command: `npm install && npm run build`
4. Publish Directory: `dist`

Alternativ kann die mitgelieferte `render.yaml` für ein Blueprint-Deployment genutzt werden.

## Hinweis

Es ist **keine Datenbank** erforderlich. Die Berechnung erfolgt vollständig im Browser – es werden keine Eingaben gespeichert oder übertragen.

## Rechtlicher Hinweis

Dieser Rechner dient der Orientierung. Die verbindliche Gebühr richtet sich nach der individuellen Mandatssituation und der Abrechnung durch den Steuerberater.

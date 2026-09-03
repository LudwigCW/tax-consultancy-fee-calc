# Deployment-Anleitung (GitHub + Render)

Diese Anleitung führt Sie Schritt für Schritt vom lokalen Projekt zur live geschalteten Web-App.

## Voraussetzungen

- Git ist eingerichtet (✓ erledigt)
- Initialer Commit auf Branch `main` (✓ erledigt)
- Kostenloses Konto bei [GitHub](https://github.com) und [Render](https://render.com)

---

## Schritt 1: GitHub CLI anmelden

Im Terminal (PowerShell) im Projektordner:

```powershell
gh auth login
```

Empfohlene Auswahl:

1. **GitHub.com**
2. **HTTPS**
3. **Login with a web browser** (Browser öffnet sich, einmal bestätigen)

Prüfen:

```powershell
gh auth status
```

---

## Schritt 2: Repository auf GitHub erstellen und pushen

```powershell
cd "c:\Users\ludwi\Squirrel Finance and Technology\tax-consultancy-fee-calc"

gh repo create tax-consultancy-fee-calc --public --source=. --remote=origin --push
```

Falls der Name bereits vergeben ist, wählen Sie einen anderen Namen, z. B. `stbvv-gebuehrenrechner`:

```powershell
gh repo create stbvv-gebuehrenrechner --public --source=. --remote=origin --push
```

Danach liegt der Code auf GitHub und `origin` ist als Remote verbunden.

---

## Schritt 3: Auf Render deployen

### Variante A – Blueprint (empfohlen)

1. Auf [render.com](https://render.com) anmelden
2. **New → Blueprint**
3. GitHub verbinden und das Repository auswählen
4. Render erkennt die `render.yaml` automatisch
5. **Apply** klicken

### Variante B – Static Site manuell

1. **New → Static Site**
2. Repository verbinden
3. Einstellungen:

| Feld | Wert |
|------|------|
| Name | `stbvv-gebuehrenrechner` |
| Branch | `main` |
| Build Command | `npm install && npm run build` |
| Publish Directory | `dist` |

4. **Create Static Site**

Render baut bei jedem Push auf `main` automatisch neu.

---

## Schritt 4: URL testen

Nach dem Build (ca. 2–3 Minuten) erhalten Sie eine URL wie:

`https://stbvv-gebuehrenrechner.onrender.com`

Dort sollte der Rechner mit dem Beispiel-Button und allen vier Leistungen erreichbar sein.

---

## Updates veröffentlichen

Nach Änderungen am Code:

```powershell
git add -A
git commit -m "Beschreibung der Änderung"
git push
```

Render startet den Build automatisch.

---

## Hinweise

- **Keine Datenbank nötig** – reine Static Site, alle Berechnungen im Browser
- **Kosten:** Render Free Tier reicht für diesen Rechner; die Seite kann nach Inaktivität kurz „einschlafen“ und beim ersten Aufruf 30–60 Sekunden brauchen
- **Eigene Domain:** In Render unter *Settings → Custom Domains* konfigurierbar

## Schnellreferenz (nach erledigter Anmeldung)

```powershell
# Einmalig
gh auth login
gh repo create tax-consultancy-fee-calc --public --source=. --remote=origin --push

# Bei Updates
git push
```

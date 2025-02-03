# Tier-Ratespiel: Entdecke die Nationaltiere der Welt 🌍

Ein interaktives Lernspiel für Kinder, das Wissen über Nationaltiere und deren kulturelle Bedeutung vermittelt.

## 🎮 Projektübersicht

Das Tier-Ratespiel ist eine webbasierte Bildungs-Anwendung, die zwei Spielmodi bietet:
- **Puzzle-Modus**: Aufdecken von Bildteilen, um das gesuchte Nationaltier zu erraten
- **Wordle-Modus**: Auswahl des korrekten Nationaltiers aus einer Liste von Optionen

## 🛠️ Technologien

- **Frontend**: SvelteKit
- **Styling**: CSS mit Jungle-Theme
- **APIs**: 
  - Unsplash API für Tierbilder
  - FlagCDN für Länderflaggen
  - OpenAI API für dynamische Tierinformationen

## 🚀 Installation

```bash
# Repository klonen
git clone https://github.com/username/tier-ratespiel.git

# Ins Projektverzeichnis wechseln
cd tier-ratespiel

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

## ⚙️ Konfiguration

Erstellen Sie eine `.env` Datei im Wurzelverzeichnis:

```env
VITE_UNSPLASH_ACCESS_KEY=ihr_unsplash_key
VITE_OPENAI_API_KEY=ihr_openai_key
```

## 📚 Spielmodi

### Puzzle-Modus
- Aufdecken von Bildkacheln durch Klicken
- Eingabe des Tiernamens
- Anzeige von Länderflagge und kulturellen Informationen
- Konfetti-Animation bei korrekter Antwort

### Wordle-Modus
- Auswahl aus vorgegebenen Tiernamen
- Namenseingabe vor Spielbeginn
- Fortschrittsanzeige der Versuche
- Highscore-Speicherung

## 🎨 Design

Das Spiel verwendet ein durchgängiges Dschungel-Thema:
```css
:root {
  --jungle-primary: #2E7D32;
  --jungle-secondary: #4CAF50;
  --jungle-light: #81C784;
  --jungle-dark: #1B5E20;
  --jungle-accent: #FFD700;
}
```

## 📝 Datenstruktur

Die Tierdaten sind in `animalList.js` definiert:
```javascript
{
  name: 'Tiername',
  country: 'Land',
  synonyms: ['alternative', 'namen']
}
```

## 🔄 API-Integration

- **Unsplash**: Dynamische Tierbilder
- **FlagCDN**: Länderflaggen

## 👥 Zielgruppe

- Hauptzielgruppe: Kinder im Alter von 6-8 Jahren
- Bildungseinrichtungen
- Familien

## 🛣️ Roadmap

- [ ] Mehrsprachige Unterstützung
- [ ] Zusätzliche Spielmodi
- [ ] Erweiterung der Tierdatenbank
- [ ] Offline-Modus
- [ ] Multiplayer-Funktionen

## 🤝 Beitragen

Beiträge sind willkommen! Bitte beachten Sie:
1. Fork des Repositories
2. Feature-Branch erstellen
3. Änderungen committen
4. Pull Request erstellen

## 📜 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert.

## 🙏 Danksagungen

- Unsplash für die Tierbilder
- FlagCDN für die Länderflaggen
- Staff und Profs. an der Hochschule für Gestaltung Schwäbisch Gmünd

## 📞 Kontakt

Bei Fragen oder Anregungen:
- GitHub Issues
- E-Mail: jonas.wienberg@hfg-gmuend.de

---
Entwickelt mit ❤️ in Gmünd für kleine Entdecker der Tierwelt

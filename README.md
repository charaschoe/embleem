# Tier-Ratespiel: Entdecke die Nationaltiere der Welt 🌍

Ein interaktives Lernspiel für Kinder, entwickelt als Semesterprojekt im Kurs "Programmiersprachen 3" an der HfG Schwäbisch Gmünd.

## ✨ Features
- 🧩 Puzzle-Modus mit aufdeckbaren Bildkacheln
- 🎯 Wordle-ähnlicher Ratemodus
- 🎨 Kindgerechtes Dschungel-Design
- 🏳️ Integration von Länderflaggen via FlagCDN
- 📸 Dynamische Tierbilder von Unsplash
- 💾 Lokale Highscore-Speicherung
- 🎮 Zwei verschiedene Spielmodi
- 🌍 Lehrreiche Informationen über Nationaltiere
- 🎯 Einfache und intuitive Benutzeroberfläche
- 🏆 Highscore-System für beide Spielmodi
- 🎉 Konfetti-Animation bei korrekten Antworten

## 🛠️ Technologien
- **Frontend**: SvelteKit
- **Styling**: CSS mit Jungle-Theme
- **APIs**: 
  - Unsplash API für Tierbilder
  - FlagCDN für Länderflaggen

## 🚀 Installation & Setup

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
```

## 📁 Projektstruktur
```
src/
├── components/
│   ├── PuzzleGrid.svelte
│   └── WordleMode.svelte
├── lib/
│   ├── animalList.js
│   ├── countryUtils.js
│   ├── highscoreStore.js
│   └── unsplash.js
├── routes/
│   ├── game/
│   │   └── +page.svelte
│   └── +layout.svelte
└── app.css
```

## 🎮 Spielmodi

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

## 🎯 Entwicklungsziele
- [ ] Mehrsprachige Unterstützung
- [ ] Zusätzliche Spielmodi
- [ ] Erweiterung der Tierdatenbank
- [ ] Offline-Modus
- [ ] Multiplayer-Funktionen

## 👥 Zielgruppe
- Hauptzielgruppe: Kinder im Alter von 6-8 Jahren
- Bildungseinrichtungen
- Familien

## 📝 Projektkontext
Entwickelt als Semesterprojekt im Kurs "Programmiersprachen 3" bei Prof. Fabian Rauch an der Hochschule für Gestaltung Schwäbisch Gmünd, Wintersemester 2023/24.

## 📜 Lizenz
Dieses Projekt ist unter der MIT-Lizenz lizenziert.

## 🙏 Danksagungen
- Unsplash für die Tierbilder
- FlagCDN für die Länderflaggen
- Prof. Fabian Rauch ([@caitoor](https://github.com/caitoor)) für die Betreuung
- Hochschule für Gestaltung Schwäbisch Gmünd

## 📞 Kontakt
Jonas Wienberg
- GitHub: [charaschoe]
- E-Mail: jonas.wienberg@hfg-gmuend.de

---
Entwickelt mit ❤️ an der HfG Schwäbisch Gmünd

# Tier-Ratespiel: Entdecke die Nationaltiere der Welt 🌍  
Ein interaktives Lernspiel für Kinder, entwickelt als Semesterprojekt im Kurs "Programmiersprachen 3" an der HfG Schwäbisch Gmünd.

## 📁 Projektarchitektur & Technischer Stack  
**Frontend**: SvelteKit mit TypeScript  
**Styling**: CSS mit Jungle-Theme  
**APIs**: Unsplash (Tierbilder) + FlagCDN (Länderflaggen)  
**Bibliotheken**:
- `canvas-confetti` für Konfetti-Animationen
- `axios` für HTTP-Anfragen
- `dotenv` für Umgebungsvariablen
- `express` für den Server
- `svelte/store` für State Management

```
text
├── .svelte-kit/
├── node_modules/
├── src/
│   ├── components/        
│   │   ├── PuzzleGrid.svelte    # 3x3 Grid-System
│   │   └── WordleMode.svelte    # Barrierefreie Klick-Interface
│   ├── lib/              
│   │   ├── animalList.js        # 14 Nationaltiere
│   │   ├── countryUtils.js      # Länder-Mapping
│   │   ├── highscoreStore.js   # Lokale Speicherung
│   │   └── unsplash.js         # Bildintegration
│   ├── routes/           
│   │   ├── game/+page.svelte    # Kernspiellogik
│   │   └── +layout.svelte       # Navigation
│   ├── app.css           # Globale Styles
│   └── app.html          # HTML-Template
└── static/               # Assets
```

## ✨ Kernfunktionen

### 🧩 Puzzle-Modus

- **Progressives Aufdecken von 9 Bildkacheln**: In diesem Modus wird ein Bild in 9 Kacheln aufgeteilt, die nach und nach aufgedeckt werden. Der Benutzer muss erraten, was auf dem Bild zu sehen ist, bevor alle Kacheln aufgedeckt sind.
- **Dynamische Unsplash-Integration**: Die Bilder werden dynamisch von der Unsplash API geladen, was bedeutet, dass jedes Spiel neue und unterschiedliche Bilder verwendet.
- **Fehlertolerante Eingabe**: Das System ist in der Lage, ähnliche Begriffe zu erkennen und zu akzeptieren. Zum Beispiel wird "tiger" als "Malaiischer Tiger" erkannt und akzeptiert.

### 🎯 Wordle-Modus

- **14 auswählbare Nationaltiere**: In diesem Modus kann der Benutzer aus 14 verschiedenen Nationaltieren wählen und muss das richtige Tier erraten.
- **Highscore-System für beide Modi**: Beide Spielmodi haben ein Highscore-System, das die besten Ergebnisse der Benutzer speichert und anzeigt.
- **Konfetti-Animation bei Erfolg**: Wenn der Benutzer erfolgreich das richtige Tier errät, wird eine Konfetti-Animation angezeigt, um den Erfolg zu feiern.

### 👶 Kindgerechte Umsetzung

- **Jungle-Theme mit Grüntönen**: Das Design des Spiels ist kindgerecht und verwendet ein Dschungel-Thema mit vielen Grüntönen, um eine ansprechende und freundliche Umgebung zu schaffen.
- **Responsives Grid-Layout**: Das Layout des Spiels ist responsiv und passt sich verschiedenen Bildschirmgrößen an, um eine optimale Benutzererfahrung auf allen Geräten zu gewährleisten.
- **Große Buttons (ab 150px)**: Die Buttons im Spiel sind groß (mindestens 150px), um es Kindern zu erleichtern, sie zu drücken.
- **Lazy Loading für Bilder**: Bilder werden nur geladen, wenn sie benötigt werden, was die Ladezeiten verkürzt und die Leistung verbessert.

## 🚀 Installation  
```bash
git clone https://github.com/username/tier-ratespiel.git
cd tier-ratespiel
npm install
npm run dev
```

## ⚙️ Konfiguration  
`.env`-Datei erstellen:  
```env
VITE_UNSPLASH_ACCESS_KEY=ihr_key
```

## 🎮 Spielmechanik  
| Feature               | Puzzle-Modus         | Wordle-Modus         |
|-----------------------|----------------------|----------------------|
| Eingabemethode        | Texteingabe          | Klick-Interface      |
| Fortschrittsanzeige   | X/9 Kacheln          | Versuchsanzahl       |
| Besonderheiten        | Debug-Modus          | Länderflaggen        |

## 📜 Projektkontext  
Entwickelt im Wintersemester 2023/24 bei Prof. Fabian Rauch ([@caitoor](https://github.com/caitoor)) an der HfG Schwäbisch Gmünd. Zielgruppe: Kinder von 6-8 Jahren.

## 🌐 Roadmap  
- [ ] Mehrsprachiger Support  
- [ ] Mobile-Modus  
- [ ] Tierdatenbank-Erweiterung  
- [ ] Multiplayer-Funktionen  

## 🙏 Danksagungen  
- Unsplash für Tierbilder  
- FlagCDN für Flaggen  
- HfG Gmünd für Infrastruktur  

**Lizenz**: MIT  
**Kontakt**: [Jonas Wienberg](mailto:jonas.wienberg@hfg-gmuend.de)  
GitHub: [@charaschoe]  

---
Entwickelt mit ❤️ an der HfG Schwäbisch Gmünd
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
│   │   ├── animalList.ts        # National animals and heraldic creatures
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

## 🔧 Technische Details

### 🎮 Spielmechaniken

#### 🧩 Puzzle-Modus
- **Schwierigkeitsgrade**:
  - Einfach: 4x4 Raster mit 2 initial aufgedeckten Feldern
  - Mittel: 3x3 Raster
- **Punktesystem**: 
  - Startpunkte: 100-150 (je nach Schwierigkeit)
  - Punktabzug bei falschen Versuchen
- **Progressives Aufdecken**: Systematische Enthüllung der Bildkacheln
- **Erfolgsfeedback**: Konfetti-Animation bei korrekter Lösung

#### 🎯 Wordle-Modus
- **Tierdatenbank**: 14 sorgfältig ausgewählte Nationaltiere
- **Barrierefreie Bedienung**: Klick-basierte Benutzeroberfläche
- **Versuchsverfolgung**: Tracking aller Rateversuche
- **Spieleridentifikation**: Kreative Platzhalternamen für Spieler

### 🦁 Tierdaten-Struktur
- **Datensatz pro Tier**:
  - Offizieller Name
  - Herkunftsland
  - Multiple Synonyme für flexible Erkennung
  - Optimierte Suchbegriffe für Bildabruf
- **Beispiele**:
  - Bundesadler (Deutschland)
  - Doppelköpfiger Adler (Albanien)
  - Weißer Adler (Polen)
  - Leo Belgicus (Belgien)
  - Bengalischer Tiger (Indien)
  - Malaiischer Tiger (Malaysia)

### 💻 Technische Features

#### 📸 Bildverwaltung
- **Unsplash-Integration**:
  - Qualitätsfilter (min. 800x800px)
  - Inhaltliche Filterung für passende Tierporträts
  - Blur-Hash für progressives Laden
- **Fallback-System**: Lokale Bildressourcen bei API-Ausfällen

#### 📚 Wikipedia-Integration
- **Inhalt**: Prägnante 2-Satz-Beschreibungen auf Deutsch
- **Fehlerbehandlung**: Benutzerfreundliche Fallback-Nachrichten
- **Performance**: Caching von API-Antworten

#### 🔄 State Management
- **Svelte Stores**: Reaktive Zustandsverwaltung
- **Lokaler Speicher**: Highscore-Persistenz
- **Sitzungsverwaltung**: Spielfortschrittsspeicherung

### 🎨 UI/UX-Optimierungen
- **Kinderfreundliche Oberfläche**:
  - Große, zugängliche Schaltflächen
  - Klares Feedback-System
  - Countdown vor Spielbeginn
  - Progressive Schwierigkeitsgrade
- **Responsives Design**: Maximale Breite und flexible Layouts
- **Dschungel-Thema**: Angepasste Farbvariablen
- **Fehlerbehandlung**: Benutzerfreundliche Fehlermeldungen

### 📚 Bildungselemente
- **Länderflaggen**: Integration von Nationalflaggen
- **Wikipedia-Wissen**: Lehrreiche Tierinformationen
- **Sprachförderung**: Synonymerkennung
- **Kultureller Kontext**: Fokus auf Nationaltiere

### ⚡ Performance-Optimierungen
- **Bildoptimierung**: Filterung und Qualitätsprüfung
- **Lazy Loading**: Bedarfsgesteuertes Laden
- **Offline-Funktionalität**: Lokale Fallbacks
- **Effizientes State Management**: Optimierte Zustandsverwaltung
- **API-Limitierung**: Kontrollierte Anfragen

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
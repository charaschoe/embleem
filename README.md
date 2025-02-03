# Tier-Ratespiel: Entdecke die Nationaltiere der Welt 🌍  
Ein interaktives Lernspiel für Kinder, entwickelt als Semesterprojekt im Kurs "Programmiersprachen 3" an der HfG Schwäbisch Gmünd.

## 📁 Projektarchitektur & Technischer Stack  
**Frontend**: SvelteKit mit TypeScript  
**Styling**: CSS mit Jungle-Theme  
**APIs**: Unsplash (Tierbilder) + FlagCDN (Länderflaggen)  

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
**🧩 Puzzle-Modus**  
- Progressives Aufdecken von 9 Bildkacheln  
- Dynamische Unsplash-Integration  
- Fehlertolerante Eingabe ("tiger" → "Malaiischer Tiger")  

**🎯 Wordle-Modus**  
- 14 auswählbare Nationaltiere  
- Highscore-System für beide Modi  
- Konfetti-Animation bei Erfolg  

**👶 Kindgerechte Umsetzung**  
- Jungle-Theme mit Grüntönen  
- Responsives Grid-Layout  
- Große Buttons (ab 150px)  
- Lazy Loading für Bilder  

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
- [ ] Offline-Modus  
- [ ] Tierdatenbank-Erweiterung  
- [ ] Multiplayer-Funktionen  

## 🙏 Danksagungen  
- Unsplash für Tierbilder  
- FlagCDN für Flaggen  
- HfG Gmünd für Infrastruktur  

**Lizenz**: MIT  
**Kontakt**: [Jonas Wienberg](mailto:jonas.wienberg@hfg-gmuend.de)  
GitHub: [charaschoe]  

---
Entwickelt mit ❤️ an der HfG Schwäbisch Gmünd

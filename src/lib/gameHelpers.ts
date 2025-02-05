import type { Animal } from './types';

// Hilfsfunktion für kinderfreundliche Fakten
export function getKidFriendlyFact(animal: Animal): string {
  const facts: Record<string, string[]> = {
    mammal: [
      "Wusstest du? Dieses Tier ist ein Säugetier - das heißt, es hat Fell und trinkt als Baby Milch! 🍼",
      "Dieses tolle Tier kümmert sich um seine Babys, genau wie deine Eltern sich um dich kümmern! 💝",
      "Wie alle Säugetiere ist es warmblütig und hat ein Herz, das bumm-bumm macht! 💓",
      "Dieser pelzige Freund hat besondere Schnurrhaare, die ihm beim Fühlen helfen! 🐱"
    ],
    bird: [
      "Vögel wie dieser können hoch am Himmel fliegen - wäre das nicht toll? 🦅",
      "Dieser Vogel hat besondere Federn, die ihn warm und trocken halten! 🪶",
      "Vögel legen Eier und singen schöne Lieder, um miteinander zu sprechen! 🥚",
      "Dieser gefiederte Freund hat ganz leichte Knochen, damit er besser fliegen kann! ✨"
    ],
    reptile: [
      "Dieser schuppige Freund liegt gerne in der Sonne, um sich aufzuwärmen! ☀️",
      "Wie alle Reptilien hat es besondere Schuppen, die seinen Körper schützen! 🦎",
      "Wusstest du? Reptilien können super schwimmen! 💦",
      "Dieses coole Tier kann Vibrationen durch den Boden spüren! 🌍"
    ],
    heraldic: [
      "Das ist ein besonderes Symbol für ein ganzes Land - wie ein Superhelden-Logo! 🦸‍♂️",
      "Die Menschen haben dieses Tier ausgewählt, weil es zeigt, wie stark und mutig ihr Land ist! 💪",
      "Das ist wie ein besonderes Maskottchen für das Land - man sieht es auf wichtigen Dingen! 🏰",
      "Dieses Symbol wird schon seit hunderten von Jahren benutzt - das ist älter als deine Omas und Opas! 👑"
    ],
    mythical: [
      "Dieses magische Wesen kommt aus wunderschönen alten Geschichten! ✨",
      "Die Menschen erzählen spannende Geschichten über dieses fantastische Wesen! 🌟",
      "Dieses Wesen ist magisch - es kommt in vielen tollen Märchen und Legenden vor! 🪄",
      "Manche Leute glauben, dass es Glück bringt! 🍀"
    ]
  };

  const categoryFacts = facts[animal.category] || facts.mammal;
  return categoryFacts[Math.floor(Math.random() * categoryFacts.length)];
}

// Hilfsfunktion für ermutigende Nachrichten basierend auf der Punktzahl
export function getEncouragingMessage(score: number, maxScore: number): string {
  const percentage = (score / maxScore) * 100;
  
  if (percentage >= 90) {
    return "Fantastisch! Du bist ein echter Tier-Experte! 🌟🏆";
  } else if (percentage >= 75) {
    return "Super gemacht! Du kennst dich richtig gut mit Tieren aus! 🌟";
  } else if (percentage >= 50) {
    return "Toll gemacht! Weiter so! 🎉";
  } else {
    return "Das war ein guter Versuch! Beim nächsten Mal klappt es noch besser! 💪";
  }
}

// Hilfsfunktion für Spielmodus-spezifische Tipps
export function getGameModeHint(mode: 'puzzle' | 'wordle'): string {
  const hints = {
    puzzle: [
      "Decke die Kacheln vorsichtig auf - je weniger du brauchst, desto mehr Punkte bekommst du! 🎯",
      "Schau dir die aufgedeckten Teile genau an. Welches Tier könnte das sein? 🔍",
      "Versuche erst die Ecken aufzudecken, das hilft oft beim Raten! 🎲"
    ],
    wordle: [
      "Schau dir die Liste der Tiere an. Eines davon ist richtig! 📝",
      "Mit jedem Versuch kommst du der Lösung näher! 🎯",
      "Überlege: Welches Tier passt am besten zu diesem Land? 🌍"
    ]
  };
  
  return hints[mode][Math.floor(Math.random() * hints[mode].length)];
}

// Hilfsfunktion für altersgerechte Tipps
export function getHint(animal: Animal, revealedCount: number): string {
  const hints = [
    `Dieses Tier kommt aus ${animal.country}! 🌍`,
    `Der erste Buchstabe ist "${animal.name[0]}"! 📝`,
    `Es ist ein ${animal.category === 'mammal' ? 'Säugetier' : 
      animal.category === 'bird' ? 'Vogel' : 
      animal.category === 'reptile' ? 'Reptil' : 
      animal.category === 'mythical' ? 'Fabelwesen' : 
      'Wappentier'}! 🔍`
  ];

  // Zusätzliche Tipps bei mehr aufgedeckten Kacheln
  if (revealedCount >= 3) {
    hints.push(`Auf Deutsch sagen wir "${animal.name}"! 🗣️`);
  }
  if (revealedCount >= 5) {
    hints.push(`Die Wissenschaftler nennen es "${animal.scientific}"! 🔬`);
  }
  
  return hints[Math.floor(Math.random() * (Math.min(revealedCount, hints.length)))];
}

// Hilfsfunktion für Tiergeräusche
export function getAnimalSound(animal: Animal): string {
  const sounds: Record<string, string[]> = {
    bird: ["Piep! Piep! 🐦", "Zwitscher! Zwitscher! 🐤", "Krah! Krah! 🦅"],
    mammal: ["Brüll! 🦁", "Miau! 😺", "Wuff! 🐕", "Pieps! 🐹"],
    reptile: ["Zisch! 🐍", "Schnapp! 🐊", "Fauuuch! 🦎"],
    mythical: ["*Magisches Glitzern* ✨", "*Mystisches Rauschen* 🌟", "*Magisches Brüllen* 🐲"],
    heraldic: ["*Feierliche Fanfare* 📯", "*Königliche Trompete* 👑", "*Edles Brüllen* 🦁"]
  };

  const categorySounds = sounds[animal.category] || ["*Besondere Tiergeräusche* 🎵"];
  return categorySounds[Math.floor(Math.random() * categorySounds.length)];
}

// Hilfsfunktion für Punkteberechnung im Puzzle-Modus
export function calculatePuzzleScore(
  difficulty: 'easy' | 'medium' | 'hard',
  revealedTiles: number
): number {
  const config = {
    easy: { basePoints: 150, penalty: 3 },
    medium: { basePoints: 100, penalty: 5 },
    hard: { basePoints: 75, penalty: 10 }
  };

  const { basePoints, penalty } = config[difficulty];
  return Math.max(0, basePoints - (revealedTiles * penalty));
}

// Hilfsfunktion für Punkteberechnung im Wordle-Modus
export function calculateWordleScore(
  attempts: number,
  revealedTiles: number
): number {
  const basePoints = 100;
  const attemptPenalty = attempts * 10;
  const tilePenalty = revealedTiles * 5;
  
  return Math.max(0, basePoints - attemptPenalty - tilePenalty);
}

// Hilfsfunktion für zufällige Spielernamen
export const getRandomPlayerName = (): string => {
  const names = [
    'Kleiner Panda 🐼',
    'Süße Giraffe 🦒',
    'Fröhlicher Pinguin 🐧',
    'Niedlicher Koala 🐨',
    'Bunter Papagei 🦜',
    'Sanfter Delfin 🐬',
    'Lustiger Otter 🦦',
    'Schlauer Fuchs 🦊',
    'Munteres Känguru 🦘',
    'Treuer Elefant 🐘'
  ];
  
  return names[Math.floor(Math.random() * names.length)];
}; 
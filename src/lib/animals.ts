import type { Animal } from './types';

export const bundesadler: Animal = {
  name: 'Bundesadler',
  country: 'Deutschland',
  scientific: 'Aquila chrysaetos',
  category: 'heraldic',
  keywords: {
    en: ['national symbol', 'coat of arms', 'federal eagle'],
    de: ['Hoheitszeichen', 'Wappentier', 'Reichsadler']
  },
  synonyms: [
    'Reichsadler',
    'Schwarzer Adler',
    'Aquila chrysaetos',
    'Imperial Eagle',
    'Adler',
    'eagle',
    'German eagle',
    'federal eagle'
  ],
  searchStrategy: {
    primary: '"German federal eagle" coat of arms -coin -flag -emblem',
    secondary: 'black eagle heraldry detailed -wild -nature',
    filters: {
      orientation: 'portrait',
      color: 'black_and_white'
    }
  },
  meta: {
    conservationStatus: 'LC',
    habitat: 'National Symbol',
    wikiLinks: {
      en: 'https://en.wikipedia.org/wiki/Coat_of_arms_of_Germany',
      de: 'https://de.wikipedia.org/wiki/Bundesadler_(Deutschland)'
    }
  }
};

export const doppelkoepfigerAdler: Animal = {
  name: 'Doppelköpfiger Adler',
  country: 'Albanien',
  scientific: 'Aquila bicephalus',
  category: 'heraldic',
  keywords: {
    en: ['double-headed eagle', 'coat of arms', 'national symbol'],
    de: ['Doppeladler', 'Wappentier', 'Nationales Symbol']
  },
  synonyms: [
    'double-headed eagle',
    'Albanian eagle',
    'black eagle',
    'Shqiponja e zezë'
  ],
  searchStrategy: {
    primary: 'albanian double headed eagle coat of arms -coin',
    secondary: 'black double eagle heraldry albania symbol',
    filters: {
      orientation: 'portrait',
      color: 'black_and_white'
    }
  },
  meta: {
    conservationStatus: 'NA',
    habitat: 'National Symbol',
    wikiLinks: {
      en: 'https://en.wikipedia.org/wiki/Flag_of_Albania',
      de: 'https://de.wikipedia.org/wiki/Flagge_Albaniens'
    }
  }
};

export const weisserAdler: Animal = {
  name: 'Weißer Adler',
  country: 'Polen',
  scientific: 'Aquila alba',
  category: 'heraldic',
  keywords: {
    en: ['white eagle', 'Polish eagle', 'coat of arms'],
    de: ['Weißer Adler', 'Polnischer Adler', 'Wappentier']
  },
  synonyms: [
    'white eagle',
    'Polish eagle',
    'Piast eagle',
    'Orzeł Biały'
  ],
  searchStrategy: {
    primary: 'polish white eagle coat of arms -landscape',
    secondary: 'white eagle poland heraldic symbol',
    filters: {
      orientation: 'portrait',
      color: 'color'
    }
  },
  meta: {
    conservationStatus: 'NA',
    habitat: 'National Symbol',
    wikiLinks: {
      en: 'https://en.wikipedia.org/wiki/Coat_of_arms_of_Poland',
      de: 'https://de.wikipedia.org/wiki/Wappen_Polens'
    }
  }
};

export const leoBelgicus: Animal = {
  name: 'Leo Belgicus',
  country: 'Belgien',
  scientific: 'Leo belgicus',
  category: 'heraldic',
  keywords: {
    en: ['Belgian Lion', 'heraldic lion', 'national symbol'],
    de: ['Belgischer Löwe', 'Wappentier', 'Nationales Symbol']
  },
  synonyms: [
    'Belgian Lion',
    'Leo Belgicus',
    'lion',
    'Belgische Leeuw'
  ],
  searchStrategy: {
    primary: 'belgian lion heraldic leo belgicus -landscape',
    secondary: 'coat of arms belgium lion symbol',
    filters: {
      orientation: 'portrait',
      color: 'color'
    }
  },
  meta: {
    conservationStatus: 'NA',
    habitat: 'National Symbol',
    wikiLinks: {
      en: 'https://en.wikipedia.org/wiki/Belgian_Lion',
      de: 'https://de.wikipedia.org/wiki/Belgischer_Löwe'
    }
  }
};

export const bengalischerTiger: Animal = {
  name: 'Bengalischer Tiger',
  country: 'Indien',
  scientific: 'Panthera tigris tigris',
  category: 'mammal',
  keywords: {
    en: ['Bengal tiger', 'Indian tiger', 'royal Bengal tiger'],
    de: ['Königstiger', 'Indischer Tiger', 'Bengaltiger']
  },
  synonyms: [
    'Bengal tiger',
    'Indian tiger',
    'royal Bengal tiger',
    'Königstiger'
  ],
  searchStrategy: {
    primary: 'bengal tiger portrait closeup -zoo -captive',
    secondary: 'royal bengal tiger india wild -landscape',
    filters: {
      orientation: 'portrait',
      color: 'color'
    }
  },
  meta: {
    conservationStatus: 'EN',
    habitat: 'Tropical and Subtropical Moist Forests',
    wikiLinks: {
      en: 'https://en.wikipedia.org/wiki/Bengal_tiger',
      de: 'https://de.wikipedia.org/wiki/Bengaltiger'
    }
  }
};

export const malaiischerTiger: Animal = {
  name: 'Malaiischer Tiger',
  country: 'Malaysia',
  scientific: 'Panthera tigris jacksoni',
  category: 'mammal',
  keywords: {
    en: ['Malayan tiger', 'Malaysian tiger', 'Panthera tigris jacksoni'],
    de: ['Malaysischer Tiger', 'Malaiischer Tiger']
  },
  synonyms: [
    'Malayan tiger',
    'Malaysian tiger',
    'tiger',
    'Harimau Malaya'
  ],
  searchStrategy: {
    primary: 'malayan tiger portrait closeup -zoo -captive',
    secondary: 'panthera tigris jacksoni malaysia wild',
    filters: {
      orientation: 'portrait',
      color: 'color'
    }
  },
  meta: {
    conservationStatus: 'CR',
    habitat: 'Tropical and Subtropical Moist Forests',
    wikiLinks: {
      en: 'https://en.wikipedia.org/wiki/Malayan_tiger',
      de: 'https://de.wikipedia.org/wiki/Malaiischer_Tiger'
    }
  }
};

export const druk: Animal = {
  name: 'Druk',
  country: 'Bhutan',
  scientific: 'Draco bhutanensis',
  category: 'mythical',
  keywords: {
    en: ['thunder dragon', 'Bhutanese dragon', 'national symbol'],
    de: ['Donnerdrache', 'Bhutanischer Drache', 'Nationales Symbol']
  },
  synonyms: [
    'thunder dragon',
    'Bhutanese dragon',
    'dragon',
    'Thunder Dragon Kingdom'
  ],
  searchStrategy: {
    primary: 'bhutan thunder dragon druk symbol -landscape',
    secondary: 'bhutanese dragon national emblem',
    filters: {
      orientation: 'portrait',
      color: 'color'
    }
  },
  meta: {
    conservationStatus: 'NA',
    habitat: 'National Symbol',
    wikiLinks: {
      en: 'https://en.wikipedia.org/wiki/Druk',
      de: 'https://de.wikipedia.org/wiki/Druk'
    }
  }
};

export const gallischerHahn: Animal = {
  name: 'Gallischer Hahn',
  country: 'Frankreich',
  scientific: 'Gallus gallus',
  category: 'heraldic',
  keywords: {
    en: ['Gallic rooster', 'French rooster', 'national emblem'],
    de: ['Gallischer Hahn', 'Französischer Hahn', 'Nationales Symbol']
  },
  synonyms: [
    'Gallic rooster',
    'French rooster',
    'coq gaulois',
    'le coq'
  ],
  searchStrategy: {
    primary: 'french gallic rooster coq gaulois -farm',
    secondary: 'national emblem france rooster symbol',
    filters: {
      orientation: 'portrait',
      color: 'color'
    }
  },
  meta: {
    conservationStatus: 'NA',
    habitat: 'National Symbol',
    wikiLinks: {
      en: 'https://en.wikipedia.org/wiki/Gallic_rooster',
      de: 'https://de.wikipedia.org/wiki/Gallischer_Hahn'
    }
  }
};

export const quetzal: Animal = {
  name: 'Quetzal',
  country: 'Guatemala',
  scientific: 'Pharomachrus mocinno',
  category: 'bird',
  keywords: {
    en: ['resplendent quetzal', 'Guatemalan quetzal', 'national bird'],
    de: ['Quetzal', 'Guatemaltekischer Quetzal', 'Nationalvogel']
  },
  synonyms: [
    'resplendent quetzal',
    'Guatemalan quetzal',
    'quetzal',
    'Quetzal resplandeciente'
  ],
  searchStrategy: {
    primary: 'resplendent quetzal guatemala bird portrait -currency',
    secondary: 'pharomachrus mocinno green bird closeup',
    filters: {
      orientation: 'portrait',
      color: 'color'
    }
  },
  meta: {
    conservationStatus: 'NT',
    habitat: 'Cloud Forest',
    wikiLinks: {
      en: 'https://en.wikipedia.org/wiki/Resplendent_quetzal',
      de: 'https://de.wikipedia.org/wiki/Quetzal'
    }
  }
};

export const komododrache: Animal = {
  name: 'Komodo-Drache',
  country: 'Indonesien',
  scientific: 'Varanus komodoensis',
  category: 'reptile',
  keywords: {
    en: ['Komodo dragon', 'Indonesian dragon', 'monitor lizard'],
    de: ['Komodowaran', 'Indonesischer Drache', 'Riesenechse']
  },
  synonyms: [
    'Komodo dragon',
    'Indonesian dragon',
    'monitor lizard',
    'Komodowaran'
  ],
  searchStrategy: {
    primary: 'komodo dragon portrait closeup -zoo',
    secondary: 'varanus komodoensis indonesia wild',
    filters: {
      orientation: 'portrait',
      color: 'color'
    }
  },
  meta: {
    conservationStatus: 'EN',
    habitat: 'Tropical Savanna',
    wikiLinks: {
      en: 'https://en.wikipedia.org/wiki/Komodo_dragon',
      de: 'https://de.wikipedia.org/wiki/Komodowarane'
    }
  }
};

export const markhor: Animal = {
  name: 'Markhor',
  country: 'Pakistan',
  scientific: 'Capra falconeri',
  category: 'mammal',
  keywords: {
    en: ['screw-horned goat', 'Pakistani markhor', 'wild goat'],
    de: ['Schraubenziege', 'Pakistanische Markhor', 'Wildziege']
  },
  synonyms: [
    'screw-horned goat',
    'Pakistani markhor',
    'wild goat',
    'Schraubenziege'
  ],
  searchStrategy: {
    primary: 'markhor pakistan wild goat portrait -zoo',
    secondary: 'capra falconeri spiral horns closeup',
    filters: {
      orientation: 'portrait',
      color: 'color'
    }
  },
  meta: {
    conservationStatus: 'NT',
    habitat: 'Mountain Ranges',
    wikiLinks: {
      en: 'https://en.wikipedia.org/wiki/Markhor',
      de: 'https://de.wikipedia.org/wiki/Schraubenziege'
    }
  }
};

export const springbock: Animal = {
  name: 'Springbock',
  country: 'Südafrika',
  scientific: 'Antidorcas marsupialis',
  category: 'mammal',
  keywords: {
    en: ['springbok', 'South African springbok', 'antelope'],
    de: ['Springbock', 'Südafrikanischer Springbock', 'Antilope']
  },
  synonyms: [
    'springbok',
    'South African springbok',
    'antelope',
    'pronking antelope'
  ],
  searchStrategy: {
    primary: 'springbok south africa antelope portrait -zoo',
    secondary: 'antidorcas marsupialis jumping wild',
    filters: {
      orientation: 'portrait',
      color: 'color'
    }
  },
  meta: {
    conservationStatus: 'LC',
    habitat: 'Savanna',
    wikiLinks: {
      en: 'https://en.wikipedia.org/wiki/Springbok',
      de: 'https://de.wikipedia.org/wiki/Springbock'
    }
  }
};

export const steppenzebra: Animal = {
  name: 'Steppenzebra',
  country: 'Botswana',
  scientific: 'Equus quagga',
  category: 'mammal',
  keywords: {
    en: ['plains zebra', 'Botswana zebra', 'common zebra'],
    de: ['Steppenzebra', 'Botswana-Zebra', 'Pferdezebra']
  },
  synonyms: [
    'plains zebra',
    'Botswana zebra',
    'zebra',
    'common zebra'
  ],
  searchStrategy: {
    primary: 'plains zebra portrait closeup wild -zoo',
    secondary: 'equus quagga botswana stripes',
    filters: {
      orientation: 'portrait',
      color: 'color'
    }
  },
  meta: {
    conservationStatus: 'NT',
    habitat: 'Savanna Grasslands',
    wikiLinks: {
      en: 'https://en.wikipedia.org/wiki/Plains_zebra',
      de: 'https://de.wikipedia.org/wiki/Steppenzebra'
    }
  }
};

export const heiligekuh: Animal = {
  name: 'Kuh',
  country: 'Nepal',
  scientific: 'Bos taurus',
  category: 'mammal',
  keywords: {
    en: ['sacred cow', 'Nepalese cow', 'holy cow'],
    de: ['Heilige Kuh', 'Nepalesische Kuh', 'Göttliche Kuh']
  },
  synonyms: [
    'cow',
    'sacred cow',
    'Nepalese cow',
    'holy cow'
  ],
  searchStrategy: {
    primary: 'sacred cow nepal portrait -farm -domestic',
    secondary: 'holy cow nepal religious symbol',
    filters: {
      orientation: 'portrait',
      color: 'color'
    }
  },
  meta: {
    conservationStatus: 'NA',
    habitat: 'Religious Symbol',
    wikiLinks: {
      en: 'https://en.wikipedia.org/wiki/Sacred_cow_(Hinduism)',
      de: 'https://de.wikipedia.org/wiki/Heilige_Kuh'
    }
  }
};

export const koeniglicherLoewe: Animal = {
  name: 'Königlicher Löwe',
  country: 'England',
  scientific: 'Leo regalis',
  category: 'heraldic',
  keywords: {
    en: ['Royal Lion', 'English Lion', 'lion rampant'],
    de: ['Königlicher Löwe', 'Englischer Löwe', 'Wappenlöwe']
  },
  synonyms: [
    'Royal Lion',
    'English Lion',
    'lion rampant',
    'heraldic lion'
  ],
  searchStrategy: {
    primary: 'english royal lion heraldic coat of arms -landscape',
    secondary: 'lion rampant england symbol -wild',
    filters: {
      orientation: 'portrait',
      color: 'color'
    }
  },
  meta: {
    conservationStatus: 'NA',
    habitat: 'National Symbol',
    wikiLinks: {
      en: 'https://en.wikipedia.org/wiki/Royal_Arms_of_England',
      de: 'https://de.wikipedia.org/wiki/Royal_Arms'
    }
  }
};

export const russischerBaer: Animal = {
  name: 'Russischer Bär',
  country: 'Russland',
  scientific: 'Ursus arctos',
  category: 'mammal',
  keywords: {
    en: ['Russian Bear', 'brown bear', 'Eurasian bear'],
    de: ['Russischer Bär', 'Braunbär', 'Eurasischer Bär']
  },
  synonyms: [
    'Russian Bear',
    'brown bear',
    'Eurasian bear',
    'Медведь'
  ],
  searchStrategy: {
    primary: 'russian brown bear portrait closeup -zoo',
    secondary: 'ursus arctos russia wild -landscape',
    filters: {
      orientation: 'portrait',
      color: 'color'
    }
  },
  meta: {
    conservationStatus: 'LC',
    habitat: 'Taiga and Tundra',
    wikiLinks: {
      en: 'https://en.wikipedia.org/wiki/Russian_Bear',
      de: 'https://de.wikipedia.org/wiki/Russischer_Bär'
    }
  }
};

export const kaenguru: Animal = {
  name: 'Känguru',
  country: 'Australien',
  scientific: 'Macropus rufus',
  category: 'mammal',
  keywords: {
    en: ['kangaroo', 'red kangaroo', 'Australian kangaroo'],
    de: ['Känguru', 'Rotes Riesenkänguru', 'Australisches Känguru']
  },
  synonyms: [
    'kangaroo',
    'red kangaroo',
    'Australian kangaroo',
    'Rotes Riesenkänguru'
  ],
  searchStrategy: {
    primary: 'red kangaroo portrait closeup wild -zoo',
    secondary: 'macropus rufus australia -landscape',
    filters: {
      orientation: 'portrait',
      color: 'color'
    }
  },
  meta: {
    conservationStatus: 'LC',
    habitat: 'Arid and Semi-arid Regions',
    wikiLinks: {
      en: 'https://en.wikipedia.org/wiki/Red_kangaroo',
      de: 'https://de.wikipedia.org/wiki/Rotes_Riesenkänguru'
    }
  }
};

export const andenkondor: Animal = {
  name: 'Andenkondor',
  country: 'Chile',
  scientific: 'Vultur gryphus',
  category: 'bird',
  keywords: {
    en: ['Andean Condor', 'Chilean condor', 'vultur gryphus'],
    de: ['Andenkondor', 'Chilenischer Kondor', 'Großer Kondor']
  },
  synonyms: [
    'Andean Condor',
    'vultur gryphus',
    'Chilean condor',
    'Großer Kondor'
  ],
  searchStrategy: {
    primary: 'andean condor portrait closeup wild -zoo',
    secondary: 'vultur gryphus chile bird -landscape',
    filters: {
      orientation: 'portrait',
      color: 'color'
    }
  },
  meta: {
    conservationStatus: 'VU',
    habitat: 'Andean Mountains',
    wikiLinks: {
      en: 'https://en.wikipedia.org/wiki/Andean_condor',
      de: 'https://de.wikipedia.org/wiki/Andenkondor'
    }
  }
};

export const chinesischerDrache: Animal = {
  name: 'Chinesischer Drache',
  country: 'China',
  scientific: 'Draco sinensis',
  category: 'mythical',
  keywords: {
    en: ['Chinese Dragon', 'imperial dragon', 'oriental dragon'],
    de: ['Chinesischer Drache', 'Kaiserdrache', 'Lóng']
  },
  synonyms: [
    'Chinese Dragon',
    'imperial dragon',
    'Lóng',
    '龙'
  ],
  searchStrategy: {
    primary: 'chinese imperial dragon symbol -landscape',
    secondary: 'traditional chinese dragon art -tattoo',
    filters: {
      orientation: 'portrait',
      color: 'color'
    }
  },
  meta: {
    conservationStatus: 'NA',
    habitat: 'Cultural Symbol',
    wikiLinks: {
      en: 'https://en.wikipedia.org/wiki/Chinese_dragon',
      de: 'https://de.wikipedia.org/wiki/Chinesischer_Drache'
    }
  }
};

export const weiskopfseeadler: Animal = {
  name: 'Weißkopfseeadler',
  country: 'USA',
  scientific: 'Haliaeetus leucocephalus',
  category: 'bird',
  keywords: {
    en: ['Bald Eagle', 'American Eagle', 'national bird'],
    de: ['Weißkopfseeadler', 'Amerikanischer Adler', 'Wappentier']
  },
  synonyms: [
    'Bald Eagle',
    'American Eagle',
    'national bird',
    'American symbol'
  ],
  searchStrategy: {
    primary: 'bald eagle portrait closeup wild -zoo',
    secondary: 'haliaeetus leucocephalus america -coin',
    filters: {
      orientation: 'portrait',
      color: 'color'
    }
  },
  meta: {
    conservationStatus: 'LC',
    habitat: 'Coastal Areas and Large Lakes',
    wikiLinks: {
      en: 'https://en.wikipedia.org/wiki/Bald_eagle',
      de: 'https://de.wikipedia.org/wiki/Weißkopfseeadler'
    }
  }
};

export const kiwi: Animal = {
  name: 'Kiwi',
  country: 'Neuseeland',
  scientific: 'Apteryx',
  category: 'bird',
  keywords: {
    en: ['New Zealand Kiwi', 'flightless bird', 'national bird'],
    de: ['Neuseeland-Kiwi', 'Streifenkiwi', 'Nationalvogel']
  },
  synonyms: [
    'New Zealand Kiwi',
    'flightless bird',
    'brown kiwi',
    'Streifenkiwi'
  ],
  searchStrategy: {
    primary: 'new zealand kiwi bird portrait -fruit',
    secondary: 'apteryx brown bird closeup -food',
    filters: {
      orientation: 'portrait',
      color: 'color'
    }
  },
  meta: {
    conservationStatus: 'VU',
    habitat: 'Forest Floor',
    wikiLinks: {
      en: 'https://en.wikipedia.org/wiki/Kiwi_(bird)',
      de: 'https://de.wikipedia.org/wiki/Kiwis'
    }
  }
};

export const kanadischerBiber: Animal = {
  name: 'Kanadischer Biber',
  country: 'Kanada',
  scientific: 'Castor canadensis',
  category: 'mammal',
  keywords: {
    en: ['Canadian Beaver', 'North American beaver', 'national symbol'],
    de: ['Kanadischer Biber', 'Amerikanischer Biber', 'Nationales Symbol']
  },
  synonyms: [
    'Canadian Beaver',
    'North American beaver',
    'national symbol',
    'Amerikanischer Biber'
  ],
  searchStrategy: {
    primary: 'canadian beaver portrait closeup wild -zoo',
    secondary: 'castor canadensis animal -landscape',
    filters: {
      orientation: 'portrait',
      color: 'color'
    }
  },
  meta: {
    conservationStatus: 'LC',
    habitat: 'Wetlands and Forests',
    wikiLinks: {
      en: 'https://en.wikipedia.org/wiki/North_American_beaver',
      de: 'https://de.wikipedia.org/wiki/Kanadischer_Biber'
    }
  }
};

export const irischerHirsch: Animal = {
  name: 'Irischer Hirsch',
  country: 'Irland',
  scientific: 'Cervus elaphus',
  category: 'heraldic',
  keywords: {
    en: ['Irish Deer', 'Celtic Deer', 'heraldic stag'],
    de: ['Irischer Hirsch', 'Keltischer Hirsch', 'Wappentier']
  },
  synonyms: [
    'Irish Deer',
    'Celtic Deer',
    'heraldic stag',
    'Keltischer Hirsch'
  ],
  searchStrategy: {
    primary: 'irish deer celtic symbol heraldic -landscape',
    secondary: 'celtic stag ireland coat of arms',
    filters: {
      orientation: 'portrait',
      color: 'color'
    }
  },
  meta: {
    conservationStatus: 'NA',
    habitat: 'Cultural Symbol',
    wikiLinks: {
      en: 'https://en.wikipedia.org/wiki/Irish_elk',
      de: 'https://de.wikipedia.org/wiki/Irischer_Riesenhirsch'
    }
  }
};

export const phoenixVogel: Animal = {
  name: 'Phönixvogel',
  country: 'Griechenland',
  scientific: 'Mythological Phoenix',
  category: 'mythical',
  keywords: {
    en: ['Phoenix', 'Greek phoenix', 'mythical bird'],
    de: ['Phönix', 'Griechischer Phönix', 'Feuervogel']
  },
  synonyms: [
    'Phoenix',
    'Firebird',
    'Greek phoenix',
    'Feuervogel'
  ],
  searchStrategy: {
    primary: 'greek phoenix mythical bird fire -tattoo',
    secondary: 'phoenix rising flames mythological',
    filters: {
      orientation: 'portrait',
      color: 'color'
    }
  },
  meta: {
    conservationStatus: 'NA',
    habitat: 'Mythological',
    wikiLinks: {
      en: 'https://en.wikipedia.org/wiki/Phoenix_(mythology)',
      de: 'https://de.wikipedia.org/wiki/Phönix'
    }
  }
};

export const schottischerEinhorn: Animal = {
  name: 'Schottisches Einhorn',
  country: 'Schottland',
  scientific: 'Mythological Unicorn',
  category: 'heraldic',
  keywords: {
    en: ['Scottish Unicorn', 'royal unicorn', 'heraldic unicorn'],
    de: ['Schottisches Einhorn', 'Königliches Einhorn', 'Wappeneinhorn']
  },
  synonyms: [
    'Scottish Unicorn',
    'royal unicorn',
    'heraldic unicorn',
    'Königliches Einhorn'
  ],
  searchStrategy: {
    primary: 'scottish royal unicorn heraldic symbol -cartoon',
    secondary: 'scotland coat of arms unicorn',
    filters: {
      orientation: 'portrait',
      color: 'color'
    }
  },
  meta: {
    conservationStatus: 'NA',
    habitat: 'National Symbol',
    wikiLinks: {
      en: 'https://en.wikipedia.org/wiki/Unicorn#Scotland',
      de: 'https://de.wikipedia.org/wiki/Einhorn'
    }
  }
};

export const walisischerDrache: Animal = {
  name: 'Walisischer Drache',
  country: 'Wales',
  scientific: 'Y Ddraig Goch',
  category: 'mythical',
  keywords: {
    en: ['Welsh Dragon', 'Red Dragon', 'Y Ddraig Goch'],
    de: ['Walisischer Drache', 'Roter Drache', 'Walisisches Symbol']
  },
  synonyms: [
    'Welsh Dragon',
    'Red Dragon',
    'Y Ddraig Goch',
    'Roter Drache'
  ],
  searchStrategy: {
    primary: 'welsh red dragon flag symbol -cartoon',
    secondary: 'y ddraig goch wales heraldic',
    filters: {
      orientation: 'portrait',
      color: 'color'
    }
  },
  meta: {
    conservationStatus: 'NA',
    habitat: 'National Symbol',
    wikiLinks: {
      en: 'https://en.wikipedia.org/wiki/Welsh_Dragon',
      de: 'https://de.wikipedia.org/wiki/Walisischer_Drache'
    }
  }
};

export const norwegischerLoewe: Animal = {
  name: 'Norwegischer Löwe',
  country: 'Norwegen',
  scientific: 'Leo norwegicus',
  category: 'heraldic',
  keywords: {
    en: ['Norwegian Lion', 'heraldic lion', 'coat of arms'],
    de: ['Norwegischer Löwe', 'Wappenlöwe', 'Nordischer Löwe']
  },
  synonyms: [
    'Norwegian Lion',
    'Nordic Lion',
    'heraldic lion',
    'Nordischer Löwe'
  ],
  searchStrategy: {
    primary: 'norwegian coat of arms lion heraldic',
    secondary: 'norway royal lion symbol',
    filters: {
      orientation: 'portrait',
      color: 'color'
    }
  },
  meta: {
    conservationStatus: 'NA',
    habitat: 'National Symbol',
    wikiLinks: {
      en: 'https://en.wikipedia.org/wiki/Coat_of_arms_of_Norway',
      de: 'https://de.wikipedia.org/wiki/Wappen_Norwegens'
    }
  }
};

export const spanischerStier: Animal = {
  name: 'Spanischer Stier',
  country: 'Spanien',
  scientific: 'Bos taurus hispanicus',
  category: 'mammal',
  keywords: {
    en: ['Spanish Bull', 'Osborne Bull', 'national symbol'],
    de: ['Spanischer Stier', 'Osborne-Stier', 'Nationales Symbol']
  },
  synonyms: [
    'Spanish Bull',
    'Osborne Bull',
    'Toro de Osborne',
    'Osborne-Stier'
  ],
  searchStrategy: {
    primary: 'spanish osborne bull silhouette symbol',
    secondary: 'toro de osborne spain national',
    filters: {
      orientation: 'portrait',
      color: 'black_and_white'
    }
  },
  meta: {
    conservationStatus: 'NA',
    habitat: 'Cultural Symbol',
    wikiLinks: {
      en: 'https://en.wikipedia.org/wiki/Osborne_bull',
      de: 'https://de.wikipedia.org/wiki/Osborne-Stier'
    }
  }
};

export const singapurMerlion: Animal = {
  name: 'Singapur Merlion',
  country: 'Singapur',
  scientific: 'Mythological Merlion',
  category: 'mythical',
  keywords: {
    en: ['Merlion', 'Singapore Merlion', 'lion-fish'],
    de: ['Merlion', 'Singapur Merlion', 'Löwenfisch']
  },
  synonyms: [
    'Merlion',
    'Singapore Merlion',
    'lion-fish',
    'Löwenfisch'
  ],
  searchStrategy: {
    primary: 'singapore merlion statue symbol -toy',
    secondary: 'merlion fountain national icon',
    filters: {
      orientation: 'portrait',
      color: 'color'
    }
  },
  meta: {
    conservationStatus: 'NA',
    habitat: 'National Symbol',
    wikiLinks: {
      en: 'https://en.wikipedia.org/wiki/Merlion',
      de: 'https://de.wikipedia.org/wiki/Merlion'
    }
  }
};

export const schwedischerLoewe: Animal = {
  name: 'Schwedischer Löwe',
  country: 'Schweden',
  scientific: 'Leo scandinavicus',
  category: 'heraldic',
  keywords: {
    en: ['Swedish Lion', 'heraldic lion', 'coat of arms'],
    de: ['Schwedischer Löwe', 'Wappenlöwe', 'Nordischer Löwe']
  },
  synonyms: [
    'Swedish Lion',
    'Nordic Lion',
    'heraldic lion',
    'Tre Kronor'
  ],
  searchStrategy: {
    primary: 'swedish coat of arms lion heraldic',
    secondary: 'sweden royal lion symbol',
    filters: {
      orientation: 'portrait',
      color: 'color'
    }
  },
  meta: {
    conservationStatus: 'NA',
    habitat: 'National Symbol',
    wikiLinks: {
      en: 'https://en.wikipedia.org/wiki/Coat_of_arms_of_Sweden',
      de: 'https://de.wikipedia.org/wiki/Wappen_Schwedens'
    }
  }
};

export const tschechischerLoewe: Animal = {
  name: 'Tschechischer Löwe',
  country: 'Tschechien',
  scientific: 'Leo bohemicus',
  category: 'heraldic',
  keywords: {
    en: ['Czech Lion', 'Bohemian Lion', 'coat of arms'],
    de: ['Tschechischer Löwe', 'Böhmischer Löwe', 'Wappentier']
  },
  synonyms: [
    'Czech Lion',
    'Bohemian Lion',
    'heraldic lion',
    'Český lev'
  ],
  searchStrategy: {
    primary: 'czech bohemian lion coat of arms',
    secondary: 'czech republic heraldic lion symbol',
    filters: {
      orientation: 'portrait',
      color: 'color'
    }
  },
  meta: {
    conservationStatus: 'NA',
    habitat: 'National Symbol',
    wikiLinks: {
      en: 'https://en.wikipedia.org/wiki/Coat_of_arms_of_the_Czech_Republic',
      de: 'https://de.wikipedia.org/wiki/Wappen_der_Tschechischen_Republik'
    }
  }
};

export const finnischerLoewe: Animal = {
  name: 'Finnischer Löwe',
  country: 'Finnland',
  scientific: 'Leo finnicus',
  category: 'heraldic',
  keywords: {
    en: ['Finnish Lion', 'heraldic lion', 'coat of arms'],
    de: ['Finnischer Löwe', 'Wappenlöwe', 'Finnisches Symbol']
  },
  synonyms: [
    'Finnish Lion',
    'Nordic Lion',
    'heraldic lion',
    'Suomen leijona'
  ],
  searchStrategy: {
    primary: 'finnish coat of arms lion heraldic',
    secondary: 'finland royal lion symbol',
    filters: {
      orientation: 'portrait',
      color: 'color'
    }
  },
  meta: {
    conservationStatus: 'NA',
    habitat: 'National Symbol',
    wikiLinks: {
      en: 'https://en.wikipedia.org/wiki/Coat_of_arms_of_Finland',
      de: 'https://de.wikipedia.org/wiki/Wappen_Finnlands'
    }
  }
};

export const mexikanischerAdler: Animal = {
  name: 'Mexikanischer Adler',
  country: 'Mexiko',
  scientific: 'Aquila chrysaetos mexicana',
  category: 'heraldic',
  keywords: {
    en: ['Mexican Eagle', 'Golden Eagle', 'coat of arms'],
    de: ['Mexikanischer Adler', 'Goldadler', 'Wappentier']
  },
  synonyms: [
    'Mexican Eagle',
    'Golden Eagle',
    'Águila Real',
    'Aztec Eagle'
  ],
  searchStrategy: {
    primary: 'mexican coat of arms eagle snake cactus',
    secondary: 'mexico golden eagle national symbol',
    filters: {
      orientation: 'portrait',
      color: 'color'
    }
  },
  meta: {
    conservationStatus: 'LC',
    habitat: 'National Symbol',
    wikiLinks: {
      en: 'https://en.wikipedia.org/wiki/Coat_of_arms_of_Mexico',
      de: 'https://de.wikipedia.org/wiki/Wappen_Mexikos'
    }
  }
};

export const sriLankaLoewe: Animal = {
  name: 'Sri-Lanka-Löwe',
  country: 'Sri Lanka',
  scientific: 'Leo ceylonensis',
  category: 'heraldic',
  keywords: {
    en: ['Sri Lankan Lion', 'Sinhala Lion', 'national symbol'],
    de: ['Sri-Lanka-Löwe', 'Sinhala-Löwe', 'Nationales Symbol']
  },
  synonyms: [
    'Sri Lankan Lion',
    'Sinhala Lion',
    'Ceylon Lion',
    'සිංහ කොටිය'
  ],
  searchStrategy: {
    primary: 'sri lanka lion flag symbol national',
    secondary: 'sinhala lion ceylon heraldic',
    filters: {
      orientation: 'portrait',
      color: 'color'
    }
  },
  meta: {
    conservationStatus: 'NA',
    habitat: 'National Symbol',
    wikiLinks: {
      en: 'https://en.wikipedia.org/wiki/Lion_(heraldry)#Sri_Lanka',
      de: 'https://de.wikipedia.org/wiki/Flagge_Sri_Lankas'
    }
  }
};

export const animalDefinitions: Animal[] = [
  bundesadler,
  doppelkoepfigerAdler,
  weisserAdler,
  leoBelgicus,
  bengalischerTiger,
  malaiischerTiger,
  druk,
  gallischerHahn,
  quetzal,
  komododrache,
  markhor,
  springbock,
  steppenzebra,
  heiligekuh,
  koeniglicherLoewe,
  russischerBaer,
  kaenguru,
  andenkondor,
  chinesischerDrache,
  weiskopfseeadler,
  kiwi,
  kanadischerBiber,
  irischerHirsch,
  phoenixVogel,
  schottischerEinhorn,
  walisischerDrache,
  norwegischerLoewe,
  spanischerStier,
  singapurMerlion,
  schwedischerLoewe,
  tschechischerLoewe,
  finnischerLoewe,
  mexikanischerAdler,
  sriLankaLoewe
]; 
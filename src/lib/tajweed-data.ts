export interface TajweedRule {
  id: string;
  name: string;
  arabic: string;
  meta: string;
  letters?: string;
  definition: string;
  howTo: string;
  example: { arabic: string; translit: string; surah: string };
  tip: string;
}

export const TAJWEED_RULES: TajweedRule[] = [
  {
    id: "qalqalah",
    name: "Al-Qalqalah",
    arabic: "القلقلة",
    meta: "Bouncing letters",
    letters: "ق ط ب ج د",
    definition:
      "Qalqalah means \"echo\" or \"reverberation\". It produces a subtle bouncing clarity when one of its five letters carries sukoon.",
    howTo:
      "Pronounce the letter with a slight rebound — never add a vowel. Keep the bounce light when the letter sits mid-word, stronger when stopping.",
    example: {
      arabic: "قُلْ هُوَ ٱللَّهُ أَحَدٌ",
      translit: "Qul huwa Allāhu aḥad",
      surah: "Al-Ikhlas 112:1",
    },
    tip: "Listen for a clean tap — not a hum, not a vowel. ‘Q’ in qul should rebound off the back of the throat.",
  },
  {
    id: "idgham",
    name: "Al-Idgham",
    arabic: "الإدغام",
    meta: "Merging of letters",
    letters: "ي ر م ل و ن",
    definition:
      "Idgham merges a noon sākinah or tanween into a following letter, producing one held sound instead of two.",
    howTo:
      "Glide directly into the next letter without separating. With ghunnah (ي ن م و) hold a nasal hum for 2 counts; without ghunnah (ل ر) merge cleanly.",
    example: {
      arabic: "مِنْ رَّبِّهِمْ",
      translit: "Mir rabbihim",
      surah: "Al-Baqarah 2:5",
    },
    tip: "Think of it like two letters fusing into one — never pause between them.",
  },
  {
    id: "ikhfa",
    name: "Al-Ikhfa",
    arabic: "الإخفاء",
    meta: "Concealment",
    letters: "15 letters",
    definition:
      "Ikhfa hides the noon sākinah or tanween between full clarity and full merging — a soft nasal sound held for 2 counts.",
    howTo:
      "Do not touch the tongue to the roof of the mouth as you would for a noon. Let the sound hum through the nose toward the next letter's articulation point.",
    example: {
      arabic: "أَنْتُمْ",
      translit: "Antum",
      surah: "Al-Fatiha 1:7",
    },
    tip: "Your mouth should already be shaping the next letter while the nasal hum continues.",
  },
  {
    id: "madd",
    name: "Madd",
    arabic: "المدّ",
    meta: "Prolongation rules",
    letters: "ا و ي",
    definition:
      "Madd lengthens a vowel sound. Natural madd is held for 2 counts; secondary madds extend up to 6 counts depending on what follows.",
    howTo:
      "Count the beats as you recite — clap softly to feel the timing. Never cut a madd short, and never stretch a short vowel.",
    example: {
      arabic: "ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
      translit: "Ar-raḥmāni ar-raḥīm",
      surah: "Al-Fatiha 1:3",
    },
    tip: "If unsure, hold for 2 — a steady natural madd is the foundation everything else builds on.",
  },
  {
    id: "ghunnah",
    name: "Al-Ghunnah",
    arabic: "الغنّة",
    meta: "Nasal sound",
    letters: "ن م (with shaddah)",
    definition:
      "Ghunnah is a nasal resonance produced from the nose, held for 2 counts on a shaddah-marked noon or meem.",
    howTo:
      "Pinch your nose briefly while reciting — if the sound stops, you found the ghunnah. Hold it evenly without rising or falling.",
    example: {
      arabic: "إِنَّ",
      translit: "Inna",
      surah: "common",
    },
    tip: "Ghunnah is felt, not forced — a smooth hum, not a buzz.",
  },
];

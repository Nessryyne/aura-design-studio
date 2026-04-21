import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { AppShell } from "@/components/AppShell";
import { getSession } from "@/lib/auth";

export const Route = createFileRoute("/memorization")({
  head: () => ({
    meta: [
      { title: "Memorization — Tajweed" },
      { name: "description", content: "Hifz companion: memorize the Qur'an verse by verse." },
    ],
  }),
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      const s = getSession();
      if (!s) throw redirect({ to: "/signin" });
      if (!s.onboarded) throw redirect({ to: "/onboarding" });
    }
  },
  component: Memorization,
});

type Surah = { id: number; name: string; arabic: string; verses: number };
type Verse = { arabic: string; transliteration: string; translation: string };

const SURAHS: Surah[] = [
  { id: 1, name: "Al-Fatiha", arabic: "الفاتحة", verses: 7 },
  { id: 112, name: "Al-Ikhlas", arabic: "الإخلاص", verses: 4 },
  { id: 113, name: "Al-Falaq", arabic: "الفلق", verses: 5 },
  { id: 114, name: "An-Nas", arabic: "الناس", verses: 6 },
  { id: 2, name: "Al-Baqarah", arabic: "البقرة", verses: 286 },
  { id: 36, name: "Ya-Sin", arabic: "يس", verses: 83 },
  { id: 55, name: "Ar-Rahman", arabic: "الرحمن", verses: 78 },
  { id: 67, name: "Al-Mulk", arabic: "الملك", verses: 30 },
];

const VERSES: Record<string, Verse> = {
  "1-1": { arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", transliteration: "Bismillāhir-raḥmānir-raḥīm", translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful." },
  "1-2": { arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", transliteration: "Al-ḥamdu lillāhi rabbil-'ālamīn", translation: "All praise is due to Allah, Lord of the worlds." },
  "1-3": { arabic: "الرَّحْمَٰنِ الرَّحِيمِ", transliteration: "Ar-raḥmānir-raḥīm", translation: "The Entirely Merciful, the Especially Merciful." },
  "1-4": { arabic: "مَالِكِ يَوْمِ الدِّينِ", transliteration: "Māliki yawmid-dīn", translation: "Sovereign of the Day of Recompense." },
  "1-5": { arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", transliteration: "Iyyāka na'budu wa-iyyāka nasta'īn", translation: "It is You we worship and You we ask for help." },
  "1-6": { arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", transliteration: "Ihdinaṣ-ṣirāṭal-mustaqīm", translation: "Guide us to the straight path." },
  "1-7": { arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", transliteration: "Ṣirāṭal-laḏīna an'amta 'alayhim ġayril-maġḍūbi 'alayhim wa-laḍ-ḍāllīn", translation: "The path of those upon whom You have bestowed favor, not of those who have earned anger, nor of those who are astray." },
  "112-1": { arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ", transliteration: "Qul huwallāhu aḥad", translation: "Say, He is Allah, the One." },
  "112-2": { arabic: "اللَّهُ الصَّمَدُ", transliteration: "Allāhuṣ-ṣamad", translation: "Allah, the Eternal Refuge." },
  "112-3": { arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ", transliteration: "Lam yalid wa lam yūlad", translation: "He neither begets nor is born." },
  "112-4": { arabic: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", transliteration: "Wa lam yakul-lahū kufuwan aḥad", translation: "Nor is there to Him any equivalent." },
  "113-1": { arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", transliteration: "Qul a'ūḏu bi-rabbil-falaq", translation: "Say, I seek refuge in the Lord of daybreak." },
  "113-2": { arabic: "مِن شَرِّ مَا خَلَقَ", transliteration: "Min šarri mā ḵalaq", translation: "From the evil of that which He created." },
  "113-3": { arabic: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", transliteration: "Wa min šarri ġāsiqin iḏā waqab", translation: "And from the evil of darkness when it settles." },
  "113-4": { arabic: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", transliteration: "Wa min šarrin-naffāṯāti fil-'uqad", translation: "And from the evil of the blowers in knots." },
  "113-5": { arabic: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", transliteration: "Wa min šarri ḥāsidin iḏā ḥasad", translation: "And from the evil of an envier when he envies." },
  "114-1": { arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", transliteration: "Qul a'ūḏu bi-rabbin-nās", translation: "Say, I seek refuge in the Lord of mankind." },
  "114-2": { arabic: "مَلِكِ النَّاسِ", transliteration: "Malikin-nās", translation: "The Sovereign of mankind." },
  "114-3": { arabic: "إِلَٰهِ النَّاسِ", transliteration: "Ilāhin-nās", translation: "The God of mankind." },
  "114-4": { arabic: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", transliteration: "Min šarril-waswāsil-ḵannās", translation: "From the evil of the retreating whisperer." },
  "114-5": { arabic: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", transliteration: "Allaḏī yuwaswisu fī ṣudūrin-nās", translation: "Who whispers in the breasts of mankind." },
  "114-6": { arabic: "مِنَ الْجِنَّةِ وَالنَّاسِ", transliteration: "Minal-jinnati wan-nās", translation: "From among the jinn and mankind." },
};

const TOTAL_REPETITIONS = 5;

const getVerse = (surahId: number, verseNum: number): Verse =>
  VERSES[`${surahId}-${verseNum}`] ?? {
    arabic: "هَٰذَا مِن فَضْلِ رَبِّي",
    transliteration: "Hāḏā min faḍli rabbī",
    translation: "This is from the grace of my Lord.",
  };

function Memorization() {
  const [step, setStep] = useState<"select" | "memorize" | "complete">("select");
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [surahOpen, setSurahOpen] = useState(false);
  const [verseOpen, setVerseOpen] = useState(false);
  const [repetitions, setRepetitions] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showTranslit, setShowTranslit] = useState(false);
  const recordTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const verse = selectedSurah && selectedVerse ? getVerse(selectedSurah.id, selectedVerse) : null;

  useEffect(() => () => {
    if (recordTimer.current) clearTimeout(recordTimer.current);
  }, []);

  const stopRecording = () => {
    if (recordTimer.current) clearTimeout(recordTimer.current);
    setIsRecording(false);
    setRepetitions((prev) => {
      const next = prev + 1;
      if (next >= TOTAL_REPETITIONS) setTimeout(() => setStep("complete"), 500);
      return next;
    });
  };

  const handleStartRecording = () => {
    if (repetitions >= TOTAL_REPETITIONS || isRecording) return;
    setIsRecording(true);
    recordTimer.current = setTimeout(stopRecording, 3500);
  };

  const startMemorizing = () => {
    if (selectedSurah && selectedVerse) {
      setRepetitions(0);
      setStep("memorize");
    }
  };

  const resetSession = () => {
    setRepetitions(0);
    setIsRecording(false);
    setStep("select");
    setSelectedSurah(null);
    setSelectedVerse(null);
    setShowTranslation(false);
    setShowTranslit(false);
  };

  return (
    <AppShell>
      <div className="flex h-full flex-col arabesque">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-3">
          <Link
            to="/home"
            className="grid h-8 w-8 place-items-center rounded-full bg-surface-2 text-foreground/70 text-sm"
          >
            ‹
          </Link>
          <div className="text-center">
            <p className="font-serif text-lg text-foreground">Hifz Companion</p>
            <p className="font-arabic text-[11px] text-gold-deep">حفظ القرآن</p>
          </div>
          <span className="h-8 w-8" />
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 pt-4 pb-28">
          {step === "select" && (
            <div className="space-y-4">
              <p className="text-[11px] leading-relaxed text-muted-foreground">
                Choose a Surah and verse to begin your memorization session.
              </p>

              {/* Surah dropdown */}
              <div>
                <p className="text-[10px] uppercase tracking-widest text-emerald mb-1.5">Surah</p>
                <button
                  onClick={() => {
                    setSurahOpen(!surahOpen);
                    setVerseOpen(false);
                  }}
                  className="w-full flex items-center justify-between rounded-2xl border border-gold/30 bg-surface px-4 py-3 text-sm text-left text-foreground"
                >
                  <span className={selectedSurah ? "" : "text-foreground/40"}>
                    {selectedSurah ? `${selectedSurah.id}. ${selectedSurah.name}` : "Select a Surah..."}
                  </span>
                  <span className="text-foreground/40">▾</span>
                </button>
                {surahOpen && (
                  <div className="mt-2 max-h-64 overflow-y-auto rounded-2xl border border-foreground/10 bg-surface divide-y divide-foreground/5">
                    {SURAHS.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          setSelectedSurah(s);
                          setSelectedVerse(null);
                          setSurahOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-left ${
                          selectedSurah?.id === s.id
                            ? "bg-gold/10 text-gold-deep"
                            : "text-foreground/80"
                        }`}
                      >
                        <span>
                          {s.id}. {s.name}
                        </span>
                        <span className="font-arabic text-base">{s.arabic}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Verse dropdown */}
              {selectedSurah && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-emerald mb-1.5">
                    Verse (Ayah)
                  </p>
                  <button
                    onClick={() => {
                      setVerseOpen(!verseOpen);
                      setSurahOpen(false);
                    }}
                    className="w-full flex items-center justify-between rounded-2xl border border-gold/30 bg-surface px-4 py-3 text-sm text-left text-foreground"
                  >
                    <span className={selectedVerse ? "" : "text-foreground/40"}>
                      {selectedVerse ? `Ayah ${selectedVerse}` : "Select a verse..."}
                    </span>
                    <span className="text-foreground/40">▾</span>
                  </button>
                  {verseOpen && (
                    <div className="mt-2 grid grid-cols-6 gap-1.5 max-h-48 overflow-y-auto rounded-2xl border border-foreground/10 bg-surface p-2">
                      {Array.from({ length: selectedSurah.verses }, (_, i) => i + 1).map((v) => (
                        <button
                          key={v}
                          onClick={() => {
                            setSelectedVerse(v);
                            setVerseOpen(false);
                          }}
                          className={`rounded-lg px-2 py-1.5 text-xs ${
                            selectedVerse === v
                              ? "bg-gradient-gold text-foreground shadow-gold"
                              : "bg-surface-2 text-foreground/70"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Preview */}
              {verse && (
                <div className="rounded-2xl bg-gradient-cream border border-gold/30 p-5 text-center">
                  <p className="font-arabic text-2xl leading-relaxed text-foreground">
                    {verse.arabic}
                  </p>
                  <p className="mt-3 text-[11px] italic text-muted-foreground">
                    "{verse.translation}"
                  </p>
                </div>
              )}

              <button
                onClick={startMemorizing}
                disabled={!selectedSurah || !selectedVerse}
                className="w-full rounded-2xl bg-gradient-emerald py-3.5 text-sm font-medium text-background shadow-elevated disabled:opacity-40 transition-transform active:scale-[0.98]"
              >
                Begin Session →
              </button>
            </div>
          )}

          {step === "memorize" && verse && selectedSurah && (
            <div className="space-y-4">
              <p className="text-center text-[10px] uppercase tracking-widest text-emerald">
                {selectedSurah.name} · {selectedSurah.arabic} · Ayah {selectedVerse}
              </p>

              {/* Progress dots */}
              <div className="flex items-center justify-center gap-2">
                {Array.from({ length: TOTAL_REPETITIONS }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-2.5 w-2.5 rounded-full ${
                      i < repetitions ? "bg-gradient-gold shadow-gold" : "bg-foreground/15"
                    }`}
                  />
                ))}
              </div>
              <p className="text-center text-[11px] text-muted-foreground">
                {repetitions < TOTAL_REPETITIONS
                  ? `${repetitions} of ${TOTAL_REPETITIONS} repetitions`
                  : "All repetitions complete!"}
              </p>

              {/* Verse card */}
              <div className="relative rounded-3xl bg-gradient-cream border border-gold/40 p-6 shadow-gold">
                <span className="absolute top-2 left-3 text-gold-deep/60 text-xs">❖</span>
                <span className="absolute top-2 right-3 text-gold-deep/60 text-xs">❖</span>
                <p className="font-arabic text-2xl leading-loose text-right text-foreground">
                  {verse.arabic}
                </p>
                <div className="mt-4 grid h-7 w-7 mx-auto place-items-center rounded-full bg-gradient-gold text-foreground text-[11px] shadow-gold">
                  {selectedVerse}
                </div>
              </div>

              {/* Toggles */}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowTranslit(!showTranslit)}
                  className={`flex-1 rounded-xl py-2.5 text-[10px] uppercase tracking-widest border ${
                    showTranslit
                      ? "border-gold bg-gold/10 text-gold-deep"
                      : "border-foreground/10 bg-surface text-muted-foreground"
                  }`}
                >
                  Transliteration
                </button>
                <button
                  onClick={() => setShowTranslation(!showTranslation)}
                  className={`flex-1 rounded-xl py-2.5 text-[10px] uppercase tracking-widest border ${
                    showTranslation
                      ? "border-gold bg-gold/10 text-gold-deep"
                      : "border-foreground/10 bg-surface text-muted-foreground"
                  }`}
                >
                  Translation
                </button>
              </div>

              {showTranslit && (
                <div className="rounded-2xl bg-surface border border-foreground/5 p-4">
                  <p className="text-sm italic text-foreground/80 text-center">
                    {verse.transliteration}
                  </p>
                </div>
              )}
              {showTranslation && (
                <div className="rounded-2xl bg-surface border border-foreground/5 p-4">
                  <p className="text-sm text-foreground/80 text-center">"{verse.translation}"</p>
                </div>
              )}
            </div>
          )}

          {step === "complete" && verse && selectedSurah && (
            <div className="space-y-5 text-center pt-4">
              <div className="grid h-16 w-16 mx-auto place-items-center rounded-full bg-gradient-gold shadow-gold text-2xl text-foreground">
                ✦
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-emerald">
                  Session Complete
                </p>
                <h2 className="mt-1 font-serif text-2xl text-foreground">Masha'Allah 🌙</h2>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  You recited {selectedSurah.name} Ayah {selectedVerse} {TOTAL_REPETITIONS} times.
                </p>
              </div>
              <div className="flex justify-center gap-1.5">
                {Array.from({ length: TOTAL_REPETITIONS }).map((_, i) => (
                  <span key={i} className="text-gold-deep">★</span>
                ))}
              </div>
              <div className="rounded-2xl bg-gradient-cream border border-gold/30 p-5">
                <p className="font-arabic text-xl text-foreground leading-relaxed">{verse.arabic}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setRepetitions(0);
                    setStep("memorize");
                  }}
                  className="flex-1 rounded-2xl border border-foreground/10 bg-surface py-3 text-[11px] uppercase tracking-widest text-foreground/70"
                >
                  Again
                </button>
                <button
                  onClick={resetSession}
                  className="flex-1 rounded-2xl bg-gradient-emerald py-3 text-[11px] uppercase tracking-widest text-background shadow-elevated"
                >
                  New Verse
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom record bar */}
        {step === "memorize" && (
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
            <div className="rounded-3xl bg-surface/95 backdrop-blur border border-foreground/10 shadow-elevated px-5 py-3 flex flex-col items-center gap-1.5">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {isRecording
                  ? "Reciting... tap to finish"
                  : repetitions >= TOTAL_REPETITIONS
                  ? "All done!"
                  : "Tap to recite"}
              </p>
              <button
                onClick={() => (isRecording ? stopRecording() : handleStartRecording())}
                disabled={repetitions >= TOTAL_REPETITIONS}
                className={`grid h-14 w-14 place-items-center rounded-full transition-all ${
                  isRecording
                    ? "bg-gradient-gold shadow-gold scale-110 animate-pulse"
                    : repetitions >= TOTAL_REPETITIONS
                    ? "bg-foreground/10 text-foreground/30"
                    : "bg-gradient-emerald text-background shadow-elevated"
                }`}
                aria-label="Record"
              >
                <span className="text-xl">●</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

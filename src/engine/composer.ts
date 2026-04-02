export const CHOSEONG = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];
export const JUNGSEONG = [
  "ㅏ",
  "ㅐ",
  "ㅑ",
  "ㅒ",
  "ㅓ",
  "ㅔ",
  "ㅕ",
  "ㅖ",
  "ㅗ",
  "ㅘ",
  "ㅙ",
  "ㅚ",
  "ㅛ",
  "ㅜ",
  "ㅝ",
  "ㅞ",
  "ㅟ",
  "ㅠ",
  "ㅡ",
  "ㅢ",
  "ㅣ",
];
export const JONGSEONG = [
  "",
  "ㄱ",
  "ㄲ",
  "ㄳ",
  "ㄴ",
  "ㄵ",
  "ㄶ",
  "ㄷ",
  "ㄹ",
  "ㄺ",
  "ㄻ",
  "ㄼ",
  "ㄽ",
  "ㄾ",
  "ㄿ",
  "ㅀ",
  "ㅁ",
  "ㅂ",
  "ㅄ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

export const BOTTOM_VOWELS = new Set([
  "ㅗ",
  "ㅛ",
  "ㅜ",
  "ㅠ",
  "ㅡ",
  "ㆍ",
  "\u119E",
  "\u318D",
  "ᆄ",
  "ᆅ",
  "ᆈ",
  "ᆑ",
  "ᆒ",
  "ᆔ",
  "ᆕ",
  "ힱ",
]); // Including some old ones

// Decomposition Map for Complex Jamos and standard pre-composed combinations
// TODO: 디컴포지션 맵이 예외 없이 유효한 대응을 시키는지 확인 필요
// TODO: 누락된 대상 자모, 변환결과 부정확 여부 확인
export const DECOMPOSITION_MAP: Record<string, string[]> = {
  // Double consonants
  ㄲ: ["ㄱ", "ㄱ"],
  ㄸ: ["ㄷ", "ㄷ"],
  ㅃ: ["ㅂ", "ㅂ"],
  ㅆ: ["ㅅ", "ㅅ"],
  ㅉ: ["ㅈ", "ㅈ"],
  // Complex final consonants
  ㄳ: ["ㄱ", "ㅅ"],
  ㄵ: ["ㄴ", "ㅈ"],
  ㄶ: ["ㄴ", "ㅎ"],
  ㄺ: ["ㄹ", "ㄱ"],
  ㄻ: ["ㄹ", "ㅁ"],
  ㄼ: ["ㄹ", "ㅂ"],
  ㄽ: ["ㄹ", "ㅅ"],
  ㄾ: ["ㄹ", "ㅌ"],
  ㄿ: ["ㄹ", "ㅍ"],
  ㅀ: ["ㄹ", "ㅎ"],
  ㅄ: ["ㅂ", "ㅅ"],
  // Complex vowels
  ㅘ: ["ㅗ", "ㅏ"],
  ㅙ: ["ㅗ", "ㅐ"],
  ㅚ: ["ㅗ", "ㅣ"],
  ㅝ: ["ㅜ", "ㅓ"],
  ㅞ: ["ㅜ", "ㅔ"],
  ㅟ: ["ㅜ", "ㅣ"],
  ㅢ: ["ㅡ", "ㅣ"],

  // Old Hangul basic cluster decomposition mapping (approximation for rendering inputs properly)
  ᄓ: ["ㄴ", "ㄱ"],
  ᄔ: ["ㄴ", "ㄴ"],
  ᄕ: ["ㄴ", "ㄷ"],
  ᄖ: ["ㄴ", "ㅂ"],
  ᄗ: ["ㄷ", "ㄱ"],
  ᄘ: ["ㄹ", "ㄴ"],
  ᄙ: ["ㄹ", "ㄹ"],
  ᄚ: ["ㄹ", "ㅎ"],
  ᄜ: ["ㅁ", "ㅂ"],
  ᄞ: ["ㅂ", "ㄱ"],
  ᄟ: ["ㅂ", "ㄴ"],
  ᄠ: ["ㅂ", "ㄷ"],
  ᄡ: ["ㅂ", "ㅅ"],
  ᄢ: ["ㅂ", "ㅅ", "ㄱ"],
  ᄣ: ["ㅂ", "ㅅ", "ㄷ"],
  ᄤ: ["ㅂ", "ㅅ", "ㅂ"],
  ᄥ: ["ㅂ", "ㅅ", "ㅅ"],
  ᄦ: ["ㅂ", "ㅅ", "ㅈ"],
  ᄧ: ["ㅂ", "ㅈ"],
  ᄨ: ["ㅂ", "ㅊ"],
  ᄩ: ["ㅂ", "ㅌ"],
  ᄪ: ["ㅂ", "ㅍ"],
  ᄭ: ["ㅅ", "ㄱ"],
  ᄮ: ["ㅅ", "ㄴ"],
  ᄯ: ["ㅅ", "ㄷ"],
  ᄰ: ["ㅅ", "ㄹ"],
  ᄱ: ["ㅅ", "ㅁ"],
  ᄲ: ["ㅅ", "ㅂ"],
  ᄳ: ["ㅅ", "ㅂ", "ㄱ"],
  ᄴ: ["ㅅ", "ㅅ", "ㅅ"],
  ᄵ: ["ㅅ", "ㅇ"],
  ᄶ: ["ㅅ", "ㅈ"],
  ᄷ: ["ㅅ", "ㅊ"],
  ᄸ: ["ㅅ", "ㅋ"],
  ᄹ: ["ㅅ", "ㅌ"],
  ᄺ: ["ㅅ", "ㅍ"],
  ᄻ: ["ㅅ", "ㅎ"],
  ᄼ: ["ᄼ"],
  ᄽ: ["ᄽ"],
  ᄾ: ["ᄾ"],
  ᄿ: ["ᄿ"],
  ᅀ: ["ㅿ"],
  ᅁ: ["ㅇ", "ㄱ"],
  ᅂ: ["ㅇ", "ㄷ"],
  ᅃ: ["ㅇ", "ㅁ"],
  ᅄ: ["ㅇ", "ㅂ"],
  ᅅ: ["ㅇ", "ㅅ"],
  ᅆ: ["ㅇ", "ㅿ"],
  ᅇ: ["ㅇ", "ㅇ"],
  ᅈ: ["ㅇ", "ㅈ"],
  ᅉ: ["ㅇ", "ㅊ"],
  ᅊ: ["ㅇ", "ㅌ"],
  ᅋ: ["ㅇ", "ㅍ"],
  ᅌ: ["ㆁ"],
  ᅍ: ["ㅈ", "ㅇ"],
  ᅎ: ["ᅎ"],
  ᅏ: ["ᅏ"],
  ᅐ: ["ᅐ"],
  ᅑ: ["ᅑ"],
  ᅒ: ["ㅊ", "ㅋ"],
  ᅓ: ["ㅊ", "ㅎ"],
  ᅔ: ["ᅔ"],
  ᅕ: ["ᅕ"],
  ᅖ: ["ㅍ", "ㅂ"],
  ᅘ: ["ㅎ", "ㅎ"],
  ᅙ: ["ㆆ"],

  // Old Hangul basic vowel cluster decomposition mapping
  ᆄ: ["ㅛ", "ㅑ"],
  ᆅ: ["ㅛ", "ㅒ"],
  ᆆ: ["ㅛ", "ㅕ"],
  ᆇ: ["ㅛ", "ㅗ"],
  ᆈ: ["ㅛ", "ㅣ"],
  ᆉ: ["ㅜ", "ㅏ"],
  ᆊ: ["ㅜ", "ㅐ"],
  ᆋ: ["ㅜ", "ㅓ", "ㅡ"],
  ᆌ: ["ㅜ", "ㅖ"],
  ᆍ: ["ㅜ", "ㅜ"],
  ᆎ: ["ㅠ", "ㅏ"],
  ᆏ: ["ㅠ", "ㅓ"],
  ᆐ: ["ㅠ", "ㅔ"],
  ᆑ: ["ㅠ", "ㅕ"],
  ᆒ: ["ㅠ", "ㅖ"],
  ᆓ: ["ㅠ", "ㅜ"],
  ᆔ: ["ㅠ", "ㅣ"],
  ᆕ: ["ㅡ", "ㅜ"],
  ᆖ: ["ㅡ", "ㅡ"],
  ᆗ: ["ㅢ", "ㅜ"],
  ᆘ: ["ㅣ", "ㅏ"],
  ᆙ: ["ㅣ", "ㅑ"],
  ᆚ: ["ㅣ", "ㅗ"],
  ᆛ: ["ㅣ", "ㅜ"],
  ᆜ: ["ㅣ", "ㅡ"],
  ᆝ: ["ㅣ", "ㆍ"],
  ᆟ: ["ㆍ", "ㅓ"],
  ᆠ: ["ㆍ", "ㅜ"],
  ᆡ: ["ㆍ", "ㅣ"],
  ᆢ: ["ㆍ", "ㆍ"],
  ᅶ: ["ㅏ", "ㅗ"],

  ᇃ: ["ㄱ", "ㄹ"],
  ᇄ: ["ㄱ", "ㅅ", "ㄱ"],
  ᇅ: ["ㄴ", "ㄱ"],
  ᇆ: ["ㄴ", "ㄷ"],
  ᇇ: ["ㄴ", "ㅅ"],
  ᇈ: ["ㄴ", "ㅿ"],
  ᇉ: ["ㄴ", "ㅌ"],
  ᇊ: ["ㄷ", "ㄱ"],
  ᇋ: ["ㄷ", "ㄹ"],
  ᇌ: ["ㄹ", "ㄱ", "ㅅ"],
  ᇍ: ["ㄹ", "ㄴ"],
  ᇎ: ["ㄹ", "ㄷ"],
  ᇏ: ["ㄹ", "ㄷ", "ㅎ"],
  ᇐ: ["ㄹ", "ㄹ"],
  ᇑ: ["ㄹ", "ㅁ", "ㄱ"],
  ᇒ: ["ㄹ", "ㅁ", "ㅅ"],
  ᇓ: ["ㄹ", "ㅂ", "ㅅ"],
  ᇔ: ["ㄹ", "ㅂ", "ㅎ"],
  ᇕ: ["ㄹ", "ㅂ", "ㅇ"],
  ᇖ: ["ㄹ", "ㅅ", "ㅅ"],
  ᇗ: ["ㄹ", "ㅿ"],
  ᇘ: ["ㄹ", "ㅋ"],
  ᇙ: ["ㄹ", "ㆆ"],
  ᇚ: ["ㅁ", "ㄱ"],
  ᇛ: ["ㅁ", "ㄹ"],
  ᇜ: ["ㅁ", "ㅂ"],
  ᇝ: ["ㅁ", "ㅅ"],
  ᇞ: ["ㅁ", "ㅅ", "ㅅ"],
  ᇟ: ["ㅁ", "ㅿ"],
  ᇠ: ["ㅁ", "ㅊ"],
  ᇡ: ["ㅁ", "ㅎ"],
  ᇢ: ["ㅁ", "ㅇ"],
  ᇣ: ["ㅂ", "ㄹ"],
  ᇤ: ["ㅂ", "ㅍ"],
  ᇥ: ["ㅂ", "ㅎ"],
  ᇦ: ["ㅂ", "ㅇ"],
  ᇧ: ["ㅅ", "ㄱ"],
  ᇨ: ["ㅅ", "ㄷ"],
  ᇩ: ["ㅅ", "ㄹ"],
  ᇪ: ["ㅅ", "ㅂ"],
  ᇫ: ["ㅿ"],
  ᇬ: ["ㅇ", "ㄱ"],
  ᇭ: ["ㅇ", "ㄱ", "ㄱ"],
  ᇮ: ["ㅇ", "ㅇ"],
  ᇯ: ["ㅇ", "ㅋ"],
  ᇰ: ["ㆁ"],
  ᇱ: ["ㆁ", "ㅅ"],
  ᇲ: ["ㆁ", "ㅿ"],
  ᇳ: ["ㅍ", "ㅂ"],
  ᇴ: ["ㅍ", "ㅇ"],
  ᇵ: ["ㅎ", "ㄴ"],
  ᇶ: ["ㅎ", "ㄹ"],
  ᇷ: ["ㅎ", "ㅁ"],
  ᇸ: ["ㅎ", "ㅂ"],
  ᇺ: ["ㄱ", "ㄴ"],
  ᇻ: ["ㄱ", "ㅂ"],
  ᇼ: ["ㄱ", "ㅊ"],
  ᇽ: ["ㄱ", "ㅋ"],
  ᇾ: ["ㄱ", "ㅎ"],
};

export const COMPOSITION_MAP_CHO: Record<string, string> = {};
export const COMPOSITION_MAP_JUNG: Record<string, string> = {};
export const COMPOSITION_MAP_JONG: Record<string, string> = {};

for (const [key, val] of Object.entries(DECOMPOSITION_MAP)) {
  const code = key.charCodeAt(0);
  const jamoStr = val.join("");

  const isCho =
    (code >= 0x1100 && code <= 0x115f) ||
    (code >= 0xa960 && code <= 0xa97f) ||
    CHOSEONG.includes(key) ||
    key === "ㅿ" ||
    key === "ㆆ" ||
    key === "ㅸ";
  const isJung =
    (code >= 0x1160 && code <= 0x11a7) ||
    (code >= 0xd7b0 && code <= 0xd7c6) ||
    JUNGSEONG.includes(key) ||
    key === "ㆍ";
  const isJong =
    (code >= 0x11a8 && code <= 0x11ff) ||
    (code >= 0xd7cb && code <= 0xd7fb) ||
    JONGSEONG.includes(key) ||
    ["ㆁ", "ㅿ", "ㆆ", "ㅸ"].includes(key);

  if (isCho) COMPOSITION_MAP_CHO[jamoStr] = key;
  if (isJung) COMPOSITION_MAP_JUNG[jamoStr] = key;
  if (isJong) COMPOSITION_MAP_JONG[jamoStr] = key;
}

export function isVowel(char: string): boolean {
  if (!char) return false;
  if (JUNGSEONG.includes(char) || BOTTOM_VOWELS.has(char)) return true;
  const code = char.charCodeAt(0);
  // Hangul Jamo Vowels: U+1161 to U+11A7, U+D7B0 to U+D7C6
  if (code >= 0x1161 && code <= 0x11a7) return true;
  if (code >= 0xd7b0 && code <= 0xd7c6) return true;
  // Hangul Compatibility Vowels: 314F to 3163, and Old Vowels 3187 to 318E
  if (code >= 0x314f && code <= 0x3163) return true;
  if (code >= 0x3187 && code <= 0x318e) return true;
  return false;
}

export function isConsonant(char: string): boolean {
  if (!char) return false;
  if (CHOSEONG.includes(char) || (char !== "" && JONGSEONG.includes(char)))
    return true;
  const code = char.charCodeAt(0);

  // Hangul Jamo Consonants (Choseong): U+1100 to U+115F, U+A960 to U+A97F
  if (code >= 0x1100 && code <= 0x115f) return true;
  if (code >= 0xa960 && code <= 0xa97f) return true;

  // Hangul Jamo Consonants (Jongseong): U+11A8 to U+11FF, U+D7CB to U+D7FB
  if (code >= 0x11a8 && code <= 0x11ff) return true;
  if (code >= 0xd7cb && code <= 0xd7fb) return true;

  // Hangul Compatibility Consonants: U+3131 to U+314E, U+3165 to U+3186
  if (code >= 0x3131 && code <= 0x314e) return true;
  if (code >= 0x3165 && code <= 0x3186) return true;

  return false;
}

// Convert a full Syllable into basic structural Jamos (complex jamos intact)
export function syllableToJamo(char: string): string[] {
  const code = char.charCodeAt(0);
  if (code >= 0xac00 && code <= 0xd7a3) {
    const offset = code - 0xac00;
    const jongIdx = offset % 28;
    const jungIdx = Math.floor(offset / 28) % 21;
    const choIdx = Math.floor(Math.floor(offset / 28) / 21);

    const result = [CHOSEONG[choIdx], JUNGSEONG[jungIdx]];
    if (jongIdx > 0) result.push(JONGSEONG[jongIdx]);
    return result;
  }
  return [char];
}

// Also decompose any full Hangul Syllable into fully basic Jamos (recursive)
export function decomposeString(input: string): string[] {
  const result: string[] = [];

  for (const char of input) {
    const code = char.charCodeAt(0);

    // Check if it's a precomposed Hangul Syllable (가 - 힣)
    if (code >= 0xac00 && code <= 0xd7a3) {
      const offset = code - 0xac00;
      const jongIdx = offset % 28;
      const jungIdx = Math.floor(offset / 28) % 21;
      const choIdx = Math.floor(Math.floor(offset / 28) / 21);

      const cho = CHOSEONG[choIdx];
      const jung = JUNGSEONG[jungIdx];
      const jong = JONGSEONG[jongIdx];

      result.push(...(DECOMPOSITION_MAP[cho] || [cho]));
      result.push(...(DECOMPOSITION_MAP[jung] || [jung]));
      if (jong) {
        result.push(...(DECOMPOSITION_MAP[jong] || [jong]));
      }
      continue;
    }

    // Check if it's in the mapping
    if (DECOMPOSITION_MAP[char]) {
      result.push(...DECOMPOSITION_MAP[char]);
    } else {
      // It's a single base Jamo or other character
      result.push(char);
    }
  }

  return result;
}

// Helper to join multiple characters with an Ideographic Description Character (IDC)
function recursiveIDC(chars: string[], idc: string): string {
  if (chars.length === 0) return "";
  if (chars.length === 1) return chars[0];

  let res = chars[chars.length - 1];
  for (let i = chars.length - 2; i >= 0; i--) {
    res = idc + chars[i] + res;
  }
  return res;
}

export interface ComposeResult {
  precomposed: string | null; // 완성형
  conjoining: string | null; // 조합형
  idc: string;
  choseong: string[];
  jungseong: string[];
  jongseong: string[];
}

// Convert a compatibility Jamo (U+313x) or Old Jamo string to a true Conjoining Jamo (U+11xx)
function getConjoiningChar(
  char: string | null,
  type: "cho" | "jung" | "jong",
): string | null {
  if (!char) return null;

  if (type === "cho") {
    const idx = CHOSEONG.indexOf(char);
    if (idx !== -1) return String.fromCharCode(0x1100 + idx);
  } else if (type === "jung") {
    const idx = JUNGSEONG.indexOf(char);
    if (idx !== -1) return String.fromCharCode(0x1161 + idx);
  } else if (type === "jong") {
    const idx = JONGSEONG.indexOf(char);
    if (idx > 0) return String.fromCharCode(0x11a7 + idx); // Index 0 is empty
  }

  // Custom fallback mapping for standalone compatibility characters
  if (char === "ㆍ") return "\u119E";

  if (type === "jong") {
    if (char === "ㆁ") return "\u11F0"; // jongseong old ng
    if (char === "ㆆ") return "\u11F9"; // jongseong yeorinhieut
    if (char === "ㅿ") return "\u11EB"; // jongseong bansiot
    if (char === "ㅸ") return "\u11E6"; // jongseong sungyeongeumbieup
  } else {
    if (char === "ㆁ") return "\u114C"; // choseong old ng
    if (char === "ㆆ") return "\u1159"; // choseong yeorinhieut
    if (char === "ㅿ") return "\u1140"; // choseong bansiot
    if (char === "ㅸ") return "\u112B"; // choseong sungyeongeumbieup
  }

  // If it's already a Hangul Jamo (U+11xx or U+A9xx or U+D7xx), return it directly.
  const code = char.charCodeAt(0);
  if (
    (code >= 0x1100 && code <= 0x11ff) ||
    (code >= 0xa960 && code <= 0xa97f) ||
    (code >= 0xd7b0 && code <= 0xd7ff)
  ) {
    return char;
  }

  return null;
}

export function composeKotools(
  choseong: string[],
  jungseong: string[],
  jongseong: string[],
): ComposeResult {
  let precomposed: string | null = null;
  let conjoining: string | null = null;

  // Apply Reverse Composition to verify against Unicode blocks
  const choStr = choseong.join("");
  const jungStr = jungseong.join("");
  const jongStr = jongseong.join("");

  // Handle special edge cases like comments in code mapping
  const modernCho =
    COMPOSITION_MAP_CHO[choStr] || (choseong.length === 1 ? choseong[0] : null);
  const modernJung =
    COMPOSITION_MAP_JUNG[jungStr] ||
    (jungseong.length === 1 ? jungseong[0] : null);
  const modernJong =
    jongStr.length === 0
      ? ""
      : COMPOSITION_MAP_JONG[jongStr] ||
        (jongseong.length === 1 ? jongseong[0] : null);

  const hasCho = choseong.length > 0;
  const hasJung = jungseong.length > 0;
  const hasJong = jongseong.length > 0;

  // 1. Try to assemble into standard PRECOMPOSED code point if valid modern combination
  precomposed = toPrecomposed(
    hasCho,
    hasJung,
    modernCho,
    modernJung,
    modernJong,
    precomposed,
    hasJong,
  );

  // 2. Try to assemble into standard CONJOINING jamo sequence if it fits Old or Modern Hangul Jamos
  conjoining = toConjoining(
    modernCho,
    modernJung,
    modernJong,
    choseong,
    jungseong,
    jongseong,
    conjoining,
  );

  // 3. Build Structural IDC String
  const choIdcStr = recursiveIDC(choseong, "⿰");
  const jongIdcStr = recursiveIDC(jongseong, "⿰");
  const jungIdcStr = recursiveIDC(jungseong, "⿰");

  let choJung = "";
  if (choIdcStr && jungIdcStr) {
    const firstVowel = jungseong[0];
    const isBottomVowel = BOTTOM_VOWELS.has(firstVowel);
    choJung = isBottomVowel
      ? "⿱" + choIdcStr + jungIdcStr
      : "⿰" + choIdcStr + jungIdcStr;
  } else if (choIdcStr) {
    choJung = choIdcStr;
  } else if (jungIdcStr) {
    choJung = jungIdcStr;
  }

  let idc = "";
  if (choJung && jongIdcStr) {
    idc = "⿱" + choJung + jongIdcStr;
  } else if (choJung) {
    idc = choJung;
  } else if (jongIdcStr) {
    idc = jongIdcStr;
  }

  return { precomposed, conjoining, idc, choseong, jungseong, jongseong };
}

function toPrecomposed(
  hasCho: boolean,
  hasJung: boolean,
  modernCho: string | null,
  modernJung: string | null,
  modernJong: string | null,
  precomposed: string | null,
  hasJong: boolean,
) {
  if (hasCho && hasJung) {
    if (modernCho && modernJung && modernJong !== null) {
      const choIdx = CHOSEONG.indexOf(modernCho);
      const jungIdx = JUNGSEONG.indexOf(modernJung);
      const jongIdx = modernJong === "" ? 0 : JONGSEONG.indexOf(modernJong);

      if (choIdx !== -1 && jungIdx !== -1 && jongIdx !== -1) {
        const code = 0xac00 + choIdx * 21 * 28 + jungIdx * 28 + jongIdx;
        precomposed = String.fromCharCode(code);
      }
    }
  } else if (hasCho && !hasJung && !hasJong) {
    precomposed = modernCho;
  } else if (!hasCho && hasJung && !hasJong) {
    precomposed = modernJung;
  } else if (!hasCho && !hasJung && hasJong) {
    precomposed = modernJong;
  }
  return precomposed;
}

function toConjoining(
  modernCho: string | null,
  modernJung: string | null,
  modernJong: string | null,
  choseong: string[],
  jungseong: string[],
  jongseong: string[],
  conjoining: string | null,
) {
  if (modernCho || modernJung || modernJong) {
    const cCho = getConjoiningChar(modernCho, "cho");
    const cJung = modernJung ? getConjoiningChar(modernJung, "jung") : null;
    const cJong = modernJong ? getConjoiningChar(modernJong, "jong") : null;

    const isInvalidCho = choseong.length > 0 && !cCho;
    const isInvalidJung = jungseong.length > 0 && !cJung;
    const isInvalidJong = jongseong.length > 0 && !cJong;

    if (!isInvalidCho && !isInvalidJung && !isInvalidJong) {
      if (
        choseong.length > 0 &&
        jungseong.length === 0 &&
        jongseong.length === 0
      ) {
        conjoining = cCho;
      } else {
        const finalCho = cCho || "\u115F"; // Choseong Filler (초성 채움 문자)
        const finalJung = cJung || "\u1160"; // Jungseong Filler (중성 채움 문자)
        const finalJong = cJong || "";

        conjoining = `${finalCho}${finalJung}${finalJong}`;
      }
    }
  }
  return conjoining;
}

/**
 * Maps common English color names to hex values.
 * For unknown colors, generates a deterministic hex from the string hash.
 */

const COLOR_MAP: Record<string, string> = {
  // Whites & Creams
  white: "#FFFFFF",
  "off-white": "#FAF8F5",
  "off white": "#FAF8F5",
  ivory: "#FFFFF0",
  cream: "#FFFDD0",
  snow: "#FFFAFA",
  linen: "#FAF0E6",

  // Blacks & Grays
  black: "#1A1A1A",
  charcoal: "#36454F",
  "dark gray": "#4A4A4A",
  "dark grey": "#4A4A4A",
  gray: "#888888",
  grey: "#888888",
  silver: "#C0C0C0",
  "light gray": "#D3D3D3",
  "light grey": "#D3D3D3",
  ash: "#B2BEB5",

  // Browns & Tans
  brown: "#8B4513",
  "dark brown": "#5C3317",
  "light brown": "#C4A165",
  tan: "#D2B48C",
  beige: "#F5F5DC",
  camel: "#C19A6B",
  nude: "#E8C99E",
  sand: "#C2B280",
  khaki: "#C3B091",
  taupe: "#B38B6D",
  mocha: "#967259",
  chocolate: "#7B3F00",
  rust: "#B7410E",

  // Reds
  red: "#DC2626",
  "dark red": "#8B0000",
  crimson: "#DC143C",
  scarlet: "#FF2400",
  cherry: "#990000",
  maroon: "#800000",
  burgundy: "#800020",
  wine: "#722F37",
  "deep red": "#8B0000",
  brick: "#CB4154",
  coral: "#FF7F50",
  salmon: "#FA8072",
  "light red": "#FF6B6B",

  // Pinks
  pink: "#FFC0CB",
  "hot pink": "#FF69B4",
  "baby pink": "#FFB6C1",
  "light pink": "#FFB6C1",
  "deep pink": "#FF1493",
  rose: "#FF007F",
  blush: "#FFB6C1",
  mauve: "#E0B0FF",
  fuchsia: "#FF00FF",
  magenta: "#FF00FF",
  lilac: "#C8A2C8",
  lavender: "#E6E6FA",

  // Oranges
  orange: "#F97316",
  "dark orange": "#C04A00",
  peach: "#FFCBA4",
  apricot: "#FBCEB1",
  amber: "#FFBF00",
  burnt: "#CC5500",
  "burnt orange": "#CC5500",
  mustard: "#FFDB58",
  "mustard yellow": "#FFDB58",

  // Yellows
  yellow: "#FACC15",
  gold: "#FFD700",
  "dark yellow": "#CCB300",
  "light yellow": "#FFFFE0",
  lemon: "#FFF44F",
  "pale yellow": "#FDFD96",
  golden: "#FFD700",

  // Greens
  green: "#16A34A",
  "dark green": "#14532D",
  "light green": "#86EFAC",
  "forest green": "#228B22",
  forest: "#228B22",
  olive: "#808000",
  lime: "#BFEF45",
  mint: "#98FF98",
  sage: "#BCB88A",
  teal: "#008080",
  "dark teal": "#005F5F",
  "light teal": "#20B2AA",
  emerald: "#50C878",
  jade: "#00A86B",
  hunter: "#355E3B",
  "army green": "#4B5320",
  moss: "#6B6B00",
  "pine green": "#01796F",
  seafoam: "#9FE2BF",
  "sea green": "#2E8B57",

  // Blues
  blue: "#2563EB",
  "dark blue": "#1E3A5F",
  "light blue": "#93C5FD",
  navy: "#000080",
  "navy blue": "#000080",
  "baby blue": "#89CFF0",
  sky: "#87CEEB",
  "sky blue": "#87CEEB",
  cobalt: "#0047AB",
  sapphire: "#0F52BA",
  royal: "#4169E1",
  "royal blue": "#4169E1",
  denim: "#1560BD",
  "powder blue": "#B0E0E6",
  ice: "#D0E8F0",
  turquoise: "#40E0D0",
  aqua: "#00FFFF",
  cyan: "#00FFFF",
  cerulean: "#007BA7",
  "steel blue": "#4682B4",

  // Purples
  purple: "#7C3AED",
  "dark purple": "#4B0082",
  "light purple": "#C084FC",
  violet: "#7F00FF",
  indigo: "#4B0082",
  plum: "#8E4585",
  grape: "#6F2DA8",
  orchid: "#DA70D6",
  periwinkle: "#CCCCFF",
  heather: "#9B7FBB",
  amethyst: "#9966CC",
  eggplant: "#614051",

  // Metallics
  metallic: "#8A8A8A",
  "rose gold": "#B76E79",
  platinum: "#E5E4E2",
  bronze: "#CD7F32",
  copper: "#B87333",
};

/**
 * Simple string hash function for deterministic color generation
 */
function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return hash >>> 0;
}

/**
 * Generates a deterministic, aesthetically pleasing hex color from any string.
 * Uses the hash to pick a hue, then locks saturation and lightness
 * to ensure the color looks good as a clothing swatch.
 */
function deterministicColor(colorName: string): string {
  const hash = hashString(colorName.toLowerCase());
  const hue = hash % 360;
  // Use moderate saturation + lightness for clothing swatches
  const saturation = 40 + (hash % 30); // 40-70%
  const lightness = 35 + (hash % 30); // 35-65%
  // Convert HSL to hex
  const s = saturation / 100;
  const l = lightness / 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + hue / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

/**
 * Converts an English color name/description to a CSS hex color.
 * Falls back to a deterministic hash-generated color for unknown names.
 */
export function colorNameToHex(colorName: string): string {
  if (!colorName) return "#888888";

  const normalized = colorName.toLowerCase().trim();

  // Direct match
  if (COLOR_MAP[normalized]) return COLOR_MAP[normalized];

  // Partial match — look for any key that appears in the color description
  for (const [key, hex] of Object.entries(COLOR_MAP)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return hex;
    }
  }

  // Fallback: deterministic color from string hash
  return deterministicColor(normalized);
}

/**
 * Returns whether a hex color is "light" (for determining text contrast).
 */
export function isLightColor(hex: string): boolean {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  // Perceived brightness formula
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
}

import { motion } from "motion/react";
import type { ClothingItem } from "../types/wardrobe";
import { colorNameToHex, isLightColor } from "../utils/colorUtils";

type Props = {
  items: ClothingItem[];
};

// Neutral fallback colors for zones with no item
const SKIN_COLOR = "#E8C5A0";
const HAIR_COLOR = "#5C3D2E";
const NEUTRAL_TOP = "#D4C5B0";
const NEUTRAL_BOTTOM = "#B8A898";
const NEUTRAL_SHOES = "#8A7A6A";

export default function OutfitPreview({ items }: Props) {
  const top = items.find((i) => i.category === "top");
  const bottom = items.find((i) => i.category === "bottom");
  const dress = items.find((i) => i.category === "dress");
  const shoes = items.find((i) => i.category === "shoes");
  const accessory = items.find((i) => i.category === "accessory");
  const outerwear = items.find((i) => i.category === "outerwear");

  const topColor = top
    ? colorNameToHex(top.color)
    : dress
      ? colorNameToHex(dress.color)
      : NEUTRAL_TOP;
  const bottomColor = bottom
    ? colorNameToHex(bottom.color)
    : dress
      ? colorNameToHex(dress.color)
      : NEUTRAL_BOTTOM;
  const shoesColor = shoes ? colorNameToHex(shoes.color) : NEUTRAL_SHOES;
  const outerwearColor = outerwear ? colorNameToHex(outerwear.color) : null;
  const accessoryColor = accessory ? colorNameToHex(accessory.color) : null;

  // Color swatches for the legend
  const swatchItems = items.slice(0, 5);

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Preview label */}
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
        Preview
      </p>

      {/* SVG Fashion Figure */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative"
      >
        <svg
          viewBox="0 0 120 260"
          width="120"
          height="260"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm"
          role="img"
          aria-label="Fashion figure showing outfit preview"
        >
          {/* === HAIR === */}
          <ellipse cx="60" cy="22" rx="17" ry="18" fill={HAIR_COLOR} />
          {/* Side hair strands */}
          <ellipse cx="46" cy="32" rx="7" ry="12" fill={HAIR_COLOR} />
          <ellipse cx="74" cy="32" rx="7" ry="12" fill={HAIR_COLOR} />

          {/* === HEAD/FACE === */}
          <ellipse cx="60" cy="28" rx="15" ry="17" fill={SKIN_COLOR} />
          {/* Subtle neck */}
          <rect x="54" y="44" width="12" height="10" rx="3" fill={SKIN_COLOR} />

          {/* === OUTERWEAR (back layer, wider) === */}
          {outerwearColor && (
            <g opacity="0.85">
              {/* Coat body */}
              <path
                d="M30 57 L28 140 L47 140 L47 55 Z"
                fill={outerwearColor}
                rx="4"
              />
              <path
                d="M73 55 L73 140 L92 140 L90 57 Z"
                fill={outerwearColor}
                rx="4"
              />
              {/* Coat front panels */}
              <rect
                x="47"
                y="55"
                width="12"
                height="85"
                fill={outerwearColor}
              />
              <rect
                x="61"
                y="55"
                width="12"
                height="85"
                fill={outerwearColor}
              />
              {/* Lapels */}
              <path
                d="M47 55 L54 65 L59 55 Z"
                fill={outerwearColor}
                opacity="0.7"
              />
              <path
                d="M73 55 L66 65 L61 55 Z"
                fill={outerwearColor}
                opacity="0.7"
              />
              {/* Collar line */}
              <path
                d="M47 55 L54 65 L60 60 L66 65 L73 55"
                fill="none"
                stroke="rgba(0,0,0,0.15)"
                strokeWidth="0.8"
              />
            </g>
          )}

          {/* === TOP / TORSO === */}
          {/* Shoulder area */}
          <ellipse cx="38" cy="60" rx="11" ry="7" fill={topColor} />
          <ellipse cx="82" cy="60" rx="11" ry="7" fill={topColor} />
          {/* Main torso */}
          <path d="M40 56 L80 56 L84 100 L36 100 Z" fill={topColor} />
          {/* Waist taper */}
          <path d="M36 100 L40 110 L80 110 L84 100 Z" fill={topColor} />
          {/* Arms */}
          <path d="M32 57 Q22 70 24 95 L34 90 Q32 72 40 58 Z" fill={topColor} />
          <path d="M88 57 Q98 70 96 95 L86 90 Q88 72 80 58 Z" fill={topColor} />
          {/* Hands / cuffs */}
          <ellipse cx="26" cy="97" rx="5" ry="7" fill={SKIN_COLOR} />
          <ellipse cx="94" cy="97" rx="5" ry="7" fill={SKIN_COLOR} />

          {/* Neckline detail */}
          <path
            d="M53 55 Q60 62 67 55"
            fill="none"
            stroke="rgba(0,0,0,0.12)"
            strokeWidth="1"
          />

          {/* === ACCESSORY DOT (necklace/pin near collar) === */}
          {accessoryColor && (
            <g>
              <circle cx="60" cy="68" r="4" fill={accessoryColor} />
              <circle
                cx="60"
                cy="68"
                r="2.5"
                fill={accessoryColor}
                opacity="0.6"
              />
              <circle cx="60" cy="68" r="1.5" fill="rgba(255,255,255,0.5)" />
            </g>
          )}

          {/* === BOTTOM / SKIRT/PANTS === */}
          {dress ? (
            /* Dress skirt flare */
            <path
              d="M40 110 L36 175 Q60 182 84 175 L80 110 Z"
              fill={bottomColor}
            />
          ) : (
            /* Pants with slight shape */
            <g>
              {/* Waistband */}
              <rect
                x="40"
                y="110"
                width="40"
                height="6"
                rx="1"
                fill={`${bottomColor}CC`}
              />
              {/* Left leg */}
              <path d="M40 116 L38 178 L57 178 L58 116 Z" fill={bottomColor} />
              {/* Right leg */}
              <path d="M62 116 L63 178 L82 178 L80 116 Z" fill={bottomColor} />
              {/* Center seam */}
              <line
                x1="60"
                y1="116"
                x2="59"
                y2="178"
                stroke="rgba(0,0,0,0.08)"
                strokeWidth="1"
              />
            </g>
          )}

          {/* === SHOES === */}
          {dress ? (
            /* Heeled shoes for dress */
            <g>
              {/* Left shoe */}
              <ellipse cx="47" cy="196" rx="10" ry="5" fill={shoesColor} />
              <rect
                x="43"
                y="183"
                width="6"
                height="14"
                rx="2"
                fill={shoesColor}
              />
              {/* Heel */}
              <rect
                x="41"
                y="190"
                width="3"
                height="8"
                rx="1"
                fill={`${shoesColor}CC`}
              />
              {/* Right shoe */}
              <ellipse cx="73" cy="196" rx="10" ry="5" fill={shoesColor} />
              <rect
                x="71"
                y="183"
                width="6"
                height="14"
                rx="2"
                fill={shoesColor}
              />
              <rect
                x="76"
                y="190"
                width="3"
                height="8"
                rx="1"
                fill={`${shoesColor}CC`}
              />
            </g>
          ) : (
            /* Sneakers/flat shoes */
            <g>
              {/* Left shoe */}
              <ellipse cx="47" cy="190" rx="11" ry="6" fill={shoesColor} />
              <path
                d="M36 188 Q42 182 52 185 L54 190 L36 190 Z"
                fill={`${shoesColor}DD`}
              />
              {/* Right shoe */}
              <ellipse cx="73" cy="190" rx="11" ry="6" fill={shoesColor} />
              <path
                d="M68 185 Q78 182 84 188 L84 190 L68 190 Z"
                fill={`${shoesColor}DD`}
              />
              {/* Soles */}
              <ellipse
                cx="47"
                cy="191"
                rx="11"
                ry="3"
                fill="rgba(0,0,0,0.18)"
              />
              <ellipse
                cx="73"
                cy="191"
                rx="11"
                ry="3"
                fill="rgba(0,0,0,0.18)"
              />
            </g>
          )}

          {/* Overall subtle shadow at feet */}
          <ellipse cx="60" cy="205" rx="25" ry="4" fill="rgba(0,0,0,0.06)" />
        </svg>
      </motion.div>

      {/* Color Swatches Legend */}
      <div className="flex flex-wrap justify-center gap-1.5 max-w-[140px]">
        {swatchItems.map((item) => {
          const hex = colorNameToHex(item.color);
          const isLight = isLightColor(hex);
          return (
            <div
              key={item.id}
              className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium"
              style={{
                backgroundColor: hex,
                color: isLight ? "#1a1a1a" : "#ffffff",
                border: isLight
                  ? "1px solid rgba(0,0,0,0.12)"
                  : "1px solid rgba(255,255,255,0.15)",
              }}
              title={`${item.name} — ${item.color}`}
            >
              <span className="capitalize">{item.color}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

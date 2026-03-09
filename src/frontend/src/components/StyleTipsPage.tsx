import { motion } from "motion/react";
import type { Category } from "../types/wardrobe";
import { CATEGORY_ICONS } from "../types/wardrobe";

type TipCard = {
  category: Category;
  title: string;
  tip: string;
  accent: string;
};

const TIPS: TipCard[] = [
  {
    category: "top",
    title: "Tops",
    tip: "Choose tops that complement your body shape. Fitted tops work well for slim silhouettes, while flowy blouses balance curvier figures. Neutral colors are versatile staples.",
    accent: "from-rose-50 to-pink-50 border-rose-200",
  },
  {
    category: "bottom",
    title: "Bottoms",
    tip: "Dark-wash jeans are a wardrobe essential — they dress up or down easily. Pair wide-leg trousers with a tucked-in top to define the waist.",
    accent: "from-blue-50 to-indigo-50 border-blue-200",
  },
  {
    category: "dress",
    title: "Dresses",
    tip: "A wrap dress flatters almost every body type by cinching at the waist. Midi lengths transition seamlessly from day to evening.",
    accent: "from-purple-50 to-violet-50 border-purple-200",
  },
  {
    category: "shoes",
    title: "Shoes",
    tip: "Nude or beige shoes elongate the legs. White sneakers pair with almost any outfit. Invest in at least one versatile heel and one quality flat.",
    accent: "from-amber-50 to-yellow-50 border-amber-200",
  },
  {
    category: "accessory",
    title: "Accessories",
    tip: "A statement necklace or earrings can elevate a simple outfit instantly. Stick to one bold accessory at a time to keep the look polished.",
    accent: "from-emerald-50 to-teal-50 border-emerald-200",
  },
  {
    category: "outerwear",
    title: "Outerwear",
    tip: "A well-fitted blazer can make a casual outfit look intentional. Trench coats are timeless and work across seasons.",
    accent: "from-slate-50 to-gray-50 border-slate-200",
  },
];

const BONUS_TIPS = [
  {
    emoji: "🎨",
    title: "The Rule of Three Colors",
    tip: "Build outfits using no more than three colors. One dominant, one secondary, and one accent creates a balanced, polished look without overwhelming the eye.",
  },
  {
    emoji: "🔄",
    title: "Capsule Mindset",
    tip: "When shopping, ask if the new piece works with at least three items you already own. This habit builds a more cohesive, wearable wardrobe over time.",
  },
  {
    emoji: "📐",
    title: "Proportion Play",
    tip: "Balance oversized with fitted. If you're wearing a loose top, anchor it with slim-cut bottoms. If your pants are wide-leg, opt for a more tailored top.",
  },
];

export default function StyleTipsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold text-foreground tracking-tight mb-1">
          Style Tips
        </h2>
        <p className="text-muted-foreground text-sm">
          Expert advice for every piece in your wardrobe.
        </p>
      </div>

      {/* Category Tips Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {TIPS.map((tip, index) => (
          <motion.div
            key={tip.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.07 }}
          >
            <div
              className={`bg-gradient-to-br ${tip.accent} border rounded-xl p-5 h-full`}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <span className="text-2xl leading-none">
                  {CATEGORY_ICONS[tip.category]}
                </span>
                <h3 className="font-display text-lg font-bold text-foreground">
                  {tip.title}
                </h3>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {tip.tip}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
          Golden Rules
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Bonus Tips */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {BONUS_TIPS.map((tip, index) => (
          <motion.div
            key={tip.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + index * 0.08 }}
            className="bg-card border border-border rounded-xl p-5 shadow-xs hover:shadow-editorial transition-shadow duration-200"
          >
            <div className="text-3xl mb-3">{tip.emoji}</div>
            <h3 className="font-display font-semibold text-base text-foreground mb-2">
              {tip.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {tip.tip}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

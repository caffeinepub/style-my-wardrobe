import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

type Props = {
  onStart: () => void;
};

const STEPS = [
  {
    number: "01",
    emoji: "👗",
    title: "Add Your Clothes",
    description:
      "Enter items from your wardrobe — just the name, category, color, and which occasions they suit. Takes only a few seconds per item.",
    color: "from-rose-100 to-pink-100 border-rose-200 text-rose-700",
    numColor: "text-rose-400",
  },
  {
    number: "02",
    emoji: "✨",
    title: "Get Outfit Ideas",
    description:
      "The app intelligently pairs your tops with bottoms, or builds complete looks around dresses. Filter by occasion — casual, work, party, or formal.",
    color: "from-violet-100 to-indigo-100 border-violet-200 text-violet-700",
    numColor: "text-violet-400",
  },
  {
    number: "03",
    emoji: "📖",
    title: "Read Style Tips",
    description:
      "Browse curated expert advice for each clothing category. Learn how to elevate simple outfits and build a more wearable, cohesive wardrobe.",
    color: "from-amber-100 to-orange-100 border-amber-200 text-amber-700",
    numColor: "text-amber-400",
  },
];

export default function HowItWorksPage({ onStart }: Props) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Hero section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-secondary border border-secondary-foreground/10 rounded-full px-4 py-1.5 text-sm text-secondary-foreground font-medium mb-4">
          <span>Your Personal Style Assistant</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-3">
          Style the clothes
          <br />
          <span className="italic font-light">you already own</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
          No shopping required. Unlock the full potential of your existing
          wardrobe with personalized outfit combinations and expert styling
          guidance.
        </p>
      </motion.div>

      {/* Steps */}
      <div className="space-y-4 mb-12">
        {STEPS.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + index * 0.12 }}
            className={`bg-gradient-to-r ${step.color} border rounded-xl p-6`}
          >
            <div className="flex items-start gap-4">
              <div className="shrink-0">
                <span
                  className={`font-display text-5xl font-bold ${step.numColor} leading-none`}
                >
                  {step.number}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xl">{step.emoji}</span>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-foreground/75">
                  {step.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Feature highlights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="bg-card border border-border rounded-xl p-6 mb-10"
      >
        <h3 className="font-display font-semibold text-lg text-foreground mb-4">
          Everything stays private
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: "🔒",
              label: "Stored locally",
              desc: "Your wardrobe data never leaves your device.",
            },
            {
              icon: "⚡",
              label: "Works offline",
              desc: "No internet required after the first load.",
            },
            {
              icon: "🆓",
              label: "Completely free",
              desc: "No account needed, no hidden fees.",
            },
          ].map((feat) => (
            <div key={feat.label} className="text-center">
              <div className="text-2xl mb-1.5">{feat.icon}</div>
              <p className="font-medium text-sm text-foreground mb-0.5">
                {feat.label}
              </p>
              <p className="text-xs text-muted-foreground">{feat.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.75 }}
        className="text-center"
      >
        <Button
          data-ocid="howto.start.primary_button"
          onClick={onStart}
          size="lg"
          className="bg-primary text-primary-foreground hover:opacity-90 transition-opacity px-8"
        >
          Start Adding Clothes
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        <p className="text-xs text-muted-foreground mt-3">
          No sign-up required. Your data stays on your device.
        </p>
      </motion.div>
    </div>
  );
}

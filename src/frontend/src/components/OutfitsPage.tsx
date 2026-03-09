import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useOutfits } from "../hooks/useOutfits";
import type { ClothingItem, Occasion } from "../types/wardrobe";
import { CATEGORY_COLORS, CATEGORY_ICONS } from "../types/wardrobe";
import OutfitPreview from "./OutfitPreview";

type Props = {
  items: ClothingItem[];
};

const OCCASION_FILTERS: { value: Occasion | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "casual", label: "Casual" },
  { value: "formal", label: "Formal" },
  { value: "party", label: "Party" },
  { value: "work", label: "Work" },
  { value: "sport", label: "Sport" },
];

const OCCASION_OCID: Record<string, string> = {
  all: "suggestions.all.tab",
  casual: "suggestions.casual.tab",
  formal: "suggestions.formal.tab",
  party: "suggestions.party.tab",
  work: "suggestions.work.tab",
  sport: "suggestions.sport.tab",
};

export default function OutfitsPage({ items }: Props) {
  const [filter, setFilter] = useState<Occasion | "all">("all");
  const outfits = useOutfits(items, filter);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="font-display text-2xl font-bold text-foreground tracking-tight">
            Outfit Suggestions
          </h2>
        </div>
        <p className="text-muted-foreground text-sm">
          Curated combinations from your wardrobe, styled for every occasion.
        </p>
      </div>

      {/* Occasion Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {OCCASION_FILTERS.map((occ) => (
          <Button
            key={occ.value}
            data-ocid={OCCASION_OCID[occ.value]}
            variant={filter === occ.value ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(occ.value)}
            className={
              filter === occ.value
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-foreground hover:bg-muted"
            }
          >
            {occ.label}
          </Button>
        ))}
      </div>

      {/* Empty States */}
      {items.length === 0 ? (
        <motion.div
          data-ocid="suggestions.empty_state"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-border rounded-xl"
        >
          <div className="text-5xl mb-4">✨</div>
          <h3 className="font-display text-xl font-semibold text-foreground mb-2">
            No outfits yet
          </h3>
          <p className="text-muted-foreground text-sm max-w-xs">
            Add clothing items to your wardrobe first, then we'll create outfit
            suggestions for you.
          </p>
        </motion.div>
      ) : outfits.length === 0 ? (
        <motion.div
          data-ocid="suggestions.empty_state"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-border rounded-xl"
        >
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="font-display text-xl font-semibold text-foreground mb-2">
            No matching outfits
          </h3>
          <p className="text-muted-foreground text-sm max-w-xs">
            No outfit combinations match the selected occasion. Try adding more
            items or selecting a different occasion filter.
          </p>
        </motion.div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground mb-4">
            {outfits.length} outfit{" "}
            {outfits.length === 1 ? "combination" : "combinations"} found
          </p>
          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence mode="popLayout">
              {outfits.map((outfit, index) => (
                <motion.div
                  key={outfit.id}
                  data-ocid={`suggestions.item.${index + 1}`}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, delay: index * 0.04 }}
                >
                  <Card className="border border-border shadow-xs hover:shadow-editorial transition-shadow duration-200">
                    <CardHeader className="pb-2 pt-4 px-4">
                      <p className="text-sm font-medium text-foreground leading-relaxed italic font-display">
                        "{outfit.description}"
                      </p>
                    </CardHeader>
                    <CardContent className="px-4 pb-4 pt-0">
                      {/* Two-column layout: preview + items */}
                      <div className="flex flex-col sm:flex-row gap-4 items-start">
                        {/* Left column: SVG outfit preview */}
                        <div className="w-full sm:w-[150px] flex-shrink-0 flex justify-center bg-muted/30 rounded-xl py-3 border border-border/50">
                          <OutfitPreview items={outfit.items} />
                        </div>

                        {/* Right column: item list */}
                        <div className="flex-1 space-y-2 pt-1">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                            Outfit Pieces
                          </p>
                          {outfit.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-2.5 py-1.5 px-2.5 rounded-md bg-muted/60"
                            >
                              <span className="text-base leading-none">
                                {CATEGORY_ICONS[item.category]}
                              </span>
                              <div className="flex-1 min-w-0">
                                <span className="text-sm text-foreground font-medium truncate block">
                                  {item.name}
                                </span>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  {/* Color swatch dot */}
                                  <span
                                    className="inline-block w-2.5 h-2.5 rounded-full border border-black/10 flex-shrink-0"
                                    style={{ backgroundColor: item.color }}
                                    aria-hidden="true"
                                  />
                                  <span className="text-xs text-muted-foreground capitalize">
                                    {item.color}
                                  </span>
                                </div>
                              </div>
                              <Badge
                                variant="outline"
                                className={`text-xs border shrink-0 ${CATEGORY_COLORS[item.category]} py-0 px-2`}
                              >
                                {item.category}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
}

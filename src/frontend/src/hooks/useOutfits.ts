import { useMemo } from "react";
import type { ClothingItem, Occasion } from "../types/wardrobe";

export type OutfitSuggestion = {
  id: string;
  items: ClothingItem[];
  description: string;
};

function buildDescription(items: ClothingItem[]): string {
  const parts = items.map((i) => `${i.color} ${i.name.toLowerCase()}`);
  if (parts.length === 0) return "";
  if (parts.length === 1) return `Style your ${parts[0]}.`;
  const [first, ...rest] = parts;
  const last = rest.pop();
  const middle = rest.length > 0 ? `${rest.join(", ")}, ` : "";
  return `Pair your ${first} with ${middle}${last}.`;
}

export function useOutfits(
  items: ClothingItem[],
  occasionFilter: Occasion | "all",
) {
  return useMemo(() => {
    const filter = (item: ClothingItem) =>
      occasionFilter === "all" ||
      item.occasions.includes(occasionFilter as Occasion);

    const tops = items.filter((i) => i.category === "top" && filter(i));
    const bottoms = items.filter((i) => i.category === "bottom" && filter(i));
    const dresses = items.filter((i) => i.category === "dress" && filter(i));
    const shoes = items.filter((i) => i.category === "shoes" && filter(i));
    const accessories = items.filter(
      (i) => i.category === "accessory" && filter(i),
    );
    const outerwear = items.filter(
      (i) => i.category === "outerwear" && filter(i),
    );

    const outfits: OutfitSuggestion[] = [];

    // Top + Bottom combos
    for (const top of tops) {
      for (const bottom of bottoms) {
        const outfit: ClothingItem[] = [top, bottom];
        const shoe = shoes[0];
        const acc = accessories[0];
        const outer = outerwear[0];
        if (shoe) outfit.push(shoe);
        if (acc) outfit.push(acc);
        if (outer) outfit.push(outer);

        outfits.push({
          id: `${top.id}-${bottom.id}`,
          items: outfit,
          description: buildDescription(outfit),
        });
      }
    }

    // Dress combos
    for (const dress of dresses) {
      const outfit: ClothingItem[] = [dress];
      const shoe = shoes[0];
      const acc = accessories[0];
      const outer = outerwear[0];
      if (shoe) outfit.push(shoe);
      if (acc) outfit.push(acc);
      if (outer) outfit.push(outer);

      outfits.push({
        id: dress.id,
        items: outfit,
        description: buildDescription(outfit),
      });
    }

    // Deduplicate
    const seen = new Set<string>();
    return outfits.filter((o) => {
      if (seen.has(o.id)) return false;
      seen.add(o.id);
      return true;
    });
  }, [items, occasionFilter]);
}

# Style My Wardrobe

## Current State
The app lets users catalog clothing items (name, category, color, occasions) and generates text-based outfit combination suggestions. The OutfitsPage shows outfit cards with item name/color badges but no visual representation.

## Requested Changes (Diff)

### Add
- **OutfitPreview component**: A visual fashion figure illustration overlaid with color-coded clothing layers. Shows the user what the outfit looks like on a figure using colored overlay zones for top, bottom, dress, shoes, outerwear, and accessory positions.
- **Outfit preview panel** inside each outfit card in OutfitsPage: A side panel showing the illustrated figure wearing the suggested outfit colors.
- **Color rendering**: Each clothing item's color is mapped to a CSS color value and applied as a colored overlay on the corresponding body zone of the figure illustration.

### Modify
- **OutfitsPage**: Update each outfit card to include the OutfitPreview visual figure alongside the existing item list.
- **OutfitSuggestion cards**: Expand layout to a horizontal split — left side shows the figure preview, right side shows the item list.

### Remove
- Nothing removed.

## Implementation Plan
1. Create `src/frontend/src/components/OutfitPreview.tsx` — SVG-based fashion figure with named zones (head, torso/top, waist/bottom, dress-full, shoes, outerwear-layer, accessory-dot). Apply color fills to zones based on the outfit items.
2. Create `src/frontend/src/utils/colorUtils.ts` — utility to parse English color names to CSS color values (navy blue → #001f5b, white → #ffffff, etc.) for rendering on the figure.
3. Update `OutfitsPage.tsx` to render `<OutfitPreview items={outfit.items} />` in each outfit card, with a revised card layout.

export type Category =
  | "top"
  | "bottom"
  | "dress"
  | "shoes"
  | "accessory"
  | "outerwear";

export type Occasion = "casual" | "formal" | "party" | "work" | "sport";

export type ClothingItem = {
  id: string;
  name: string;
  category: Category;
  color: string;
  occasions: Occasion[];
  addedAt: number;
};

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: "top", label: "Top" },
  { value: "bottom", label: "Bottom" },
  { value: "dress", label: "Dress" },
  { value: "shoes", label: "Shoes" },
  { value: "accessory", label: "Accessory" },
  { value: "outerwear", label: "Outerwear" },
];

export const OCCASIONS: { value: Occasion; label: string }[] = [
  { value: "casual", label: "Casual" },
  { value: "formal", label: "Formal" },
  { value: "party", label: "Party" },
  { value: "work", label: "Work" },
  { value: "sport", label: "Sport" },
];

export const CATEGORY_ICONS: Record<Category, string> = {
  top: "👔",
  bottom: "👖",
  dress: "👗",
  shoes: "👠",
  accessory: "💍",
  outerwear: "🧥",
};

export const CATEGORY_COLORS: Record<Category, string> = {
  top: "bg-rose-100 text-rose-800 border-rose-200",
  bottom: "bg-blue-100 text-blue-800 border-blue-200",
  dress: "bg-purple-100 text-purple-800 border-purple-200",
  shoes: "bg-amber-100 text-amber-800 border-amber-200",
  accessory: "bg-emerald-100 text-emerald-800 border-emerald-200",
  outerwear: "bg-slate-100 text-slate-700 border-slate-200",
};

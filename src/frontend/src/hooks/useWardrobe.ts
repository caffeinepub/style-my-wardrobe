import { useCallback, useState } from "react";
import type { ClothingItem } from "../types/wardrobe";

const STORAGE_KEY = "style-my-wardrobe";
const SEEDED_KEY = "style-my-wardrobe-seeded";

const SAMPLE_ITEMS: ClothingItem[] = [
  {
    id: "seed-1",
    name: "White Linen Shirt",
    category: "top",
    color: "crisp white",
    occasions: ["casual", "work", "formal"],
    addedAt: Date.now() - 7 * 86400000,
  },
  {
    id: "seed-2",
    name: "Midnight Blue Jeans",
    category: "bottom",
    color: "midnight blue",
    occasions: ["casual", "work"],
    addedAt: Date.now() - 6 * 86400000,
  },
  {
    id: "seed-3",
    name: "Silk Wrap Dress",
    category: "dress",
    color: "dusty rose",
    occasions: ["formal", "party"],
    addedAt: Date.now() - 5 * 86400000,
  },
  {
    id: "seed-4",
    name: "White Leather Sneakers",
    category: "shoes",
    color: "white",
    occasions: ["casual", "sport"],
    addedAt: Date.now() - 4 * 86400000,
  },
  {
    id: "seed-5",
    name: "Gold Hoop Earrings",
    category: "accessory",
    color: "gold",
    occasions: ["casual", "work", "formal", "party"],
    addedAt: Date.now() - 3 * 86400000,
  },
  {
    id: "seed-6",
    name: "Camel Wool Blazer",
    category: "outerwear",
    color: "camel",
    occasions: ["formal", "work"],
    addedAt: Date.now() - 2 * 86400000,
  },
  {
    id: "seed-7",
    name: "Black Slim Trousers",
    category: "bottom",
    color: "jet black",
    occasions: ["formal", "work", "party"],
    addedAt: Date.now() - 86400000,
  },
  {
    id: "seed-8",
    name: "Nude Block Heel Pumps",
    category: "shoes",
    color: "nude beige",
    occasions: ["formal", "work", "party"],
    addedAt: Date.now() - 43200000,
  },
];

function loadFromStorage(): ClothingItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ClothingItem[];
  } catch {
    return [];
  }
}

function saveToStorage(items: ClothingItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function seedIfEmpty(): ClothingItem[] {
  const alreadySeeded = localStorage.getItem(SEEDED_KEY);
  if (alreadySeeded) return loadFromStorage();

  const existing = loadFromStorage();
  if (existing.length > 0) {
    localStorage.setItem(SEEDED_KEY, "true");
    return existing;
  }

  // First visit — seed sample data
  saveToStorage(SAMPLE_ITEMS);
  localStorage.setItem(SEEDED_KEY, "true");
  return SAMPLE_ITEMS;
}

export function useWardrobe() {
  const [items, setItems] = useState<ClothingItem[]>(() => seedIfEmpty());

  const addItem = useCallback((item: Omit<ClothingItem, "id" | "addedAt">) => {
    const newItem: ClothingItem = {
      ...item,
      id: crypto.randomUUID(),
      addedAt: Date.now(),
    };
    setItems((prev) => {
      const next = [...prev, newItem];
      saveToStorage(next);
      return next;
    });
  }, []);

  const deleteItem = useCallback((id: string) => {
    setItems((prev) => {
      const next = prev.filter((item) => item.id !== id);
      saveToStorage(next);
      return next;
    });
  }, []);

  return { items, addItem, deleteItem };
}

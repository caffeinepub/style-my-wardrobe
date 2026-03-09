import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Category, ClothingItem, Occasion } from "../types/wardrobe";
import {
  CATEGORIES,
  CATEGORY_COLORS,
  CATEGORY_ICONS,
  OCCASIONS,
} from "../types/wardrobe";

type Props = {
  items: ClothingItem[];
  onAdd: (item: Omit<ClothingItem, "id" | "addedAt">) => void;
  onDelete: (id: string) => void;
};

const OCCASION_COLORS: Record<Occasion, string> = {
  casual: "bg-sky-100 text-sky-700 border-sky-200",
  formal: "bg-indigo-100 text-indigo-700 border-indigo-200",
  party: "bg-pink-100 text-pink-700 border-pink-200",
  work: "bg-teal-100 text-teal-700 border-teal-200",
  sport: "bg-orange-100 text-orange-700 border-orange-200",
};

function groupByCategory(
  items: ClothingItem[],
): Record<string, ClothingItem[]> {
  return items.reduce<Record<string, ClothingItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});
}

export default function WardrobePage({ items, onAdd, onDelete }: Props) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category | "">("");
  const [color, setColor] = useState("");
  const [occasions, setOccasions] = useState<Set<Occasion>>(new Set());
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleOccasion = (occ: Occasion) => {
    setOccasions((prev) => {
      const next = new Set(prev);
      if (next.has(occ)) next.delete(occ);
      else next.add(occ);
      return next;
    });
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!category) errs.category = "Category is required";
    if (!color.trim()) errs.color = "Color is required";
    if (occasions.size === 0) errs.occasions = "Select at least one occasion";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onAdd({
      name: name.trim(),
      category: category as Category,
      color: color.trim(),
      occasions: Array.from(occasions),
    });
    setName("");
    setCategory("");
    setColor("");
    setOccasions(new Set());
    setErrors({});
    toast.success("Item added to your wardrobe!");
  };

  const grouped = groupByCategory(items);
  const orderedCategories = CATEGORIES.filter((c) => grouped[c.value]);

  // Count items for display
  let itemIndex = 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      {/* Add Item Form */}
      <section>
        <div className="mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground tracking-tight">
            Add to Your Wardrobe
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Catalog each piece with its details for personalized outfit
            suggestions.
          </p>
        </div>

        <form
          onSubmit={handleAdd}
          className="bg-card border border-border rounded-xl p-6 shadow-editorial space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Name */}
            <div className="space-y-1.5">
              <Label htmlFor="item-name" className="text-sm font-medium">
                Item Name
              </Label>
              <Input
                id="item-name"
                data-ocid="wardrobe.name.input"
                placeholder="e.g. White linen shirt"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-destructive text-xs">{errors.name}</p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Category</Label>
              <Select
                value={category}
                onValueChange={(v) => setCategory(v as Category)}
              >
                <SelectTrigger
                  data-ocid="wardrobe.category.select"
                  className={errors.category ? "border-destructive" : ""}
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {CATEGORY_ICONS[cat.value]} {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-destructive text-xs">{errors.category}</p>
              )}
            </div>

            {/* Color */}
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="item-color" className="text-sm font-medium">
                Color
              </Label>
              <Input
                id="item-color"
                data-ocid="wardrobe.color.input"
                placeholder="e.g. navy blue, off-white, burgundy"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className={errors.color ? "border-destructive" : ""}
              />
              {errors.color && (
                <p className="text-destructive text-xs">{errors.color}</p>
              )}
            </div>
          </div>

          {/* Occasions */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Occasions</Label>
            <div className="flex flex-wrap gap-x-5 gap-y-2.5">
              {OCCASIONS.map((occ) => (
                <div key={occ.value} className="flex items-center gap-2">
                  <Checkbox
                    id={`occ-${occ.value}`}
                    data-ocid={`wardrobe.${occ.value}.checkbox`}
                    checked={occasions.has(occ.value)}
                    onCheckedChange={() => toggleOccasion(occ.value)}
                  />
                  <Label
                    htmlFor={`occ-${occ.value}`}
                    className="text-sm cursor-pointer font-normal"
                  >
                    {occ.label}
                  </Label>
                </div>
              ))}
            </div>
            {errors.occasions && (
              <p className="text-destructive text-xs">{errors.occasions}</p>
            )}
          </div>

          <Button
            type="submit"
            data-ocid="wardrobe.add.primary_button"
            className="w-full sm:w-auto bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </form>
      </section>

      <Separator />

      {/* Wardrobe List */}
      <section>
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground tracking-tight">
            My Collection
          </h2>
          {items.length > 0 && (
            <span className="text-muted-foreground text-sm">
              {items.length} {items.length === 1 ? "piece" : "pieces"}
            </span>
          )}
        </div>

        {items.length === 0 ? (
          <motion.div
            data-ocid="wardrobe.empty_state"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-border rounded-xl"
          >
            <div className="text-5xl mb-4">👗</div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              Your wardrobe is empty
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Start adding your clothing pieces above to unlock personalized
              outfit suggestions.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {orderedCategories.map(({ value: catValue, label: catLabel }) => {
              const catItems = grouped[catValue] ?? [];
              return (
                <div key={catValue}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">
                      {CATEGORY_ICONS[catValue as Category]}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {catLabel}s
                    </h3>
                    <span className="text-xs text-muted-foreground ml-1">
                      ({catItems.length})
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <AnimatePresence mode="popLayout">
                      {catItems.map((item) => {
                        itemIndex++;
                        const currentIndex = itemIndex;
                        return (
                          <motion.div
                            key={item.id}
                            data-ocid={`wardrobe.item.${currentIndex}`}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Card className="border border-border shadow-xs hover:shadow-editorial transition-shadow duration-200 overflow-hidden">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-foreground text-sm leading-tight truncate">
                                      {item.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-0.5 capitalize">
                                      {item.color}
                                    </p>
                                  </div>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    data-ocid={`wardrobe.delete_button.${currentIndex}`}
                                    onClick={() => {
                                      onDelete(item.id);
                                      toast.success(`Removed "${item.name}"`);
                                    }}
                                    className="h-7 w-7 text-muted-foreground hover:text-destructive shrink-0"
                                    aria-label={`Remove ${item.name}`}
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </Button>
                                </div>

                                <div className="mt-3 flex flex-wrap gap-1">
                                  <Badge
                                    variant="outline"
                                    className={`text-xs border ${CATEGORY_COLORS[item.category as Category]} py-0 px-2`}
                                  >
                                    {CATEGORY_ICONS[item.category as Category]}{" "}
                                    {catLabel}
                                  </Badge>
                                  {item.occasions.map((occ) => (
                                    <Badge
                                      key={occ}
                                      variant="outline"
                                      className={`text-xs border ${OCCASION_COLORS[occ]} py-0 px-2 capitalize`}
                                    >
                                      {occ}
                                    </Badge>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

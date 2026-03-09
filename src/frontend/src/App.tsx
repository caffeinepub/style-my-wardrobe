import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import HowItWorksPage from "./components/HowItWorksPage";
import OutfitsPage from "./components/OutfitsPage";
import StyleTipsPage from "./components/StyleTipsPage";
import WardrobePage from "./components/WardrobePage";
import { useWardrobe } from "./hooks/useWardrobe";

type Tab = "wardrobe" | "suggestions" | "tips" | "howto";

const NAV_TABS: { value: Tab; label: string; icon: string; ocid: string }[] = [
  {
    value: "wardrobe",
    label: "My Wardrobe",
    icon: "👗",
    ocid: "nav.wardrobe.tab",
  },
  {
    value: "suggestions",
    label: "Outfits",
    icon: "✨",
    ocid: "nav.suggestions.tab",
  },
  { value: "tips", label: "Style Tips", icon: "📖", ocid: "nav.tips.tab" },
  { value: "howto", label: "How It Works", icon: "💡", ocid: "nav.howto.tab" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("howto");
  const { items, addItem, deleteItem } = useWardrobe();

  return (
    <div className="min-h-screen bg-background grain flex flex-col">
      <Toaster position="top-right" richColors />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-base leading-none">👗</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-foreground text-lg leading-tight tracking-tight">
                StyleMe
              </h1>
              <p className="text-muted-foreground text-xs leading-tight hidden sm:block">
                Your personal wardrobe assistant
              </p>
            </div>
          </div>
          {items.length > 0 && (
            <div className="flex items-center gap-1.5 bg-primary/8 border border-primary/20 rounded-full px-3 py-1">
              <span className="text-xs font-medium text-primary">
                {items.length} {items.length === 1 ? "piece" : "pieces"}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Main navigation + content */}
      <main className="flex-1">
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as Tab)}
          className="flex flex-col"
        >
          {/* Tab Navigation */}
          <div className="sticky top-[69px] z-30 bg-background/90 backdrop-blur-sm border-b border-border">
            <div className="max-w-5xl mx-auto px-4">
              <TabsList className="h-auto bg-transparent gap-0 p-0 w-full flex justify-start overflow-x-auto">
                {NAV_TABS.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    data-ocid={tab.ocid}
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent px-4 py-3 text-sm font-medium text-muted-foreground transition-all hover:text-foreground whitespace-nowrap gap-1.5 flex items-center"
                  >
                    <span className="text-base leading-none">{tab.icon}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">
                      {tab.value === "wardrobe"
                        ? "Wardrobe"
                        : tab.value === "suggestions"
                          ? "Outfits"
                          : tab.value === "tips"
                            ? "Tips"
                            : "How-to"}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>

          {/* Tab Contents */}
          <AnimatePresence mode="wait">
            <TabsContent value="howto" className="mt-0 flex-1">
              <motion.div
                key="howto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <HowItWorksPage onStart={() => setActiveTab("wardrobe")} />
              </motion.div>
            </TabsContent>

            <TabsContent value="wardrobe" className="mt-0 flex-1">
              <motion.div
                key="wardrobe"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <WardrobePage
                  items={items}
                  onAdd={addItem}
                  onDelete={deleteItem}
                />
              </motion.div>
            </TabsContent>

            <TabsContent value="suggestions" className="mt-0 flex-1">
              <motion.div
                key="suggestions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <OutfitsPage items={items} />
              </motion.div>
            </TabsContent>

            <TabsContent value="tips" className="mt-0 flex-1">
              <motion.div
                key="tips"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <StyleTipsPage />
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-5xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </span>
          <span>Your data stays on your device — always private.</span>
        </div>
      </footer>
    </div>
  );
}

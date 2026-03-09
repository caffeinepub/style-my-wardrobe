import MixinAuth "./authorization/MixinAuthorization";
import AccessControl "./authorization/access-control";
import Map "mo:core/Map";

actor {
  // ── Authorization ──────────────────────────────────────────────────────────
  let accessControlState : AccessControl.AccessControlState = AccessControl.initState();
  include MixinAuth(accessControlState);

  // ── Data Types ─────────────────────────────────────────────────────────────
  public type ClothingItem = {
    id       : Nat;
    name     : Text;
    category : Text;
    color    : Text;
    occasions: [Text];
  };

  public type OutfitSuggestion = {
    items      : [ClothingItem];
    description: Text;
  };

  // ── State ────────────────────────────────────────────────────────────────────
  let wardrobes : Map.Map<Text, [ClothingItem]> = Map.empty();
  let nextIds   : Map.Map<Text, Nat>            = Map.empty();

  // ── Helpers ──────────────────────────────────────────────────────────────────
  func getItems(u : Text) : [ClothingItem] {
    switch (wardrobes.get(u)) { case (?i) i; case null [] };
  };

  func allocId(u : Text) : Nat {
    let n = switch (nextIds.get(u)) { case (?n) n; case null 0 };
    nextIds.add(u, n + 1);
    n
  };

  // ── Public API ───────────────────────────────────────────────────────────────

  public shared ({ caller }) func addClothingItem(
    name     : Text,
    category : Text,
    color    : Text,
    occasions: [Text]
  ) : async Nat {
    let u  = caller.toText();
    let id = allocId(u);
    let item : ClothingItem = { id; name; category; color; occasions };
    wardrobes.add(u, getItems(u).concat([item]));
    id
  };

  public query ({ caller }) func getWardrobe() : async [ClothingItem] {
    getItems(caller.toText())
  };

  public shared ({ caller }) func deleteClothingItem(id : Nat) : async Bool {
    let u      = caller.toText();
    let before = getItems(u);
    let after  = before.filter(func(i : ClothingItem) : Bool { i.id != id });
    if (after.size() == before.size()) return false;
    wardrobes.add(u, after);
    true
  };

  public query ({ caller }) func getOutfitSuggestions(occasion : Text) : async [OutfitSuggestion] {
    let items = getItems(caller.toText());

    func matchOcc(item : ClothingItem) : Bool {
      if (occasion == "") return true;
      item.occasions.any(func(o : Text) : Bool { o == occasion })
    };

    let f           = items.filter(matchOcc);
    let tops        = f.filter(func(i : ClothingItem) : Bool { i.category == "top"       });
    let bottoms     = f.filter(func(i : ClothingItem) : Bool { i.category == "bottom"    });
    let dresses     = f.filter(func(i : ClothingItem) : Bool { i.category == "dress"     });
    let shoes       = f.filter(func(i : ClothingItem) : Bool { i.category == "shoes"     });
    let accessories = f.filter(func(i : ClothingItem) : Bool { i.category == "accessory" });
    let outerwear   = f.filter(func(i : ClothingItem) : Bool { i.category == "outerwear" });

    var suggestions : [OutfitSuggestion] = [];

    for (top in tops.vals()) {
      for (bottom in bottoms.vals()) {
        var combo : [ClothingItem] = [top, bottom];
        var desc = "Pair your " # top.color # " " # top.name
                   # " with a " # bottom.color # " " # bottom.name;
        if (shoes.size() > 0) {
          combo := combo.concat([shoes[0]]);
          desc  := desc # ", styled with " # shoes[0].color # " " # shoes[0].name;
        };
        if (accessories.size() > 0) {
          combo := combo.concat([accessories[0]]);
          desc  := desc # " and a " # accessories[0].color # " " # accessories[0].name;
        };
        if (outerwear.size() > 0) {
          combo := combo.concat([outerwear[0]]);
          desc  := desc # ". Layer with a " # outerwear[0].color # " " # outerwear[0].name;
        };
        suggestions := suggestions.concat([{ items = combo; description = desc # "." }]);
      };
    };

    for (dress in dresses.vals()) {
      var combo : [ClothingItem] = [dress];
      var desc = "Wear your " # dress.color # " " # dress.name;
      if (shoes.size() > 0) {
        combo := combo.concat([shoes[0]]);
        desc  := desc # " with " # shoes[0].color # " " # shoes[0].name;
      };
      if (accessories.size() > 0) {
        combo := combo.concat([accessories[0]]);
        desc  := desc # " and a " # accessories[0].color # " " # accessories[0].name;
      };
      if (outerwear.size() > 0) {
        combo := combo.concat([outerwear[0]]);
        desc  := desc # ". Throw on a " # outerwear[0].color # " " # outerwear[0].name;
      };
      suggestions := suggestions.concat([{ items = combo; description = desc # "." }]);
    };

    suggestions
  };

  public query func getStyleTips() : async [(Text, Text)] {
    [
      ("top",       "Choose tops that complement your body shape. Fitted tops work well for slim silhouettes, while flowy blouses balance curvier figures. Neutral colors are versatile staples."),
      ("bottom",    "Dark-wash jeans are a wardrobe essential — they dress up or down easily. Pair wide-leg trousers with a tucked-in top to define the waist."),
      ("dress",     "A wrap dress flatters almost every body type by cinching at the waist. Midi lengths transition seamlessly from day to evening."),
      ("shoes",     "Nude or beige shoes elongate the legs. White sneakers pair with almost any outfit. Invest in at least one versatile heel and one quality flat."),
      ("accessory", "A statement necklace or earrings can elevate a simple outfit instantly. Stick to one bold accessory at a time to keep the look polished."),
      ("outerwear", "A well-fitted blazer can make a casual outfit look intentional. Trench coats are timeless and work across seasons.")
    ]
  };
};

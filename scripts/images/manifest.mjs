// Every AI image the site can use. Run `npm run images:plan` to list them.
// kind "generate": text-to-image. kind "edit": uses the client's real product photo(s)
// as reference so bottle shape, colours and label design stay faithful.
// Output: public/images/gen/<id>.webp (+ -sm.webp). The site picks these up automatically
// and falls back to the optimised real photo (or illustrated tile) when missing.

const STYLE =
  "Bright, natural-light commercial photography, warm and inviting Indian setting, crisp focus, " +
  "realistic colours, gentle contrast, uncluttered composition. Absolutely no text, letters, logos, " +
  "brand names or watermarks anywhere in the image; any packaging must be plain and unlabelled.";

const PACKSHOT =
  "Recreate the exact product from the reference photo as a premium e-commerce packshot: keep the same bottle " +
  "shape, cap, liquid colour and the same label artwork and brand name exactly as in the reference — do not " +
  "invent new words or redesign the label. Remove the hand and background. Product stands upright, centred, " +
  "filling about 70% of the frame height, on a soft warm cream seamless backdrop with a gentle floor shadow " +
  "and soft studio lighting with a subtle rim light.";

const landscape = { orientation: "landscape", aspect: 3 / 2, widths: [1600, 800] };
const portrait = { orientation: "portrait", aspect: 4 / 5, widths: [900, 480] };

const sub = (id, scene) => ({
  id: `sub-${id}`,
  kind: "generate",
  ...portrait,
  prompt: `${scene} Styled product photograph for a wholesale catalogue tile, shot from a slight high angle on a warm terracotta-and-cream surface. ${STYLE}`,
});

// Product-specific scene for brands without a client photo, so cards in the same
// sub-category never repeat one image. Each sets its own surface for variety.
const scene = (id, prompt) => ({
  id: `prod-${id}`,
  kind: "generate",
  ...portrait,
  prompt: `${prompt} Styled product photograph for a wholesale catalogue card, portrait composition with the hero subject centred. ${STYLE}`,
});

const pack = (id, ref, props) => ({
  id,
  kind: "edit",
  premium: true,
  refs: [ref],
  ...portrait,
  prompt: `${PACKSHOT} Add a few fresh props beside the base: ${props}. Portrait composition.`,
});

export const imageTasks = [
  // ── Page imagery ──────────────────────────────────────────
  {
    id: "hero-distribution",
    kind: "generate",
    premium: true,
    ...landscape,
    prompt:
      "Golden-hour scene outside a clean distribution godown on the outskirts of Bengaluru: a small yellow-and-red light " +
      "commercial delivery truck with its side open, neatly stacked plain brown cartons and shrink-wrapped crates of " +
      "colourful soft-drink bottles being loaded by two workers in plain green t-shirts. Coconut palms and a hint of " +
      `city in the background, warm sunlight, optimistic mood. Wide composition with calm space on the left. ${STYLE}`,
  },
  {
    id: "about-warehouse",
    kind: "generate",
    ...landscape,
    prompt:
      "Inside an organised FMCG distribution warehouse in Bengaluru: tall racks of plain cartons, pallets of bottled " +
      "beverages under shrink wrap, a supervisor with a tablet checking stock, morning light from high windows, " +
      `clean floor, sense of efficiency and care. ${STYLE}`,
  },
  {
    id: "retailer-kirana",
    kind: "generate",
    ...landscape,
    prompt:
      "A friendly neighbourhood kirana store in Bengaluru, shopkeeper behind the counter smiling while receiving a carton " +
      "from a delivery person; shelves full of colourful snacks, spice packets and a glass-door beverage cooler stocked " +
      `with bright bottled drinks; marigold garland at the doorway. ${STYLE}`,
  },
  {
    id: "manufacturer-partnership",
    kind: "generate",
    ...landscape,
    prompt:
      "A brand manager and a distributor shaking hands in a bright modern Indian warehouse office, product samples of " +
      "plain unlabelled bottles and snack packs on the table, a large map of Karnataka softly blurred on the wall, " +
      `professional and warm. ${STYLE}`,
  },

  // ── Category banners ──────────────────────────────────────
  {
    id: "cat-hydration-coolers", kind: "generate", ...landscape,
    prompt: `An abundant arrangement of chilled bottled juices, kulki drinks with basil seeds, goli soda bottles and mineral water bottles on crushed ice with fresh mango, pineapple, mint and lemon, condensation droplets. ${STYLE}`,
  },
  {
    id: "cat-ready-to-cook", kind: "generate", ...landscape,
    prompt: `Warm Indian kitchen counter with a stack of soft half-cooked parottas and chapathis on a tawa, small brass bowls of red chilli, turmeric and coriander powder, whole spices scattered around. ${STYLE}`,
  },
  {
    id: "cat-accompaniments-dairy", kind: "generate", ...landscape,
    prompt: `Ceramic jars of homemade lemon and green chilli pickle beside glasses of spiced buttermilk with curry leaves and bottles of pastel flavoured milk (badam, strawberry, pista), on a wooden table. ${STYLE}`,
  },
  {
    id: "cat-snacks-sweets", kind: "generate", ...landscape,
    prompt: `Festive spread of Indian snacks: bowls of murukku, sev, potato chips and mixture, squares of soan papdi, cream wafer rolls, chocolate-filled cookies and colourful hard candies. ${STYLE}`,
  },
  {
    id: "cat-baking-dessert", kind: "generate", ...landscape,
    prompt: `Bakery and café prep table: a glossy chocolate-glazed cake, jugs of fruit crush and mojito syrup, a falooda glass with rose syrup, caramel and butterscotch sauce drizzles, fresh strawberries. ${STYLE}`,
  },

  // ── Sub-category tiles ────────────────────────────────────
  sub("natural-juices", "Glasses and plain bottles of mango, apple, pineapple, lychee and guava juice with the fresh fruits around them."),
  sub("mineral-water-soda", "Plain clear water bottles in three sizes and a glass of sparkling club soda with ice, droplets on the bottles."),
  sub("goli-soda-frizz", "Classic Indian goli soda bottles with marble necks in lemon, orange, cola and jeera colours, fizz bubbles rising."),
  sub("kulki-mocktails", "Tall glasses of kulki mocktails with soaked basil seeds — mango, pudina mint and kokum — with fresh mint and lemon."),
  sub("energy-drinks", "Two plain red aluminium cans of energy drink beading with condensation on ice, dynamic lighting."),
  sub("half-cooked-flatbreads", "A neat stack of flaky layered Kerala parottas and soft chapathis on a cotton cloth beside a hot tawa."),
  sub("pure-ground-spices", "Four small mounds of red chilli powder, turmeric, coriander powder and black pepper powder on brass spoons."),
  sub("blended-masalas", "Bowls of sambhar masala, garam masala and pav bhaji masala with whole spices, cinnamon and star anise."),
  sub("homemade-pickles", "Glass jars of lemon pickle, green chilli pickle and mixed vegetable pickle glistening with oil and mustard seeds."),
  sub("buttermilk-flavoured-milk", "Glass of spiced masala buttermilk with curry leaves and ginger, beside plain bottles of badam, chocolate, strawberry and pista milk."),
  sub("namkeen-chips", "Bowls of crunchy murukku, sev, potato chips, corn mixture and garlic mixture."),
  sub("traditional-mithai", "Flaky golden soan papdi cubes and soan cakes on a brass plate with pistachio slivers."),
  sub("confectionery-wafers", "Cream-filled wafer rolls and centre-filled wafers stacked on a plate, a glass candy jar in the background."),
  sub("baked-chocolate-fills", "Round baked cookies broken open to show molten chocolate and strawberry centre fillings."),
  sub("hard-candies", "Colourful glossy hard candies — coconut, paan green and tamarind brown — spilling from a small glass jar."),
  sub("fruit-crushes-syrups", "Jugs of strawberry and mango fruit crush and a mint mojito mocktail with lime slices and ice."),
  sub("baking-glazes-fillings", "A cake being covered in mirror chocolate glaze, a bowl of real strawberry fruit filling beside it."),
  sub("dessert-toppings", "An ice cream sundae drizzled with chocolate sauce, butterscotch and caramel, and a rose falooda glass."),

  // ── Product packshots from real photos ────────────────────
  {
    id: "beekay-range",
    kind: "edit",
    premium: true,
    refs: ["product img-9.jpeg"],
    ...landscape,
    prompt:
      "Recreate the exact five bottles from the reference photo (Pudina, Imlee Blast, Mango Kulki, Kokum, Pineapple Kulki) " +
      "standing in a neat row, keeping every bottle shape, cap, liquid colour and label artwork exactly as in the reference " +
      "— do not invent or alter any words. Premium beverage hero shot on a warm cream seamless backdrop with crushed ice, " +
      "fresh mint, a cut mango, pineapple chunks and kokum fruit around the base, soft studio lighting with gentle reflections. Landscape composition.",
  },
  pack("beekay-mango-kulki", "product img-4.jpeg", "slices of ripe mango and a few ice cubes"),
  pack("beekay-pineapple-kulki", "product img-5.jpeg", "pineapple chunks and a few ice cubes"),
  pack("beekay-pudina", "product img-7.jpeg", "fresh mint sprigs, lemon wedge and ice cubes"),
  pack("beekay-kokum", "product img-6.jpeg", "halved kokum fruits and ice cubes"),
  pack("beekay-litchi", "product img-2.jpeg", "peeled litchi fruits and ice cubes"),
  {
    id: "supreme-jal-range",
    kind: "edit",
    premium: true,
    refs: ["product img-14.jpeg"],
    ...landscape,
    prompt:
      "Recreate the exact three water bottles from the reference photo (large, medium and small), keeping bottle shape, " +
      "teal caps and the label artwork exactly as in the reference — do not invent or alter any words. Clean premium " +
      "packshot on a cool white-to-aqua seamless backdrop with water droplets on the bottles, a subtle water splash at the " +
      "base and soft studio lighting. Landscape composition.",
  },
  pack("supreme-jal-1l", "product img-18.jpeg", "a few clear water droplets and a small splash at the base"),
  pack("supreme-jal-500ml", "product img-13.jpeg", "a few clear water droplets and a small splash at the base"),
  pack("tusk-range", "product img-16.jpeg", "blueberries, lemon slices, orange segments and ice cubes"),
  pack("tusk-orange", "product img-17.jpeg", "orange segments and ice cubes"),
  pack("tusk-classic-lemon", "product img-21.jpeg", "lemon slices, mint and ice cubes"),
  pack("tusk-blueberry", "product img-20.jpeg", "fresh blueberries and ice cubes"),
  // ── Product scenes (no client photo yet; shown as "illustrative") ──
  scene("salisons-frizz", "Six classic Indian goli soda bottles with glass marble necks in a row — jeera brown, lemon yellow, apple green, pale lemon-salt, orange and cola — fizzing on a wooden street-side soda cart counter with crushed ice and halved lemons."),
  scene("frizz-jinja", "One tall glass of sparkling pale-golden ginger soda with ice and a lime wheel, beside a single marble-neck soda bottle, fresh ginger root slices and a few cloves on a dark slate surface, warm side light."),
  scene("gulp-soda", "A blue plastic bottle crate packed with plain clear sparkling soda bottles, condensation droplets, on the cool steel floor of a neighbourhood shop beside an open fridge, a few loose bottles in front."),
  scene("salisons-squeeze", "Five plain unlabelled juice cartons with straws, each paired with its fruit — a whole mango, red apple, pineapple, lychees and a halved pink guava — on a white marble kitchen counter in morning light."),
  scene("podaran-tilo-juices", "A row of small plain PET bottles of orange, mango and mixed-fruit drink standing in a glass-door shop cooler shelf, cold mist and droplets, bright fluorescent-lit kirana cooler."),
  scene("zee-sip", "Colourful plain single-serve fruit drink pouches and small cups with straws in a wire counter basket beside a shop cash counter, orange, apple and mango colours, playful impulse-buy feel."),
  scene("masala-moru", "A traditional clay tumbler of frothy masala buttermilk topped with chopped curry leaves, coriander and green chilli, beside a plain white milk pouch, a small piece of ginger and a stainless-steel tumbler, on a banana leaf on rustic wood."),
  scene("tilo-flavoured-milk", "Four plain glass bottles of flavoured milk — pale yellow badam, brown chocolate, pink strawberry and light green pista — with almonds, cocoa nibs, strawberries and pistachios, on a cool pastel-blue backdrop with chilled condensation."),
  scene("fmb-royal-dazzle", "Close-up of crisp chocolate-and-vanilla striped cream-filled wafer rolls standing upright in a clear glass, a few lying in front, cream visible at the ends, on a soft lilac surface."),
  scene("creamyum-wafers", "A neat stack of square centre-filled wafer biscuits, the top one broken in half to show a thick soft cream core, in vanilla, strawberry and chocolate layers, on a mint-green plate against a pale background."),
  scene("lambu-jars", "A row of tall clear plastic counter jars with red lids on a kirana shop counter, filled with colourful wrapped toffees, lollipops and jelly sweets, shop shelves softly blurred behind."),
];

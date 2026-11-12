// Real client photos (source-assets/photos) -> web-ready crops in public/images/photos.
// `crop` is an optional extract region applied before resizing.
// `aspect` is width/height of the final crop (null = keep source aspect).
export const photoTasks = [
  { id: "beekay-range", src: "product img-9.jpeg", crop: { left: 0, top: 800, width: 1043, height: 780 }, aspect: null },
  { id: "beekay-flatlay", src: "product img-1.jpeg", aspect: 4 / 5 },
  { id: "beekay-litchi", src: "product img-2.jpeg", aspect: 4 / 5 },
  { id: "beekay-kokum", src: "product img-6.jpeg", aspect: 4 / 5 },
  { id: "beekay-mango-kulki", src: "product img-4.jpeg", aspect: 4 / 5 },
  { id: "beekay-pineapple-kulki", src: "product img-5.jpeg", aspect: 4 / 5 },
  { id: "beekay-pudina", src: "product img-7.jpeg", aspect: 4 / 5 },
  { id: "supreme-jal-range", src: "product img-14.jpeg", aspect: null },
  { id: "supreme-jal-1l", src: "product img-18.jpeg", aspect: 4 / 5 },
  { id: "supreme-jal-500ml", src: "product img-13.jpeg", aspect: 4 / 5 },
  { id: "tusk-range", src: "product img-16.jpeg", aspect: 4 / 5 },
  { id: "tusk-orange", src: "product img-17.jpeg", aspect: 4 / 5 },
  { id: "tusk-classic-lemon", src: "product img-21.jpeg", aspect: 4 / 5 },
  { id: "tusk-blueberry", src: "product img-20.jpeg", aspect: 4 / 5 },
  { id: "poster-beekay-eid", src: "product img-8.jpeg", aspect: null },
  { id: "poster-beekay-independence", src: "product img-11.jpeg", aspect: null },
  { id: "poster-beekay-store", src: "product img-12.jpeg", aspect: null },
  { id: "poster-tusk-cashback", src: "product img-22.jpeg", aspect: null },
  // "tampo image-clean.jpeg" = the client photo with the AI-generator sparkle watermark patched out.
  { id: "delivery-van", src: "tampo image-clean.jpeg", aspect: null, widths: [1280, 720] },
];

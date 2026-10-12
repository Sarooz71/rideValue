// Static data used while the project has no backend.
// newPrice = approximate showroom price in NPR (illustrative, not official).

export const catalog = {
  Yamaha: [
    { model: "MT-15", cc: 155, newPrice: 560000, popular: true },
    { model: "R15 V4", cc: 155, newPrice: 620000, popular: true },
    { model: "FZ-S V3", cc: 149, newPrice: 400000, popular: false },
  ],
  KTM: [
    { model: "Duke 200", cc: 200, newPrice: 560000, popular: true },
    { model: "Duke 390", cc: 373, newPrice: 860000, popular: false },
  ],
  Bajaj: [
    { model: "Pulsar NS200", cc: 199, newPrice: 430000, popular: true },
    { model: "Pulsar 150", cc: 149, newPrice: 320000, popular: true },
    { model: "Dominar 400", cc: 373, newPrice: 760000, popular: false },
  ],
  Honda: [
    { model: "CB Hornet 160R", cc: 162, newPrice: 380000, popular: true },
    { model: "Hornet 2.0", cc: 184, newPrice: 440000, popular: false },
  ],
  "Royal Enfield": [
    { model: "Classic 350", cc: 349, newPrice: 640000, popular: true },
    { model: "Hunter 350", cc: 349, newPrice: 560000, popular: true },
    { model: "Himalayan 411", cc: 411, newPrice: 800000, popular: false },
  ],
  TVS: [
    { model: "Apache RTR 160 4V", cc: 160, newPrice: 350000, popular: true },
    { model: "Apache RTR 200 4V", cc: 197, newPrice: 440000, popular: false },
  ],
  Hero: [{ model: "Xtreme 160R", cc: 163, newPrice: 340000, popular: false }],
  Suzuki: [{ model: "Gixxer SF", cc: 155, newPrice: 390000, popular: false }],
};

export const brands = Object.keys(catalog);

export function findModel(brand, model) {
  return catalog[brand]?.find((m) => m.model === model) ?? null;
}

export const locations = [
  "Kathmandu",
  "Lalitpur",
  "Bhaktapur",
  "Pokhara",
  "Chitwan",
  "Biratnagar",
  "Butwal",
  "Other",
];
export const conditions = ["Excellent", "Good", "Fair", "Poor"];
export const ownerships = ["1st Owner", "2nd Owner", "3rd Owner or more"];
export const fuelTypes = ["Petrol", "Electric"];
export const transmissions = ["Manual", "Automatic"];

// Marketplace listings (sample data — replaced by MongoDB later)
export const bikes = [
  { id: 1, brand: "Yamaha", model: "MT-15", year: 2022, mileage: 18500, cc: 155, condition: "Excellent", ownership: "1st Owner", fuelType: "Petrol", transmission: "Manual", location: "Kathmandu", price: 385000, seller: { name: "Sujan Shrestha", phone: "98XXXXXX01" }, description: "Single owner, always garaged. Full service history from the authorised dealer. New tyres fitted last month." },
  { id: 2, brand: "KTM", model: "Duke 200", year: 2021, mileage: 22000, cc: 200, condition: "Good", ownership: "1st Owner", fuelType: "Petrol", transmission: "Manual", location: "Lalitpur", price: 410000, seller: { name: "Prabin Karki", phone: "98XXXXXX02" }, description: "Well-maintained, no accident history. Minor cosmetic scratches on the tank. Bluebook up to date." },
  { id: 3, brand: "Yamaha", model: "R15 V4", year: 2023, mileage: 12000, cc: 155, condition: "Excellent", ownership: "1st Owner", fuelType: "Petrol", transmission: "Manual", location: "Kathmandu", price: 450000, seller: { name: "Anisha Gurung", phone: "98XXXXXX03" }, description: "Almost new. Quick shifter, original paint, all service records available." },
  { id: 4, brand: "Bajaj", model: "Pulsar NS200", year: 2020, mileage: 31000, cc: 199, condition: "Good", ownership: "2nd Owner", fuelType: "Petrol", transmission: "Manual", location: "Pokhara", price: 255000, seller: { name: "Rojan Thapa", phone: "98XXXXXX04" }, description: "Reliable daily rider. Chain and sprocket replaced recently. Second owner, papers clear." },
  { id: 5, brand: "Royal Enfield", model: "Classic 350", year: 2021, mileage: 15000, cc: 349, condition: "Excellent", ownership: "1st Owner", fuelType: "Petrol", transmission: "Manual", location: "Bhaktapur", price: 480000, seller: { name: "Bishal Maharjan", phone: "98XXXXXX05" }, description: "Chrome finish in great shape. Touring accessories included. Regularly serviced." },
  { id: 6, brand: "Honda", model: "CB Hornet 160R", year: 2019, mileage: 38000, cc: 162, condition: "Fair", ownership: "2nd Owner", fuelType: "Petrol", transmission: "Manual", location: "Chitwan", price: 190000, seller: { name: "Dipesh Adhikari", phone: "98XXXXXX06" }, description: "Runs well, some wear on the seat and footpegs. Good first bike for the price." },
  { id: 7, brand: "TVS", model: "Apache RTR 160 4V", year: 2022, mileage: 14000, cc: 160, condition: "Good", ownership: "1st Owner", fuelType: "Petrol", transmission: "Manual", location: "Biratnagar", price: 265000, seller: { name: "Kiran Rai", phone: "98XXXXXX07" }, description: "Low running, single owner. Full tank-to-tank service done at 12,000 km." },
  { id: 8, brand: "Bajaj", model: "Dominar 400", year: 2020, mileage: 27000, cc: 373, condition: "Good", ownership: "1st Owner", fuelType: "Petrol", transmission: "Manual", location: "Kathmandu", price: 470000, seller: { name: "Nabin Basnet", phone: "98XXXXXX08" }, description: "Highway tourer with crash guards and a touring screen. New battery." },
  { id: 9, brand: "KTM", model: "Duke 390", year: 2019, mileage: 34000, cc: 373, condition: "Good", ownership: "2nd Owner", fuelType: "Petrol", transmission: "Manual", location: "Lalitpur", price: 520000, seller: { name: "Samir Tamang", phone: "98XXXXXX09" }, description: "Powerful and well looked after. Aftermarket exhaust, original included." },
  { id: 10, brand: "Royal Enfield", model: "Hunter 350", year: 2023, mileage: 8000, cc: 349, condition: "Excellent", ownership: "1st Owner", fuelType: "Petrol", transmission: "Manual", location: "Pokhara", price: 435000, seller: { name: "Sneha Pun", phone: "98XXXXXX10" }, description: "Nearly new with warranty remaining. Selling due to relocation." },
  { id: 11, brand: "Suzuki", model: "Gixxer SF", year: 2018, mileage: 45000, cc: 155, condition: "Fair", ownership: "3rd Owner or more", fuelType: "Petrol", transmission: "Manual", location: "Butwal", price: 150000, seller: { name: "Ramesh Chaudhary", phone: "98XXXXXX11" }, description: "Fully-faired sports commuter. Higher mileage, priced to sell." },
  { id: 12, brand: "Hero", model: "Xtreme 160R", year: 2022, mileage: 16500, cc: 163, condition: "Good", ownership: "1st Owner", fuelType: "Petrol", transmission: "Manual", location: "Kathmandu", price: 245000, seller: { name: "Ujjwal Poudel", phone: "98XXXXXX12" }, description: "Light, fuel-efficient and in good shape. Regular oil changes with receipts." },
];

// Default (empty) values for the prediction form
export const emptyForm = {
  brand: "",
  model: "",
  year: "",
  mileage: "",
  engineCC: "",
  condition: "Good",
  ownership: "1st Owner",
  fuelType: "Petrol",
  transmission: "Manual",
  location: "Kathmandu",
  askingPrice: "",
  hasServiceHistory: false,
  hasDamage: false,
};

import type { ImageSource } from "expo-image";

export type ListingType = "Rent" | "Sale";

export type Property = {
  id: string;
  type: ListingType;
  verified: boolean;
  title: string;
  summary: string;
  price: string;
  status: string;
  photos: ImageSource[];
};

export const properties: Property[] = [
  {
    id: "terrace-victoria-island",
    type: "Rent",
    verified: true,
    title: "Modern 3-Bedroom Terrace Home",
    summary: "4-bedroom duplex · Victoria Island",
    price: "₦4,200,000 / year",
    status: "Available · Confirmed 2d ago",
    photos: [
      require("../../assets/home/terrace-front.jpg"),
      require("../../assets/home/terrace-garden.jpg"),
      require("../../assets/home/terrace-stairs.jpg"),
      require("../../assets/home/terrace-street.jpg"),
    ],
  },
  {
    id: "duplex-lekki",
    type: "Sale",
    verified: true,
    title: "Brand New 3-Bedroom Semi-Detached Duplex",
    summary: "3-bedroom duplex · Lekki Phase 1",
    price: "₦185,000,000",
    status: "Available · Confirmed 5h ago",
    photos: [
      require("../../assets/home/duplex-front.jpg"),
      require("../../assets/home/duplex-balconies.jpg"),
      require("../../assets/home/duplex-pool.jpg"),
      require("../../assets/home/duplex-terrace.jpg"),
    ],
  },
  {
    id: "villa-ikoyi",
    type: "Rent",
    verified: true,
    title: "Luxury 5-Bedroom Villa with Pool",
    summary: "5-bedroom detached · Ikoyi",
    price: "₦25,000,000 / year",
    status: "Available · Confirmed 1d ago",
    photos: [
      require("../../assets/home/villa-pool.jpg"),
      require("../../assets/home/villa-patio.jpg"),
      require("../../assets/home/duplex-pool.jpg"),
      require("../../assets/home/terrace-stairs.jpg"),
    ],
  },
];

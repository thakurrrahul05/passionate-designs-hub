import kitchen1 from "@/assets/portfolio-kitchen-1.jpg";
import kitchen2 from "@/assets/portfolio-kitchen-2.jpg";
import office1 from "@/assets/portfolio-office-1.jpg";
import retail1 from "@/assets/portfolio-retail-1.jpg";
import bedroom1 from "@/assets/portfolio-bedroom-1.jpg";
import living2 from "@/assets/portfolio-living-2.jpg";
import ceiling1 from "@/assets/portfolio-ceiling-1.jpg";
import ceiling2 from "@/assets/portfolio-ceiling-2.jpg";

export const FILTERS = [
  "All",
  "Residential",
  "Commercial",
  "Modular Kitchens",
  "False Ceilings",
] as const;

export type Filter = (typeof FILTERS)[number];

export type Project = {
  title: string;
  location: string;
  category: Exclude<Filter, "All">;
  image: string;
  width: number;
  height: number;
};

export const PROJECTS: Project[] = [
  {
    title: "Luxury Master Suite",
    location: "Villa · Gomti Nagar",
    category: "Residential",
    image: bedroom1,
    width: 1200,
    height: 1500,
  },
  {
    title: "Graphite Modular Kitchen",
    location: "Apartment · Vinay Khand",
    category: "Modular Kitchens",
    image: kitchen1,
    width: 1200,
    height: 1500,
  },
  {
    title: "Corporate Workplace",
    location: "Office · Vibhuti Khand",
    category: "Commercial",
    image: office1,
    width: 1500,
    height: 1100,
  },
  {
    title: "Coffered Cove Ceiling",
    location: "Residence · Lucknow",
    category: "False Ceilings",
    image: ceiling1,
    width: 1500,
    height: 1100,
  },
  {
    title: "TV Cabinet Living Wall",
    location: "Apartment · Gomti Nagar",
    category: "Residential",
    image: living2,
    width: 1200,
    height: 1500,
  },
  {
    title: "Island Kitchen in Oak",
    location: "Villa · Sushant Golf City",
    category: "Modular Kitchens",
    image: kitchen2,
    width: 1500,
    height: 1100,
  },
  {
    title: "Flagship Retail Showroom",
    location: "Retail · Hazratganj",
    category: "Commercial",
    image: retail1,
    width: 1500,
    height: 1100,
  },
  {
    title: "Sculpted Dining Ceiling",
    location: "Residence · Delhi NCR",
    category: "False Ceilings",
    image: ceiling2,
    width: 1200,
    height: 1500,
  },
];
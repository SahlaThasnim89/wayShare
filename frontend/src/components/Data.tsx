import {
  Location,
  Car,
  Charging,
  money,
  security,
  wifi,
  Driver,
} from "../assets/index";
import { FeatureCardItem } from "../types/FeatureCardItem";
import { topDrivers } from "../types/TopDrivers";

const Data: { features: FeatureCardItem[]; topDrivers: topDrivers[] } = {
  features: [
    {
      logo: Car,
      title: "Swift Rides",
      para: "Quick and reliable transportation to get you to your destination on time.",
    },
    {
      logo: money,
      title: "Affordable Travel",
      para: "Cost-sharing options that offer great value without compromising comfort.",
    },
    {
      logo: security,
      title: "Journey Safety",
      para: "Secure and professional drivers ensuring your travel is safe and hassle-free.",
    },
    {
      logo: wifi,
      title: "Internet Sharing",
      para: "Stay connected on the go with shared internet access for your convenience.",
    },
    {
      logo: Charging,
      title: "Phone Charging",
      para: "Keep your devices powered throughout your journey with optional charging services.",
    },
    {
      logo: Location,
      title: "Driver Location",
      para: "Real-time tracking to know your driver's exact location for a seamless pickup experience.",
    },
  ],
  topDrivers: [
    {
      image: Driver, 
      name: "John Doe",
      completedRides: 320,
      ratings: 4.8,
    },
    {
      image: Driver,
      name: "Jane Smith",
      completedRides: 290,
      ratings: 4.7,
    },
    {
      image: Driver,
      name: "Robert",
      completedRides: 250,
      ratings: 4.6,
    },
  ],
};

export default Data;

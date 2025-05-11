export interface Car {
  id: string;
  name: string;
  type: string;
  transmission: string;
  seats: number;
  pricePerDay: number;
  shortDescription: string;
  description: string;
  features: string[];
  specifications: {
    engine: string;
    power: string;
    topSpeed: string;
    acceleration: string;
    fuelType: string;
  };
  imageUrl: string;
  gallery: string[];
}

// Empty array – car section removed
export const carData: Car[] = [];

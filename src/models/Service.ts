export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  location: string;
  imageUrl: string;
  availableDates: {
    date: Date;
    times: string[];
  }[];
}

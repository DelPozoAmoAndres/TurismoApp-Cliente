export class Activity {
  name: string;
  images: any[];
  location: string;
  duration: number;
  description: Record<string, string>;
  events?: Event[];
  reviews?: Review[]
  state: ActivityState;
  category: ActivityCategory;
  _id?: string;

  constructor() {
    this.name = ""
    this.images = []
    this.location = ""
    this.duration = 0
    this.description = {};
    this.events = []
    this.state = ActivityState.available
    this.category = ActivityCategory.cultural
  }
}

export enum ActivityState {
  'available' = 'available',
  'temporaly-closed' = 'temporaly-closed',
  'canceled' = 'canceled',
}

export enum ActivityCategory { "cultural" = "cultural", "deportiva" = "deportiva", "gastronómica" = "gastronómica", "naturaleza" = "naturaleza", "nocturna" = "nocturna", "religiosa" = "religiosa", "social" = "social" }

export class Event {
  seats: number;
  bookedSeats?: number;
  date: Date;
  price: number;
  language: string;
  guide: string;
  _id?: string;
  state?: null | 'cancelled';
  constructor() {
    this.seats = 0;
    this.date = new Date();
    this.price = 0;
    this.language = "español";
    this.guide = ""
    this.bookedSeats = 0;
  }
}

export class Review {
  score: number;
  comment?: string;
  author: string;
  activityId?: string;
  authorImage?: string;
  authorName?: string;
  date: Date;
  _id?: string;
  reservationId: string;


  constructor(activityId: string, reservationId: string) {
    this.score = 0;
    this.author = "";
    this.activityId = activityId
    this.date = new Date();
    this.reservationId = reservationId;
  }
}

export interface ActivityFilter extends Record<string, unknown> {
  precio?: number;
  duration?: number;
  state?: ActivityState;
  language?: string;
  originDate?: string;
  endDate?: string;
  score?: number;
}

export class Activity {
  name: string;
  images: any[];
  location: string;
  duration: number;
  description: string;
  events?: Event[] ;
  reviews?: Review[] 
  accesibility: string;
  petsPermited: boolean;
  state: ActivityState;
  _id?: string;

  constructor(){
    this.name=""
    this.images=[]
    this.location=""
    this.duration=0
    this.description=""
    this.events=[]
    this.accesibility=""
    this.petsPermited=false
    this.state=ActivityState.available
  }
}

export enum ActivityState {
  'available' = 'available',
  'temporaly-closed' = 'temporaly-closed',
  'canceled' = 'canceled',
}

export class Event {
  seats: number;
  bookedSeats?: number;
  date: Date | null;
  price: number;
  language: string;
  guide: string;
  _id?: string;

  constructor(){
    this.seats=0;
    this.date= new Date();
    this.price=0;
    this.language="español";
    this.guide=""
  }
}

export class Review {
  score: number;
  comment?: string;
  author: string;
  activityId?:string;
  authorImage?:string;
  authorName?:string;
  date:Date;
  _id?:string;


  constructor(activityId:string){
    this.score=0;
    this.author="";
    this.activityId=activityId
    this.date=new Date();
  }
}

export interface ActivityFilter extends Record<string, unknown>{
  precio?: number;
  duration?: number ;
  petsPermited?: boolean ;
  state?: ActivityState ;
  language?: string ;
  originDate?: string ;
  endDate?: string ;
  score?: number ;
}

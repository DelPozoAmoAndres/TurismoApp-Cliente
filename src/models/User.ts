import { Activity } from './Activity';
import { Reservation } from './Reservation';

export class User {
  name: string ;
  email: string ;
  birthday?: Date | null;
  telephone?: string;
  country?: string | null;
  password: string ;
  role?: Role;
  createdAt?: Date;
  updatedAt?: Date;
  reservations?: Reservation[];
  _id?: string;

  constructor() {
    this.name="",
    this.email="",
    this.password=""
  }
}

export interface FieldConfig {
  key: keyof User;
  label: string;
  type?:
    | 'number'
    | 'email'
    | 'password'
    | 'search'
    | 'time'
    | 'text'
    | 'date'
    | 'tel'
    | 'url'
    | 'week'
    | 'month'
    | 'datetime-local'
    | undefined;
  disabled?: boolean;
}

export interface RegisterFormData extends User {
  confirmPassword: string;
}

export enum Role {
  'administrador' = 'admin',
  'turista' = 'user',
  'guía' = 'worker',
}

export interface UserFilter extends Record<string, unknown> {
  country: string | null;
  role: Role | null;
}

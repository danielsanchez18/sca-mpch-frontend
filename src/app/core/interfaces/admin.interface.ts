import { User } from './user.interface';

export interface Admin {
  idAdmin: string;
  password: string;
  user: User;
}

export interface PaginatedAdmins {
  content: Admin[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // Página actual
}

export interface ResponseAdmins {
  data: PaginatedAdmins,
  message: string
}

import { User } from './user.interface';

export interface Security {
  idSecurity: string;
  password: string;
  user: User;
}

export interface PaginatedSecurities {
  content: Security[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // Página actual
}

export interface ResponseSecurities {
  data: PaginatedSecurities,
  message: string
}

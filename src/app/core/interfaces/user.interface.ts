import { Role } from "./role.interface";

export interface User {
  idUser: string;
  role: Role;
  name: string;
  lastname: string;
  dni: string;
  createdAt: string;
  updatedAt: string;
  birthdate: string;
  photo: string;
  status: boolean;
}

export interface PaginatedUsers {
  content: User[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // Página actual
}

export interface ResponseUsers {
  data: PaginatedUsers,
  message: string
}

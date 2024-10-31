import { Role } from "./role.interface";


export interface User {
  idUser?: string;
  role?: Role;
  name: string;
  lastname: string;
  dni: string;
  age: number;
  createdAt?: Date;
  updatedAt?: Date;
  photo: string;
  status: boolean;
}

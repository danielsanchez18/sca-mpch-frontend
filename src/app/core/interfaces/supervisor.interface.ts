import { User } from './user.interface';
import { Area } from './area.interface';

export interface Supervisor {
  idSupervisor: string;
  password: string;
  user: User;
  area: Area;
}

export interface PaginatedSupervisors {
  content: Supervisor[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // Página actual
}

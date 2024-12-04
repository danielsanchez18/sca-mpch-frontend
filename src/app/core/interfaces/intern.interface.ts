import { User } from './user.interface';
import { AreaUniversity } from './area-university.interface';

export interface Intern {
  idIntern: string;
  user: User;
  areaUniversity: AreaUniversity;
  totalHours: number;
}

export interface PaginatedInterns {
  content: Intern[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // Página actual
}

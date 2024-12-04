import { Intern } from './intern.interface';

export interface Assistance {
  idAssistance: string;
  intern: Intern;
  checkIn: string | null;
  checkOut: string | null;
  hoursWorked: number;
}

export interface PaginatedAssistances {
  content: Assistance[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // Página actual
}

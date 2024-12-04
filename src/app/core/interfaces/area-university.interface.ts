import { Area } from './area.interface';
import { University } from './university.interface';

export interface AreaUniversity {
  idAreaUniversity: string;
  area: Area;
  university: University;
  hoursCertified: number;
}

export interface PaginatedAreaUniversities {
  content: AreaUniversity[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // Página actual
}

export interface ResponseAreaUniversity {
  data: PaginatedAreaUniversities;
  message: string;
}

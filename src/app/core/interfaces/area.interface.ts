
export interface Area {
  idArea: number;
  name: string;
  nroVacancies: number;
  status: boolean;
}

export interface PaginatedAreas {
  content: Area[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // Página actual
}

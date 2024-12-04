export interface University {
  idUniversity: number;
  name: string;
  acronym: string;
  photo?: string; // Opcional porque puede no tener foto
  status: boolean;
}

export interface PaginatedUniversities {
  content: University[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // Página actual
}

export interface ResponseUniversity {
  data: PaginatedUniversities;
  message: string;
}

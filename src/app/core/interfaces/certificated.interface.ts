import { Intern } from './intern.interface';

export interface Certificated {
  idCertificated: string;
  intern: Intern;
  status: boolean;
  generatedDate: string;
}

export interface PaginatedCertificateds {
  content: Certificated[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // Página actual
}

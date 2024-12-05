
export interface Role {
  idRole: number;
  name: string;
}

export interface PaginatedRoles {
  content: Role[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // Página actual
}

export interface RoleResponse {
  data: PaginatedRoles;
  message: string;
}

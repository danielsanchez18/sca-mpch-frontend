import { User } from "./user.interface";

export interface Admin {
  idAdmin: string;
  password: string;
  user: User;
}

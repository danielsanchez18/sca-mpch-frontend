import { Area } from "./area.interface";
import { User } from "./user.interface";


export interface Supervisor {
  idSupervisor: string;
  password: string;
  user: User;
  area: Area;
}

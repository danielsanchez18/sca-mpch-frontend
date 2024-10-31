import { Area } from "./area.interface";
import { User } from "./user.interface";
import { University } from './university.interface';


export interface Intern {
  idIntern?: string;
  user: User;
  area: Area;
  university: University;
  totalHours: number;
}

import { Intern } from './intern.interface';


export interface Assistance {
  idAssistance: string;
  intern: Intern;
  checkIn: Date;
  checkOut: Date;
  hoursWorked: number;
}

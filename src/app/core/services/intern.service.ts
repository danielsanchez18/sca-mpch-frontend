import { Injectable } from '@angular/core';
import { BASE_URL } from '../utils/helper';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Intern } from '../interfaces/intern.interface';

@Injectable({
  providedIn: 'root'
})
export class InternService {

  private url = `${BASE_URL}/intern`;

  constructor(private http: HttpClient) { }

  saveIntern(intern: Intern): Observable<Intern> {
    return this.http.post<Intern>(`${this.url}/save`, intern);
  }

  getAllInterns(page: number, size: number): Observable<Intern[]> {
    return this.http.get<{ content: Intern[] }>(`${this.url}/all?page=${page}&size=${size}`)
      .pipe(
        map(response => response.content)
      );
  }

  getInternsById(id: string): Observable<Intern> {
    return this.http.get<Intern>(`${this.url}/id/${id}`);
  }

  getInternsByName(name: string): Observable<Intern[]> {
    return this.http.get<Intern[]>(`${this.url}/name/${name}`);
  }

  getInternsByArea(area: string): Observable<Intern[]> {
    return this.http.get<Intern[]>(`${this.url}/area/${area}`);
  }

  getInternsByUniversity(university: string): Observable<Intern[]> {
    return this.http.get<Intern[]>(`${this.url}/university/${university}`);
  }

  getTotalInterns(): Observable<number> {
    return this.http.get<number>(`${this.url}/total`);
  }

  updateIntern(id: string, intern: Intern): Observable<Intern> {
    return this.http.put<Intern>(`${this.url}/update/${id}`, intern);
  }

  deleteIntern(id: string): Observable<any> {
    return this.http.delete(`${this.url}/delete/${id}`);
  }

}

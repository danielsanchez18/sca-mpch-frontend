import { Injectable } from '@angular/core';
import { BASE_URL } from '../utils/helper';
import { HttpClient } from '@angular/common/http';
import { University } from '../interfaces/university.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  private url = `${BASE_URL}/university`;

  constructor(private http: HttpClient) { }

  saveUniversity(university: University) :Observable<University> {
    return this.http.post<University>(`${this.url}/save`, university);
  }

  getAllUniversities(page: number, size: number): Observable<University[]> {
    return this.http.get<{ content: University[] }>(`${this.url}/all?page=${page}&size=${size}`)
      .pipe(
        map(response => response.content)
      );
  }

  getTotalUniversities(): Observable<number> {
    return this.http.get<number>(`${this.url}/total`);
  }

  getUniversityById(id: string): Observable<University> {
    return this.http.get<University>(`${this.url}/id/${id}`);
  }

  updateUniversity(id: string, university: University): Observable<University> {
    return this.http.put<University>(`${this. url}/update/${id}`, university);
  }

  deleteUniversity(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/delete/${id}`);
  }

  searchUniversities(name: string): Observable<University[]> {
    return this.http.get<University[]>(`${this.url}/search/${name}`)
  }


}

import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Classes} from '../../interface/classes';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor(private http: HttpClient) {
  }

  getAllClasses(): Observable<Classes[]> {
    return this.http.get<Classes[]>(API_URL + '/classes');
  }

  createClasses(classes: Classes): Observable<Classes> {
    return this.http.post<Classes>(API_URL + '/classes', classes);
  }

  getClasses(id: number): Observable<Classes> {
    return this.http.get<Classes>(API_URL + `/classes/${id}`)
  }

  updateClasses(id: number, classes: Classes): Observable<Classes> {
    return this.http.put<Classes>(API_URL + `/classes/${id}`, classes)
  }

  deleteClasses(id: number): Observable<Classes> {
    return this.http.delete<Classes>(API_URL + `/classes/${id}`);
  }
}

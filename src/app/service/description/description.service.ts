import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Description} from '../../interface/description';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class DescriptionService {


  constructor(private http: HttpClient) {
  }

  getAllDescription(): Observable<Description[]> {
    return this.http.get<Description[]>(API_URL + '/descriptions');
  }

  createDescription(description: Description): Observable<Description> {
    return this.http.post<Description>(API_URL + '/descriptions', description);
  }

  getDescription(id: number): Observable<Description> {
    return this.http.get<Description>(API_URL + `/descriptions/${id}`);
  }

  updateDescription(id: number, description: Description): Observable<Description> {
    return this.http.put<Description>(API_URL + `/descriptions/${id}`, description);
  }

  deleteDescription(id: number): Observable<Description> {
    return this.http.delete<Description>(API_URL + `/descriptions/${id}`);
  }
}

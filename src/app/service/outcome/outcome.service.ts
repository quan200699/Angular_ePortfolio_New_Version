import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Outcome} from '../../interface/outcome';
const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class OutcomeService {

  constructor(private http: HttpClient) {
  }

  getAllOutcome(): Observable<Outcome[]> {
    return this.http.get<Outcome[]>(API_URL + '/outcomes');
  }

  createOutcome(outcome: Outcome): Observable<Outcome> {
    return this.http.post<Outcome>(API_URL + '/outcomes', outcome);
  }

  getOutcome(id: number): Observable<Outcome> {
    return this.http.get<Outcome>(API_URL + `/outcomes/${id}`)
  }

  updateOutcome(id: number, outcome: Outcome): Observable<Outcome> {
    return this.http.put<Outcome>(API_URL + `/outcomes/${id}`, outcome)
  }

  deleteOutcome(id: number): Observable<Outcome> {
    return this.http.delete<Outcome>(API_URL + `/outcomes/${id}`);
  }
}

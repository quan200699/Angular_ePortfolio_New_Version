import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Evaluations} from '../../interface/evaluations';
import {Student} from '../../interface/student';
import {EvaluationsDetail} from '../../interface/evaluations-detail';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class EvaluationsService {
  constructor(private http: HttpClient) {
  }

  getAllEvaluations(): Observable<Evaluations[]> {
    return this.http.get<Evaluations[]>(API_URL + '/evaluations');
  }

  createDescription(evaluations: Evaluations): Observable<Evaluations> {
    return this.http.post<Evaluations>(API_URL + '/evaluations', evaluations);
  }

  getEvaluations(id: number): Observable<Evaluations> {
    return this.http.get<Evaluations>(API_URL + `/evaluations/${id}`);
  }

  updateEvaluations(id: number, evaluations: Evaluations): Observable<Evaluations> {
    return this.http.put<Evaluations>(API_URL + `/evaluations/${id}`, evaluations);
  }

  deleteEvaluations(id: number): Observable<Evaluations> {
    return this.http.delete<Evaluations>(API_URL + `/evaluations/${id}`);
  }

  getAllEvaluationsByStudent(id: number): Observable<Student[]> {
    return this.http.get<Student[]>(API_URL + `/students/${id}/evaluations`);
  }

  getAllEvaluationsDetailByEvaluationAndSkill(id: number, skillId: number): Observable<EvaluationsDetail> {
    return this.http.get<EvaluationsDetail>(API_URL + `/evaluations/${id}/skills/${skillId}/evaluation-details`);
  }
}

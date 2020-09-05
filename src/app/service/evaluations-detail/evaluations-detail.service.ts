import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Program} from '../../interface/program';
import {EvaluationsDetail} from '../../interface/evaluations-detail';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class EvaluationsDetailService {

  constructor(private http: HttpClient) {
  }

  getAllEvaluationsDetail(): Observable<EvaluationsDetail[]> {
    return this.http.get<EvaluationsDetail[]>(API_URL + '/evaluation-details');
  }

  createEvaluationsDetail(evaluationsDetail: EvaluationsDetail): Observable<EvaluationsDetail> {
    return this.http.post<EvaluationsDetail>(API_URL + '/evaluation-details', evaluationsDetail);
  }

  getEvaluationsDetail(id: number): Observable<EvaluationsDetail> {
    return this.http.get<EvaluationsDetail>(API_URL + `/evaluation-details/${id}`)
  }

  updateEvaluationsDetail(id: number, evaluationsDetail: EvaluationsDetail): Observable<EvaluationsDetail> {
    return this.http.put<EvaluationsDetail>(API_URL + `/evaluation-details/${id}`, evaluationsDetail)
  }

  deleteEvaluationsDetail(id: number): Observable<EvaluationsDetail> {
    return this.http.delete<EvaluationsDetail>(API_URL + `/evaluation-details/${id}`);
  }
}

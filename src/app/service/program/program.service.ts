import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Program} from '../../interface/program';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(private http: HttpClient) {
  }

  getAllProgram(): Observable<Program[]> {
    return this.http.get<Program[]>(API_URL + '/programs');
  }

  createProgram(program: Program): Observable<Program> {
    return this.http.post<Program>(API_URL + '/programs', program);
  }

  getProgram(id: number): Observable<Program> {
    return this.http.get<Program>(API_URL + `/programs/${id}`)
  }

  updateProgram(id: number, program: Program): Observable<Program> {
    return this.http.put<Program>(API_URL + `/programs/${id}`, program)
  }

  deleteProgram(id: number): Observable<Program> {
    return this.http.delete<Program>(API_URL + `/programs/${id}`);
  }
}

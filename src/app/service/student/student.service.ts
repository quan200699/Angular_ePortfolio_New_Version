import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Student} from '../../interface/student';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private http: HttpClient) {
  }

  getAllStudent(): Observable<Student[]> {
    return this.http.get<Student[]>(API_URL + '/students');
  }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(API_URL + '/students', student);
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(API_URL + `/students/${id}`)
  }

  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(API_URL + `/students/${id}`, student)
  }

  deleteStudent(id: number): Observable<Student> {
    return this.http.delete<Student>(API_URL + `/students/${id}`);
  }
}

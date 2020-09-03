import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Program} from '../../interface/program';
import {OnlineCourse} from '../../interface/online-course';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class OnlineCourseService {

  constructor(private http: HttpClient) {
  }

  getAllOnlineCourse(): Observable<OnlineCourse[]> {
    return this.http.get<OnlineCourse[]>(API_URL + '/online-courses');
  }

  createOnlineCourse(onlineCourse: OnlineCourse): Observable<OnlineCourse> {
    return this.http.post<OnlineCourse>(API_URL + '/online-courses', onlineCourse);
  }

  getOnlineCourse(id: number): Observable<OnlineCourse> {
    return this.http.get<OnlineCourse>(API_URL + `/online-courses/${id}`)
  }

  updateOnlineCourse(id: number, onlineCourse: OnlineCourse): Observable<OnlineCourse> {
    return this.http.put<Program>(API_URL + `/online-courses/${id}`, onlineCourse)
  }

  deleteOnlineCourse(id: number): Observable<OnlineCourse> {
    return this.http.delete<OnlineCourse>(API_URL + `/online-courses/${id}`);
  }
}

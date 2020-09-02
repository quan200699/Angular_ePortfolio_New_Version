import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Lecture} from '../../interface/lecture';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  constructor(private http: HttpClient) {
  }

  getAllLecture(): Observable<Lecture[]> {
    return this.http.get<Lecture[]>(API_URL + '/lectures');
  }

  createLecture(lecture: Lecture): Observable<Lecture> {
    return this.http.post<Lecture>(API_URL + '/lectures', lecture);
  }

  getLecture(id: number): Observable<Lecture> {
    return this.http.get<Lecture>(API_URL + `/lectures/${id}`)
  }

  updateLecture(id: number, lecture: Lecture): Observable<Lecture> {
    return this.http.put<Lecture>(API_URL + `/lectures/${id}`, lecture)
  }

  deleteLecture(id: number): Observable<Lecture> {
    return this.http.delete<Lecture>(API_URL + `/lectures/${id}`);
  }
}

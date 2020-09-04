import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Skill} from '../../interface/skill';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private http: HttpClient) {
  }

  getAllSkill(): Observable<Skill[]> {
    return this.http.get<Skill[]>(API_URL + '/skills');
  }

  createSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(API_URL + '/skills', skill);
  }

  getSkill(id: number): Observable<Skill> {
    return this.http.get<Skill>(API_URL + `/skills/${id}`)
  }

  updateSkill(id: number, skill: Skill): Observable<Skill> {
    return this.http.put<Skill>(API_URL + `/skills/${id}`, skill)
  }

  deleteSkill(id: number): Observable<Skill> {
    return this.http.delete<Skill>(API_URL + `/skills/${id}`);
  }
}

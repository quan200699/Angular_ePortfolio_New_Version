import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Module} from '../../interface/module';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(private http: HttpClient) {
  }

  getAllModule(): Observable<Module[]> {
    return this.http.get<Module[]>(API_URL + '/modules');
  }

  createModule(module: Module): Observable<Module> {
    return this.http.post<Module>(API_URL + '/modules', module);
  }

  getModule(id: number): Observable<Module> {
    return this.http.get<Module>(API_URL + `/modules/${id}`)
  }

  updateModule(id: number, module: Module): Observable<Module> {
    return this.http.put<Module>(API_URL + `/modules/${id}`, module)
  }

  deleteModule(id: number): Observable<Module> {
    return this.http.delete<Module>(API_URL + `/modules/${id}`);
  }
}

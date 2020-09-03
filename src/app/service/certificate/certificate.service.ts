import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Certificate} from '../../interface/certificate';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(private http: HttpClient) {
  }

  getAllCertificate(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(API_URL + '/certificates');
  }

  createCertificate(certificate: Certificate): Observable<Certificate> {
    return this.http.post<Certificate>(API_URL + '/certificates', certificate);
  }

  getCertificate(id: number): Observable<Certificate> {
    return this.http.get<Certificate>(API_URL + `/certificates/${id}`)
  }

  updateCertificate(id: number, certificate: Certificate): Observable<Certificate> {
    return this.http.put<Certificate>(API_URL + `/certificates/${id}`, certificate)
  }

  deleteCertificate(id: number): Observable<Certificate> {
    return this.http.delete<Certificate>(API_URL + `/certificates/${id}`);
  }
}

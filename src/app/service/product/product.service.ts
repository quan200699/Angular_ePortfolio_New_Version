import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../interface/product';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL + '/products');
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(API_URL + '/products', product);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(API_URL + `/products/${id}`)
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(API_URL + `/products/${id}`, product)
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(API_URL + `/products/${id}`);
  }

  getAllProductByStudent(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL + `/students/${id}/products`);
  }
}

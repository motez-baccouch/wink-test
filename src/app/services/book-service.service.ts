import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BookServiceService {


  private apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=';

  constructor(private http: HttpClient) {}

  getBooks(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${query}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookServiceService {
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  getBooks(query: string, pageSize: number, startIndex: number): Observable<any> {
    const url = `${this.apiUrl}?q=${query}&maxResults=${pageSize}&startIndex=${startIndex}`;
    console.log(`Fetching data from URL: ${url}`);
    return this.http.get<any>(url);
  }
}

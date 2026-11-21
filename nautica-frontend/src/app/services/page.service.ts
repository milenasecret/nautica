import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Page, PageTypeRequest, PageUpdateRequest} from '../models/page.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private apiUrl = `${environment.apiUrl}/pages`;

  constructor(private http: HttpClient) {}

  getPage(id: number): Observable<Page> {
    return this.http.get<Page>(`${this.apiUrl}/${id}`);
  }

  updatePage(
    id: number,
    data: PageUpdateRequest
  ): Observable<Page> {
    return this.http.patch<Page>(`${this.apiUrl}/${id}`, data);
  }

  getPageOfType(
    data: PageTypeRequest
  ): Observable<Page> {
    return this.http.post<Page>(`${this.apiUrl}/type`, data);
  }
}

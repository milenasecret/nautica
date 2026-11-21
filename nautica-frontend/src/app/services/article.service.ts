import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Page, PageTypeRequest, PageUpdateRequest} from '../models/page.model';
import {Observable} from 'rxjs';
import {Article} from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apiUrl = `${environment.apiUrl}/articles`;

  constructor(private http: HttpClient) {}

  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`);
  }

  updateArticle(id: number, article: Partial<Article>): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}/${id}`, article);
  }

  getPageOfType(
    data: PageTypeRequest
  ): Observable<Page> {
    return this.http.post<Page>(`${this.apiUrl}/pages/type`, data);
  }

  createArticle(article: Article, pageId: number): Observable<Article> {
    return this.http.post<Article>(`${this.apiUrl}/page/${pageId}`, article);
  }

  deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

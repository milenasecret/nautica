import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {Document, ApiResponse, FilePageEnum} from '../models/document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private apiUrl = `${environment.apiUrl}/files`;

  constructor(private http: HttpClient) {}

  /**
   * Upload a file
   */
  uploadFile(file: File, pageType: FilePageEnum): Observable<Document> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('page', pageType);

    return this.http.post<Document>(this.apiUrl, formData);
  }

  /**
   * Get all documents
   */
  getAllDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(this.apiUrl);
  }

  /**
   * Get all documents by page type
   */
  getAllDocsByPageType(type: FilePageEnum): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.apiUrl}/type/${type}`);
  }

  /**
   * Preview a file
   */
  previewFile(id: number): void {
    this.http.get(`${this.apiUrl}/${id}`, {
      responseType: 'blob'
    }).subscribe(blob => {

      const url = window.URL.createObjectURL(blob);

      window.open(url, '_blank');

      // Free resource after some time
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 60000);
    });
  }

  /**
   * Download a file
   */
  downloadFile(id: number, fileName: string): void {
    this.http.get(`${this.apiUrl}/${id}`, {
      responseType: 'blob'
    }).subscribe(blob => {
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
    });
  }

  /**
   * Delete a file
   */
  deleteFile(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`);
  }

  /**
   * Format file size for display
   */
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }
}

import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { DocumentService } from '../../services/document';
import {Document, FilePageEnum} from '../../models/document.model';
import {TranslatePipe} from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import {environment} from '../../../environments/environment';
import {ArticleDialogDeleteComponent} from '../articles/article-dialog-delete/article-dialog-delete';
import {MatDialog} from '@angular/material/dialog';
import {DocumentDialogDeleteComponent} from '../document-dialog-delete/document-dialog-delete';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule,
    TranslatePipe,
    MatIcon,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule],
  templateUrl: './gallery.html',
  styleUrls: ['./gallery.scss']
})
export class GalleryComponent implements OnInit {
  documents: Document[] = [];
  images: string[] = [];
  isUploading = false;
  selectedFile: File | null = null;
  message = '';
  messageType: 'success' | 'error' = 'success';

  private apiUrl = `${environment.apiUrl}/files`;
  constructor(
    private authService: AuthService,
    private documentService: DocumentService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  currentIndex = 0;

  next() {
    this.currentIndex =
      (this.currentIndex + 1) % this.images.length;
  }

  previous() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length)
      % this.images.length;
  }

  selectImage(index: number) {
    this.currentIndex = index;
  }

  adminIsLogged(){
    return this.authService.adminIsLogged();
  }

  formatSize(bytes: number): string {
    return this.documentService.formatFileSize(bytes);
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      this.showMessage('Please select a file', 'error');
      return;
    }

    this.isUploading = true;
    this.documentService.uploadFile(this.selectedFile, FilePageEnum.GALLERY).subscribe({
      next: (response) => {
        this.showMessage('File uploaded successfully', 'success');
        this.loadDocuments();
        this.selectedFile = null;
        // Reset file input
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      },
      error: (error) => {
        this.showMessage(error.error?.message || 'Upload failed', 'error');
        this.isUploading = false;
      },
      complete: () => {
        this.isUploading = false;
      }
    });
  }

  loadDocuments(): void {
    this.documentService.getAllDocsByPageType(FilePageEnum.GALLERY).subscribe({
      next: (docs) => {
        for (let i = 0; i < docs.length; i++) {
          this.images[i] = this.apiUrl + '/' + docs[i].id;
          this.documents[i] = docs[i];
        }
      },
      error: (error) => {
        this.showMessage('Failed to load images', 'error');
      }
    });
  }

  deleteFile(doc: Document): void {
    const dialogRefDelete = this.dialog.open(DocumentDialogDeleteComponent, {
      width: '500px',
      maxWidth: '95vw',
      maxHeight: '95vh',
      data: {...doc},
      autoFocus: false,
      panelClass: 'document-dialog-panel'
    });

    dialogRefDelete.afterClosed().subscribe(result => {

      if (!result) {
        return;
      }

      this.documentService.deleteFile(result.id).subscribe({
        next: () => {
          this.loadDocuments();
          this.showMessage('FILE_DELETED', 'success');
        },
        error: () => {
          this.showMessage('DELETE_FILE_ERROR', 'error');
        }
      });
    });
  }

  private showMessage(msg: string, type: 'success' | 'error'): void {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }
}

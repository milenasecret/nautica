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
import {ArticleDialogDeleteComponent} from '../articles/article-dialog-delete/article-dialog-delete';
import {MatDialog} from '@angular/material/dialog';
import {DocumentDialogDeleteComponent} from '../document-dialog-delete/document-dialog-delete';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule,
    TranslatePipe,
    MatIcon,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule],
  templateUrl: './documents.html',
  styleUrls: ['./documents.scss']
})
export class DocumentsComponent implements OnInit {
  documents: Document[] = [];
  searchTerm = '';
  sortBy: 'newest' | 'oldest' | 'name' = 'newest';
  selectedFile: File | null = null;
  isUploading = false;
  message = '';
  messageType: 'success' | 'error' = 'success';

  constructor(
    private authService: AuthService,
    private documentService: DocumentService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  get filteredDocuments(): Document[] {
    let result = [...this.documents];

    // Pretraga po nazivu dokumenta
    if (this.searchTerm.trim()) {
      const search = this.searchTerm.toLowerCase().trim();

      result = result.filter(doc =>
        doc.filename.toLowerCase().includes(search)
      );
    }

    // Sortiranje
    switch (this.sortBy) {
      case 'newest':
        result.sort((a, b) =>
          new Date(b.uploadedAt).getTime() -
          new Date(a.uploadedAt).getTime()
        );
        break;

      case 'oldest':
        result.sort((a, b) =>
          new Date(a.uploadedAt).getTime() -
          new Date(b.uploadedAt).getTime()
        );
        break;

      case 'name':
        result.sort((a, b) =>
          a.filename.localeCompare(b.filename)
        );
        break;
    }

    return result;
  }
   adminIsLogged(){
     return this.authService.adminIsLogged();
   }

  getFileIcon(fileType: string): string {
    if (fileType?.startsWith('image/')) {
      return 'image';
    }

    switch (fileType) {
      case 'application/pdf':
        return 'picture_as_pdf';

      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return 'description';

      case 'application/vnd.ms-excel':
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return 'table_chart';

      default:
        return 'insert_drive_file';
    }
  }

  getFileColor(fileType: string): string {
    if (fileType?.startsWith('image/')) {
      return 'file-image';
    }

    switch (fileType) {
      case 'application/pdf':
        return 'file-pdf';

      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return 'file-word';

      case 'application/vnd.ms-excel':
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return 'file-excel';

      default:
        return 'file-default';
    }
  }

  loadDocuments(): void {
    this.documentService.getAllDocsByPageType(FilePageEnum.DOCUMENTS).subscribe({
      next: (docs) => {
        this.documents = docs;
      },
      error: (error) => {
        this.showMessage('Failed to load documents', 'error');
      }
    });
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
    this.documentService.uploadFile(this.selectedFile, FilePageEnum.DOCUMENTS).subscribe({
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

  previewFile(doc: Document): void {
    this.documentService.previewFile(doc.id);
  }

  downloadFile(doc: Document): void {
    this.documentService.downloadFile(doc.id, doc.filename);
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
  formatSize(bytes: number): string {
    return this.documentService.formatFileSize(bytes);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }

  private showMessage(msg: string, type: 'success' | 'error'): void {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }
}

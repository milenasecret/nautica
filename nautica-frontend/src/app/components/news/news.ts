import {Component, OnInit} from '@angular/core';
import {Page, PageTypeEnum} from '../../models/page.model';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {PageService} from '../../services/page.service';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {PageEditDialogComponent} from '../pages/page-edit-dialog/page-edit';
import {MatDialog} from '@angular/material/dialog';
import {ArticleService} from '../../services/article.service';
import {ArticleDialogComponent} from '../articles/article-dialog/article-dialog';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TranslatePipe,
    MatIconModule,
    MatButtonModule],
  templateUrl: './news.html',
  styleUrl: './news.scss',
})
export class NewsComponent implements OnInit {
  page: Page | null = null;
  loading = true;
  message = '';
  messageType: 'success' | 'error' = 'success';

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private translate: TranslateService,
    private pageService: PageService,
    private articleService: ArticleService
  ) {
  }

  ngOnInit(): void {
    this.loadPage(PageTypeEnum.NEWS);
  }

  loadPage(pageType: PageTypeEnum): void {
    this.loading = true;
    this.pageService.getPageOfType({type: pageType}).subscribe({
      next: page => {
        this.page = page;
        this.loading = false;
      },
      error: () => {
        this.message = this.translate.instant('PAGE_NOT_LOADED');
        this.messageType = 'error';
        this.loading = false;
      }
    });
  }

  editPage(): void {
    const dialogRef = this.dialog.open(PageEditDialogComponent, {
      width: '500px',
      maxWidth: '95vw',
      maxHeight: '95vh',
      data: {title: this.page?.title},
      autoFocus: false,
      panelClass: 'page-dialog-panel'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        return;
      }
      if (this.page !== null && this.page.id !== undefined) {
        this.pageService.updatePage(this.page.id, {title: result}).subscribe({
          next: (res) => {
            this.page = res;
            this.showMessage('PAGE_UPDATED', 'success');
          },
          error: () => {
            this.showMessage('PAGE_UPDATE_ERROR', 'error');
          }
        });
      }
    });
  }

  addArticle(): void {
    const dialogRef = this.dialog.open(ArticleDialogComponent, {
      width: '500px',
      maxWidth: '95vw',
      maxHeight: '95vh',
      data: null,
      autoFocus: false,
      panelClass: 'article-dialog-panel'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        return;
      }
      if (this.page !== null && this.page.id !== undefined) {
        this.articleService.createArticle(result, this.page.id).subscribe({
          next: () => {
            this.showMessage('ARTICLE_CREATED', 'success');
            this.loadPage(PageTypeEnum.NEWS);
          },
          error: () => {
            this.showMessage('CREATE_ARTICLE_ERROR', 'error');
          }
        });
      }
    });
  }

  private showMessage(msg: string, type: 'success' | 'error'): void {
    this.message = this.translate.instant(msg);
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }
}

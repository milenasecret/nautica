import {Component, Input, OnInit} from '@angular/core';
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
import {Article} from '../../models/article.model';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ArticleDialogDeleteComponent } from "../articles/article-dialog-delete/article-dialog-delete";
import {AuthService} from '../../services/auth';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TranslatePipe,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule],
  templateUrl: './news.html',
  styleUrl: './news.scss',
})
export class NewsComponent implements OnInit {
  page: Page | null = null;
  loading = true;
  message = '';
  messageType: 'success' | 'error' = 'success';

  get pageTypeEnum(): PageTypeEnum {
    return this.route.snapshot.data['pageTypeEnum'];
  }

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private translate: TranslateService,
    private pageService: PageService,
    private articleService: ArticleService,
    private route : ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.loadPage(this.pageTypeEnum);
  }

  get adminIsLogged(){
    return this.authService.adminIsLogged();
  }

  loadPage(pageType: PageTypeEnum): void {
    this.loading = true;
    this.pageService.getPageOfType({type: pageType}).subscribe({
      next: page => {
        this.page = page;
        this.loading = false;
      },
      error: () => {
        this.showMessage('PAGE_NOT_LOADED', 'error');
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
            this.loadPage(this.pageTypeEnum);
            this.showMessage('ARTICLE_CREATED', 'success');
          },
          error: () => {
            this.showMessage('CREATE_ARTICLE_ERROR', 'error');
          }
        });
      }
    });
  }

  editArticle(article: Article): void {

    const dialogRef = this.dialog.open(ArticleDialogComponent, {
      width: '500px',
      maxWidth: '95vw',
      maxHeight: '95vh',
      data: {...article},
      autoFocus: false,
      panelClass: 'article-dialog-panel'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        return;
      }

      this.articleService.updateArticle(article.id!, result).subscribe({
        next: () => {
          this.loadPage(this.pageTypeEnum);
          this.showMessage('ARTICLE_UPDATED', 'success');
        },
        error: () => {
          this.showMessage('UPDATE_ARTICLE_ERROR', 'error');
        }
      });
    });
  }

  deleteArticle(article: Article): void {
    const dialogRefDelete = this.dialog.open(ArticleDialogDeleteComponent, {
      width: '500px',
      maxWidth: '95vw',
      maxHeight: '95vh',
      data: {...article},
      autoFocus: false,
      panelClass: 'article-dialog-panel'
    });

    dialogRefDelete.afterClosed().subscribe(result => {

      if (!result) {
        return;
      }

      this.articleService.deleteArticle(result).subscribe({
        next: () => {
          this.loadPage(this.pageTypeEnum);
          this.showMessage('ARTICLE_DELETED', 'success');
        },
        error: () => {
          this.showMessage('DELETE_ARTICLE_ERROR', 'error');
        }
      });
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

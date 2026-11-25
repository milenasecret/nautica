import {Component, OnInit} from '@angular/core';
import {Article} from '../../../models/article.model';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ArticleService} from '../../../services/article.service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './article-detail.html',
  styleUrl: './article-detail.scss',
})
export class ArticleDetailComponent implements OnInit {
  article?: Article;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.articleService.getArticle(id).subscribe({
      next: (article) => this.article = article,
      error: (error) => console.error(error)
    });
  }
}

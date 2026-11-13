import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CustomPaginatorIntl extends MatPaginatorIntl {

  constructor(private translate: TranslateService) {
    super();

    this.translateLabels();

    this.translate.onLangChange.subscribe(() => {
      this.translateLabels();
    });
  }

  translateLabels() {
    this.itemsPerPageLabel =
      this.translate.instant('PAGINATOR.ITEMS_PER_PAGE');

    this.nextPageLabel =
      this.translate.instant('PAGINATOR.NEXT_PAGE');

    this.previousPageLabel =
      this.translate.instant('PAGINATOR.PREVIOUS_PAGE');

    this.firstPageLabel =
      this.translate.instant('PAGINATOR.FIRST_PAGE');

    this.lastPageLabel =
      this.translate.instant('PAGINATOR.LAST_PAGE');

    this.getRangeLabel = (page, pageSize, length) => {
      if (length === 0 || pageSize === 0) {
        return this.translate.instant('PAGINATOR.RANGE', {
          start: 0,
          end: 0,
          length
        });
      }

      const start = page * pageSize + 1;
      const end = Math.min(start + pageSize - 1, length);

      return this.translate.instant('PAGINATOR.RANGE', {
        start,
        end,
        length
      });
    };

    this.changes.next();
  }
}

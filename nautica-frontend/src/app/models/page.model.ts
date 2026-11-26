import { Article } from './article.model';

export interface Page {
  id?: number;
  title?: string;
  articles: Article[];
}

export interface PageUpdateRequest {
  title: string;
}

export interface PageTypeRequest {
  type: PageTypeEnum;
}

export enum PageTypeEnum {
  NEWS = 'NEWS',
  HOME = 'HOME'
}

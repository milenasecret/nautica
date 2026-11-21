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
  type: string;
}

export enum PageTypeEnum {
  NEWS = 'NEWS'
}

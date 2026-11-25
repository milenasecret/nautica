export interface Document {
  id: number;
  filename: string;
  filesize: number;
  filetype: string;
  uploadedAt: string;
  uploadedBy: string;
}

export enum FilePageEnum {
  DOCUMENTS = 'DOCUMENTS',
  GALLERY = 'GALLERY'
}

/**
 * API response wrapper
 */
export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

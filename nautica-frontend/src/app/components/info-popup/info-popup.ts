import {Component, Inject} from '@angular/core';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {InfoPopup} from '../../models/info-popup.model';

@Component({
  selector: 'app-info-popup',
  imports: [CommonModule,
    TranslatePipe,
    MatDialogModule,
    MatButtonModule,
    MatIconModule],
  standalone: true,
  templateUrl: './info-popup.html',
  styleUrl: './info-popup.scss',
})
export class InfoPopupComponent {
  messageToShow = '';
  popupTitle = '';
  constructor(
    private translate: TranslateService,
    private dialogRef: MatDialogRef<InfoPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InfoPopup | null) {
    if (data) {
      this.messageToShow = data.message;
      this.popupTitle = data.title;
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}

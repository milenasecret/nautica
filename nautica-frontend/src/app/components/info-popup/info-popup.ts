import {Component, Inject} from '@angular/core';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

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
  constructor(
    private translate: TranslateService,
    private dialogRef: MatDialogRef<InfoPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string | null) {
    if (data) {
      console.log(data);
      this.messageToShow = data;
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}

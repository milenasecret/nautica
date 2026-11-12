import { Component } from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class UsersComponent {
  message = '';
  messageType: 'success' | 'error' = 'success';
}

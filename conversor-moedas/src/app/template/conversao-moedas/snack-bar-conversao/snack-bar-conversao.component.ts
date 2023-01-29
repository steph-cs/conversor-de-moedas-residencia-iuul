import { Component, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-conversao',
  templateUrl: './snack-bar-conversao.component.html',
  styleUrls: ['./snack-bar-conversao.component.css']
})
export class SnackBarConversaoComponent {
  snackBarRef = inject(MatSnackBarRef);
}

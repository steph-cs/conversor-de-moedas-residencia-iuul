import { Component, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-exclusao',
  templateUrl: './snack-bar-exclusao.component.html',
  styleUrls: ['./snack-bar-exclusao.component.css']
})
export class SnackBarExclusaoComponent {
  snackBarRef = inject(MatSnackBarRef);
}

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-excluir-conversao',
  templateUrl: './modal-excluir-conversao.component.html',
  styleUrls: ['./modal-excluir-conversao.component.css']
})
export class ModalExcluirConversaoComponent {

  constructor(
    private dialogRef: MatDialogRef<ModalExcluirConversaoComponent>
  ) {}

  close() {
    this.dialogRef.close();
  }

  delete() {
    this.dialogRef.close(true);
  }
}

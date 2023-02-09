import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-excluir-historico',
  templateUrl: './modal-excluir-historico.component.html',
  styleUrls: ['./modal-excluir-historico.component.css']
})
export class ModalExcluirHistoricoComponent {
  constructor(
    private dialogRef: MatDialogRef<ModalExcluirHistoricoComponent>
  ) {}

  close() {
    this.dialogRef.close();
  }

  delete() {
    this.dialogRef.close(true);
  }
}

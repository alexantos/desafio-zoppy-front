import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-modal-confirmacao',
	standalone: true,
	imports: [],
	templateUrl: './modal-confirmacao.component.html',
	styleUrl: './modal-confirmacao.component.css'
})
export class ModalConfirmacaoComponent {

	readonly dialogRef = inject(MatDialogRef<ModalConfirmacaoComponent>);

	data = inject(MAT_DIALOG_DATA);


	fechar(resultado: boolean = false) {
		this.dialogRef.close(resultado);
	}

}
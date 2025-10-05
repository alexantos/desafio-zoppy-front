import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../../models/cliente.interface';


@Component({
	selector: 'app-cliente',
	imports: [
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		ReactiveFormsModule,
		NgxMaskDirective,
	],
	providers: [
		provideNgxMask(),
	],
	templateUrl: './cliente.component.html',
	styleUrl: './cliente.component.css'
})
export class ClienteComponent implements OnInit {

	private readonly clienteService = inject(ClienteService);

	private readonly activatedRoute = inject(ActivatedRoute);

	private readonly router = inject(Router);

	private readonly cliente_id = this.activatedRoute.snapshot.paramMap.get('id');

	private snackBar = inject(MatSnackBar);

	novo: boolean = this.cliente_id == 'novo';


	cliente: FormGroup = new FormGroup({
		id: new FormControl('', []),
		nome: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžæÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/)]),
		telefone: new FormControl('', [Validators.required,]),
		email: new FormControl('', [Validators.required, Validators.email]),
	});

	ngOnInit(): void {
		if (!this.novo) this.recuperaCliente();
	}

	recuperaCliente() {
		this.clienteService.pegarId(this.cliente_id).subscribe({
			next: (resultado: Cliente) => {
				this.cliente.patchValue(resultado);
			}
		})
	}

	adicionarCliente() {
		if (this.novo) {
			delete this.cliente.value['id']
			this.clienteService.salvar(this.cliente.value as any).subscribe({
				next: (resultado: Cliente) => {
					this.abrirSnackBar('Cliente adicionado com sucesso! ', 'Entendi');
					this.navega('clientes');
				}
			});
		} else {
			this.clienteService.editar(this.cliente.value as any).subscribe({
				next: (resultado: Cliente) => {
					this.abrirSnackBar('Cliente atualizado com sucesso! ', 'Entendi');
					this.navega('clientes');
				}
			});
		}
	}

	navega(parametro: string) {
		this.router.navigate([parametro]);
	}

	abrirSnackBar(mensagem: string, acao: string = '') {
		this.snackBar.open(mensagem, acao);
	}

}

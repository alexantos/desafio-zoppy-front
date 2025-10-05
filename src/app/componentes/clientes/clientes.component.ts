import { Component, inject } from '@angular/core';

import { MatIconModule } from '@angular/material/icon'

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Cliente } from '../../models/cliente.interface';
import { ClienteService } from '../../services/cliente.service';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask'; // Import NgxMaskDirective and provideNgxMask



@Component({
    selector: 'app-clientes',
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatIconModule,
        MatDialogModule,
        MatTooltipModule,
        ReactiveFormsModule,

        NgxMaskPipe,
    ],
    providers: [
        provideNgxMask(),
    ],
    templateUrl: './clientes.component.html',
    styleUrl: './clientes.component.css'
})
export class ClientesComponent {

    readonly clienteService = inject(ClienteService);

    clientes: Cliente[] = [];

    pesquisar: FormControl = new FormControl();

    constructor(private router: Router) { }

    ngOnInit(): void {
        this.listarClientes();
        this.pesquisar.valueChanges.pipe(debounceTime(1000), distinctUntilChanged())
            .subscribe((filtro) => {
                this.listarClientes(filtro);
            });
    }

    navega(rota: string, parametro?: string) {
        this.router.navigate([rota, parametro || '']);
    }


    listarClientes(pesquisa: string = '') {
        let params: HttpParams = new HttpParams().set('nome', String(pesquisa))
        this.clienteService.listar(params).subscribe({
            next: (resultado: Cliente[]) => {
                this.clientes = resultado;
            }
        })
    }

    adicionarEditarCliente(id: string) {
       this.router.navigate(['cliente', id])
    }


    deletarCliente(cliente: Cliente) {
        // let dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
        // 	data: {
        // 		mensagem: 'Tem certeza que deseja excluir o produtor ' + produtor.nome + ' e consequentemente todas as suas propriedades e seus plantios?'
        // 	},
        // });
        // dialogRef.afterClosed().subscribe((resultado) => {
        // 	if (resultado) {
        // 		this.produtorService.excluir(produtor.id).subscribe((resultado) => {
        // 			this.listaProdutores();
        // 		})
        // 	}
        // });
    }

    pegaIniciais(nome: any): string {
        let iniciais = '';
        let rgx = RegExp(/(\p{L})\p{L}+/gu);
        let initials = [...nome.matchAll(rgx)];
        iniciais = (
            (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
        ).toUpperCase();
        return iniciais;
    }

}

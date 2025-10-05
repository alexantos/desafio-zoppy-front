import { Routes } from '@angular/router';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { ClienteComponent } from './componentes/clientes/cliente/cliente.component';

export const routes: Routes = [
    { path: '', redirectTo: 'clientes', pathMatch: 'full' },
    { path: 'clientes', component: ClientesComponent },
    { path: 'cliente/:id', component: ClienteComponent },
];

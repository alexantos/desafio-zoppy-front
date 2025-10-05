import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Cliente } from '../models/cliente.interface';
import { BaseService } from './base/base.service';

@Injectable({
    providedIn: 'root'
})
export class ClienteService extends BaseService<Cliente> {

    constructor(private http: HttpClient) {
        super('cliente/', http);
    }

    cardsCliente(id: string): Observable<any> {
        return this.http.get<any>(environment.url_back + '/cards-cliente/', { params: { id: id } })
    }

}
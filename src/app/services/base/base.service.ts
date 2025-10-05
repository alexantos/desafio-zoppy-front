import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable()
export class BaseService<Parametro> { //Parâmetro (por exemplo tipo Cliente da models)

	constructor(@Inject('url') private url: string, private httpClient: HttpClient) { }

	// Listagem com paginação
	// listar(params?: HttpParams | any): Observable<Paginacao<Parametro>> {
	//     return this.httpClient.get<Paginacao<Parametro>>(environment.url_back + '/' + this.url, { params: params });
	// }

	listar(params?: HttpParams | any): Observable<Parametro[]> {
		return this.httpClient.get<Parametro[]>(environment.url_back + '/' + this.url, { params: params });
	}

	pegarId(id: any): Observable<Parametro> {
		return this.httpClient.get<Parametro>(environment.url_back + '/' + this.url + id + '/')
	}

	salvar(parametro: Parametro): Observable<Parametro> {
		return this.httpClient.post<Parametro>(environment.url_back + '/' + this.url, parametro)
	}

	excluir(id?: string): Observable<Parametro> {
		return this.httpClient.delete<Parametro>(environment.url_back + '/' + this.url + id + '/')
	}

	editar(parametro: any): Observable<Parametro> {
		return this.httpClient.patch<Parametro>(environment.url_back + '/' + this.url + parametro.id + '/', parametro)
	}

}
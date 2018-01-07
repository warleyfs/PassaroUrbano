import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Oferta } from './shared/oferta.model';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';

import { URL_API } from './app.api';

@Injectable()
export class OfertasService {

    constructor(private http: Http) {}

    public getOfertasAsync(): Promise<Array<Oferta>> {
        return this.http.get(`${URL_API}/ofertas?destaque=true`)
                        .toPromise()
                        .then((resposta: Response) => resposta.json());
    }

    public getOfertasPorCategoriaAsync(categoria: string): Promise<Array<Oferta>> {
        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
                        .toPromise()
                        .then((resposta: Response) => resposta.json());
    }

    public getOfertaAsync(id: number): Promise<Oferta> {
        return this.http.get(`${URL_API}/ofertas/${id}`)
                        .toPromise()
                        .then((resposta: Response) => resposta.json());
    }

    public getComoUsarOfertaPorIdAsync(id: number): Promise<string> {
        return this.http.get(`${URL_API}/como-usar/${id}`)
                        .toPromise()
                        .then((resposta: Response) => {
                            return resposta.json().descricao;
                        });
    }

    public getOndeFicaOfertaPorIdAsync(id: number): Promise<string> {
        return this.http.get(`${URL_API}/onde-fica/${id}`)
                        .toPromise()
                        .then((resposta: Response) => {
                            return resposta.json().descricao;
                        });
    }

    public pesquisaOfertas(termo: string): Observable<Array<Oferta>> {
        return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
                        .retry(10)
                        .map((resposta: Response) => resposta.json());
    }
}

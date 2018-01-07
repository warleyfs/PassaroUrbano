import { Oferta } from './../shared/oferta.model';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Component, OnInit } from '@angular/core';
import { OfertasService } from './../ofertas.service';

import '../util/rxjs-extensions';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Array<Oferta>>;
  // public ofertas2: Array<Oferta>;
  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa
      .debounceTime(500) // Executa a açãodo switchMap a cada 1 segundo
      .distinctUntilChanged()
      .switchMap((termoDaBusca: string) => {
        // Trata a chamada com termo vazio
        if (termoDaBusca.trim() === '') {
          return Observable.of<Array<Oferta>>();
        }

        return this.ofertasService.pesquisaOfertas(termoDaBusca);
      })
      .catch((erro: any) => {
        console.log(erro);
        return Observable.of<Array<Oferta>>();
      });

    // this.ofertas.subscribe(
    //   (ofertas: Array<Oferta>) => { this.ofertas2 = ofertas; },
    //   (erro: any) => console.log('Erro status: ' + erro.status),
    //   () => { console.log('Finalizado.'); }
    // );
  }

  public pesquisa(value: string): void {
    // Implementação do observable usando Subject
    this.subjectPesquisa.next(value);

    // // Primeira implementação do observable
    // this.ofertas = this.ofertasService.pesquisaOfertas(value);

    // this.ofertas.subscribe(
    //   (ofertas: Array<Oferta>) => console.log(ofertas),
    //   (erro: any) => console.log('Erro status: ' + erro.status),
    //   () => { console.log('Finalizado.'); }
    // );
  }

  public limpaPesquisa(): void {
    this.subjectPesquisa.next('');
  }

  // // Implementação original baseada na passagem do evento
  // public pesquisa(event: Event): void {
  //   console.log((<HTMLInputElement>event.target).value);
  // }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Oferta } from './../shared/oferta.model';
import { ItemCarrinho } from './../shared/item-carrinho.model';
import { OfertasService } from './../ofertas.service';
import { CarrinhoService } from './../carrinho.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs//Subscription';
import 'rxjs/Rx';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit, OnDestroy {
  // private tempoObservableSubscription: Subscription;
  // private meuObservableTesteSubscription: Subscription;

  public ofertaSelecionada: Oferta;

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit() {

    // // Teste com Observables
    // const tempo = Observable.interval(2000);
    // this.tempoObservableSubscription =  tempo.subscribe((intervalo: number) => { console.log(intervalo); });

    // // Teste de criação de um observable com lógica customizada
    // // Observable (observável)
    // const meuObservableTeste = Observable.create((observer: Observer<string>) => {
    //   observer.next('Primeiro evento da stream');
    //   observer.next('Segundo evento da stream');
    //   observer.next('Terceiro evento da stream');
    //   observer.complete(); // Interrompe a execução
    //   observer.error('Um erro foi encontrado na stream de eventos!'); // Interrompe a execução
    // });

    // // Observable (observador)
    // this.meuObservableTesteSubscription = meuObservableTeste.subscribe(
    //   (resultado: string) => console.log(resultado),
    //   (erro: string) => { console.log(erro); },
    //   () => console.log('Finalizado com sucesso!')
    // );

    // Baseado em subscribe
    this.route.params.subscribe(
      (parametro: Params) => {
        this.ofertasService.getOfertaAsync(parametro.id)
                           .then((oferta: Oferta) => { this.ofertaSelecionada = oferta; });
      },
      (erro: any) => { console.log(erro); },
      () => { console.log('Concluído com sucesso!'); }
    );

    // // Baseado em snapshot
    // this.ofertasService.getOfertaAsync(this.route.snapshot.params['id'])
    //   .then((oferta: Oferta) => {
    //     this.ofertaSelecionada = oferta;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  ngOnDestroy() {
    // this.meuObservableTesteSubscription.unsubscribe();
    // this.tempoObservableSubscription.unsubscribe();
  }

  public adicionarItemCarrinho(): void {
    let itemCarrinho: ItemCarrinho = new ItemCarrinho (
      this.ofertaSelecionada.id,
      this.ofertaSelecionada.imagens[0],
      this.ofertaSelecionada.titulo,
      this.ofertaSelecionada.descricao_oferta,
      this.ofertaSelecionada.valor,
      1
    );
    this.carrinhoService.adicionarItem(itemCarrinho);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from './../../ofertas.service';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css']
})
export class OndeFicaComponent implements OnInit {

  public ondeFica: string = '';

  constructor(private route: ActivatedRoute, private ofertasService: OfertasService) { }

  ngOnInit() {
    this.route.parent.params.subscribe(
      (parametro: Params) => {
        this.ofertasService.getOndeFicaOfertaPorIdAsync(parametro.id)
                           .then((descricao: string) => {
                              this.ondeFica = descricao;
                           });
      }
    );

    // // Usando snapshot
    // this.ofertasService.getOndeFicaOfertaPorIdAsync(this.route.parent.snapshot.params['id'])
    // .then((descricao: string) => {
    //   this.ondeFica = descricao;
    // });
  }

}

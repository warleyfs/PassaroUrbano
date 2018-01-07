
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from './../../ofertas.service';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [ OfertasService ]
})
export class ComoUsarComponent implements OnInit {

  public comoUsar: string = '';

  constructor(private route: ActivatedRoute, private ofertasService: OfertasService) { }

  ngOnInit() {

    this.route.parent.params.subscribe(
      (parametro: Params) => {
        this.ofertasService.getComoUsarOfertaPorIdAsync(parametro.id)
                           .then((descricao: string) => {
                              this.comoUsar = descricao;
                           });
      }
    );

    // // Usando snapshpt
    // this.ofertasService.getComoUsarOfertaPorIdAsync(this.route.parent.snapshot.params['id'])
    // .then((descricao: string) => {
    //   this.comoUsar = descricao;
    // });
  }

}

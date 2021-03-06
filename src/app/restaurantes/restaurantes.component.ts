import { Component, OnInit } from '@angular/core';
import { Oferta } from './../shared/oferta.model';
import { OfertasService } from './../ofertas.service';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css'],
  providers: [ OfertasService ]
})
export class RestaurantesComponent implements OnInit {

  public ofertas: Array<Oferta>;

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertasService.getOfertasPorCategoriaAsync('restaurante')
      .then((ofertas: Array<Oferta>) => {
        this.ofertas = ofertas;
      })
      .catch((error) => {
        console.log(error);
      });
  }

}

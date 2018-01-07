
import { Component, OnInit } from '@angular/core';
import { Oferta } from './../shared/oferta.model';
import { OfertasService } from './../ofertas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ OfertasService ]
})
export class HomeComponent implements OnInit {

  public ofertas: Array<Oferta>;

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertasService.getOfertasAsync()
      .then((ofertas: Array<Oferta>) => {
        this.ofertas = ofertas;
      })
      .catch((error) => {
        console.log(error);
      });
  }

}

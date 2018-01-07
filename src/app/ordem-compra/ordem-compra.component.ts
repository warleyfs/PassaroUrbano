import { ItemCarrinho } from './../shared/item-carrinho.model';
import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service';
import { CarrinhoService } from './../carrinho.service';
import { Pedido } from '../shared/pedido.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    'endereco': new FormControl(null, [ Validators.required, Validators.minLength(3), Validators.maxLength(120) ]),
    'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl(null, [Validators.required])
  });

  public idPedidoCompra: number;
  public itensCarrinho: Array<ItemCarrinho>;

  constructor(
    private ordemCompraService: OrdemCompraService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.exibirItens();
  }

  public aumentarQuantidade(item: ItemCarrinho): void {
    this.carrinhoService.adicionarItem(item);
  }

  public diminuirQuantidade(item: ItemCarrinho): void {
    this.carrinhoService.removerItem(item);
  }

  public confirmarCompra(): void {
    if (this.formulario.status === 'INVALID') {
      this.formulario.get('endereco').markAsTouched();
      this.formulario.get('numero').markAsTouched();
      this.formulario.get('complemento').markAsTouched();
      this.formulario.get('formaPagamento').markAsTouched();
    } else {
      if (this.carrinhoService.exibirItens().length === 0) {
        alert('Seu carrinho de compras está vazio!');
      } else {
        let pedido: Pedido = new Pedido(
          this.formulario.value.endereco,
          this.formulario.value.numero,
          this.formulario.value.complemento,
          this.formulario.value.formaPagamento,
          this.carrinhoService.exibirItens()
        );
        this.ordemCompraService.efetivarCompra(pedido)
                               .subscribe(
                                 (idPedido: number) => {
                                   this.idPedidoCompra = idPedido;
                                   this.carrinhoService.limparCarrinho();
                                  },
                                 (erro: Error) => console.log(erro),
                                 () => console.log('Pedido enviado com sucesso!')
                               );
      }
    }
  }
}

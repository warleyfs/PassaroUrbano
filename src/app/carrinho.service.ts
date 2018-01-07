import { ItemCarrinho } from './shared/item-carrinho.model';

export class CarrinhoService {
    public itens: Array<ItemCarrinho> = new Array<ItemCarrinho>();

    public exibirItens(): Array<ItemCarrinho> {
        return this.itens;
    }

    public totalCarrinhoCompras(): number {
        let total: number = 0;

        this.itens.map((item: ItemCarrinho) => {
            total = total + (item.valor * item.quantidade);
        });

        return total;
    }

    public adicionarItem(itemCarrinho: ItemCarrinho): void {

        // Verificar se o item já foi inserido no carrinho
        let itemCarrinhoExistente = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);

        if (itemCarrinhoExistente) {
            itemCarrinhoExistente.quantidade++;
        } else {
            this.itens.push(itemCarrinho);
            console.log(this.itens);
        }
    }

    public removerItem(itemCarrinho: ItemCarrinho): void {

        let itemCarrinhoExistente = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);

        if (itemCarrinhoExistente.quantidade > 1) {
            itemCarrinhoExistente.quantidade--;
        } else {
            let index: number = this.itens.indexOf(itemCarrinhoExistente);

            this.itens.splice(index, 1);
            console.log(this.itens);
        }
    }

    public limparCarrinho(): void {
        this.itens = [];
    }
}

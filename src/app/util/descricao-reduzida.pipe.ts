import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'descricaoReduzida'
})
export class DescricaoReduzida implements PipeTransform {
    transform(texto: string, iniciarEm: number, truncarEm: number): string {
        if (texto.length > truncarEm) {
            return texto.substr(iniciarEm, truncarEm) + '...';
        }

        return texto;
    }
}

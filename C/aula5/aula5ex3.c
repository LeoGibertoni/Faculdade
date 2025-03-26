#include <stdio.h>

int main() {
    int qtd = 0, par = 0, impar = 0;

    printf("Digite um numero limite para saber quantos impares e pares contem: ");
    scanf("%d", &qtd);

    for (int i = 1; i <= qtd; i++) {
        if (i % 2 == 0) {
            par++;
        } else {
            impar++;
        }
    }

    printf("\nQuantidade de PAR: %d", par);
    printf("\nQuantidade de IMPAR: %d", impar);

    return 0;
}

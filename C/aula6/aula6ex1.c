#include <stdio.h>

int main() {
    int a[100], i, n, soma, maior, pares, impares;
    float percPares, percImpares;

    printf("\n Entre com o numero de elementos: ");
    scanf("%d", &n);

    for(i = 0; i < n; i++) {
        printf("\n A(%d)=", i);
        scanf("%d", &a[i]);
    }

    soma = 0;
    maior = a[0];
    pares = 0;
    impares = 0;

    for(i = 0; i < n; i++) {
        soma = soma + a[i];
        if(a[i] > maior) {
            maior = a[i];
        }
        if(a[i] % 2 == 0) {
            pares++;
        } else {
            impares++;
        }
    }

    percPares = ((float)pares / n) * 100;
    percImpares = ((float)impares / n) * 100;

    printf("\n A soma dos elementos e: %d\n", soma);
    printf("\n O maior numero e: %d\n", maior);
    printf("\n Porcentagem de pares: %.2f%%\n", percPares);
    printf("\n Porcentagem de impares: %.2f%%\n", percImpares);

    return 0;
}

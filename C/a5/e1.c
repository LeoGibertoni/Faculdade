#include <stdio.h>
#include <math.h> // Para a função pow()

int main() {
    int a[100], pesos[100], i, n, soma, maior, pares, impares, somaPesos = 0;
    float percPares, percImpares, mediaAritmetica, mediaPonderada, mediaGeometrica;

    printf("\n Entre com o numero de elementos: ");
    scanf("%d", &n);

    for(i = 0; i < n; i++) {
        printf("\n A(%d)=", i);
        scanf("%d", &a[i]);
    }

    for(i = 0; i < n; i++) {
        printf("\n Peso(%d)=", i);
        scanf("%d", &pesos[i]);
        somaPesos += pesos[i];
    }

    soma = 0;
    maior = a[0];
    pares = 0;
    impares = 0;

    float produto = 1; 

    for(i = 0; i < n; i++) {
        soma = soma + a[i];
        produto *= a[i]; 
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
    mediaAritmetica = (float)soma / n;

    int somaPonderada = 0;
    for(i = 0; i < n; i++) {
        somaPonderada += a[i] * pesos[i];
    }
    mediaPonderada = (float)somaPonderada / somaPesos;

    mediaGeometrica = pow(produto, 1.0 / n); // Calcula a média geométrica

    printf("\n A soma dos elementos e: %d\n", soma);
    printf("\n O maior numero e: %d\n", maior);
    printf("\n Porcentagem de pares: %.2f%%\n", percPares);
    printf("\n Porcentagem de impares: %.2f%%\n", percImpares);
    printf("\n A media aritmetica e: %.2f\n", mediaAritmetica);
    printf("\n A media ponderada e: %.2f\n", mediaPonderada);
    printf("\n A media geometrica e: %.2f\n", mediaGeometrica);

    return 0;
}

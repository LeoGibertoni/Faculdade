#include <stdio.h>

int main() {
    int i, n, a, fatorial;
    float s, sinal;

    printf("\nEntre com o numero de termos: ");
    scanf("%d", &n);

    i = 1;
    s = 0;
    sinal = -1;

    while (i <= n) {
        a = i * i; 
        fatorial = 1; 

        int j = 1;
        while (j <= i) {
            fatorial *= j;
            j++;
        }
        s += sinal * ((float)a / fatorial);

        sinal = -sinal;

        i++;
    }

    // Exibe o resultado
    printf("\nA soma dos %d termos = %.2f", n, s);

    return 0;
}

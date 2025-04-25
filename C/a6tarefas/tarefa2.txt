#include <stdio.h>
#include <math.h>
#define MAX 100

int main() {
    int L, C;
    int matriz[MAX][MAX];
    int i, j;

    printf("Digite o número de linhas: ");
    scanf("%d", &L);
    printf("Digite o número de colunas: ");
    scanf("%d", &C);

    printf("Digite os elementos da matriz:\n");
    for(i = 0; i < L; i++) {
        for(j = 0; j < C; j++) {
            scanf("%d", &matriz[i][j]);
        }
    }

    int soma_acima_diag = 0;
    for(i = 0; i < L; i++) {
        for(j = i + 1; j < C; j++) {
            soma_acima_diag += matriz[i][j];
        }
    }

    int maior_mult3 = -1;
    for(i = 0; i < L; i++) {
        for(j = 0; j < C; j++) {
            if(matriz[i][j] % 3 == 0) {
                if(maior_mult3 == -1 || matriz[i][j] > maior_mult3)
                    maior_mult3 = matriz[i][j];
            }
        }
    }

    for(j = 0; j < C; j++) {
        float soma_col = 0;
        for(i = 0; i < L; i++) {
            soma_col += matriz[i][j];
        }
        printf("Média da coluna %d: %.2f\n", j, soma_col / L);
    }

    float soma_ponderada = 0;
    int soma_pesos = 0;
    for(i = 0; i < L && C - 1 - i >= 0; i++) {
        int peso = i + (C - 1 - i);
        soma_ponderada += matriz[i][C - 1 - i] * peso;
        soma_pesos += peso;
    }
    float media_ponderada = (soma_pesos > 0) ? (soma_ponderada / soma_pesos) : 0;

    int menor = matriz[0][0];
    for(i = 0; i < L; i++) {
        for(j = 0; j < C; j++) {
            if(matriz[i][j] < menor)
                menor = matriz[i][j];
        }
    }

    int total = L * C;
    int impares = 0;
    for(i = 0; i < L; i++) {
        for(j = 0; j < C; j++) {
            if(matriz[i][j] % 2 != 0)
                impares++;
        }
    }
    float porcentagem_impares = (float)impares / total * 100;

    int produto_pares = 1;
    for(i = 0; i < L; i++) {
        for(j = 0; j < C; j++) {
            if((i * C + j) % 2 == 0)
                produto_pares *= matriz[i][j];
        }
    }

    double produto_impares = 1;
    int count_impares = 0;
    for(i = 0; i < L; i++) {
        for(j = 0; j < C; j++) {
            if((i * C + j) % 2 != 0) {
                produto_impares *= matriz[i][j];
                count_impares++;
            }
        }
    }
    double media_geom = (count_impares > 0) ? pow(produto_impares, 1.0 / count_impares) : 0;

    for(i = 0; i < L; i++) {
        int produto_linha = 1;
        for(j = 0; j < C; j++) {
            produto_linha *= matriz[i][j];
        }
        printf("Produto da linha %d: %d\n", i, produto_linha);
    }

    printf("\nResultados:\n");
    printf("a) Soma acima da diagonal principal: %d\n", soma_acima_diag);
    printf("b) Maior múltiplo de 3: %d\n", maior_mult3);
    printf("d) Média Ponderada da diagonal secundária: %.2f\n", media_ponderada);
    printf("e) Menor elemento: %d\n", menor);
    printf("f) Porcentagem de ímpares: %.2f%%\n", porcentagem_impares);
    printf("g) Produto das posições pares: %d\n", produto_pares);
    printf("h) Média Geométrica das posições ímpares: %.2f\n", media_geom);

    return 0;
}

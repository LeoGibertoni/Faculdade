//escreva um programa que peça ao usuário 2 números e execute os 5 operadores

#include <stdio.h>

int main(){
    float n1, n2;
    float adicao, subtracao, multiplicacao, divisao;
    int resto;

    printf("\nDigite o primeiro numero: ");
    scanf("%f", &n1);
    printf("Digite o segundo numero: ");
    scanf("%f", &n2);

    adicao = n1 + n2;
    subtracao = n1 - n2;
    multiplicacao = n1 * n2;
    divisao = n1 / n2;
    resto = (int)n1 % (int)n2; //resto tem que ser inteiro

    printf("\nAdicao: %.2f\n", adicao);
    printf("Subtracao: %.2f\n", subtracao);
    printf("Multiplicacao: %.2f\n", multiplicacao);
    printf("Divisao: %.2f\n", divisao);
    printf("Resto: %d\n", resto);

    return 0;
}

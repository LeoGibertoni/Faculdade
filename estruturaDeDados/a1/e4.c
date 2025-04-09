//crie um programa que defida 3 variáveis (int, float e char) e mostre os valores na tela.

#include <stdio.h>

int main(){
    char nome[30];
    int idade;
    float altura;

    printf("Qual seu nome: ");
    scanf("%29s", nome); // Lê uma string (nome) até 49 espaços, o 0 é nulo, por isso 49!
    printf("Quantos anos voce tem: ");
    scanf("%d", &idade); // Lê um inteiro (idade)
    printf("Qual sua altura: ");
    scanf("%f", &altura); // Lê um float (altura)

    printf("Ola %s, voce tem %d anos e %.2f metros de altura.\n", nome, idade, altura);

    return 0;
}

#include <stdio.h>

int main(){
    int escolha, quantidade, hamburguer = 10, xburguer = 15, xsalada = 18, xbacon = 20, xtudo = 25, total;


    printf("Qual a quantidade de lanches que voce ira querer: ");
    scanf("%d", &quantidade);

    printf("Qual lanche voce vai querer:.\n");
    printf("1 - Hamburguer = 10$\n2 - X-Burguer = 15$\n3 - X-Salada = 18$ \n4 - X-Bacon = 20$\n5 - X-Tudo = 25$");
    printf("\nEscolha: ");
    scanf("%d", &escolha);

    switch (escolha)
    {
    case 1:
        printf("Voce escolheu Hamburguer\n");
        total = quantidade * hamburguer;
        break;
    case 2:
        printf("Voce escolheu X-Burguer\n");
        total = quantidade * xburguer;
        break;
    case 3:
        printf("Voce escolheu X-Salada\n");
        total = quantidade * xsalada;
        break;
    case 4:
        printf("Voce escolheu X-Bacon\n");
        total = quantidade * xbacon;
        break;
    case 5:
        printf("Voce escolheu X-Tudo\n");
        total = quantidade * xtudo;
        break;
    default:
        printf("Escolha invalida!\n");
        break;
    }

    printf("Valor total: %d\n", total);

    return 0;
}

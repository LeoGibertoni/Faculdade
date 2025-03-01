#include <stdio.h>

int main(){
    int escolha;
    float salario, total, aumento;


    printf("Qual seu salario: ");
    scanf("%f", &salario);
    printf("1 - Gerente\n2 - Analista\n3 - Programador\n4 - Outro");
    printf("\nQual seu cargo: ");
    scanf("%d", &escolha);

    switch (escolha)
        {
        case 1:
            printf("Voce e Gerente\n");
            aumento = salario * 0.10;
            total = salario + aumento;
            break;
        case 2:
            printf("Voce e Analista\n");
            aumento = salario * 0.13;
            total = salario + aumento;
            break;
        case 3:
            printf("Voce e Programador\n");
            aumento = salario * 0.18;
            total = salario + aumento;
            break;
        case 4:
            printf("Outro\n");
            aumento = salario * 0.22;
            total = salario + aumento;
            break;
        default:
            printf("Escolha invalida!\n");
            break;
        }

    printf("Valor total: %.2f\n", total);

    return 0;
}

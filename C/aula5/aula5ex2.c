#include <stdio.h>

int main() {
    int num = 0, valor = 0, total = 0;

    printf("\nQuantidade de numeros: ");
    scanf("%d", &num);

    for(int i = 0; i <= num; i++){
        printf("\nDigite o valor: ");
        scanf("%d", &valor);
        total += valor;
    }

    printf("Total dos numeros: %d", total);
    
    return 0;
}

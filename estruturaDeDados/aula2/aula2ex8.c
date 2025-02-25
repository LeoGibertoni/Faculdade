#include <stdio.h>

int main(){
    int tempo, preco, desconto, total;
    
    do {
        printf("Quanto tempo seu carro ficara na garagem: ");
        scanf("%d", &tempo);

        if(tempo <= 0){
            printf("Tempo invalido!\n");
            printf("O tempo tem que ser maior que 1\n");
        }
    } while(tempo <= 1);

    if (tempo >= 10) {
        preco = (tempo * 3) + 5;
        desconto = preco * 0.10;
        total = preco - desconto;
        printf("Valor total: %d\n", total);
    } else {
        preco = (tempo * 3) + 5;
        total = preco;
        printf("Valor total: %d\n", total);
    }
    
    return 0;
}
#include <stdio.h>

int main(){
    int idade;

    printf("Qual a sua idade: ");
    scanf("%d", &idade);

    if (idade % 2 == 0)
    {
        printf("O numero e par.\n");
    }else{
        printf("O numero e impar.\n");
    }
    
    return 0;
}
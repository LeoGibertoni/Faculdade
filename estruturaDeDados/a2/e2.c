#include <stdio.h>

int main(){
    int escolha;

    printf("Escolha um elemento.\n");
    printf("1 - Fogo\n2 - Ar\n3 - Terra\n4 - Agua\n");
    printf("Escolha: ");
    scanf("%d", &escolha);

    switch (escolha)
    {
    case 1:
        printf("Voce escolheu Fogo\n");
        break;
    case 2:
        printf("Voce escolheu Ar\n");
        break;
    case 3:
        printf("Voce escolheu Terra\n");
        break;
    case 4:
        printf("Voce escolheu Agua\n");
        break;
    default:
        printf("Escolha invalida!\n");
        break;
    }
    
    return 0;
}

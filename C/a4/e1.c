#include <stdio.h>

int main() {
    int num = 0;

    printf("\nQual tabuada voce deseja: ");
    scanf("%i", &num);

    for (int i = 0; i <= 10; i++) {
        printf("%i x %i = %i\n", num, i, num * i);
    }

    return 0;    
}

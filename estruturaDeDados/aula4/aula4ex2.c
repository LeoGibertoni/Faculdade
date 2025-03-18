#include <stdio.h>

int main() {
    int n1 = 42;
    int *p;

    p = &n1; 

    printf("Endereco de n1: %p \n", &n1);
    printf("Valor de n1 antes: %d \n", n1);

    *p = 99; 

    printf("Valor de n1 depois: %d \n", n1);

    return 0;
}

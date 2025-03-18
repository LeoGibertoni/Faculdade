#include <stdio.h>

int main(){
    int nro = 10;
    int *p;

    p = &nro;

    printf("Valor de uso: %d \n", nro);
    printf("Endereco de NRO: %p \n", &nro);
    printf("Endereco guardado em p: %p \n", p);
    printf("Valor de P aponta: %d \n", *p);
}
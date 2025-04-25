#include <stdio.h>

int main(){
    int i, n, a, b;
    float s, sinal;

    printf("\nEntre com o numero de termos: ");
    scanf("%d", &n);

    i=0;
    a=1;
    b=3;
    s=0;
    sinal=1;

    while(i<n){
        s=s+sinal*a/b;
        a=a+4;
        b=b+4;
        sinal=-sinal;
        i++;
    }
    printf("\nA soma do %d termos = %.2f", n,s);
}
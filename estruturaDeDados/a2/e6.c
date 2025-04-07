#include <stdio.h>

int main(){
    int num;
    int i = 0;

    printf("Informe um numero: ");
    scanf("%d", &num);

    while(i <= num){
        printf("%i\n", i); 
        i++;
    }
    
    return 0;
}

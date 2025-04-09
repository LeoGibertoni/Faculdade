#include <stdio.h>

int main(){
    int num;

    printf("Informe um numero: ");
    scanf("%d", &num);

    for(int i = 1; i <= num; i++){
        printf("%d %c\n", i, i); 
    }
    
    return 0;
}

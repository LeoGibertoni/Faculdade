#include <stdio.h>
int main(){
    int x,y;
    printf("x:");
    scanf("%d",&x);
    printf("y:");
    scanf("%d", &y);
    if(x > y) printf("O maior numero e x=%d\n",x);
    else printf("O maior numero e y=%d\n", y);
}
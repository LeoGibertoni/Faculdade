#include <stdio.h>

int main(){
    int senha, senha1;
    
    printf("Cadastre uma senha: ");
    scanf("%d", &senha);

    do{
        printf("Qual a senha de usuario: ");
        scanf("%d", &senha1);

        if (senha1 != senha)
        {
            printf("Senha incorreta!\n");
        }
    
    }while(senha1 != senha);

    printf("Bem vindo!");
    
    return 0;
}

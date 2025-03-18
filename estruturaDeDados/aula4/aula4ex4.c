#include <stdio.h>
#include <stdlib.h

// Define o Nó
struct No {
    int valor;
    struct No *proximo;
};

// Colocar o No na pilha (push)
void push(struct No **topo, int numero) {
    // Cria um novo Nó
    struct No *novo = (struct No*) malloc(sizeof(struct No));

    if (novo == NULL) {
        printf("Erro de memoria");
        return;
    }

    // Guarda o valor no novo Nó
    novo->valor = numero;

    // O novo Nó aponta para o antigo topo
    novo->proximo = *topo;

    // O novo Nó esta no topo
    *topo = novo;

    printf("Valor %d colocado na pilha.\n", numero);
}

// Retirar Nó da pilha
void pop (struct No **topo) {
    if (*topo == NULL) {
        printf("Pilha vazia!");
        return;
    }

    // Pega o Nó de cima
    struct No *temp = *topo;
    printf("Valor %d retirado da pilha\n", temp->valor);

    // O No de baixo vira o topo
    *topo = temp->proximo;

    // Joga fora o No de cima
    free(temp);
}

// Mostrar todos os Nos da pilha
void mostrarPilha (struct No *topo) {
    if (topo == NULL) {
        printf("Pilha esta vazia!");
        return;
    }

    printf("Valores da pilha: \n");

    // enquanto houver pratos na pilha
    while (topo != NULL) {
        printf("%d \n", topo->valor);

        // Vai para o próximo prato
        topo = topo->proximo;
    }
}

int main () {
    // Pilha comeca vazia
    struct No *topo = NULL;
    int opcao, valor;

    do {
        // Exibir menu
        printf("\n===== MENU =====\n");
        printf("1. Incluir item na pilha\n");
        printf("2. Excluir item da pilha\n");
        printf("3. Exibir pilha\n");
        printf("4. Sair\n");
        printf("Escolha uma opcao: ");
        scanf("%d", &opcao);

        switch (opcao) {
            case 1:
                printf("Digite um numero para adicionar na pilha: ");
                scanf("%d", &valor);
                push(&topo, valor);
                break;
            case 2:
                pop(&topo);
                break;
            case 3:
                mostrarPilha(topo);
                break;
            case 4:
                printf("Saindo do programa...\n");
                break;
            default:
                printf("Opção invalida! Escolha entre 1 e 4.\n");
        }
    } while (opcao != 4);

    return 0;    
}
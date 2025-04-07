#include <stdio.h>
#include <stdlib.h>

// Define o "prato"
struct Prato {
    int valor;
    struct Prato *proximo;
};

// Colocar o prato na pilha (push)
void push(struct Prato **topo, int numero) {
    // Cria um prato novo
    struct Prato *novo = (struct Prato*) malloc(sizeof(struct Prato));

    if (novo == NULL) {
        printf("Erro de memoria");
        return;
    }

    // Guarda o valor no novo prato
    novo->valor = numero;

    // O novo prato aponta para o antigo topo
    novo->proximo = *topo;

    // O novo prato esta no topo
    *topo = novo;

    printf("Valor %d colocado na pilha.\n", numero);
}

// Retirar prato da pilha
void pop (struct Prato **topo) {
    if (*topo == NULL) {
        printf("Pilha vazia!");
        return;
    }

    // Pega o prato de cima
    struct Prato *temp = *topo;
    printf("Valor %d retirado da pilha\n", temp->valor);

    // O prato de baixo vira o topo
    *topo = temp->proximo;

    // Joga fora o prato de cima
    free(temp);
}

// Mostrar todos os pratos da pilha
void mostrarPilha (struct Prato *topo) {
    if (topo == NULL) {
        printf("Pilha esta vazia!");
        return;
    }

    printf("Valores dos pratos da pilha: \n");

    // enquanto houver pratos na pilha
    while (topo != NULL) {
        printf("%d \n", topo->valor);

        // Vai para o próximo prato
        topo = topo->proximo;
    }
}

int main () {
    // Pilha de pratos comeca vazia
    struct Prato *topo = NULL;

    push(&topo, 10);
    push(&topo, 20);
    push(&topo, 30);
    push(&topo, 40);
    push(&topo, 50);

    // Mostra a pilha de pratos
    mostrarPilha(topo);

    // Retira um prato da pilha
    pop(&topo);

    // Mostra a pilha de pratos
    mostrarPilha(topo);

    return 0;    
}
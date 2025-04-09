#include <stdio.h>
#include <stdlib.h>

// Define a estrutura do Nó
struct No {
    int valor;
    struct No *proximo;
};

// Função para inserir no início da lista
void inserirInicio(struct No **inicio, int numero) {
    struct No *novo = (struct No*) malloc(sizeof(struct No));

    novo->valor = numero;
    novo->proximo = *inicio;
    *inicio = novo;

    printf("Elemento %d inserido no inicio da lista. \n", numero);
}

// Função para exibir a lista
void exibirLista(struct No *inicio) {
    if (inicio == NULL) {
        printf("Lista vazia. \n");
    }

    printf("Lista: ");

    while(inicio != NULL) {
        printf("%d - ", inicio->valor);
        inicio = inicio->proximo;
    }

    printf("NULL \n");
}

int main() {
    struct No *lista = NULL;

    inserirInicio(&lista, 30);
    inserirInicio(&lista, 20);
    inserirInicio(&lista, 10);

    exibirLista(lista);

    return 0;   
}
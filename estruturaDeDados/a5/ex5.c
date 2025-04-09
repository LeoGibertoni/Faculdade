#include <stdio.h>
#include <stdlib.h>

struct No {
    int valor;
    struct No *proximo;
};

void inserirFinal (struct No **inicio, int valor) {
    struct No *novoItem = (struct No*) malloc (sizeof(struct No));

    novoItem->valor = valor;
    novoItem->proximo = NULL;

    if (*inicio == NULL) {
        *inicio = novoItem;
    } else {
        struct No* temp = *inicio;

        while (temp->proximo != NULL) {
            temp = temp->proximo;
        }
        temp->proximo = novoItem;
    }
}

void buscarItem (struct No *inicio, int valorBuscado) {
    int pos = 0;

    while (inicio != NULL) {
        if (inicio->valor == valorBuscado) {
            printf("Valor %d encontrado na posicao %d. \n", valorBuscado, pos);
            return;
        }
        inicio = inicio->proximo;
        pos++;
    }

    printf("Valor %d nao encontrado na lista. \n", valorBuscado);
}

void exibirLista (struct No *inicio) {
    printf("\n Lista: ");

    while (inicio != NULL) {
        printf ("%d - ", inicio->valor);
        inicio = inicio->proximo;
    }
    printf("NULL \n");
}

int main() {
    struct No *lista = NULL;

    inserirFinal(&lista, 10);
    inserirFinal(&lista, 20);
    inserirFinal(&lista, 30);
    inserirFinal(&lista, 40);

    exibirLista(lista);

    buscarItem(lista, 20);
    buscarItem(lista, 50);

    return 0;
}
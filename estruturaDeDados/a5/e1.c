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

void inserirDepois (struct No *inicio, int depoisDe, int novoValor) {
    while (inicio != NULL && inicio->valor != depoisDe) {
        inicio = inicio->proximo;
    }

    if (inicio == NULL) {
        printf("Valor %d nao encontrado. \n", depoisDe);
        return;
    }

    struct No *novo = (struct No*) malloc (sizeof(struct No));
    novo->valor = novoValor;
    novo->proximo = inicio->proximo;
    inicio->proximo = novo;

    printf("Valor %d inserido apos %d. \n", novoValor, depoisDe);
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

    inserirDepois(lista, 20, 25);
    exibirLista(lista);

    return 0;
}
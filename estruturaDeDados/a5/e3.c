#include <stdio.h>
#include <stdlib.h>

struct No {
    int valor;
    struct No *prox;
};

void inserirFinal (struct No **inicio, int valor) {
    struct No *novo = (struct No*) malloc (sizeof(struct No));

    novo->valor = valor;
    novo->prox = NULL;

    if (*inicio == NULL) {
        *inicio = novo;
    } else {
        struct No *temp = *inicio;
        while (temp->prox != NULL) {
            temp = temp->prox;
        }
        temp->prox = novo;
    }
}

void removerItem (struct No **inicio, int valorRemover) {
    struct No *atual = *inicio, *anterior = NULL;

    while (atual != NULL && atual->valor != valorRemover) {
        anterior = atual;
        atual = atual->prox;
    }

    if (atual == NULL) {
        printf("Valor %d nao encontrado. \n", valorRemover);
        return;
    }

    if (anterior == NULL) {
        *inicio = atual->prox;
    } else {
        anterior->prox = atual->prox;
    }

    free(atual);
    printf("Valor %d removida da lista. \n", valorRemover);
}

void exibirLista (struct No *inicio) {
    printf("\n Lista: ");

    while (inicio != NULL) {
        printf ("%d - ", inicio->valor);
        inicio = inicio->prox;
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

    removerItem(&lista, 20);
    exibirLista(lista);

    return 0;
}
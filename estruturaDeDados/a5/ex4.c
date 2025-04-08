#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct No {
    char tarefa[100];
    struct No *prox;
};

void inserirFinal (struct No **inicio, char tarefa[]) {
    struct No *novaTarefa = (struct No*) malloc (sizeof(struct No));

    strcpy(novaTarefa->tarefa, tarefa);
    novaTarefa->prox = NULL;
    
    if (*inicio == NULL) {
        *inicio = novaTarefa;
    } else {
        struct No* temp = *inicio;

        while (temp->prox != NULL) {
            temp = temp->prox;
        }
        temp->prox = novaTarefa;
    }
}

void removerItem (struct No **inicio, char tarefaRemover[]) {
    struct No *atual = *inicio, *anterior = NULL;

    while (atual != NULL && strcmp(atual->tarefa, tarefaRemover) != 0) {
        anterior = atual;
        atual = atual->prox;
    }

    if (atual == NULL) {
        printf("Tarefa %s nao encontrado. \n", tarefaRemover);
        return;
    }

    if (anterior == NULL) {
        *inicio = atual->prox;
    } else {
        anterior->prox = atual->prox;
    }

    free(atual);
    printf("Tarefa %s removida da lista. \n", tarefaRemover);
}

void exibirLista (struct No *inicio) {
    printf("\n Lista de Tarefas: \n");

    while (inicio != NULL) {
        printf ("- %s \n", inicio->tarefa);
        inicio = inicio->prox;
    }
}

int main() {
    struct No *lista = NULL;

    inserirFinal(&lista, "Acordar");
    inserirFinal(&lista, "Tomar Banho");
    inserirFinal(&lista, "Tomar Cafe");
    inserirFinal(&lista, "Almocar");

    printf("Lista Original: \n");
    exibirLista(lista);

    removerItem(&lista, "Tomar Banho");

    printf("Lista Atualizada: \n");
    exibirLista(lista);

    return 0;
}
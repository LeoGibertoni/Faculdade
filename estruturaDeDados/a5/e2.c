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

void inserirDepois (struct No *inicio, char depoisDe[], char tarefaNova[]) {
    while (inicio != NULL && strcmp(inicio->tarefa, depoisDe )!= 0) {
        inicio = inicio->prox;
    }

    if (inicio == NULL) {
        printf("Tarefa %s nao encontrada. \n", depoisDe);
        return;
    }

    struct No *novo = (struct No*) malloc (sizeof(struct No));
    strcpy(novo->tarefa, tarefaNova);
    novo->prox = inicio->prox;
    inicio->prox = novo;

    printf("Tarefa %s inserida apos %s. \n", tarefaNova, depoisDe);
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

    inserirDepois(lista, "Tomar Cafe", "Estudar C");

    printf("Lista Atualizada: \n");
    exibirLista(lista);

    return 0;
}
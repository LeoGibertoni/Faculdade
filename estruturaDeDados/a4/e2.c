#include <stdio.h>
#include <stdlib.h>

// Define a estrutura do Nó
struct No {
    int valor;
    struct No *proximo;
};

// Função para inserir no início da lista
void inserirInicio(struct No **inicio) {
    int qntd, numero;
    
    printf("Quantas tarefas quer inserir na lista: ");
    scanf("%d", &qntd);

    for(int i = 0; i < qntd; i++){
        struct No *novo = (struct No*) malloc(sizeof(struct No));
        
        if (novo == NULL) {
            printf("Erro ao alocar memória.\n");
            return;
        }
        
        printf("Informe o %dº item: ", i + 1);
        scanf("%d", &numero);

        novo->valor = numero;
        novo->proximo = *inicio;
        *inicio = novo;
    }
}

// Função para exibir a lista
void exibirLista(struct No *inicio) {
    if (inicio == NULL) {
        printf("Lista vazia.\n");
        return;
    }

    printf("Lista: ");
    while(inicio != NULL) {
        printf("%d -> ", inicio->valor);
        inicio = inicio->proximo;
    }
    printf("NULL\n");
}

int main() {
    struct No *lista = NULL;

    inserirInicio(&lista);
    exibirLista(lista);

    return 0;
}

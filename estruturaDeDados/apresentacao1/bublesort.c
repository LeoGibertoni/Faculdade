#include <iostream>
#include <stdio.h>

void bubble_sort(int vet[], int tamanho) {
    for (int i = 0; i < tamanho - 1; i++) {
        for (int j = 0; j < tamanho - 1 - i; j++) {
            if (vet[j] > vet[j + 1]) {
                swap(vet[j], vet[j + 1]); 
            }
        }
    }
}

void imprimir_ordenacao(int vet[], int tamanho) {
    std::cout << "Vetor ordenado: ";
    for (int i = 0; i < tamanho; i++) {
        std::cout << vet[i] << " ";
    }
    std::cout << std::endl;
}

int main() {
    int vet[] = {4, 5, 3, 1, 2};
    int tamanho = sizeof(vet) / sizeof(vet[0]);

    std::cout << "Vetor original: ";
    for (int i = 0; i < tamanho; i++) {
        std::cout << vet[i] << " ";
    }
    std::cout << std::endl;

    bubble_sort(vet, tamanho);
    imprimir_ordenacao(vet, tamanho);

    return 0;
}

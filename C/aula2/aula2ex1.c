#include <stdio.h>

int main() {
    float salarioBruto, salariofinal, inss, sr, ir, sl;
    int ndep;

    printf("Qual a sua renda: ");
    scanf("%f", &salarioBruto);
    printf("\nEntre com o numero de dependentes: ");
    scanf("%d", &ndep);

    if (salarioBruto <= 1518.01) {
        inss = salarioBruto * 0.075;
    } else if (salarioBruto <= 2793.89) {
        inss = (salarioBruto * 0.09) - 22.77;
    } else if (salarioBruto <= 4190.84) {
        inss = (salarioBruto * 0.12) - 106.59;
    } else {
        inss = (4190.84 * 0.14) - 190.00;
    }

    sr = salarioBruto - inss - ndep * 189.59;

    if (sr < 2259.20) {
        ir = 0;
    } else if (sr < 2826.65) {
        ir = sr * 0.075 - 169.44;
    } else if (sr < 3751.05) {
        ir = sr * 0.15 - 381.44;
    } else if (sr < 4664.68) {
        ir = sr * 0.225 - 667.99;
    } else {
        ir = sr * 0.275 - 896.00;
    }

    salariofinal = salarioBruto - inss;
    sl = salariofinal - ir;

    printf("\n--- Resultado ---\n");
    printf("Salario Bruto: R$ %.2f\n", salarioBruto);
    printf("INSS Deduzido: R$ %.2f\n", inss);
    printf("Salario Final (apos INSS): R$ %.2f\n", salariofinal);
    printf("IR Deduzido: R$ %.2f\n", ir);
    printf("Salario Liquido (apos todos os descontos): R$ %.2f\n", sl);

    return 0;
}

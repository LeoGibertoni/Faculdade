import math

def calcular_exponencial():
    try:
        print("Calculando exponencial de um número muito grande...")
        numero = 1000

        resultado = math.exp(numero)

        print(f"Resultado: {resultado}")

    except OverflowError:
        print("Erro: O cálculo gerou um número muito grande para ser representado!")

    finally:
        print("Programa finalizado.")

calcular_exponencial()

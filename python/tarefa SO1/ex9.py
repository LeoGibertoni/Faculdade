import math

def calcular_exponencial():
    while True:
        try:
            numero = float(input("Digite um número para calcular e^x: "))

            resultado = math.exp(numero)
            print(f"Resultado: e^{numero} = {resultado}")
            break

        except OverflowError:
            print("Erro: O número é muito grande e gerou um Overflow!")
            print("Tente novamente com um valor menor.")

        except ValueError:
            print("Erro: Digite apenas números válidos.")

        finally:
            print("Tentativa concluída.\n")

    print("Programa finalizado com sucesso!")

calcular_exponencial()

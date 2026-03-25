using exercicio1;
Console.WriteLine("Abstract");
Console.WriteLine();

Veiculo veiculo1 = new Carro();
Barco barco1 = new Barco();

Console.WriteLine("Carro");
veiculo1.mover();
veiculo1.parar();

Console.WriteLine();

Console.WriteLine("Barco");
barco1.mover();
barco1.parar();

Console.WriteLine();
Console.WriteLine("Static");
Console.WriteLine();

Console.WriteLine("Calculadora");
double Resultado = Calculadora.soma(10, 20);
Console.WriteLine($"Soma: {Resultado}");
double Resultado1 = Calculadora.Subtracao(10, 20);
Console.WriteLine($"Subtracao: {Resultado1}");
double Resultado2 = Calculadora.Divisao(10, 20);
Console.WriteLine($"Divisao: {Resultado2}");
double Resultado3 = Calculadora.RestoDivisao(10, 20);
Console.WriteLine($"RestoDivisao: {Resultado3}");
double Resultado4 = Calculadora.Multiplicacao(10, 20);
Console.WriteLine($"Multiplicacao: {Resultado4}");

Console.ReadLine();
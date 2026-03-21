using exercicio3;

double f = ConversorTemperatura.CelsiusParaFahrenheit(25);
Console.WriteLine($"Resultado de Celsius para Fahrenheit: {f}");

Console.WriteLine();

double c = ConversorTemperatura.FahrenheitParaCelsius(77);
Console.WriteLine($"Resultado de Fahrenheit para Celsius: {c}");

Console.ReadLine();

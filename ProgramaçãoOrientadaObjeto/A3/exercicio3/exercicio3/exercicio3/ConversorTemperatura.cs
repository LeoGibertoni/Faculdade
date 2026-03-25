using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace exercicio3
{
    public static class ConversorTemperatura
    {
        public static double CelsiusParaFahrenheit(double celsius)
        {
            return (celsius * 9.0 / 5.0) + 32;
        }

        public static double FahrenheitParaCelsius(double fahrenheit)
        {
            return (fahrenheit - 32) * 5.0 / 9.0;
        }
    }
}
 
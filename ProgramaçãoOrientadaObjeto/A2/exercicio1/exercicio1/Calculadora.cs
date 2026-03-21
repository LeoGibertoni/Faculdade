using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace exercicio1
{
    public static class Calculadora
    {
        static double n1;
        static double n2;

        public static double soma(double n1, double n2)
        {
            return n1 + n2;
        }
        public static double Subtracao(double n1, double n2)
        {
            return n1 - n2;
        }
        public static double Divisao(double n1, double n2)
        {
            return n1 / n2;
        }
        public static double RestoDivisao(double n1, double n2)
        {
            return n1 % n2;
        }
        public static double Multiplicacao(double n1, double n2)
        {
            return n1 * n2;
        }
    }
}

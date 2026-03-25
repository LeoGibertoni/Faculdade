using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace exercicio1
{
    public abstract class Veiculo
    {
        //Método abstrato
        public abstract void mover();

        //Método concreto
        public void parar()
        {
            Console.WriteLine("O veículo parou...");
        }
    }
}

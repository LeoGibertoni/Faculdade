using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace exercicio1
{
    public class Barco : Veiculo
    {
        public override void mover()
        {
            Console.WriteLine("O barco está navegando pela água");
        }
    }
}

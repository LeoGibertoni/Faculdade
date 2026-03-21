using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Exercicio2
{
    public abstract class Pagamento
{
        //Método abstrato
        public abstract void EstornarPagamento();

        //Atributo Valor
        public decimal valor;
    }
}

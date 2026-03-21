using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Exercicio2
{
    public class PagamentoCash : Pagamento
    {
        public override void EstornarPagamento()
        {
            Console.WriteLine("O pagamento por dinheiro foi rembolsado com sucesso!");
        }
    }
}

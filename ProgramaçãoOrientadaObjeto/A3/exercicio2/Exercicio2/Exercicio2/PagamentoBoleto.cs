using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Exercicio2
{
    public class PagamentoBoleto : Pagamento
    {
        public override void EstornarPagamento()
        {
            Console.WriteLine("O pagamento de boleto foi rembolsado com sucesso!");
        }
    }
}

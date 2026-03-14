using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace exercicio
{
    //IPagamento vai dar erro até implementar todos os metodos
    public class PagamentoCartaoCredito : Pagamento, IPagamento
    {
        public void processarPagamento(decimal _ValorPagamento)
        {
            ValorPagamento = _ValorPagamento;
            Console.WriteLine($"Pagamento {ValorPagamento} efetuado com cartão de crédito!");
        }

        public void estornarPagamento(decimal _ValorPagamento)
        {
            ValorPagamento = _ValorPagamento;
            Console.WriteLine($"Pagamento {ValorPagamento} estornado com sucesso!");
        }
    }
}

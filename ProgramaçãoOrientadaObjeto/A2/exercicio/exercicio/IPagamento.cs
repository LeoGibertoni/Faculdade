using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace exercicio
{
    public interface IPagamento
    {
        void processarPagamento(decimal _ValorPagamento);

        void estornarPagamento(decimal _ValorPagamento);
    }
}

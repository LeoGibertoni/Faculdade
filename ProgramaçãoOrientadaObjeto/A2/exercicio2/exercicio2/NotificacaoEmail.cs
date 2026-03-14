using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace exercicio2
{
    internal class NotificacaoEmail : Enviar, INotificacao
    {
        public void EnviarMensagem(string _mensagem)
        {
            mensagem = _mensagem;
            Console.WriteLine($"Email enviado: {mensagem}");
        }
    }
}

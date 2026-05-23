using System;
using System.Collections.Generic;

namespace Supermercado.Models;

public partial class Produto
{
    public int Id { get; set; }

    public string Nome { get; set; } = null!;

    public decimal Preco { get; set; }

    public string Categoria { get; set; } = null!;

    public int Quantidade { get; set; }
}

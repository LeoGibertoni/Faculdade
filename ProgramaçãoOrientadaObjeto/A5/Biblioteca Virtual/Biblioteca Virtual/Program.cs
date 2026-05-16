using BibliotecaVirtual.Models;
using BibliotecaVirtual.Repository;

LivroRepository repository = new LivroRepository();

int opcao = 0;

while (opcao != 6)
{
    Console.WriteLine("\n===== BIBLIOTECA VIRTUAL =====");

    Console.WriteLine("1 - Cadastrar Livro");
    Console.WriteLine("2 - Listar Livros");
    Console.WriteLine("3 - Emprestar Livro");
    Console.WriteLine("4 - Devolver Livro");
    Console.WriteLine("5 - Remover Livro");
    Console.WriteLine("6 - Sair");

    Console.Write("\nEscolha uma opção: ");

    int.TryParse(Console.ReadLine(), out opcao);

    switch (opcao)
    {
        case 1:

            Livro livro = new Livro();

            Console.Write("Título: ");
            livro.Titulo = Console.ReadLine();

            Console.Write("Autor: ");
            livro.Autor = Console.ReadLine();

            Console.Write("Editora: ");
            livro.Editora = Console.ReadLine();

            Console.Write("Ano: ");
            livro.Ano = int.Parse(Console.ReadLine());

            livro.Disponivel = true;

            repository.AdicionarLivro(livro);

            Console.WriteLine("\nLivro cadastrado com sucesso!");

            break;

        case 2:

            List<Livro> livros = repository.ListarLivros();

            foreach (var l in livros)
            {
                Console.WriteLine("\n---------------------");
                Console.WriteLine($"ID: {l.Id}");
                Console.WriteLine($"Título: {l.Titulo}");
                Console.WriteLine($"Autor: {l.Autor}");
                Console.WriteLine($"Editora: {l.Editora}");
                Console.WriteLine($"Ano: {l.Ano}");
                Console.WriteLine($"Disponível: {(l.Disponivel ? "Sim" : "Não")}");
            }

            break;

        case 3:

            Console.Write("Digite o ID do livro: ");

            int idEmprestar =
                int.Parse(Console.ReadLine());

            repository.EmprestarLivro(idEmprestar);

            Console.WriteLine("Livro emprestado!");

            break;

        case 4:

            Console.Write("Digite o ID do livro: ");

            int idDevolver =
                int.Parse(Console.ReadLine());

            repository.DevolverLivro(idDevolver);

            Console.WriteLine("Livro devolvido!");

            break;

        case 5:

            Console.Write("Digite o ID do livro: ");

            int idRemover =
                int.Parse(Console.ReadLine());

            repository.RemoverLivro(idRemover);

            Console.WriteLine("Livro removido!");

            break;

        case 6:

            Console.WriteLine("Sistema encerrado.");

            break;

        default:

            Console.WriteLine("Opção inválida.");

            break;
    }
}
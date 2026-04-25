using PROJETO_POO_CRUD.Repository;
using PROJETO_POO_CRUD.Models;
using System.Threading.Channels;

AlunoRepository repo = new AlunoRepository();

Console.WriteLine("Digite o seu nome: ");
string ALUNO_NOME = Console.ReadLine();

Console.WriteLine("Digite a sua idade: ");
int ALUNO_IDADE = int.Parse(Console.ReadLine());

Console.WriteLine("Digite seu email: ");
string ALUNO_EMAIL = Console.ReadLine();

Aluno novoAluno = new Aluno();
novoAluno.ALUNO_NOME = ALUNO_NOME;
novoAluno.ALUNO_IDADE = ALUNO_IDADE;
novoAluno.ALUNO_EMAIL=ALUNO_EMAIL;

repo.Inserir(novoAluno);
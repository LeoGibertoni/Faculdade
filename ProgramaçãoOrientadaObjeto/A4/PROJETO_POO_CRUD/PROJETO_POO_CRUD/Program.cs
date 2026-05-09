using PROJETO_POO_CRUD.Repository;
using PROJETO_POO_CRUD.Models;
using System.Threading.Channels;

AlunoRepository repo = new AlunoRepository();

Console.Write("Digite o seu nome: ");
string ALUNO_NOME = Console.ReadLine();

Console.Write("Digite a sua idade: ");
int ALUNO_IDADE = int.Parse(Console.ReadLine());

Console.Write("Digite seu email: ");
string ALUNO_EMAIL = Console.ReadLine();

Aluno novoAluno = new Aluno();
novoAluno.ALUNO_NOME = ALUNO_NOME;
novoAluno.ALUNO_IDADE = ALUNO_IDADE;
novoAluno.ALUNO_EMAIL=ALUNO_EMAIL;

repo.Inserir(novoAluno);

Console.WriteLine("\n-----LISTAR ALUNOS-----");
var alunos = repo.Listar();

foreach(var aluno in alunos)
{
    Console.WriteLine($"ID: {aluno.ALUNO_ID}, Nome: {aluno.ALUNO_NOME}, Idade: {aluno.ALUNO_IDADE}, Email: {aluno.ALUNO_EMAIL}");
}

Console.WriteLine("");
Console.Write("Digite o ID do aluno a ser removido: ");
int idRemovido = int.Parse(Console.ReadLine());

repo.Excluir(idRemovido);

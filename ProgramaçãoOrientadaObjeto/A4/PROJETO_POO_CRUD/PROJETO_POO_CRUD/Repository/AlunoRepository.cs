using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PROJETO_POO_CRUD.Models;
using Microsoft.Data.SqlClient;
using System.Runtime.CompilerServices; //Instalar nugets (System.Data.SqlClient) os 2 primeiros

namespace PROJETO_POO_CRUD.Repository
{
    public class AlunoRepository
    {
        string conexao = "Server=192.168.0.39;Database=FATECTQ_LEOG;User Id=aluno;Password=Aluno@123;Encrypt=False;TrustServerCertificate=True"; //CONEXAO BD

        public void Inserir(Aluno aluno)
        {
            using (SqlConnection con = new SqlConnection(conexao))
            {
                string query = "INSERT INTO ALUNO (ALUNO_NOME, ALUNO_IDADE, ALUNO_EMAIL) VALUES (@ALUNO_NOME, @ALUNO_IDADE, @ALUNO_EMAIL)";
                SqlCommand cmd = new SqlCommand(query, con);

                //Esses parametros ajuda a evitar o SQL Inject
                cmd.Parameters.AddWithValue("@ALUNO_NOME", aluno.ALUNO_NOME);
                cmd.Parameters.AddWithValue("@ALUNO_IDADE", aluno.ALUNO_IDADE);
                cmd.Parameters.AddWithValue("@ALUNO_email", aluno.ALUNO_EMAIL);

                con.Open();
                cmd.ExecuteNonQuery();

                Console.WriteLine("");
                Console.WriteLine("Novo aluno cadastrado com sucesso!");
            }
        }

        public void Excluir(int ALUNO_ID)
        {
            using(SqlConnection con = new SqlConnection(conexao))
            {
                string query = "DELETE FROM ALUNO WHERE ALUNO_ID = @ALUNO_ID";
                SqlCommand command = new SqlCommand(query, con);

                command.Parameters.AddWithValue("@ALUNO_ID", ALUNO_ID);

                con.Open();

                int LinhasAfetadas = command.ExecuteNonQuery();

                if(LinhasAfetadas == 0)
                {
                    Console.WriteLine("Aluno não encontrado!");
                }
                else
                {
                    Console.WriteLine("Aluno excluído com sucesso");
                }
            }
        }

        public List<Aluno> Listar()
        {
            List<Aluno> alunos = new List<Aluno>();

            using (SqlConnection con = new SqlConnection(conexao))
            {
                string query = "SELECT * FROM ALUNO";
                SqlCommand command = new SqlCommand(query, con);

                con.Open();
                SqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    alunos.Add(new Aluno
                    {
                        ALUNO_ID = (int)reader["ALUNO_ID"],
                        ALUNO_NOME = reader["ALUNO_NOME"].ToString(),
                        ALUNO_IDADE = (int)reader["ALUNO_IDADE"],
                        ALUNO_EMAIL = reader["ALUNO_EMAIL"].ToString(),
                    });
                }

                return alunos;
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PROJETO_POO_CRUD.Models;
using Microsoft.Data.SqlClient; //Instalar nugets (System.Data.SqlClient) os 2 primeiros

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
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using BibliotecaVirtual.Models;
using Microsoft.Data.SqlClient;

namespace BibliotecaVirtual.Repository
{
    public class LivroRepository
    {
        // SUA CONNECTION STRING
        string conexao =
            "Server=192.168.0.39;Database=BibliotecaVirtual;User Id=aluno;Password=Aluno@123;Encrypt=False;TrustServerCertificate=True";

        // CADASTRAR LIVRO
        public void AdicionarLivro(Livro livro)
        {
            using (SqlConnection conn = new SqlConnection(conexao))
            {
                string sql = @"
                    INSERT INTO Livros
                    (Titulo, Autor, Editora, Ano, Disponivel)
                    VALUES
                    (@Titulo, @Autor, @Editora, @Ano, @Disponivel)
                ";

                SqlCommand cmd = new SqlCommand(sql, conn);

                cmd.Parameters.AddWithValue("@Titulo", livro.Titulo);
                cmd.Parameters.AddWithValue("@Autor", livro.Autor);
                cmd.Parameters.AddWithValue("@Editora", livro.Editora);
                cmd.Parameters.AddWithValue("@Ano", livro.Ano);
                cmd.Parameters.AddWithValue("@Disponivel", livro.Disponivel);

                conn.Open();

                cmd.ExecuteNonQuery();
            }
        }

        // LISTAR LIVROS
        public List<Livro> ListarLivros()
        {
            List<Livro> lista = new List<Livro>();

            using (SqlConnection conn = new SqlConnection(conexao))
            {
                string sql = "SELECT * FROM Livros";

                SqlCommand cmd = new SqlCommand(sql, conn);

                conn.Open();

                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    Livro livro = new Livro();

                    livro.Id = Convert.ToInt32(reader["Id"]);
                    livro.Titulo = reader["Titulo"].ToString();
                    livro.Autor = reader["Autor"].ToString();
                    livro.Editora = reader["Editora"].ToString();
                    livro.Ano = Convert.ToInt32(reader["Ano"]);
                    livro.Disponivel = Convert.ToBoolean(reader["Disponivel"]);

                    lista.Add(livro);
                }
            }

            return lista;
        }

        // EMPRESTAR LIVRO
        public void EmprestarLivro(int id)
        {
            using (SqlConnection conn = new SqlConnection(conexao))
            {
                string sql =
                    "UPDATE Livros SET Disponivel = 0 WHERE Id = @Id";

                SqlCommand cmd = new SqlCommand(sql, conn);

                cmd.Parameters.AddWithValue("@Id", id);

                conn.Open();

                cmd.ExecuteNonQuery();
            }
        }

        // DEVOLVER LIVRO
        public void DevolverLivro(int id)
        {
            using (SqlConnection conn = new SqlConnection(conexao))
            {
                string sql =
                    "UPDATE Livros SET Disponivel = 1 WHERE Id = @Id";

                SqlCommand cmd = new SqlCommand(sql, conn);

                cmd.Parameters.AddWithValue("@Id", id);

                conn.Open();

                cmd.ExecuteNonQuery();
            }
        }

        public void RemoverLivro(int id)
        {
            using (SqlConnection conn = new SqlConnection(conexao))
            {
                string sql =
                    "DELETE FROM Livros WHERE Id = @Id";

                SqlCommand cmd = new SqlCommand(sql, conn);

                cmd.Parameters.AddWithValue("@Id", id);

                conn.Open();

                cmd.ExecuteNonQuery();
            }
        }
    }
}
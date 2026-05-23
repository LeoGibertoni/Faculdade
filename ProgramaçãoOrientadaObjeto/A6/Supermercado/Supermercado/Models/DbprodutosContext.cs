using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Supermercado.Models;

public partial class DbprodutosContext : DbContext
{
    public DbprodutosContext()
    {
    }

    public DbprodutosContext(DbContextOptions<DbprodutosContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Produto> Produtos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=192.168.0.39;Database=BD_PRODUTO_LEOG;User Id=aluno;Password=Aluno@123;Encrypt=False;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Produto>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__PRODUTO__3214EC27E9358E14");

            entity.ToTable("PRODUTO");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Categoria)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("CATEGORIA");
            entity.Property(e => e.Nome)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("NOME");
            entity.Property(e => e.Preco)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("PRECO");
            entity.Property(e => e.Quantidade).HasColumnName("QUANTIDADE");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

--Leonardo Gibertoni, Stefani Straccini
CREATE PROCEDURE PR_REALIZAR_EMPRESTIMO
	@AlunoID INT,	@LivroID INT,
	@DataEmprestimo DATE,
	@EmprestimoID INT,
	@NotaDevolucao DECIMAL(4,2)
AS
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM LivroId 
        WHERE LivroId = @LivroId
    )
    BEGIN
        RAISERROR('Erro: Livro informado não existe.', 16, 1)
    END

    IF NOT EXISTS(select * from livro where LivroId = @LivroId And Estoque > 1)
    BEGIN
        RAISERROR('Erro: Livro sem estoque disponível.', 16, 1)
    END

    INSERT INTO Emprestimo (EmprestimoID, AlunoID, LivroId, DataEmprestimo, NotaDevolucao)
    VALUES (@EmprestimoID, @AlunoID, @LivroId, @DataEmprestimo, @NotaDevolucao);

	 UPDATE Livro
        SET 
            Estoque = Estoque - 1
        WHERE LivroId = @LivroID;

		select * from Livro
        COMMIT TRANSACTION; 
	END
    BEGIN 
        ROLLBACK TRANSACTION;  
    END 

exec PR_REALIZAR_EMPRESTIMO @EmprestimoID = 4, @AlunoID = 1,@LivroID = 2 , @DataEmprestimo = '2025-05-01T19:00:00', @NotaDevolucao = 9.5;
select * from emprestimo;
select * from livro;
select * from Aluno

CREATE OR ALTER VIEW vw_ResumoLivros AS
	SELECT Titulo from livro
	SELECT 
		AVG(Emprestimo.NotaDevolucao) AS Emprestimo
	FROM Emprestimo
	SELECT 
		SUM(Emprestimo.NotaDevolucao) AS Emprestimo
	FROM Emprestimo
GROUP BY Emprestimo;

SELECT Titulo
FROM livro
WHERE LivroId NOT IN (
    SELECT LivroId FROM emprestimo 
);

SELECT Nome, CPF, DataNascimento
FROM Aluno 
GROUP BY Nome
HAVINGAVG(NotaDevolucao) > 7.5;	select * from emprestimo
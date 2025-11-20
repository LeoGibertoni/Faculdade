CREATE PROCEDURE PR_INSERIR_USUARIO
    @NOME VARCHAR(100),
    @EMAIL VARCHAR(100),
    @SENHA VARCHAR(50),
    @DATA_CADASTRO DATETIME = NULL,
    @PLANO_ASSINATURA_ID INT
AS
BEGIN
    -- Valida se o plano existe
    IF NOT EXISTS (
        SELECT 1 
        FROM PLANO_ASSINATURA 
        WHERE PLANO_ASSINATURA_ID = @PLANO_ASSINATURA_ID
    )
    BEGIN
        RAISERROR('Erro: Plano de assinatura informado não existe.', 16, 1);
    END

    -- Valida o tamanho mínimo da senha
    IF LEN(@SENHA) < 8
    BEGIN
        RAISERROR('Erro: A senha deve conter no mínimo 8 caracteres.', 16, 1);
    END

    -- Preenche a data automaticamente, caso não seja enviada
    IF @DATA_CADASTRO IS NULL
        SET @DATA_CADASTRO = GETDATE();

    BEGIN TRY
        BEGIN TRANSACTION;  -- INÍCIO DA TRANSAÇÃO

        -- Inserção do novo usuário
        INSERT INTO Usuario (Nome, Email, Senha, Data_Cadastro, Plano_Assinatura_ID)
        VALUES (@NOME, @EMAIL, @SENHA, @DATA_CADASTRO, @PLANO_ASSINATURA_ID);

        COMMIT TRANSACTION;  -- FINALIZA A TRANSAÇÃO COM SUCESSO
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;  -- DESFAZ ALTERAÇÕES EM CASO DE ERRO
        THROW;                 -- RELANÇA O ERRO PARA O CHAMADOR
    END CATCH
END

CREATE PROCEDURE PR_LISTAR_FILMES_PLANO
    @PLANO_ID INT
AS
BEGIN
    -- Verifica se o plano existe
    IF NOT EXISTS (
        SELECT 1 
        FROM PLANO_ASSINATURA 
        WHERE PLANO_ASSINATURA_ID = @PLANO_ID
    )
    BEGIN
        RAISERROR('Erro: Plano de assinatura não encontrado.', 16, 1);
    END;

    -- Lista os filmes do plano fazendo join da tabela de relação
    SELECT 
        F.TITULO,
        F.DURACAO
    FROM FILME F
    INNER JOIN FILME_PLANO_ASSINATURA FPA
        ON F.FILME_ID = FPA.FILME_ID
    WHERE FPA.PLANO_ASSINATURA_ID = @PLANO_ID;
END;

CREATE PROCEDURE PR_ATUALIZAR_PLANO
    @PLANO_ID INT,
    @PRECO DECIMAL(10,2),
    @QTD_DISPOSITIVOS INT
AS
BEGIN
    -- Verifica se o plano existe
    IF NOT EXISTS (SELECT 1 FROM PLANO_ASSINATURA WHERE PLANO_ASSINATURA_ID = @PLANO_ID)
    BEGIN
        RAISERROR('Erro: Plano informado não existe.', 16, 1);
        RETURN;
    END;

    -- Valida preço maior que zero
    IF @PRECO <= 0
    BEGIN
        RAISERROR('Erro: O preço deve ser maior que zero.', 16, 1);
        RETURN;
    END;

    -- Valida quantidade maior que zero
    IF @QTD_DISPOSITIVOS <= 0
    BEGIN
        RAISERROR('Erro: A quantidade de dispositivos deve ser maior que zero.', 16, 1);
        RETURN;
    END;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Atualização do plano
        UPDATE PLANO_ASSINATURA
        SET 
            PRECO = @PRECO,
            QTD_DISPOSITIVOS = @QTD_DISPOSITIVOS
        WHERE PLANO_ASSINATURA_ID = @PLANO_ID;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;

CREATE OR ALTER PROCEDURE PR_REMOVER_USUARIO
    @USUARIO_ID INT
AS
BEGIN
    -- Verifica se o usuário existe
    IF NOT EXISTS (SELECT 1 FROM USUARIO WHERE USUARIO_ID = @USUARIO_ID)
    BEGIN
        RAISERROR('Erro: Usuário informado não existe.', 16, 1);
        RETURN;
    END;

    -- Bloqueia exclusão caso existam visualizações
    IF EXISTS (SELECT 1 FROM VISUALIZACAO WHERE USUARIO_ID = @USUARIO_ID)
    BEGIN
        RAISERROR('Erro: Não é possível excluir. O usuário possui visualizações.', 16, 1);
    END;

    -- Bloqueia exclusão caso existam avaliações
    IF EXISTS (SELECT 1 FROM AVALIACAO WHERE USUARIO_ID = @USUARIO_ID)
    BEGIN
        RAISERROR('Erro: Não é possível excluir. O usuário possui avaliações.', 16, 1);
    END;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Deleção do usuário
        DELETE FROM USUARIO
        WHERE USUARIO_ID = @USUARIO_ID;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;

CREATE OR ALTER PROCEDURE PR_INSERIR_FILME
    @TITULO VARCHAR(50),
    @DURACAO INT,
    @ANO_LANCAMENTO INT,
    @CLASSIFICACAO VARCHAR(3)
AS
BEGIN
    -- Valida duração
    IF @DURACAO <= 0
    BEGIN
        RAISERROR('Erro: Duração do filme menor ou igual a zero.', 16, 1);
        RETURN;
    END;

    -- Valida classificação permitida
    IF @CLASSIFICACAO NOT IN ('L', '10+', '12+', '14+', '16+', '18+')
    BEGIN
        RAISERROR('Erro: Classificação inválida.', 16, 1);
        RETURN;
    END;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Inserção do filme
        INSERT INTO FILME (TITULO, DURACAO, ANO_LANCAMENTO, CLASSIFICACAO)
        VALUES (@TITULO, @DURACAO, @ANO_LANCAMENTO, @CLASSIFICACAO);

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;

CREATE OR ALTER PROCEDURE PR_INSERIR_AVALIACAO
    @USUARIO_ID INT,
    @FILME_ID INT,
    @VISUALIZACAO_ID INT,
    @NOTA DECIMAL(2,1),
    @COMENTARIO VARCHAR(500)
AS
BEGIN
    -- Valida faixa de nota
    IF @NOTA < 0.0 OR @NOTA > 5.0
    BEGIN
        RAISERROR('Erro: A nota deve estar entre 0.0 e 5.0.', 16, 1);
    END;

    -- Verifica se a visualização existe e pertence ao usuário e ao filme
    IF NOT EXISTS (
        SELECT 1 
        FROM VISUALIZACAO 
        WHERE VISUALIZACAO_ID = @VISUALIZACAO_ID
          AND USUARIO_ID = @USUARIO_ID
          AND FILME_ID = @FILME_ID
    )
    BEGIN
        RAISERROR('Erro: Visualização não encontrada ou não corresponde ao usuário e filme.', 16, 1);
    END;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Inserção da avaliação
        INSERT INTO AVALIACAO (USUARIO_ID, FILME_ID, VISUALIZACAO_ID, NOTA, COMENTARIO)
        VALUES (@USUARIO_ID, @FILME_ID, @VISUALIZACAO_ID, @NOTA, @COMENTARIO);

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;

CREATE OR ALTER PROCEDURE PR_INSERIR_VISUALIZACAO
    @USUARIO_ID INT,
    @FILME_ID INT,
    @DATA_HORA DATETIME = NULL,
    @TEMPO_ASSISTIDO INT
AS
BEGIN
    -- Se a data não for fornecida, usa a atual
    IF @DATA_HORA IS NULL
        SET @DATA_HORA = GETDATE();

    -- Valida usuário
    IF NOT EXISTS (SELECT 1 FROM USUARIO WHERE USUARIO_ID = @USUARIO_ID)
    BEGIN
        RAISERROR('Erro: Usuário informado não existe.', 16, 1);
        RETURN;
    END;

    -- Valida filme
    IF NOT EXISTS (SELECT 1 FROM FILME WHERE FILME_ID = @FILME_ID)
    BEGIN
        RAISERROR('Erro: Filme informado não existe.', 16, 1);
        RETURN;
    END;

    -- Valida tempo assistido
    IF @TEMPO_ASSISTIDO < 0
    BEGIN
        RAISERROR('Erro: Tempo assistido inválido.', 16, 1);
        RETURN;
    END;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Inserção da visualização
        INSERT INTO VISUALIZACAO
            (USUARIO_ID, FILME_ID, TEMPO_ASSISTIDO, DATA_HORA)
        VALUES
            (@USUARIO_ID, @FILME_ID, @TEMPO_ASSISTIDO, @DATA_HORA);

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;

CREATE OR ALTER PROCEDURE PR_MEDIA_NOTA_FILME
    @FILME_ID INT
AS
BEGIN
    -- Verifica se o filme existe
    IF NOT EXISTS (SELECT 1 FROM FILME WHERE FILME_ID = @FILME_ID)
    BEGIN
        RAISERROR('Erro: Filme informado não existe.', 16, 1);
        RETURN;
    END;

    -- Verifica se há avaliações
    IF NOT EXISTS (SELECT 1 FROM AVALIACAO WHERE FILME_ID = @FILME_ID)
    BEGIN
        RAISERROR('Erro: Nenhuma avaliação registrada para este filme.', 16, 1);
        RETURN;
    END;

    -- Retorna a média
    SELECT 
        AVG(NOTA) AS MEDIA_NOTA
    FROM 
        AVALIACAO
    WHERE 
        FILME_ID = @FILME_ID;
END;

--EXEC — Inserir Visualização (PR_INSERIR_VISUALIZACAO)
--Inserção válida
EXEC PR_INSERIR_VISUALIZACAO 
    @USUARIO_ID = 1,
    @FILME_ID = 2,
    @TEMPO_ASSISTIDO = 120;

--Usuário inexistente
EXEC PR_INSERIR_VISUALIZACAO 
    @USUARIO_ID = 999,
    @FILME_ID = 2,
    @TEMPO_ASSISTIDO = 120;

--Filme inexistente
EXEC PR_INSERIR_VISUALIZACAO 
    @USUARIO_ID = 1,
    @FILME_ID = 999,
    @TEMPO_ASSISTIDO = 120;

--Tempo assistido inválido
EXEC PR_INSERIR_VISUALIZACAO 
    @USUARIO_ID = 1,
    @FILME_ID = 2,
    @TEMPO_ASSISTIDO = -10;


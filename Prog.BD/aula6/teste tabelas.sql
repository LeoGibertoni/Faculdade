/* ===========================================================
   VALIDAÇÃO DA ESTRUTURA — PLATAFORMA DE STREAMING (SQL Server)
   - Valida tabelas, colunas (tipo/null/identity), PK, FK, UNIQUE*, CHECK
   - Emite mensagens intuitivas em português
   - *Sem UNIQUE para USUARIO.EMAIL (não exigido)
   - Sem validações de DEFAULT (não exigido)
   - Se tudo ok, retorna linha única com sucesso
   =========================================================== */

SET NOCOUNT ON;

DECLARE @report TABLE
(
    categoria  VARCHAR(30),
    objeto     VARCHAR(150),
    status     VARCHAR(10),   -- 'OK' ou 'ERRO'
    mensagem   NVARCHAR(4000)
);

/* ======================
   1) TABELAS ESPERADAS
   ====================== */
DECLARE @Tabelas TABLE (tabela SYSNAME);
INSERT INTO @Tabelas (tabela) VALUES
('PLANO_ASSINATURA'),('USUARIO'),('FILME'),('GENERO'),
('FILME_PLANO_ASSINATURA'),('FILME_GENERO'),('VISUALIZACAO'),('AVALIACAO');

INSERT INTO @report (categoria, objeto, status, mensagem)
SELECT 'TABELA', 'dbo.' + t.tabela, 
       CASE WHEN s.object_id IS NOT NULL THEN 'OK' ELSE 'ERRO' END,
       CASE WHEN s.object_id IS NOT NULL 
            THEN CONCAT('OK: Tabela ', t.tabela, ' encontrada.')
            ELSE CONCAT('ERRO: Tabela ', t.tabela, ' ausente.')
       END
FROM @Tabelas t
LEFT JOIN sys.tables s ON s.name = t.tabela AND s.schema_id = SCHEMA_ID('dbo');

/* ===========================
   2) COLUNAS (tipo/null/id)
   =========================== */
DECLARE @Colunas TABLE
(
    tabela SYSNAME,
    coluna SYSNAME,
    tipo   SYSNAME,   -- 'INT','VARCHAR','DECIMAL','DATETIME'
    len    INT        NULL,   -- para VARCHAR
    prec   TINYINT    NULL,   -- para DECIMAL
    scale  TINYINT    NULL,   -- para DECIMAL
    is_nullable BIT,
    is_identity BIT
);

-- PLANO_ASSINATURA
INSERT INTO @Colunas VALUES
('PLANO_ASSINATURA','PLANO_ASSINATURA_ID','INT',NULL,NULL,NULL,0,1),
('PLANO_ASSINATURA','NOME_PLANO','VARCHAR',100,NULL,NULL,0,0),
('PLANO_ASSINATURA','PRECO','DECIMAL',NULL,10,2,0,0),
('PLANO_ASSINATURA','RESOLUCAO_MAX','VARCHAR',20,NULL,NULL,0,0),
('PLANO_ASSINATURA','QTD_DISPOSITIVOS','INT',NULL,NULL,NULL,0,0);

-- USUARIO
INSERT INTO @Colunas VALUES
('USUARIO','USUARIO_ID','INT',NULL,NULL,NULL,0,1),
('USUARIO','NOME','VARCHAR',255,NULL,NULL,0,0),
('USUARIO','EMAIL','VARCHAR',150,NULL,NULL,0,0),
('USUARIO','SENHA','VARCHAR',255,NULL,NULL,0,0),
('USUARIO','DATA_CADASTRO','DATETIME',NULL,NULL,NULL,0,0),
('USUARIO','PLANO_ASSINATURA_ID','INT',NULL,NULL,NULL,0,0);

-- FILME
INSERT INTO @Colunas VALUES
('FILME','FILME_ID','INT',NULL,NULL,NULL,0,1),
('FILME','TITULO','VARCHAR',255,NULL,NULL,0,0),
('FILME','DURACAO','INT',NULL,NULL,NULL,0,0),
('FILME','ANO_LANCAMENTO','INT',NULL,NULL,NULL,0,0),
('FILME','CLASSIFICACAO','VARCHAR',10,NULL,NULL,0,0);

-- GENERO
INSERT INTO @Colunas VALUES
('GENERO','GENERO_ID','INT',NULL,NULL,NULL,0,1),
('GENERO','NOME','VARCHAR',50,NULL,NULL,0,0);

-- FILME_PLANO_ASSINATURA
INSERT INTO @Colunas VALUES
('FILME_PLANO_ASSINATURA','FILME_PLANO_ASSINATURA_ID','INT',NULL,NULL,NULL,0,1),
('FILME_PLANO_ASSINATURA','FILME_ID','INT',NULL,NULL,NULL,0,0),
('FILME_PLANO_ASSINATURA','PLANO_ASSINATURA_ID','INT',NULL,NULL,NULL,0,0);

-- FILME_GENERO
INSERT INTO @Colunas VALUES
('FILME_GENERO','FILME_GENERO_ID','INT',NULL,NULL,NULL,0,1),
('FILME_GENERO','FILME_ID','INT',NULL,NULL,NULL,0,0),
('FILME_GENERO','GENERO_ID','INT',NULL,NULL,NULL,0,0);

-- VISUALIZACAO
INSERT INTO @Colunas VALUES
('VISUALIZACAO','VISUALIZACAO_ID','INT',NULL,NULL,NULL,0,1),
('VISUALIZACAO','USUARIO_ID','INT',NULL,NULL,NULL,0,0),
('VISUALIZACAO','FILME_ID','INT',NULL,NULL,NULL,0,0),
('VISUALIZACAO','DATA_HORA','DATETIME',NULL,NULL,NULL,0,0),
('VISUALIZACAO','TEMPO_ASSISTIDO','INT',NULL,NULL,NULL,0,0);

-- AVALIACAO
INSERT INTO @Colunas VALUES
('AVALIACAO','AVALIACAO_ID','INT',NULL,NULL,NULL,0,1),
('AVALIACAO','USUARIO_ID','INT',NULL,NULL,NULL,0,0),
('AVALIACAO','FILME_ID','INT',NULL,NULL,NULL,0,0),
('AVALIACAO','VISUALIZACAO_ID','INT',NULL,NULL,NULL,0,0),
('AVALIACAO','NOTA','DECIMAL',NULL,2,1,0,0),
('AVALIACAO','COMENTARIO','VARCHAR',500,NULL,NULL,1,0);

;WITH cols AS
(
    SELECT 
        c.tabela,
        c.coluna,
        c.tipo,
        c.len,
        c.prec,
        c.scale,
        c.is_nullable,
        c.is_identity,
        st.object_id,
        sc.column_id            AS found_colid,
        UPPER(ty.name)          AS found_type,
        sc.max_length           AS found_max_length,
        sc.precision            AS found_precision,
        sc.scale                AS found_scale,
        sc.is_nullable          AS found_nullable,
        sc.is_identity          AS found_identity
    FROM @Colunas c
    LEFT JOIN sys.tables  st ON st.name = c.tabela AND st.schema_id = SCHEMA_ID('dbo')
    LEFT JOIN sys.columns sc ON sc.object_id = st.object_id AND sc.name = c.coluna
    LEFT JOIN sys.types   ty ON ty.user_type_id = sc.user_type_id
)
INSERT INTO @report (categoria, objeto, status, mensagem)
SELECT 
    'COLUNA',
    CONCAT('dbo.', tabela, '.', coluna) AS objeto,
    CASE 
      WHEN object_id IS NULL THEN 'ERRO'
      WHEN found_colid IS NULL THEN 'ERRO'
      WHEN UPPER(tipo) <> found_type
           OR (UPPER(tipo) = 'VARCHAR'  AND len <> found_max_length)
           OR (UPPER(tipo) = 'DECIMAL'  AND (prec <> found_precision OR scale <> found_scale))
           OR (is_nullable <> found_nullable)
           OR (is_identity <> found_identity)
           THEN 'ERRO'
      ELSE 'OK'
    END AS status,
    CASE 
      WHEN object_id IS NULL 
           THEN CONCAT('ERRO: Tabela ', tabela, ' ausente — não foi possível validar a coluna ', coluna, '.')
      WHEN found_colid IS NULL 
           THEN CONCAT('ERRO: Coluna ausente: ', tabela, '.', coluna, '.')
      WHEN UPPER(tipo) <> found_type
           THEN CONCAT('ERRO: Tipo divergente em ', tabela, '.', coluna, '. Esperado ', tipo,
                       CASE WHEN UPPER(tipo) = 'VARCHAR' THEN CONCAT('(', len, ')')
                            WHEN UPPER(tipo) = 'DECIMAL' THEN CONCAT('(', prec, ',', scale, ')')
                            ELSE '' END,
                       '; Encontrado ', found_type,
                       CASE WHEN found_type = 'VARCHAR' THEN CONCAT('(', found_max_length, ')')
                            WHEN found_type = 'DECIMAL' THEN CONCAT('(', found_precision, ',', found_scale, ')')
                            ELSE '' END, '.')
      WHEN UPPER(tipo) = 'VARCHAR' AND len <> found_max_length
           THEN CONCAT('ERRO: Tamanho VARCHAR divergente em ', tabela, '.', coluna, '. Esperado ', len, '; Encontrado ', found_max_length, '.')
      WHEN UPPER(tipo) = 'DECIMAL' AND (prec <> found_precision OR scale <> found_scale)
           THEN CONCAT('ERRO: Precisão/escala DECIMAL divergente em ', tabela, '.', coluna, 
                       '. Esperado (', prec, ',', scale, '); Encontrado (', found_precision, ',', found_scale, ').')
      WHEN is_nullable <> found_nullable
           THEN CONCAT('ERRO: Nullability divergente em ', tabela, '.', coluna, 
                       '. Esperado ', CASE WHEN is_nullable=1 THEN 'NULL' ELSE 'NOT NULL' END,
                       '; Encontrado ', CASE WHEN found_nullable=1 THEN 'NULL' ELSE 'NOT NULL' END, '.')
      WHEN is_identity <> found_identity
           THEN CONCAT('ERRO: Identidade divergente em ', tabela, '.', coluna, 
                       '. Esperado ', CASE WHEN is_identity=1 THEN 'IDENTITY' ELSE 'sem IDENTITY' END,
                       '; Encontrado ', CASE WHEN found_identity=1 THEN 'IDENTITY' ELSE 'sem IDENTITY' END, '.')
      ELSE CONCAT('OK: Coluna ', tabela, '.', coluna, ' confere (tipo/null/identity).')
    END AS mensagem
FROM cols;

-- 3) PKs esperadas
DECLARE @PKs TABLE (tabela SYSNAME, pkname SYSNAME);
INSERT INTO @PKs VALUES
('PLANO_ASSINATURA','PK_PLANO_ASSINATURA'),
('USUARIO','PK_USUARIO'),
('FILME','PK_FILME'),
('GENERO','PK_GENERO'),
('FILME_PLANO_ASSINATURA','PK_FILME_PLANO_ASSINATURA'),
('FILME_GENERO','PK_FILME_GENERO'),
('VISUALIZACAO','PK_VISUALIZACAO'),
('AVALIACAO','PK_AVALIACAO');

INSERT INTO @report (categoria, objeto, status, mensagem)
SELECT 'PK', CONCAT('dbo.',p.tabela,'.',p.pkname),
       CASE WHEN kc.name IS NULL THEN 'ERRO' ELSE 'OK' END,
       CASE WHEN kc.name IS NULL 
            THEN CONCAT('ERRO: PK ausente ou com nome incorreto para ', p.tabela, ' (esperado ', p.pkname, ').')
            ELSE CONCAT('OK: PK ', p.pkname, ' encontrada em ', p.tabela, '.')
       END
FROM @PKs p
LEFT JOIN sys.tables t ON t.name = p.tabela AND t.schema_id = SCHEMA_ID('dbo')
LEFT JOIN sys.key_constraints kc ON kc.parent_object_id = t.object_id AND kc.[type] = 'PK' AND kc.name = p.pkname;

-- 4) UNIQUE esperadas (removida UN_USUARIO_EMAIL a pedido)
DECLARE @UNQs TABLE (tabela SYSNAME, uqname SYSNAME);
INSERT INTO @UNQs VALUES
('PLANO_ASSINATURA','UN_PLANO_ASSINATURA_NOME_PLANO'),
('GENERO','UN_GENERO_NOME');

INSERT INTO @report (categoria, objeto, status, mensagem)
SELECT 'UNIQUE', CONCAT('dbo.',u.tabela,'.',u.uqname),
       CASE WHEN kc.name IS NULL THEN 'ERRO' ELSE 'OK' END,
       CASE WHEN kc.name IS NULL 
            THEN CONCAT('ERRO: UNIQUE ausente ou com nome incorreto para ', u.tabela, ' (esperado ', u.uqname, ').')
            ELSE CONCAT('OK: UNIQUE ', u.uqname, ' encontrada em ', u.tabela, '.')
       END
FROM @UNQs u
LEFT JOIN sys.tables t ON t.name = u.tabela AND t.schema_id = SCHEMA_ID('dbo')
LEFT JOIN sys.key_constraints kc ON kc.parent_object_id = t.object_id AND kc.[type] = 'UQ' AND kc.name = u.uqname;

-- 5) FKs esperadas
DECLARE @FKs TABLE (fkname SYSNAME, tabela_dona SYSNAME, tabela_ref SYSNAME);
INSERT INTO @FKs VALUES
('FK_USUARIO_PLANO_ASSINATURA','USUARIO','PLANO_ASSINATURA'),
('FK_FILME_PLANO_ASSINATURA_FILME','FILME_PLANO_ASSINATURA','FILME'),
('FK_FILME_PLANO_ASSINATURA_PLANO_ASSINATURA','FILME_PLANO_ASSINATURA','PLANO_ASSINATURA'),
('FK_FILME_GENERO_FILME','FILME_GENERO','FILME'),
('FK_FILME_GENERO_GENERO','FILME_GENERO','GENERO'),
('FK_VISUALIZACAO_USUARIO','VISUALIZACAO','USUARIO'),
('FK_VISUALIZACAO_FILME','VISUALIZACAO','FILME'),
('FK_AVALIACAO_USUARIO','AVALIACAO','USUARIO'),
('FK_AVALIACAO_FILME','AVALIACAO','FILME'),
('FK_AVALIACAO_VISUALIZACAO','AVALIACAO','VISUALIZACAO');

INSERT INTO @report (categoria, objeto, status, mensagem)
SELECT 'FK', CONCAT('dbo.',f.tabela_dona,'.',f.fkname),
       CASE WHEN fk.name IS NULL THEN 'ERRO'
            WHEN rt.name <> f.tabela_ref THEN 'ERRO'
            ELSE 'OK' END,
       CASE WHEN fk.name IS NULL 
            THEN CONCAT('ERRO: FK ausente: ', f.fkname, ' na tabela ', f.tabela_dona, '.')
            WHEN rt.name <> f.tabela_ref
            THEN CONCAT('ERRO: FK ', f.fkname, ' referencia tabela incorreta. Esperado ', f.tabela_ref, '; encontrado ', rt.name, '.')
            ELSE CONCAT('OK: FK ', f.fkname, ' encontrada e referenciando ', f.tabela_ref, '.')
       END
FROM @FKs f
LEFT JOIN sys.tables dt ON dt.name = f.tabela_dona AND dt.schema_id = SCHEMA_ID('dbo')
LEFT JOIN sys.foreign_keys fk ON fk.parent_object_id = dt.object_id AND fk.name = f.fkname
LEFT JOIN sys.tables rt ON rt.object_id = fk.referenced_object_id;

-- 6) CHECKs esperados
DECLARE @CKs TABLE (tabela SYSNAME, ckname SYSNAME, coluna SYSNAME, dica NVARCHAR(200));
INSERT INTO @CKs VALUES
('PLANO_ASSINATURA','CK_PLANO_ASSINATURA_PRECO','PRECO',N'Esperado PRECO > 0'),
('PLANO_ASSINATURA','CK_PLANO_ASSINATURA_RESOLUCAO_MAX','RESOLUCAO_MAX',N'Esperado domínio (''HD'',''FULL HD'',''4K'')'),
('PLANO_ASSINATURA','CK_PLANO_ASSINATURA_QTD_DISPOSITIVOS','QTD_DISPOSITIVOS',N'Esperado QTD_DISPOSITIVOS > 0'),
('USUARIO','CK_USUARIO_SENHA','SENHA',N'Esperado LEN(SENHA) >= 8'),
('FILME','CK_FILME_TITULO','TITULO',N'Esperado LEN(TITULO) >= 2'),
('FILME','CK_FILME_DURACAO','DURACAO',N'Esperado DURACAO > 0'),
('FILME','CK_FILME_CLASSIFICACAO','CLASSIFICACAO',N'Esperado domínio (''L'',''10+'',''12+'',''14+'',''16+'',''18+'')'),
('VISUALIZACAO','CK_VISUALIZACAO_TEMPO_ASSISTIDO','TEMPO_ASSISTIDO',N'Esperado TEMPO_ASSISTIDO >= 0'),
('AVALIACAO','CK_AVALIACAO_NOTA','NOTA',N'Esperado 0.0 <= NOTA <= 5.0');

INSERT INTO @report (categoria, objeto, status, mensagem)
SELECT 'CHECK', CONCAT('dbo.',c.tabela,'.',c.ckname),
       CASE WHEN cc.name IS NULL THEN 'ERRO'
            WHEN cc.definition IS NOT NULL AND CHARINDEX(c.coluna, UPPER(cc.definition)) = 0 THEN 'ERRO'
            ELSE 'OK' END,
       CASE WHEN cc.name IS NULL
            THEN CONCAT(N'ERRO: CHECK ausente: ', c.ckname, N' na tabela ', c.tabela, N'. ', c.dica)
            WHEN cc.definition IS NOT NULL AND CHARINDEX(c.coluna, UPPER(cc.definition)) = 0
            THEN CONCAT(N'ERRO: CHECK ', c.ckname, N' não parece referenciar a coluna ', c.coluna, N'. ', c.dica)
            ELSE CONCAT('OK: CHECK ', c.ckname, ' encontrado em ', c.tabela, '.')
       END
FROM @CKs c
LEFT JOIN sys.tables t ON t.name = c.tabela AND t.schema_id = SCHEMA_ID('dbo')
LEFT JOIN sys.check_constraints cc ON cc.parent_object_id = t.object_id AND cc.name = c.ckname;

/* ==========================
   SAÍDA AMIGÁVEL AO ALUNO
   ========================== */
IF EXISTS (SELECT 1 FROM @report WHERE status = 'ERRO')
BEGIN
    SELECT categoria AS Categoria,
           objeto    AS Objeto,
           status    AS Status,
           mensagem  AS Mensagem
    FROM @report
    WHERE status = 'ERRO'
    ORDER BY Categoria, Objeto;

    PRINT 'Foram encontradas divergências/ausências. Veja a lista acima e corrija conforme as mensagens.';
END
ELSE
BEGIN
    SELECT 'OK: Estrutura criada exatamente conforme a proposta do exercício.' AS Resultado;
END

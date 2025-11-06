--Filmes com Avaliação Acima da Média Geral: Liste o título e a nota dos filmes que possuam
--pelo menos uma avaliação com nota superior à média geral de todas as avaliações registradas. (Use
--subselect)

select * from filme;
select * from AVALIACAO;

SELECT FILME.TITULO, AVALIACAO.NOTA FROM FILME
INNER JOIN AVALIACAO ON FILME.FILME_ID = AVALIACAO.FILME_ID
WHERE AVALIACAO.NOTA > (SELECT AVG(NOTA) FROM AVALIACAO);

--Usuários com Avaliação Nota Máxima: Liste os nomes e e-mails dos usuários que deram nota
--5.0 em alguma avaliação. (Use subselect com IN)

SELECT * FROM USUARIO;
SELECT * FROM AVALIACAO;

SELECT NOME, EMAIL
FROM USUARIO
WHERE USUARIO_ID IN (
    SELECT USUARIO_ID FROM AVALIACAO WHERE NOTA >= 5
);


--Usuários que não visualizaram nenhum filme: Liste os nomes e e-mails dos usuários que não
--visualizaram nenhum filme ainda. (Use subselect com NOT IN)SELECT * FROM VISUALIZACAO;
SELECT * FROM USUARIO;SELECT NOME, EMAIL
FROM USUARIO
WHERE USUARIO_ID NOT IN (
    SELECT USUARIO_ID FROM VISUALIZACAO WHERE TEMPO_ASSISTIDO > 0
);
--Classificação de Filmes por Duração: Liste o título do filme e sua classificação de duração:
--Até 3600 segundos ? 'Curta'
--De 3601 a 7200 segundos ? 'Média'
--Acima de 7200 segundos ? 'Longa'
--(Use CASE WHEN)SELECT * FROM FILME;SELECT 
    TITULO,
    DURACAO,
    CASE 
        WHEN DURACAO >= 7200 THEN 'Longa'
        WHEN DURACAO >= 3601 AND DURACAO >= 7200 THEN 'Médio'
        ELSE 'Curta'
    END AS CLASSIFICACAO_DURACAO
FROM filme;

--Visualização de Filmes com Avaliação: Crie uma view que mostre o Nome do usuário, Título do
--filme assistido e Nota atribuída (se houver).SELECT * FROM USUARIO;
SELECT * FROM FILME; 
SELECT * FROM AVALIACAO;
	
CREATE OR ALTER VIEW vw_VISUALIZACAO_FILME_AVA2 AS
SELECT 
	USUARIO.NOME AS USUARIO,
	FILME.TITULO AS FILME,
	AVALIACAO.NOTA AS AVALIACAO
FROM AVALIACAO
INNER JOIN USUARIO ON AVALIACAO.USUARIO_ID = USUARIO.USUARIO_ID
INNER JOIN FILME ON AVALIACAO.FILME_ID = FILME.FILME_ID;

SELECT * FROM vw_VISUALIZACAO_FILME_AVA2;

--Média de Avaliações por Filme: Crie uma view que mostre Título do filme e a Média das notas
--recebidas nas avaliações
SELECT * FROM FILME; 
SELECT * FROM AVALIACAO;
SELECT * FROM USUARIO;
SELECT * FROM VISUALIZACAO;

CREATE OR ALTER VIEW vw_MEDIA_AVALIACAO AS
SELECT 
	FILME.TITULO AS FILME,
	AVG(AVALIACAO.NOTA) AS AVALIACAO
FROM FILME
INNER JOIN AVALIACAO ON FILME.FILME_ID = AVALIACAO.FILME_ID
GROUP BY FILME.TITULO;

SELECT * FROM VW_MEDIA_AVALIACAO



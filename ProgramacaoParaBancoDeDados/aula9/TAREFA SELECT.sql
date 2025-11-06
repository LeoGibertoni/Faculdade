-- Exiba todas as colunas da tabela USUARIO.select * from usuario;-- Exiba apenas o nome e o e-mail dos usuários.select nome, email from usuario;-- Liste todos os filmes lançados após o ano de 2015.select * from filme where ano_lancamento > 2015;-- Exiba os títulos dos filmes com classificação indicativa igual a "18+"select titulo, classificacao from filme where classificacao = '18+';-- Exiba os filmes cujo título começa com a letra "A"select titulo, ano_lancamento from filme where titulo like 'a%';-- Liste os usuários cadastrados em um plano específico (por exemplo, com PLANO_ID = 3), ordenados pelo nome em ordem alfabética.SELECT USUARIO_ID, NOME, EMAIL FROM USUARIO WHERE PLANO_ASSINATURA_ID = 3 ORDER BY NOME ASC;-- Exiba os filmes com duração entre 3000 e 7000 segundos, ordenados da maior para a menor duraçãoSELECT TITULO, DURACAO FROM FILME WHERE DURACAO >= 3000 AND DURACAO <= 7000;-- Liste todos os gêneros cadastrados em ordem alfabéticaSELECT GENERO_ID, NOME FROM GENERO ORDER BY NOME ASC;-- Liste os 3 filmes com maior duração disponíveis na plataformaSELECT TOP 3 TITULO, DURACAO FROM FILME ORDER BY DURACAO DESC;-- Exiba os 5 usuários mais recentes, com base na data de cadastro.SELECT TOP 5 NOME, EMAIL, DATA_CADASTRO FROM USUARIO ORDER BY DATA_CADASTRO DESC;-- Liste todas as classificações indicativas diferentes cadastradas na tabela FILMESELECT DISTINCT CLASSIFICACAO FROM FILME;-- Liste os diferentes anos de lançamento registrados na tabela FILME, sem repetiçõesSELECT DISTINCT FILME.TITULO FROM FILME
JOIN VISUALIZACAO ON FILME.FILME_ID = VISUALIZACAO.FILME_ID;-- Liste os nomes dos usuários e o nome do plano que cada um assinouSELECT USUARIO.NOME, PLANO_ASSINATURA.NOME_PLANO FROM USUARIOJOIN PLANO_ASSINATURA ON USUARIO.PLANO_ASSINATURA_ID = PLANO_ASSINATURA.PLANO_ASSINATURA_ID-- Exiba os títulos dos filmes e seus respectivos gêneros.SELECT FILME.TITULO, GENERO.NOME FROM FILME
JOIN FILME_GENERO ON FILME.FILME_ID = FILME_GENERO.FILME_ID
JOIN GENERO ON FILME_GENERO.GENERO_ID = GENERO.GENERO_ID;

-- Liste o nome de todos os usuários e os títulos dos filmes que eles assistiram
SELECT USUARIO.NOME, FILME.TITULO FROM USUARIO
LEFT JOIN VISUALIZACAO ON USUARIO.USUARIO_ID = VISUALIZACAO.USUARIO_ID
LEFT JOIN FILME ON VISUALIZACAO.FILME_ID = FILME.FILME_ID;

-- Exiba o nome dos usuários, o título do filme e a nota de cada avaliação registrada, se houver.
SELECT USUARIO.NOME, FILME.TITULO, AVALIACAO.NOTA FROM USUARIO
JOIN AVALIACAO ON USUARIO.USUARIO_ID = AVALIACAO.USUARIO_ID
LEFT JOIN FILME ON FILME.FILME_ID = AVALIACAO.FILME_ID;

-- Exiba os usuários que assistiram a filmes do gênero "Comédia"
SELECT USUARIO.NOME, FILME.TITULO, GENERO.NOME FROM USUARIO, FILME, GENERO WHERE GENERO.NOME = 'COMEDIA';
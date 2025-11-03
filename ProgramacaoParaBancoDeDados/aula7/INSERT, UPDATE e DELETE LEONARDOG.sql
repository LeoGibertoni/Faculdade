-- O cadastro de pelo menos 5 Gêneros
insert into genero (nome)
values ('Drama'), ('Ação'), ('Terror'), ('Aventura'), ('Suspense');

-- O cadastro de pelo menos 10 Filmes com ao menos 1 gênero associado
INSERT INTO FILME (TITULO, DURACAO, ANO_LANCAMENTO, CLASSIFICACAO)
VALUES ('NOITE SOMBRIA', 120, 2005, '14+'),
       ('AMOR EM CHAMAS', 98, 2012, '12+'),
       ('O ÚLTIMO GUARDIÃO', 145, 2018, '16+'),
       ('VIAGEM AO DESCONHECIDO', 110, 1999, 'L'),
       ('CÓDIGO FANTASMA', 132, 2023, '18+'),
       ('TEMPESTADE INTERIOR', 101, 2010, '12+'),
       ('ALÉM DO VÉU', 123, 2001, '16+'),
       ('O ECO DO SILÊNCIO', 95, 1995, 'L'),
       ('SOMBRAS DO PASSADO', 140, 2020, '14+'),
       ('LUZES DE MARTE', 107, 2025, '12+');

INSERT INTO FILME_GENERO (FILME_ID, GENERO_ID)
VALUES (1, 2), (2, 2), (3,4), (4,3), (5,5), (6, 3), (7, 4), (8, 3), (9, 5), (10,5);

-- O cadastro de pelo menos 5 Planos de assinaturas com ao menos 3 filmes
INSERT INTO PLANO_ASSINATURA (NOME_PLANO, PRECO, RESOLUCAO_MAX, QTD_DISPOSITIVOS)
VALUES ('BÁSICO', 19.90, 'HD', 1),
	   ('PADRÃO', 29.90, 'FULL HD', 2),
	   ('FAMÍLIA', 39.90, '4K', 4),
	   ('MOBILE', 14.90, 'HD', 1),
	   ('PREMIUM', 49.90, '4K', 6);

INSERT INTO FILME_PLANO_ASSINATURA (FILME_ID, PLANO_ASSINATURA_ID)
VALUES (1, 2), (1, 3), (1, 1), 
	   (2, 2), (2, 3), (2, 5), 
	   (3, 4), (3, 1), (3, 5),
	   (4, 3), (4, 2), (4, 5),
	   (5, 5), (5, 3), (5, 2);
	   
-- O cadastro de pelo menos 10 Usuários
INSERT INTO USUARIO (NOME, EMAIL, SENHA, DATA_CADASTRO, PLANO_ASSINATURA_ID)
VALUES ('Ana Silva', 'ana.silva@email.com', 'senha123', 2025-01-10, 1),
	   ('Bruno Costa', 'bruno.costa@email.com', 'segredo456', 2025-02-15, 2),
	   ('Carla Mendes', 'carla.mendes@email.com', 'abc12345', 2025-03-20, 3),
	   ('Daniel Rocha', 'daniel.rocha@email.com', 'pass789123', 2025-04-05, 1),
	   ('Eduarda Lima', 'eduarda.lima@email.com', 'minhasenha1251', 2025-05-12, 4),
	   ('Felipe Torres', 'felipe.torres@email.com', 'senha321512', 2025-06-18, 2),
	   ('Gabriela Souza', 'gabriela.souza@email.com', '123456678', 2025-07-22, 3),
	   ('Henrique Alves', 'henrique.alves@email.com', 'senha@2025211', 2025-08-30, 5),
	   ('Isabela Martins', 'isabela.martins@email.com', 'senhaIsabela125', 2025-09-05, 4),
	   ('João Pedro', 'joao.pedro@email.com', 'joao1232124', 2025-09-17, 1);
	   
-- O cadastro de pelo menos 15 visualizações
INSERT INTO VISUALIZACAO (USUARIO_ID, FILME_ID, DATA_HORA, TEMPO_ASSISTIDO)
VALUES (1, 3, '2025-09-15T20:00:00', 100),
	   (2, 5, '2025-09-16T18:30:00', 85),
	   (3, 1, '2025-09-17T21:15:00', 120),
	   (4, 2, '2025-09-14T19:45:00', 95),
	   (5, 4, '2025-09-13T22:00:00', 110),
	   (1, 6, '2025-09-12T17:20:00', 60),
	   (2, 7, '2025-09-11T20:10:00', 130),
	   (3, 8, '2025-09-10T16:00:00', 90),
	   (4, 9, '2025-09-09T23:30:00', 140),
	   (5, 10, '2025-09-08T15:45:00', 100),
	   (1, 2, '2025-09-07T20:00:00', 80),
	   (2, 3, '2025-09-06T19:00:00', 100),
	   (3, 4, '2025-09-05T21:00:00', 105),
	   (4, 5, '2025-09-04T18:00:00', 95),
	   (5, 6, '2025-09-03T22:00:00', 115);

-- O cadastro de pelo menos 5 Avaliações
INSERT INTO AVALIACAO (USUARIO_ID, FILME_ID, VISUALIZACAO_ID, NOTA, COMENTARIO)
VALUES (1, 3, 3, 3, 'Filme envolvente, ótimos efeitos visuais'),
	   (2, 5, 2, 2, 'Boa história, mas ritmo lento'),
	   (3, 1, 1, 4, 'Excelente atuação e trilha sonora'),
	   (4, 2, 4, 1, 'Esperava mais do final'),
	   (5, 4, 5, 4, 'Muito divertido, assistiria novamente');

-- Um comando de UPDATE para alterar o email e o nome de um usuário. Para localizar o registro que será alterado, utilize a chave primária da tabela
UPDATE USUARIO SET NOME = 'Eduardo Santos', EMAIL = 'eduardosant@gmail.com'
WHERE USUARIO_ID = 1;

-- Um comando de UPDATE para aumentar o preço de todos os planos de assinatura em 5%. Um comando UPDATE para migrar todos os clientes de um plano de assinatura para outro plano.
UPDATE PLANO_ASSINATURA SET PRECO = PRECO * 1.05;

-- Um comando UPDATE para migrar todos os clientes de um plano de assinatura para outro plano.
UPDATE USUARIO SET PLANO_ASSINATURA_ID = 1
WHERE PLANO_ASSINATURA_ID = 2;

-- Um comando DELETE para remover um gênero cadastrado. Para localizar o registro que será alterado, utilize a chave primária da tabela
DELETE FILME_GENERO
WHERE GENERO_ID = 3;
DELETE GENERO
WHERE GENERO_ID = 3;

-- Um conjunto de comandos DELETE para remover um usuário e todas as visualizações e comentários que ele realizou. Coloque os comandos em uma ordem que eles possam ser executados de uma única vez.
DELETE AVALIACAO
WHERE USUARIO_ID = 2;
DELETE VISUALIZACAO
WHERE USUARIO_ID = 2;
DELETE USUARIO
WHERE USUARIO_ID = 2;

-- Um conjunto de comandos DELETE para remover um filme e todas as visualizações e comentários recebidos pelo filme. Coloque os comandos em uma ordem que eles possam ser executados de uma única vez
DELETE FILME_PLANO_ASSINATURA
WHERE FILME_ID = 2;
DELETE AVALIACAO
WHERE FILME_ID = 2;
DELETE VISUALIZACAO
WHERE FILME_ID = 2;
DELETE FILME_GENERO
WHERE FILME_ID = 2;
DELETE FILME
WHERE FILME_ID = 2;

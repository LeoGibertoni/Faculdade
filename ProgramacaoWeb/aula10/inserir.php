<?php

    require 'conexao.php';

    $nome = $_POST["nome"];
    $idade = (int)$_POST["idade"];
    $email = $_POST["email"];

   
    $sql = "INSERT INTO PESSOA (NOME, IDADE, EMAIL) VALUES (?, ?, ?);";
    $stm = $conexao->prepare($sql);
    $stm->bind_param("sis", $nome, $idade, $email);

    if($stm->execute())
        echo "Dados inseridos com sucesso!";
    else
        echo "Erro ao inserir dados: ".$stm->error;
    
    $stm->close();

    $conexao->close();
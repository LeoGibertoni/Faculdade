<?php

     //Criar a string de conexão
    $servidor = "localhost";
    $usuario = "root";
    $senha = "";
    $banco = "BASE_DADOS";

    $conexao = new mysqli($servidor, $usuario, $senha, $banco);

    if($conexao->connect_error)
    {
        die("Erro de conexão: ".$conexao->connect_error);
    }
?>

<?php
    session_start();

    if(isset($_POST["nome"] && $_POST["senha"])){
        $_SESSION["nome"] = $_POST["nome"];
        $_SESSION["senha"] = $_POST["senha"];

        echo "Usuário logado: ". $_SESSION["nome"];
    } else{
        echo "Usuário não identificado!";
    }

    if(isset($_COOKIE["idioma"])){
        echo"Você escolheu o idioma: ". $_COOKIE["idioma"]
    } else{
        echo"Você não escolheu um idioma"
    }
?>
<?php

    $titulo = $_POST["titulo"];
    $postagem = $_POST["postagem"];
    $idUsuario = $_POST["idUsuario"];

    $apiUrl = "https://jsonplaceholder.typicode.com/posts";

    $dadosParaEnvio = [
        "title" => $titulo,
        "body" => $postagem,
        "userId" => $idUsuario, 
    ];

    $curl = curl_init($apiUrl);

    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($dadosParaEnvio, true));
    curl_setopt($curl, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

    $resposta = curl_exec($curl);

    curl_close($curl);

    $dadosRetorno = json_decode($resposta, true);

    echo "<p>" . $dadosRetorno["title"] . "</p>";
    echo "<p>" . $dadosRetorno["body"] . "</p>";
    echo "<p>" . $dadosRetorno["userId"] . "</p>";

?>
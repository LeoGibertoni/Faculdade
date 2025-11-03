<?php
    $url = "https://jsonplaceholder.typicode.com/users/1";

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);

    curl_close($ch);

    $dados = json_decode($response, true);

    echo "Nome: " . $dados["name"] . "<br>";
    echo "Email: " . $dados["email"] . "<br>";
?>

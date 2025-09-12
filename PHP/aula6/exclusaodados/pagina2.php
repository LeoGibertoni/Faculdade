<?php
    $codigo = $_POST["codigo"];

    $apiUrl = "https://jsonplaceholder.typicode.com/posts/$codigo";

    $curl = curl_init($apiUrl);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "DELETE");
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

    $resposta = curl_exec($curl);

    if (curl_errno($curl)) {
        echo "Falha na requisição: " . curl_error($curl);
    } else {
        echo "Usuário $codigo excluído com sucesso.<br>";
    }

    curl_close($curl);
?>

<?php
$id = $_POST["id"];
$title = $_POST["title"];
$body = $_POST["body"];
$userId = $_POST["userId"];

$apiUrl = "https://jsonplaceholder.typicode.com/posts/$id";

$dadosParaEnvio = [
    "id" => $id,
    "title" => $title,
    "body" => $body,
    "userId" => $userId
];

$curl = curl_init($apiUrl);

curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($dadosParaEnvio, true));
curl_setopt($curl, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

$resposta = curl_exec($curl);

$dadosRetorno = json_decode($resposta, true);

echo "<h3>Retorno da API</h3>";
echo "<p><b>Código:</b> " . htmlspecialchars($dadosRetorno["id"] ?? "") . "</p>";
echo "<p><b>Título:</b> " . htmlspecialchars($dadosRetorno["title"] ?? "") . "</p>";
echo "<p><b>Postagem:</b> " . htmlspecialchars($dadosRetorno["body"] ?? "") . "</p>";
echo "<p><b>ID Usuário:</b> " . htmlspecialchars($dadosRetorno["userId"] ?? "") . "</p>";
?>

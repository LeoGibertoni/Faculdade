<?php
// Endpoint de estados
$url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";
$ch = curl_init($url);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 

$response = curl_exec($ch);

curl_close($ch);

// Decodifica JSON
$estados = json_decode($response, true);
?>
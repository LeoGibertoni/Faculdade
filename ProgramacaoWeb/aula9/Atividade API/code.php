<?php
$url = "https://servicodados.ibge.gov.br/api/v1/localidades/regioes";
$ch = curl_init($url);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 

$response = curl_exec($ch);

curl_close($ch);

$regioes = json_decode($response, true);
?>

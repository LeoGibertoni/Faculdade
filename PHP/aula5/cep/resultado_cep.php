<?php 

    $cep = $_POST["cep"];

    $urlApi = "https://viacep.com.br/ws/$cep/json/";

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $urlApi);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

    $response = curl_exec($ch);

    $dados = json_decode($response, true);

    curl_close($ch);

    echo "<h4>Dados do CEP</h4>";
    echo "CEP: " . $dados["cep"] . "<br>";
    echo "Logradouro: " . $dados["logradouro"] . "<br>";
    echo "Bairro: " . $dados["bairro"] . "<br>";
    echo "Cidade: " . $dados["localidade"] . "<br>";
    echo "Estado: " . $dados["uf"] . "<br>";
    echo "<br><br>";
    echo '<a href="index.php"><button>Voltar</button></a>';
?>

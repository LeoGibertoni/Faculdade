<?php 

    $pokemon = $_POST["pokemon"];

    $urlApi = "https://pokeapi.co/api/v2/pokemon/$pokemon/";

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $urlApi);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

    $response = curl_exec($ch);

    $dados = json_decode($response, true);

    curl_close($ch);

    echo "<h4>Dados do Pokémon</h4>";
    echo "Número: ". $dados["id"]."<br>";
    echo "Nome: ". $dados["name"]."<br>";
    echo "Nome: ". $dados["base_experience"]."<br>";
    echo "Slot: ". $dados["abilities"]["0"]["slot"];
    echo "<br><br>";
    echo '<img src="'.$dados["sprites"]["front_default"].'" style="width:200px;">';
    echo "<br><br>";
    echo '<a href="index.php"><button>Voltar</button></a>';
?> 
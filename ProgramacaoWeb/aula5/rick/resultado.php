<?php 

    $id = $_POST["id"];

    $urlApi = "https://rickandmortyapi.com/api/character/$id";

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $urlApi);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

    $response = curl_exec($ch);

    $dados = json_decode($response, true);

    curl_close($ch);

    echo "<h4>Dados do personagem</h4>";
    echo "ID: " . $dados["id"] . "<br>";
    echo "Nome: " . $dados["name"] . "<br>";
    echo "Status: " . $dados["status"] . "<br>";
    echo "Espécie: " . $dados["species"] . "<br>";
    echo "Gênero: " . $dados["gender"] . "<br>";
    echo "<br><img src='" . $dados["image"] . "' alt='Personagem' style='width:200px;border-radius:10px;'><br><br>";
    echo "<br><br>";
    echo '<a href="index.php"><button>Voltar</button></a>';
?>

<?php 

    $url = "https://jsonplaceholder.typicode.com/posts";

    $response = file_get_contents($url);

    $posts = json_decode($response, true);

?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consultando uma API Pública</title>
</head>
<body>
    <h2>Postagens</h2>
    <ul>
        <?php foreach ($posts as $post): ?>
        <li><?php echo "Usuário Id:".$post["userId"]?></li>
        <li><?php echo "Id:".$post["id"]?></li>
        <li><?php echo "Título:".$post["title"]?></li>
        <li><?php echo "Campo:".$post["body"]?></li>
        <hr>
        <?php endforeach; ?>
    </ul> 
</body>
</html>

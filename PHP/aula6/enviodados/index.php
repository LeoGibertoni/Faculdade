<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Pública - POST</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h3>Exemplo de envio de dados</h3>
        <div class="postagem">
    <form method="POST" action="pagina2.php">
        <div class="postagem">
            <label for="titulo">Título: </label>
            <input type="text" name="titulo"><br><br>
            <label for="postagem">Postagem: </label>
            <textarea name="postagem"></textarea><br><br>
            <label for="idUsuario">Id Usuário: </label>
            <input type="text" name="idUsuario"><br><br>
            <button type="enviar">Enviar</button>
        </div>
    </form>
</body>
</html>